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
import { readCloudOrFileData, writeCloudAndFileData } from "@/lib/server-storage";

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

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const store = await readCloudOrFileData<Record<string, any>>(
    "content-store",
    defaultContentStore
  );
  globalThis.__POSHTICHKA_STORE__ = store;

  let general = store.general_settings || defaultGeneralSettings;
  let seo = store.seo_settings || defaultSeoSettings;
  let homepage = store.homepage_config
    ? { ...defaultHomepageConfig, ...store.homepage_config }
    : defaultHomepageConfig;
  let banners = store.banners || defaultBanners;
  let testimonials = store.testimonials || defaultTestimonials;
  let faq = store.faq_items || defaultFaqs;
  let pricing_settings = store.pricing_settings || {
    price70: "330",
    price100: "350",
    price150: "380",
    rentalPrice: "350",
    designPrice: "50",
    freeDistance: "50",
    ratePerKm: "0.23",
  };

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
        if (item.key === "pricing_settings") pricing_settings = { ...pricing_settings, ...item.value };
      });
    }
  } catch {}

  return NextResponse.json(
    {
      general,
      seo,
      homepage,
      banners,
      testimonials,
      faq,
      pricing_settings,
      pricing: pricing_settings,
      website_content: store.website_content,
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        "CDN-Cache-Control": "no-store",
      },
    }
  );
}
