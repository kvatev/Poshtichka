import { NextResponse, NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { readPersistentData, writePersistentData } from "@/lib/server-storage";

export interface CityPreset {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

declare global {
  var __POSHTICHKA_CITIES__: CityPreset[] | undefined;
}

const defaultCities: CityPreset[] = [
  { id: "c1", name: "Созопол", lat: 42.4175, lng: 27.6958 },
  { id: "c2", name: "Каварна", lat: 43.4342, lng: 28.3392 },
  { id: "c3", name: "София", lat: 42.6977, lng: 23.3219 },
  { id: "c4", name: "Червен", lat: 43.6212, lng: 25.9961 },
  { id: "c5", name: "Перущица", lat: 42.0567, lng: 24.5458 },
  { id: "c6", name: "Велико Търново", lat: 43.0757, lng: 25.6172 },
  { id: "c7", name: "Бургас", lat: 42.5048, lng: 27.4626 },
  { id: "c8", name: "Пловдив", lat: 42.1354, lng: 24.7453 },
  { id: "c9", name: "Варна", lat: 43.2141, lng: 27.9147 },
];

function getStoredCities(): CityPreset[] {
  if (globalThis.__POSHTICHKA_CITIES__ && globalThis.__POSHTICHKA_CITIES__.length > 0) {
    return globalThis.__POSHTICHKA_CITIES__;
  }
  const fromFile = readPersistentData<CityPreset[]>("cities", defaultCities);
  globalThis.__POSHTICHKA_CITIES__ = fromFile;
  return fromFile;
}

function saveStoredCities(cities: CityPreset[]): void {
  globalThis.__POSHTICHKA_CITIES__ = cities;
  writePersistentData("cities", cities);
}

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(url && !url.includes("placeholder") && !url.includes("example"));
}

/**
 * GET: Fetch all city presets
 */
export async function GET() {
  const current = getStoredCities();

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("cities")
        .select("*")
        .order("name", { ascending: true });

      if (!error && data && data.length > 0) {
        const formatted: CityPreset[] = data.map((c) => ({
          id: c.id,
          name: c.name,
          lat: Number(c.lat),
          lng: Number(c.lng),
        }));

        saveStoredCities(formatted);
        return NextResponse.json({ cities: formatted });
      }
    } catch {
      // Fallback
    }
  }

  return NextResponse.json({ cities: current });
}

/**
 * POST: Add a new city preset
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, lat, lng } = body;

    if (!name || !String(name).trim()) {
      return NextResponse.json({ error: "Името на града е задължително." }, { status: 400 });
    }

    const newCityName = String(name).trim();
    const newLat = lat !== undefined ? Number(lat) : 42.6977;
    const newLng = lng !== undefined ? Number(lng) : 23.3219;

    const newCity: CityPreset = {
      id: `CITY-${Date.now()}`,
      name: newCityName,
      lat: newLat,
      lng: newLng,
    };

    if (isSupabaseConfigured()) {
      try {
        const supabase = await createClient();
        const { data, error } = await supabase
          .from("cities")
          .insert([{ name: newCityName, lat: newLat, lng: newLng }])
          .select()
          .single();

        if (!error && data) {
          newCity.id = data.id;
        }
      } catch (dbErr) {
        console.warn("Supabase city insert notice:", dbErr);
      }
    }

    const current = getStoredCities();
    const exists = current.some((c) => c.name.toLowerCase() === newCityName.toLowerCase());
    const updated = exists ? current : [...current, newCity];
    saveStoredCities(updated);

    try {
      revalidatePath("/gallery");
      revalidatePath("/");
    } catch {}

    return NextResponse.json({ success: true, city: newCity, cities: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Грешка при добавяне на град.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

/**
 * DELETE: Delete a city preset
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const name = searchParams.get("name");

    if (!id && !name) {
      return NextResponse.json({ error: "Липсва ИД или име на града." }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      try {
        const supabase = await createClient();
        if (id) {
          await supabase.from("cities").delete().eq("id", id);
        } else if (name) {
          await supabase.from("cities").delete().eq("name", name);
        }
      } catch (dbErr) {
        console.warn("Supabase city delete notice:", dbErr);
      }
    }

    const current = getStoredCities();
    const updated = current.filter((c) =>
      id ? c.id !== id : c.name.toLowerCase() !== name?.toLowerCase()
    );
    saveStoredCities(updated);

    try {
      revalidatePath("/gallery");
      revalidatePath("/");
    } catch {}

    return NextResponse.json({ success: true, cities: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Грешка при изтриване на град.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
