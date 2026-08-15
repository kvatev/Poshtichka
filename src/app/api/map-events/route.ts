import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readCloudOrFileData, writeCloudAndFileData } from "@/lib/server-storage";
import { createClient } from "@/lib/supabase/server";

export interface EventLocation {
  id: string;
  eventName: string;
  cityName: string;
  venueName?: string;
  eventType?: string;
  latitude: number;
  longitude: number;
  coverImage: string;
  galleryImages: string[];
  description?: string;
  eventDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

declare global {
  // eslint-disable-next-line no-var
  var __POSHTICHKA_MAP_EVENTS__: EventLocation[] | undefined;
}

const initialMapEvents: EventLocation[] = [
  {
    id: "MAP-02",
    eventName: "МАРТИНА И АЛЕКСАНДЪР",
    cityName: "Каварна",
    venueName: "Thracian Cliffs Resort",
    eventType: "сватбено тържество",
    latitude: 43.4358,
    longitude: 28.3392,
    coverImage: "/media/gallery/Tezza_2025_07_13_155324686.webp",
    galleryImages: [
      "/media/gallery/Tezza_2025_07_13_155324686.webp",
      "/media/gallery/Tezza_2025_07_13_155326413.webp",
      "/media/gallery/Tezza_2025_07_13_155331795.webp",
    ],
    description: "Сватбено тържество с гледка към скалите на Каварна.",
    eventDate: "2026-08-20",
    createdAt: new Date().toISOString(),
  },
  {
    id: "MAP-03",
    eventName: "ЕЛЕНА И ВИКТОР",
    cityName: "София",
    venueName: "Резиденция Бояна",
    eventType: "сватбено тържество",
    latitude: 42.6977,
    longitude: 23.3219,
    coverImage: "/media/gallery/Tezza_2025_07_13_155326413.webp",
    galleryImages: [
      "/media/gallery/Tezza_2025_07_13_155326413.webp",
      "/media/gallery/Tezza_2025_07_13_155331795.webp",
      "/media/gallery/Tezza_2025_07_13_155333570.webp",
    ],
    description: "Стилно тържество в полите на Витоша.",
    eventDate: "2026-07-28",
    createdAt: new Date().toISOString(),
  },
  {
    id: "MAP-04",
    eventName: "КАЛИНА И ИВАЙЛО",
    cityName: "Червен",
    venueName: "Комплекс Червен",
    eventType: "сватбено тържество",
    latitude: 43.6192,
    longitude: 25.9758,
    coverImage: "/media/gallery/Tezza_2025_07_13_155331795.webp",
    galleryImages: [
      "/media/gallery/Tezza_2025_07_13_155331795.webp",
      "/media/gallery/Tezza_2025_07_07_152559638_1.webp",
    ],
    description: "Рустик сватбено тържество сред природата.",
    eventDate: "2026-07-12",
    createdAt: new Date().toISOString(),
  },
  {
    id: "MAP-05",
    eventName: "АНА И БОРИС",
    cityName: "Перущица",
    venueName: "Вила Юстина",
    eventType: "сватбено тържество",
    latitude: 42.0544,
    longitude: 24.5447,
    coverImage: "/media/gallery/Tezza_2025_07_07_152559638_1.webp",
    galleryImages: [
      "/media/gallery/Tezza_2025_07_07_152559638_1.webp",
      "/media/gallery/Tezza_2025_07_13_155333570.webp",
    ],
    description: "Винен празник и романтика в полите на Родопите.",
    eventDate: "2026-06-25",
    createdAt: new Date().toISOString(),
  },
  {
    id: "MAP-06",
    eventName: "ДИАНА И КРИСТИЯН",
    cityName: "Велико Търново",
    venueName: "Царевец Панорама",
    eventType: "сватбено тържество",
    latitude: 43.0757,
    longitude: 25.6172,
    coverImage: "/media/gallery/Tezza_2025_07_13_155333570.webp",
    galleryImages: [
      "/media/gallery/Tezza_2025_07_13_155333570.webp",
      "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
    ],
    description: "Вълшебно празненство в старата българска столица.",
    eventDate: "2026-06-08",
    createdAt: new Date().toISOString(),
  },
  {
    id: "MAP-07",
    eventName: "DEVTECH ANNUAL SUMMIT",
    cityName: "Бургас",
    venueName: "Flora Expo Center",
    eventType: "корпоративно събитие",
    latitude: 42.5048,
    longitude: 27.4626,
    coverImage: "/media/gallery/Tezza_2025_07_07_152559638_1.webp",
    galleryImages: [
      "/media/gallery/Tezza_2025_07_07_152559638_1.webp",
      "/media/gallery/Tezza_2025_07_13_155333570.webp",
    ],
    description: "Корпоративен брандинг и персонализирани подаръци за 200+ гости.",
    eventDate: "2026-08-22",
    createdAt: new Date().toISOString(),
  },
  {
    id: "MAP-08",
    eventName: "ЮБИЛЕЙ 50Г - WAVE RESORT",
    cityName: "Поморие",
    venueName: "Wave Resort",
    eventType: "рожден ден",
    latitude: 42.5583,
    longitude: 27.6444,
    coverImage: "/media/gallery/Tezza_2025_07_13_155331795.webp",
    galleryImages: [
      "/media/gallery/Tezza_2025_07_13_155331795.webp",
      "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
    ],
    description: "Стилен юбилей с авторски картички и сувенири.",
    eventDate: "2026-08-28",
    createdAt: new Date().toISOString(),
  },
  {
    id: "MAP-09",
    eventName: "ВИКТОРИЯ И ВАСИЛ",
    cityName: "София",
    venueName: "Pasarel Lake Club",
    eventType: "сватбено тържество",
    latitude: 42.5412,
    longitude: 23.5012,
    coverImage: "/media/gallery/Tezza_2025_07_13_155324686.webp",
    galleryImages: [
      "/media/gallery/Tezza_2025_07_13_155324686.webp",
      "/media/gallery/Tezza_2025_07_13_155326413.webp",
    ],
    description: "Романтично празненство в Pasarel Lake Club.",
    eventDate: "2026-09-15",
    createdAt: new Date().toISOString(),
  },
];

async function getStoredEvents(): Promise<EventLocation[]> {
  return await readCloudOrFileData<EventLocation[]>("map-events", initialMapEvents);
}

async function saveStoredEvents(events: EventLocation[]): Promise<void> {
  globalThis.__POSHTICHKA_MAP_EVENTS__ = events;
  await writeCloudAndFileData("map-events", events);
}

/**
 * GET: Fetch all map events
 */
export async function GET() {
  // First try native map_events table
  try {
    const supabase = await createClient();
    const { data: dbEvents, error } = await supabase
      .from("map_events")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && dbEvents && dbEvents.length > 0) {
      const formattedEvents: EventLocation[] = dbEvents.map((item) => ({
        id: item.id,
        eventName: item.event_name || "",
        cityName: item.city_name,
        venueName: item.venue_name || "",
        eventType: item.event_type || "",
        latitude: Number(item.latitude),
        longitude: Number(item.longitude),
        coverImage: item.cover_image || "",
        galleryImages: Array.isArray(item.gallery_images) ? item.gallery_images : [],
        description: item.description || "",
        eventDate: item.event_date || "",
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));

      await saveStoredEvents(formattedEvents);
      return NextResponse.json({ events: formattedEvents, source: "database" });
    }
  } catch {}

  // Cloud store priority
  const currentEvents = await getStoredEvents();
  return NextResponse.json({ events: currentEvents, source: "cloud" });
}

/**
 * POST: Create a new map event location
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      eventName,
      cityName,
      venueName,
      eventType,
      latitude,
      longitude,
      coverImage,
      galleryImages,
      description,
      eventDate,
    } = body;

    if (!cityName || latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { error: "Моля, изберете град и валидни координати на картата." },
        { status: 400 }
      );
    }

    const finalEventName = eventName ? String(eventName).trim() : "";
    const finalVenueName = venueName ? String(venueName).trim() : "";
    const finalEventType = eventType ? String(eventType).trim() : "";
    const finalCoverImage = coverImage ? String(coverImage).trim() : "";
    const finalGalleryImages = Array.isArray(galleryImages) ? galleryImages : [];

    const newEvent: EventLocation = {
      id: `MAP-${Date.now()}`,
      eventName: finalEventName,
      cityName: String(cityName).trim(),
      venueName: finalVenueName,
      eventType: finalEventType,
      latitude: Number(latitude),
      longitude: Number(longitude),
      coverImage: finalCoverImage || "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
      galleryImages: finalGalleryImages.length > 0 ? finalGalleryImages : [finalCoverImage],
      description: description ? String(description).trim() : "",
      eventDate: eventDate || new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    };

    // Try insert into native Supabase table if exists
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("map_events")
        .insert([
          {
            event_name: finalEventName,
            city_name: newEvent.cityName,
            venue_name: finalVenueName,
            event_type: finalEventType,
            latitude: Number(latitude),
            longitude: Number(longitude),
            cover_image: newEvent.coverImage,
            gallery_images: newEvent.galleryImages,
            description: newEvent.description,
            event_date: newEvent.eventDate || null,
          },
        ])
        .select()
        .single();

      if (!error && data) {
        newEvent.id = data.id;
      }
    } catch {}

    const currentList = await getStoredEvents();
    const updatedList = [newEvent, ...currentList.filter((e) => e.id !== newEvent.id)];
    await saveStoredEvents(updatedList);

    try {
      revalidatePath("/gallery");
      revalidatePath("/");
    } catch {}

    return NextResponse.json({ success: true, event: newEvent });
  } catch (err: unknown) {
    console.error("Create event error:", err);
    const msg = err instanceof Error ? err.message : "Грешка при създаване на събитие.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

/**
 * PUT: Update an existing map event
 */
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      eventName,
      cityName,
      venueName,
      eventType,
      latitude,
      longitude,
      coverImage,
      galleryImages,
      description,
      eventDate,
    } = body;

    if (!id) {
      return NextResponse.json({ error: "Липсва ИД на събитието за редакция." }, { status: 400 });
    }

    const finalEventName = eventName !== undefined ? String(eventName) : "";
    const finalVenueName = venueName !== undefined ? String(venueName) : "";
    const finalEventType = eventType !== undefined ? String(eventType) : "";
    const finalCoverImage = coverImage !== undefined ? String(coverImage) : "";
    const finalGalleryImages = Array.isArray(galleryImages) ? galleryImages : [];

    let updatedEvent: EventLocation | null = null;

    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("map_events")
        .update({
          event_name: finalEventName,
          city_name: cityName,
          venue_name: finalVenueName,
          event_type: finalEventType,
          latitude: Number(latitude),
          longitude: Number(longitude),
          cover_image: finalCoverImage,
          gallery_images: finalGalleryImages,
          description: description || "",
          event_date: eventDate || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (!error && data) {
        updatedEvent = {
          id: data.id,
          eventName: data.event_name,
          cityName: data.city_name,
          venueName: data.venue_name,
          eventType: data.event_type,
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
          coverImage: data.cover_image,
          galleryImages: data.gallery_images || [],
          description: data.description,
          eventDate: data.event_date,
        };
      }
    } catch {}

    const currentList = await getStoredEvents();
    const updatedList = currentList.map((ev) => {
      if (ev.id === id) {
        return {
          ...ev,
          eventName: finalEventName,
          cityName: cityName ?? ev.cityName,
          venueName: finalVenueName,
          eventType: finalEventType,
          latitude: latitude !== undefined ? Number(latitude) : ev.latitude,
          longitude: longitude !== undefined ? Number(longitude) : ev.longitude,
          coverImage: finalCoverImage || ev.coverImage,
          galleryImages: finalGalleryImages.length > 0 ? finalGalleryImages : ev.galleryImages,
          description: description ?? ev.description,
          eventDate: eventDate ?? ev.eventDate,
          updatedAt: new Date().toISOString(),
        };
      }
      return ev;
    });

    await saveStoredEvents(updatedList);

    try {
      revalidatePath("/gallery");
      revalidatePath("/");
    } catch {}

    const result = updatedEvent || updatedList.find((e) => e.id === id);
    return NextResponse.json({ success: true, event: result });
  } catch (err: unknown) {
    console.error("Update event error:", err);
    const msg = err instanceof Error ? err.message : "Грешка при редакция на събитие.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

/**
 * DELETE: Delete a map event location
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Липсва ИД за изтриване." }, { status: 400 });
    }

    try {
      const supabase = await createClient();
      await supabase.from("map_events").delete().eq("id", id);
    } catch {}

    const currentList = await getStoredEvents();
    const updatedList = currentList.filter((ev) => ev.id !== id);
    await saveStoredEvents(updatedList);

    try {
      revalidatePath("/gallery");
      revalidatePath("/");
    } catch {}

    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    console.error("Delete event error:", err);
    const msg = err instanceof Error ? err.message : "Грешка при изтриване на локацията.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
