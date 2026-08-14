import { NextResponse, NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface CityPreset {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

let mockCities: CityPreset[] = [
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

/**
 * GET: Fetch all city presets
 */
export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("cities")
      .select("*")
      .order("name", { ascending: true });

    if (error || !data || data.length === 0) {
      return NextResponse.json({ cities: mockCities });
    }

    const formatted: CityPreset[] = data.map((c) => ({
      id: c.id,
      name: c.name,
      lat: Number(c.lat),
      lng: Number(c.lng),
    }));

    return NextResponse.json({ cities: formatted });
  } catch {
    return NextResponse.json({ cities: mockCities });
  }
}

/**
 * POST: Add a new city preset
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, lat, lng } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Името на града е задължително." }, { status: 400 });
    }

    const newCityName = name.trim();
    const newLat = lat !== undefined ? Number(lat) : 42.6977;
    const newLng = lng !== undefined ? Number(lng) : 23.3219;

    const newCity: CityPreset = {
      id: `CITY-${Date.now()}`,
      name: newCityName,
      lat: newLat,
      lng: newLng,
    };

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
    } catch {
      // Fallback
    }

    // Update in-memory if not duplicate
    if (!mockCities.some((c) => c.name.toLowerCase() === newCityName.toLowerCase())) {
      mockCities = [...mockCities, newCity];
    }

    try {
      revalidatePath("/gallery");
    } catch {}

    return NextResponse.json({ success: true, city: newCity, cities: mockCities });
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

    try {
      const supabase = await createClient();
      if (id) {
        await supabase.from("cities").delete().eq("id", id);
      } else if (name) {
        await supabase.from("cities").delete().eq("name", name);
      }
    } catch {
      // Fallback
    }

    mockCities = mockCities.filter((c) => (id ? c.id !== id : c.name.toLowerCase() !== name?.toLowerCase()));

    try {
      revalidatePath("/gallery");
    } catch {}

    return NextResponse.json({ success: true, cities: mockCities });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Грешка при изтриване на град.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
