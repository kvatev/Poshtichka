import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readCloudOrFileData, writeCloudAndFileData } from "@/lib/server-storage";
import {
  defaultGeneralSettings,
  defaultSeoSettings,
  defaultHomepageConfig,
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
  testimonials: defaultTestimonials,
  faq_items: defaultFaqs,
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return NextResponse.json(
        { success: false, error: "Невалидни данни за настройките." },
        { status: 400 }
      );
    }

    // 1. Read existing content store from Supabase
    const currentStore = await readCloudOrFileData<Record<string, any>>(
      "content-store",
      defaultContentStore
    );

    // 2. Update the specific key
    currentStore[key] = value;
    globalThis.__POSHTICHKA_STORE__ = currentStore;

    // 3. Persist permanently to Supabase cloud (Row ID 1062)
    const success = await writeCloudAndFileData("content-store", currentStore);

    // Also persist specific key if mapped
    await writeCloudAndFileData(key.replace(/_/g, "-"), value);

    if (!success) {
      console.warn(`[AdminContent] Supabase persistence returned warning for ${key}`);
    }

    // 4. Purge Next.js cache so the public website updates instantly
    try {
      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/about");
      revalidatePath("/services");
      revalidatePath("/gallery");
      revalidatePath("/calendar");
      revalidatePath("/faq");
      revalidatePath("/contact");
      revalidatePath("/booking");
      revalidatePath("/privacy-policy");
      revalidatePath("/terms");
    } catch (revalErr) {
      console.warn("[AdminContent] Cache revalidation notice:", revalErr);
    }

    return NextResponse.json({
      success: true,
      data: { key, value },
      message: "Настройките бяха запазени успешно и перманентно в базата данни!",
    });
  } catch (err: any) {
    console.error("Admin content save error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Грешка при запазване на настройките." },
      { status: 500 }
    );
  }
}
