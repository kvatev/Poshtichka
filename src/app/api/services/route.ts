import { NextResponse, NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { readPersistentData, writePersistentData } from "@/lib/server-storage";

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  badgeAsset?: string;
}

declare global {
  var __POSHTICHKA_SERVICES__: ServiceItem[] | undefined;
}

const initialServices: ServiceItem[] = [
  {
    id: "SRV-01",
    title: "ВЕНДИНГ МАШИНА",
    subtitle: "подходящо за сватбено тържество, кръщение, юбилей, корпоративно събитие",
    description:
      "Подарете на гостите си момент на радост и изненада. Дизайните се изготвят по идея на клиента, съобразно цветовата гама на събитието.",
    features: [
      "НАЕМ НА ВЕНДНИГ МАШИНА ЗА КОНКРЕТНИ ЧАСОВЕ",
      "БУРКАН СЪС ЖЕТОНИ, СПРЯМО ГОСТИТЕ НА СЪБИТИЕТО",
      "ДИЗАЙН НА 4 ВИДА ИЛЮСТРАЦИИ, КАКТО И ЗА ПОСТЕРИТЕ",
      "ПЕЧАТ + СТАНДАРТНИ/ПЕРСОНАЛИЗИРАНИ КАРТОНЧЕТА",
      "2-МА СЛУЖИТЕЛИ ЗА СЪДЕЙСТВИЕ НА ГОСТИТЕ И МОНТАЖ",
    ],
    image: "/media/gallery/Tezza_2025_07_13_155326413.webp",
    badgeAsset: "/media/Услуги/Asset 88@2x.png",
  },
  {
    id: "SRV-02",
    title: "ТАБЛО С МАРКИ И КАРТИЧКИ",
    subtitle: "подходящо за сватбено тържество, юбилей, частни партита",
    description:
      "Елегантен кът с авторски марки, пликове за спомени и възможност за пожелания от вашите близки.",
    features: [
      "АВТОРСКО ТАБЛО С МАРКИ И ДИЗАЙН ПО ИЗБОР",
      "ПЕРСОНАЛИЗИРАНИ ПЛИКОВЕ ЗА СПОМЕНИ ЗА ВСЕКИ ГОСТ",
      "ДАРСТВЕНИ КАРТИЧКИ С БЛАГОДАРСТВЕНИ ПОСЛАНИЯ",
      "ДЕКОРАТИВЕН СТАНОК И МОНТАЖ НА МЯСТО НА СЪБИТИЕТО",
    ],
    image: "/media/gallery/Tezza_2025_07_13_155324686.webp",
    badgeAsset: "/media/Услуги/Asset 89@2x.png",
  },
  {
    id: "SRV-03",
    title: "ВРЕМЕННИ ТАТУИРОВКИ",
    subtitle: "подходящо за рождени дни, сватби, фестивали и партита",
    description:
      "Забавна интерактивна станция с уникални временни татуировки по ваш собствен мотив или илюстрация.",
    features: [
      "АВТОРСКИ ДИЗАЙНИ НА ТАТУИРОВКИ С ИНИЦИАЛИ ИЛИ ЛОГО",
      "БЕЗОПАСНИ И ВОДОУСТОЙЧИВИ МАТЕРИАЛИ ЗА ГОСТИТЕ",
      "ИНТЕРАКТИВЕН КЪТ С ИНСТРУКЦИИ И АКСЕСОАРИ",
      "ПЪЛНА КООРДИНАЦИЯ И СЪДЕЙСТВИЕ ОТ ЕКИПА",
    ],
    image: "/media/gallery/Tezza_2025_07_13_155331795.webp",
    badgeAsset: "/media/Услуги/Asset 90@2x.png",
  },
];

function getStoredServices(): ServiceItem[] {
  if (globalThis.__POSHTICHKA_SERVICES__ && globalThis.__POSHTICHKA_SERVICES__.length > 0) {
    return globalThis.__POSHTICHKA_SERVICES__;
  }
  const fromFile = readPersistentData<ServiceItem[]>("services", initialServices);
  globalThis.__POSHTICHKA_SERVICES__ = fromFile;
  return fromFile;
}

function saveStoredServices(services: ServiceItem[]): void {
  globalThis.__POSHTICHKA_SERVICES__ = services;
  writePersistentData("services", services);
}

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(url && !url.includes("placeholder") && !url.includes("example"));
}

