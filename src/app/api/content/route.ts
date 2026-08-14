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

declare global {
  var __POSHTICHKA_STORE__: Record<string, any> | undefined;
}

export async function GET() {
  const store = globalThis.__POSHTICHKA_STORE__ || {};

  let general = store.general_settings || defaultGeneralSettings;
  let seo = store.seo_settings || defaultSeoSettings;
  let homepage = store.homepage_config ? { ...defaultHomepageConfig, ...store.homepage_config } : defaultHomepageConfig;
  let banners = store.banners || defaultBanners;
  let testimonials = store.testimonials || defaultTestimonials;
  let faq = store.faq_items || defaultFaqs;

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

  return NextResponse.json({
    general,
    seo,
    homepage,
    banners,
    testimonials,
    faq,
  });
}
