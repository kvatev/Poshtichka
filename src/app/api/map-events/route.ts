import { NextResponse, NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { EventLocation } from "@/types/map-event";
import { readPersistentData, writePersistentData } from "@/lib/server-storage";

// Global in-memory store to guarantee persistence across requests & hot reloads
declare global {
  var __POSHTICHKA_MAP_EVENTS__: EventLocation[] | undefined;
}

const initialMapEvents: EventLocation[] = [
  {
    id: "MAP-01",
    eventName: "ГЕРИ И КРАСИ",
    cityName: "Созопол",
    venueName: "Комплекс Свети Тома",
    eventType: "сватбено тържество",
    latitude: 42.4175,
    longitude: 27.6958,
    coverImage: "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
    galleryImages: [
      "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
      "/media/gallery/Tezza_2025_07_13_155324686.webp",
      "/media/gallery/Tezza_2025_07_13_155326413.webp",
    ],
    description:
      "За сватбения ден на Гери и Краси изготвихме 2 марки, стикер и татуировка. Младоженците искаха ключови локации, домашния си любимец и тях самите въплатени в дизайните. Машината се изпразни още на първия час от сватбения ден!",
    eventDate: "2026-07-15",
    createdAt: new Date().toISOString(),
  },
  {
    id: "MAP-02",
    eventName: "МИЛКА И АНДРЕЙ",
    cityName: "София",
    venueName: "Голф клуб Св. София",
    eventType: "сватбено тържество",
    latitude: 42.6977,
    longitude: 23.3219,
    coverImage: "/media/gallery/Tezza_2025_07_13_155331795.webp",
    galleryImages: [
      "/media/gallery/Tezza_2025_07_13_155331795.webp",
      "/media/gallery/Tezza_2025_07_13_155333570.webp",
      "/media/gallery/Tezza_2025_07_07_152559638_1.webp",
    ],
    description: "Незабравима сватба в Голф клуб Св. София с персонализирани спомени.",
    eventDate: "2026-06-20",
    createdAt: new Date().toISOString(),
  },
  {
    id: "MAP-03",
    eventName: "СВЕТЛИН",
    cityName: "Велико Търново",
    venueName: "Park Hotel RAYA Garden",
    eventType: "кръщение",
    latitude: 43.0757,
    longitude: 25.6172,
    coverImage: "/media/gallery/Tezza_2025_07_07_152559638_1.webp",
    galleryImages: [
      "/media/gallery/Tezza_2025_07_07_152559638_1.webp",
      "/media/gallery/Tezza_2025_07_13_155324686.webp",
    ],
    description: "Празнично събитие с авторски картички в Park Hotel RAYA Garden, Велико Търново.",
    eventDate: "2026-05-18",
    createdAt: new Date().toISOString(),
  },
  {
    id: "MAP-04",
    eventName: "НИКОЛ И ДАНИЕЛ",
    cityName: "Перущица",
    venueName: "Вила Юстина",
    eventType: "сватбено тържество",
    latitude: 42.0567,
    longitude: 24.5458,
    coverImage: "/media/gallery/Tezza_2025_07_13_155324686.webp",
    galleryImages: [
      "/media/gallery/Tezza_2025_07_13_155324686.webp",
      "/media/gallery/Tezza_2025_07_13_155326413.webp",
    ],
    description: "Вълшебен сватбен ден във Вила Юстина, Перущица.",
    eventDate: "2026-08-02",
    createdAt: new Date().toISOString(),
  },
  {
    id: "MAP-05",
    eventName: "КРИСИ И ВИКТОР",
    cityName: "София",
    venueName: "Голф клуб Св. София",
    eventType: "сватбено тържество",
    latitude: 42.6977,
    longitude: 23.3219,
    coverImage: "/media/gallery/Tezza_2025_07_13_155326413.webp",
    galleryImages: [
      "/media/gallery/Tezza_2025_07_13_155326413.webp",
      "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
    ],
    description: "Елегантен сватбен кът Пощичка в Голф клуб Св. София.",
    eventDate: "2026-07-28",
    createdAt: new Date().toISOString(),
  },
  {
    id: "MAP-06",
    eventName: "РАЛИ И ЖЕЛЮ",
    cityName: "Червен",
    venueName: "Midalidare Estate",
    eventType: "сватбено тържество",
    latitude: 43.6212,
    longitude: 25.9961,
    coverImage: "/media/gallery/Tezza_2025_07_13_155333570.webp",
    galleryImages: [
      "/media/gallery/Tezza_2025_07_13_155333570.webp",
      "/media/gallery/Tezza_2025_07_07_152559638_1.webp",
    ],
    description: "Сватбено гостуване в Midalidare Estate, Червен.",
    eventDate: "2026-06-10",
    createdAt: new Date().toISOString(),
  },
  {
    id: "MAP-07",
    eventName: "МАРИНА И ИВАН",
    cityName: "Каварна",
    venueName: "Вила Калиакра и Градина",
    eventType: "сватбено тържество",
    latitude: 43.4342,
    longitude: 28.3392,
    coverImage: "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
    galleryImages: [
      "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
      "/media/gallery/Tezza_2025_07_13_155331795.webp",
    ],
    description: "Красиви спомени във Вила Калиакра и Градина, Каварна.",
    eventDate: "2026-08-12",
    createdAt: new Date().toISOString(),
  },
  {
    id: "MAP-08",
    eventName: "МАЯ И НИКО",
    cityName: "София",
    venueName: "Голф клуб Св. София",
    eventType: "сватбено тържество",
    latitude: 42.6977,
    longitude: 23.3219,
    coverImage: "/media/gallery/Tezza_2025_07_07_152559638_1.webp",
    galleryImages: [
      "/media/gallery/Tezza_2025_07_07_152559638_1.webp",
      "/media/gallery/Tezza_2025_07_13_155324686.webp",
    ],
    description: "Забавни моменти и картички за гостите в Голф клуб Св. София.",
    eventDate: "2026-09-01",
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

function getStoredEvents(): EventLocation[] {
  if (globalThis.__POSHTICHKA_MAP_EVENTS__ && globalThis.__POSHTICHKA_MAP_EVENTS__.length > 0) {
    return globalThis.__POSHTICHKA_MAP_EVENTS__;
  }
  const fromFile = readPersistentData<EventLocation[]>("map-events", initialMapEvents);
  globalThis.__POSHTICHKA_MAP_EVENTS__ = fromFile;
  return fromFile;
}

function saveStoredEvents(events: EventLocation[]): void {
  globalThis.__POSHTICHKA_MAP_EVENTS__ = events;
  writePersistentData("map-events", events);
}

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(url && !url.includes("placeholder") && !url.includes("example"));
}

/**
 * GET: Fetch all map events
 */
export async function GET() {
  const currentEvents = getStoredEvents();

  if (isSupabaseConfigured()) {
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

        saveStoredEvents(formattedEvents);
        return NextResponse.json({ events: formattedEvents, source: "database" });
      }
    } catch (err) {
      console.warn("Supabase fetch notice:", err);
    }
  }

  return NextResponse.json({ events: currentEvents, source: "storage" });
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

    if (isSupabaseConfigured()) {
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
      } catch (dbErr) {
        console.warn("Supabase insert notice:", dbErr);
      }
    }

    const currentList = getStoredEvents();
    const updatedList = [newEvent, ...currentList.filter((e) => e.id !== newEvent.id)];
    saveStoredEvents(updatedList);

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

    if (isSupabaseConfigured()) {
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
      } catch (dbErr) {
        console.warn("Supabase update notice:", dbErr);
      }
    }

    const currentList = getStoredEvents();
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

    saveStoredEvents(updatedList);

    try {
      revalidatePath("/gallery");
      revalidatePath("/");
    } catch {}

    const result =
      updatedEvent || updatedList.find((e) => e.id === id);

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

    if (isSupabaseConfigured()) {
      try {
        const supabase = await createClient();
        await supabase.from("map_events").delete().eq("id", id);
      } catch (dbErr) {
        console.warn("Supabase delete notice:", dbErr);
      }
    }

    const currentList = getStoredEvents();
    const updatedList = currentList.filter((ev) => ev.id !== id);
    saveStoredEvents(updatedList);

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
