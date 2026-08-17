import { NextResponse } from "next/server";
import {
  defaultGeneralSettings,
  defaultSeoSettings,
  defaultHomepageConfig,
  defaultTestimonials,
  defaultFaqs,
} from "@/lib/content-store";
import { readCloudOrFileData } from "@/lib/server-storage";

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

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const store = await readCloudOrFileData<Record<string, any>>(
    "content-store",
    defaultContentStore
  );
  globalThis.__POSHTICHKA_STORE__ = store;

  const general = store.general_settings || defaultGeneralSettings;
  const seo = store.seo_settings || defaultSeoSettings;
  const homepage = store.homepage_config
    ? { ...defaultHomepageConfig, ...store.homepage_config }
    : defaultHomepageConfig;
  const testimonials = store.testimonials || defaultTestimonials;
  const faq = store.faq_items || defaultFaqs;
  const pricing_settings = store.pricing_settings || {
    price70: "330",
    price100: "350",
    price150: "380",
    rentalPrice: "350",
    designPrice: "50",
    freeDistance: "50",
    ratePerKm: "0.23",
  };

  return NextResponse.json(
    {
      general,
      seo,
      homepage,
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
