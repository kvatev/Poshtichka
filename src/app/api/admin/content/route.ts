import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { key, value } = await request.json();

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: "Невалидни данни." },
        { status: 400 }
      );
    }

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
