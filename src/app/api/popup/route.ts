import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient, getSupabasePublicClient } from "@/lib/supabase";

// Global fallback in-memory store if DB credentials are not initialized
declare global {
  var __POPUP_CONFIG_STORE__: any;
}

const defaultPopupData = {
  id: 1,
  title: "Специална Сватбена Оферта",
  badge: "Промоция",
  description: "Запазете вашата дата за сватба или събитие с отстъпка за ранни запитвания.",
  ctaText: "Проверете наличност",
  ctaUrl: "/booking",
  imageUrl: "",
  isActive: true,
};

if (!globalThis.__POPUP_CONFIG_STORE__) {
  globalThis.__POPUP_CONFIG_STORE__ = defaultPopupData;
}

export async function GET() {
  try {
    const supabase = getSupabasePublicClient();
    const { data, error } = await supabase
      .from("popup_config")
      .select("*")
      .eq("id", 1)
      .single();

    if (!error && data) {
      const formatted = {
        id: data.id,
        title: data.title,
        badge: data.badge,
        description: data.description,
        ctaText: data.cta_text || data.ctaText || defaultPopupData.ctaText,
        ctaUrl: data.cta_url || data.ctaUrl || defaultPopupData.ctaUrl,
        imageUrl: data.image_url || data.imageUrl || "",
        isActive: typeof data.is_active === "boolean" ? data.is_active : (data.isActive ?? true),
      };
      globalThis.__POPUP_CONFIG_STORE__ = formatted;
      return NextResponse.json(formatted);
    }
  } catch (err) {
    console.warn("Supabase popup fetch fallback:", err);
  }

  return NextResponse.json(globalThis.__POPUP_CONFIG_STORE__ || defaultPopupData);
}

export async function POST(request: Request) {
  return handleUpdate(request);
}

export async function PUT(request: Request) {
  return handleUpdate(request);
}

async function handleUpdate(request: Request) {
  try {
    const body = await request.json();
    
    // Normalize payload to handle camelCase or snake_case
    const payload = {
      id: 1,
      title: body.title || defaultPopupData.title,
      badge: body.badge || defaultPopupData.badge,
      description: body.description || defaultPopupData.description,
      cta_text: body.ctaText || body.cta_text || defaultPopupData.ctaText,
      cta_url: body.ctaUrl || body.cta_url || defaultPopupData.ctaUrl,
      image_url: body.imageUrl || body.image_url || "",
      is_active: typeof body.isActive === "boolean" ? body.isActive : (body.is_active ?? true),
      updated_at: new Date().toISOString(),
    };

    // 1. Update in-memory fallback store
    globalThis.__POPUP_CONFIG_STORE__ = {
      id: 1,
      title: payload.title,
      badge: payload.badge,
      description: payload.description,
      ctaText: payload.cta_text,
      ctaUrl: payload.cta_url,
      imageUrl: payload.image_url,
      isActive: payload.is_active,
    };

    // 2. Persist to Supabase database using Service Role Admin client
    try {
      const supabaseAdmin = getSupabaseAdminClient();
      const { error } = await supabaseAdmin
        .from("popup_config")
        .upsert(payload, { onConflict: "id" });

      if (error) {
        console.warn("Supabase popup upsert warning:", error.message);
      }
    } catch (dbErr) {
      console.warn("Database popup save notice:", dbErr);
    }

    // 3. CRITICAL: Purge Next.js Cache so frontend updates immediately
    revalidatePath("/", "layout");

    return NextResponse.json({
      success: true,
      message: "Попъп настройките бяха запазени успешно и сайтът бе обновен!",
      data: globalThis.__POPUP_CONFIG_STORE__,
    });
  } catch (err) {
    console.error("Popup update error:", err);
    return NextResponse.json(
      { error: "Грешка при запазване на попъп настройките." },
      { status: 500 }
    );
  }
}
