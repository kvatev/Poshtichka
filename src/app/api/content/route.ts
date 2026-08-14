import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  defaultGeneralSettings,
  defaultSeoSettings,
  defaultHomepageConfig,
  defaultBanners,
  defaultTestimonials,
  defaultFaqs,
} from "@/lib/content-store";
import { readPersistentData } from "@/lib/server-storage";

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

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(url && !url.includes("placeholder") && !url.includes("example"));
}

export async function GET() {
  if (!globalThis.__POSHTICHKA_STORE__ || Object.keys(globalThis.__POSHTICHKA_STORE__).length === 0) {
    globalThis.__POSHTICHKA_STORE__ = readPersistentData<Record<string, any>>(
      "content-store",
      defaultContentStore
    );
  }

  const store = globalThis.__POSHTICHKA_STORE__ || defaultContentStore;

  let general = store.general_settings || defaultGeneralSettings;
  let seo = store.seo_settings || defaultSeoSettings;
  let homepage = store.homepage_config
    ? { ...defaultHomepageConfig, ...store.homepage_config }
    : defaultHomepageConfig;
  let banners = store.banners || defaultBanners;
  let testimonials = store.testimonials || defaultTestimonials;
  let faq = store.faq_items || defaultFaqs;

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data: settingsData } = await supabase.from("settings").select("*");

      if (settingsData && settingsData.length > 0) {
        settingsData.forEach((item) => {
          if (item.key === "general_settings") general = { ...general, ...item.value };
          if (item.key === "seo_settings") seo = { ...seo, ...item.value };
          if (item.key === "homepage_config") homepage = { ...homepage, ...item.value };
          if (item.key === "banners") banners = item.value;
          if (item.key === "testimonials") testimonials = item.value;
          if (item.key === "faq_items") faq = item.value;
        });
      }
    } catch (err) {
      console.warn("API Content DB fetch note:", err);
    }
  }

  return NextResponse.json({
    general,
    seo,
    homepage,
    banners,
    testimonials,
    faq,
  });
}
