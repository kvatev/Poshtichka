import { NextResponse, NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { readCloudOrFileData, writeCloudAndFileData } from "@/lib/server-storage";
import { createClient } from "@/lib/supabase/server";

declare global {
  // eslint-disable-next-line no-var
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

async function getStoredEventTypes(): Promise<string[]> {
  return await readCloudOrFileData<string[]>("event-types", defaultEventTypes);
}

async function saveStoredEventTypes(types: string[]): Promise<void> {
  globalThis.__POSHTICHKA_EVENT_TYPES__ = types;
  await writeCloudAndFileData("event-types", types);
}

/**
 * GET: Fetch all saved event types
 */
export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("event_types")
      .select("name")
      .order("name", { ascending: true });

    if (!error && data && data.length > 0) {
      const types = data.map((d) => d.name).filter(Boolean);
      const current = await getStoredEventTypes();
      const combined = Array.from(new Set([...current, ...types]));
      await saveStoredEventTypes(combined);
      return NextResponse.json({ types: combined });
    }
  } catch {}

  const current = await getStoredEventTypes();
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

    try {
      const supabase = await createClient();
      await supabase.from("event_types").insert([{ name: trimmed }]);
    } catch {}

    const current = await getStoredEventTypes();
    const exists = current.some((t) => t.toLowerCase() === trimmed.toLowerCase());
    const updated = exists ? current : [...current, trimmed];
    await saveStoredEventTypes(updated);

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

    try {
      const supabase = await createClient();
      await supabase.from("event_types").update({ name: trimmedNew }).eq("name", oldName);
    } catch {}

    const current = await getStoredEventTypes();
    const updated = current.map((t) => (t === oldName ? trimmedNew : t));
    await saveStoredEventTypes(updated);

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

    try {
      const supabase = await createClient();
      await supabase.from("event_types").delete().eq("name", name);
    } catch {}

    const current = await getStoredEventTypes();
    const updated = current.filter((t) => t.toLowerCase() !== name.toLowerCase());
    await saveStoredEventTypes(updated);

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