/**
 * GET: Fetch services list
 */
export async function GET() {
  const current = getStoredServices();

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data: dbServices, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error && dbServices && dbServices.length > 0) {
        const formatted: ServiceItem[] = dbServices.map((s) => ({
          id: s.id,
          title: s.title,
          subtitle: s.subtitle || "",
          description: s.description || "",
          features: Array.isArray(s.features) ? s.features : [],
          image: s.image || "/media/gallery/Tezza_2025_07_13_155326413.webp",
          badgeAsset: s.badge_asset || "",
        }));

        saveStoredServices(formatted);
        return NextResponse.json({ services: formatted });
      }
    } catch {
      // Fallback
    }
  }

  return NextResponse.json({ services: current });
}

/**
 * POST: Create a new service
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, subtitle, description, features, image, badgeAsset } = body;

    if (!title) {
      return NextResponse.json({ error: "Заглавието е задължително." }, { status: 400 });
    }

    const newService: ServiceItem = {
      id: `SRV-${Date.now()}`,
      title: String(title).trim(),
      subtitle: subtitle ? String(subtitle).trim() : "",
      description: description ? String(description).trim() : "",
      features: Array.isArray(features) ? features : [],
      image: image || "/media/gallery/Tezza_2025_07_13_155326413.webp",
      badgeAsset: badgeAsset || "/media/Услуги/Asset 88@2x.png",
    };

    if (isSupabaseConfigured()) {
      try {
        const supabase = await createClient();
        const { data, error } = await supabase
          .from("services")
          .insert([
            {
              title: newService.title,
              subtitle: newService.subtitle,
              description: newService.description,
              features: newService.features,
              image: newService.image,
              badge_asset: newService.badgeAsset,
            },
          ])
          .select()
          .single();

        if (!error && data) {
          newService.id = data.id;
        }
      } catch (dbErr) {
        console.warn("Supabase service insert notice:", dbErr);
      }
    }

    const current = getStoredServices();
    const updated = [...current, newService];
    saveStoredServices(updated);

    try {
      revalidatePath("/services");
      revalidatePath("/");
    } catch {}

    return NextResponse.json({ success: true, service: newService });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Грешка при създаване на услуга.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

/**
 * PUT: Update an existing service
 */
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, subtitle, description, features, image, badgeAsset } = body;

    if (!id) {
      return NextResponse.json({ error: "Липсва ИД на услугата за редакция." }, { status: 400 });
    }

    let updatedService: ServiceItem | null = null;

    if (isSupabaseConfigured()) {
      try {
        const supabase = await createClient();
        const { data, error } = await supabase
          .from("services")
          .update({
            title,
            subtitle,
            description,
            features: Array.isArray(features) ? features : [],
            image,
            badge_asset: badgeAsset,
          })
          .eq("id", id)
          .select()
          .single();

        if (!error && data) {
          updatedService = {
            id: data.id,
            title: data.title,
            subtitle: data.subtitle,
            description: data.description,
            features: data.features || [],
            image: data.image,
            badgeAsset: data.badge_asset,
          };
        }
      } catch (dbErr) {
        console.warn("Supabase service update notice:", dbErr);
      }
    }

    const current = getStoredServices();
    const updated = current.map((s) => {
      if (s.id === id) {
        return {
          ...s,
          title: title ?? s.title,
          subtitle: subtitle ?? s.subtitle,
          description: description ?? s.description,
          features: Array.isArray(features) ? features : s.features,
          image: image ?? s.image,
          badgeAsset: badgeAsset ?? s.badgeAsset,
        };
      }
      return s;
    });

    saveStoredServices(updated);

    try {
      revalidatePath("/services");
      revalidatePath("/");
    } catch {}

    return NextResponse.json({
      success: true,
      service: updatedService || updated.find((s) => s.id === id),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Грешка при редакция на услугата.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

/**
 * DELETE: Delete a service
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Липсва ИД за изтриване." }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      try {
        const supabase = await createClient();
        await supabase.from("services").delete().eq("id", id);
      } catch (dbErr) {
        console.warn("Supabase service delete notice:", dbErr);
      }
    }

    const current = getStoredServices();
    const updated = current.filter((s) => s.id !== id);
    saveStoredServices(updated);

    try {
      revalidatePath("/services");
      revalidatePath("/");
    } catch {}

    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Грешка при изтриване на услугата.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
