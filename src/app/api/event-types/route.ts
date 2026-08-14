import { NextResponse, NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { readPersistentData, writePersistentData } from "@/lib/server-storage";

declare global {
  var __POSHTICHKA_EVENT_TYPES__: string[] | undefined;
}

const defaultEventTypes: string[] = [
  "сватбено тържество",
  "корпоративно събитие",
  "рожден ден",
  "кръщение",
  "моминско парти",
  "фестивал",
  "маркетинг активация",
  "частно парти",
  "бебешко парти",
];

function getStoredEventTypes(): string[] {
  if (globalThis.__POSHTICHKA_EVENT_TYPES__ && globalThis.__POSHTICHKA_EVENT_TYPES__.length > 0) {
    return globalThis.__POSHTICHKA_EVENT_TYPES__;
  }
  const fromFile = readPersistentData<string[]>("event-types", defaultEventTypes);
  globalThis.__POSHTICHKA_EVENT_TYPES__ = fromFile;
  return fromFile;
}

function saveStoredEventTypes(types: string[]): void {
  globalThis.__POSHTICHKA_EVENT_TYPES__ = types;
  writePersistentData("event-types", types);
}

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(url && !url.includes("placeholder") && !url.includes("example"));
}

/**
 * GET: Fetch all saved event types
 */
export async function GET() {
  const current = getStoredEventTypes();

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("event_types")
        .select("name")
        .order("name", { ascending: true });

      if (!error && data && data.length > 0) {
        const types = data.map((d) => d.name).filter(Boolean);
        const combined = Array.from(new Set([...current, ...types]));
        saveStoredEventTypes(combined);
        return NextResponse.json({ types: combined });
      }
    } catch {
      // Fallback
    }
  }

  return NextResponse.json({ types: current });
}

/**
 * POST: Add a new event type
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || !String(name).trim()) {
      return NextResponse.json({ error: "Името е задължително." }, { status: 400 });
    }

    const trimmed = String(name).trim();

    if (isSupabaseConfigured()) {
      try {
        const supabase = await createClient();
        await supabase.from("event_types").insert([{ name: trimmed }]);
      } catch (dbErr) {
        console.warn("Supabase event type insert notice:", dbErr);
      }
    }

    const current = getStoredEventTypes();
    const exists = current.some((t) => t.toLowerCase() === trimmed.toLowerCase());
    const updated = exists ? current : [...current, trimmed];
    saveStoredEventTypes(updated);

    try {
      revalidatePath("/gallery");
      revalidatePath("/");
    } catch {}

    return NextResponse.json({ success: true, types: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Грешка при добавяне.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

/**
 * PUT: Edit / Rename an event type
 */
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { oldName, newName } = body;

    if (!oldName || !newName || !String(newName).trim()) {
      return NextResponse.json({ error: "Невалидни данни за редакция." }, { status: 400 });
    }

    const trimmedNew = String(newName).trim();

    if (isSupabaseConfigured()) {
      try {
        const supabase = await createClient();
        await supabase.from("event_types").update({ name: trimmedNew }).eq("name", oldName);
      } catch (dbErr) {
        console.warn("Supabase event type update notice:", dbErr);
      }
    }

    const current = getStoredEventTypes();
    const updated = current.map((t) => (t === oldName ? trimmedNew : t));
    saveStoredEventTypes(updated);

    try {
      revalidatePath("/gallery");
      revalidatePath("/");
    } catch {}

    return NextResponse.json({ success: true, types: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Грешка при редакция.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

/**
 * DELETE: Delete an event type
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json({ error: "Липсва име за изтриване." }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      try {
        const supabase = await createClient();
        await supabase.from("event_types").delete().eq("name", name);
      } catch (dbErr) {
        console.warn("Supabase event type delete notice:", dbErr);
      }
    }

    const current = getStoredEventTypes();
    const updated = current.filter((t) => t.toLowerCase() !== name.toLowerCase());
    saveStoredEventTypes(updated);

    try {
      revalidatePath("/gallery");
      revalidatePath("/");
    } catch {}

    return NextResponse.json({ success: true, types: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Грешка при изтриване.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
