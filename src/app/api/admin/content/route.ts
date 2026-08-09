import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// Server-side in-memory cache for ultra-fast instant updates
declare global {
  var __POSHTICHKA_STORE__: Record<string, any> | undefined;
}

if (!globalThis.__POSHTICHKA_STORE__) {
  globalThis.__POSHTICHKA_STORE__ = {};
}

export async function POST(request: Request) {
  try {
    const { key, value } = await request.json();

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: "Невалидни данни." },
        { status: 400 }
      );
    }

    // Save to global in-memory store
    if (!globalThis.__POSHTICHKA_STORE__) {
      globalThis.__POSHTICHKA_STORE__ = {};
    }
    globalThis.__POSHTICHKA_STORE__[key] = value;

    try {
      const supabase = await createClient();
      const { error } = await supabase
        .from("settings")
        .upsert({ key, value, updated_at: new Date().toISOString() });

      if (error) {
        console.warn("Supabase settings upsert note:", error.message);
      }
    } catch (dbErr) {
      console.warn("Database save notice:", dbErr);
    }

    // Purge Next.js cache so the public website updates instantly
    try {
      revalidatePath("/", "layout");
    } catch {}

    return NextResponse.json({
      success: true,
      message: "Настройките бяха запазени успешно!",
      key,
      value,
    });
  } catch (err) {
    console.error("Admin content save error:", err);
    return NextResponse.json(
      { error: "Грешка при запазване на настройките." },
      { status: 500 }
    );
  }
}
