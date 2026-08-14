import { NextResponse, NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

let mockEventTypes: string[] = [
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

    if (error || !data || data.length === 0) {
      return NextResponse.json({ types: mockEventTypes });
    }

    const types = data.map((d) => d.name).filter(Boolean);
    return NextResponse.json({ types: Array.from(new Set([...mockEventTypes, ...types])) });
  } catch {
    return NextResponse.json({ types: mockEventTypes });
  }
}

/**
 * POST: Add a new event type
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Името е задължително." }, { status: 400 });
    }

    const trimmed = name.trim();

    if (!mockEventTypes.some((t) => t.toLowerCase() === trimmed.toLowerCase())) {
      mockEventTypes = [...mockEventTypes, trimmed];
    }

    try {
      const supabase = await createClient();
      await supabase.from("event_types").insert([{ name: trimmed }]);
    } catch {
      // Fallback
    }

    try {
      revalidatePath("/gallery");
    } catch {}

    return NextResponse.json({ success: true, types: mockEventTypes });
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

    if (!oldName || !newName || !newName.trim()) {
      return NextResponse.json({ error: "Невалидни данни за редакция." }, { status: 400 });
    }

    const trimmedNew = newName.trim();

    mockEventTypes = mockEventTypes.map((t) => (t === oldName ? trimmedNew : t));

    try {
      const supabase = await createClient();
      await supabase.from("event_types").update({ name: trimmedNew }).eq("name", oldName);
    } catch {
      // Fallback
    }

    try {
      revalidatePath("/gallery");
    } catch {}

    return NextResponse.json({ success: true, types: mockEventTypes });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Грешка при редакция.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

/**
 * DELETE: Delete an event type option
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json({ error: "Липсва име за изтриване." }, { status: 400 });
    }

    mockEventTypes = mockEventTypes.filter((t) => t.toLowerCase() !== name.toLowerCase());

    try {
      const supabase = await createClient();
      await supabase.from("event_types").delete().eq("name", name);
    } catch {
      // Fallback
    }

    try {
      revalidatePath("/gallery");
    } catch {}

    return NextResponse.json({ success: true, types: mockEventTypes });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Грешка при изтриване.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
