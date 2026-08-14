import { NextResponse, NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { EventLocation } from "@/types/map-event";

// Fallback in-memory store matching user mockups and events
let mockMapEvents: EventLocation[] = [
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

/**
 * GET: Fetch all map events
 */
export async function GET() {
  try {
    const supabase = await createClient();
    
    // DB Query: Fetch all map events from 'map_events' table
    const { data: dbEvents, error } = await supabase
      .from("map_events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !dbEvents || dbEvents.length === 0) {
      return NextResponse.json({ events: mockMapEvents, source: "mock" });
    }

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

    return NextResponse.json({ events: formattedEvents, source: "database" });
  } catch {
    return NextResponse.json({ events: mockMapEvents, source: "fallback" });
  }
}

/**
 * POST: Create a new map event location
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventName, cityName, venueName, eventType, latitude, longitude, coverImage, galleryImages, description, eventDate } = body;

    if (!cityName || latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { error: "Моля, изберете град и валидни координати на картата." },
        { status: 400 }
      );
    }

    const finalEventName = eventName ? eventName.trim() : "";
    const finalVenueName = venueName ? venueName.trim() : "";
    const finalEventType = eventType ? eventType.trim() : "";
    const finalCoverImage = coverImage ? coverImage.trim() : "";
    const finalGalleryImages = Array.isArray(galleryImages) ? galleryImages : [];

    const newEvent: EventLocation = {
      id: `MAP-${Date.now()}`,
      eventName: finalEventName,
      cityName: cityName.trim(),
      venueName: finalVenueName,
      eventType: finalEventType,
      latitude: Number(latitude),
      longitude: Number(longitude),
      coverImage: finalCoverImage,
      galleryImages: finalGalleryImages,
      description: description ? description.trim() : "",
      eventDate: eventDate || new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    };

    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("map_events")
        .insert([
          {
            event_name: finalEventName,
            city_name: cityName.trim(),
            venue_name: finalVenueName,
            event_type: finalEventType,
            latitude: Number(latitude),
            longitude: Number(longitude),
            cover_image: finalCoverImage,
            gallery_images: finalGalleryImages,
            description: description || "",
            event_date: eventDate || null,
          },
        ])
        .select()
        .single();

      if (!error && data) {
        newEvent.id = data.id;
      }
    } catch {
      // Fallback
    }

    mockMapEvents = [newEvent, ...mockMapEvents];
    try {
      revalidatePath("/gallery");
      revalidatePath("/");
    } catch {}
    return NextResponse.json({ success: true, event: newEvent });
  } catch (err: unknown) {
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
    const { id, eventName, cityName, venueName, eventType, latitude, longitude, coverImage, galleryImages, description, eventDate } = body;

    if (!id) {
      return NextResponse.json({ error: "Липсва ИД на събитието за редакция." }, { status: 400 });
    }

    const finalEventName = eventName !== undefined ? eventName : "";
    const finalVenueName = venueName !== undefined ? venueName : "";
    const finalEventType = eventType !== undefined ? eventType : "";
    const finalCoverImage = coverImage !== undefined ? coverImage : "";
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
    } catch {
      // Fallback
    }

    mockMapEvents = mockMapEvents.map((ev) => {
      if (ev.id === id) {
        return {
          ...ev,
          eventName: finalEventName,
          cityName: cityName ?? ev.cityName,
          venueName: finalVenueName,
          eventType: finalEventType,
          latitude: latitude !== undefined ? Number(latitude) : ev.latitude,
          longitude: longitude !== undefined ? Number(longitude) : ev.longitude,
          coverImage: finalCoverImage,
          galleryImages: finalGalleryImages,
          description: description ?? ev.description,
          eventDate: eventDate ?? ev.eventDate,
          updatedAt: new Date().toISOString(),
        };
      }
      return ev;
    });

    try {
      revalidatePath("/gallery");
      revalidatePath("/");
    } catch {}

    return NextResponse.json({ success: true, event: updatedEvent || mockMapEvents.find((e) => e.id === id) });
  } catch (err: unknown) {
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
    } catch {
      // Fallback
    }

    mockMapEvents = mockMapEvents.filter((ev) => ev.id !== id);
    try {
      revalidatePath("/gallery");
      revalidatePath("/");
    } catch {}

    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Грешка при изтриване на локацията.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
