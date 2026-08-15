import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { readCloudOrFileData, writeCloudAndFileData } from "@/lib/server-storage";
import {
  defaultGeneralSettings,
  defaultSeoSettings,
  defaultHomepageConfig,
  defaultBanners,
  defaultTestimonials,
  defaultFaqs,
} from "@/lib/content-store";

declare global {
  // eslint-disable-next-line no-var
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

export async function POST(request: Request) {
  try {
    const { key, value } = await request.json();

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: "Невалидни данни." },
        { status: 400 }
      );
    }

    const currentStore = await readCloudOrFileData<Record<string, any>>(
      "content-store",
      defaultContentStore
    );
    currentStore[key] = value;
    globalThis.__POSHTICHKA_STORE__ = currentStore;

    // Persist permanently to Supabase cloud + disk
    await writeCloudAndFileData("content-store", currentStore);

    try {
      const supabase = await createClient();
      await supabase
        .from("settings")
        .upsert({ key, value, updated_at: new Date().toISOString() });
    } catch {}

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
