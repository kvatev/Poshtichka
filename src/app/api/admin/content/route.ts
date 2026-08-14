import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { readPersistentData, writePersistentData } from "@/lib/server-storage";
import {
  defaultGeneralSettings,
  defaultSeoSettings,
  defaultHomepageConfig,
  defaultBanners,
  defaultTestimonials,
  defaultFaqs,
} from "@/lib/content-store";

declare global {
  var __POSHTICHKA_STORE__: Record<string, any> | undefined;
}

const defaultContentStore: Record<string, any> = {
  general_settings: defaultGeneralSettings,
  seo_settings: defaultSeoSettings,
  homepage_config: defaultHomepageConfig,
  banners: defaultBanners,
  testimonials: defaultTestimonials,
  faq_items: defaultFaqs,
};

function getStoredContent(): Record<string, any> {
  if (globalThis.__POSHTICHKA_STORE__ && Object.keys(globalThis.__POSHTICHKA_STORE__).length > 0) {
    return globalThis.__POSHTICHKA_STORE__;
  }
  const fromFile = readPersistentData<Record<string, any>>("content-store", defaultContentStore);
  globalThis.__POSHTICHKA_STORE__ = fromFile;
  return fromFile;
}

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(url && !url.includes("placeholder") && !url.includes("example"));
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

    const currentStore = getStoredContent();
    currentStore[key] = value;
    globalThis.__POSHTICHKA_STORE__ = currentStore;

    // Persist permanently to disk
    writePersistentData("content-store", currentStore);

    if (isSupabaseConfigured()) {
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
    }

    // Purge Next.js cache so the public website updates instantly
    try {
      revalidatePath("/", "layout");
      revalidatePath("/faq");
      revalidatePath("/about");
      revalidatePath("/contact");
    } catch {}

    return NextResponse.json({
      success: true,
      message: "Настройките бяха запазени успешно и перманентно!",
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
