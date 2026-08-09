import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  defaultGeneralSettings,
  defaultSeoSettings,
  defaultHomepageConfig,
  defaultPopups,
  defaultBanners,
  defaultTestimonials,
} from "@/lib/content-store";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: settingsData } = await supabase.from("settings").select("*");

    let general = defaultGeneralSettings;
    let seo = defaultSeoSettings;
    let homepage = defaultHomepageConfig;
    let popups = defaultPopups;
    let banners = defaultBanners;
    let testimonials = defaultTestimonials;

    if (settingsData && settingsData.length > 0) {
      settingsData.forEach((item) => {
        if (item.key === "general_settings") general = item.value;
        if (item.key === "seo_settings") seo = item.value;
        if (item.key === "homepage_config") homepage = item.value;
        if (item.key === "popups") popups = item.value;
        if (item.key === "banners") banners = item.value;
        if (item.key === "testimonials") testimonials = item.value;
      });
    }

    return NextResponse.json({
      general,
      seo,
      homepage,
      popups,
      banners,
      testimonials,
    });
  } catch {
    return NextResponse.json({
      general: defaultGeneralSettings,
      seo: defaultSeoSettings,
      homepage: defaultHomepageConfig,
      popups: defaultPopups,
      banners: defaultBanners,
      testimonials: defaultTestimonials,
    });
  }
}

