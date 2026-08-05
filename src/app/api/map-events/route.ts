import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { EventLocation } from "@/types/map-event";

// Fallback in-memory store for demonstration when Supabase table is not configured
let mockMapEvents: EventLocation[] = [
  {
    id: "MAP-01",
    eventName: "Сватба на брега: Светлана & Димитър",
    cityName: "Созопол",
    latitude: 42.4175,
    longitude: 27.6958,
    coverImage: "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
    galleryImages: [
      "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
      "/media/gallery/Tezza_2025_07_13_155324686.webp",
      "/media/gallery/Tezza_2025_07_13_155326413.webp",
    ],
    description: "Незабравимо сватбено изживяване край морето в Созопол с Пощичка live memory lab.",
    eventDate: "2026-08-14",
    createdAt: new Date().toISOString(),
  },
  {
    id: "MAP-02",
    eventName: "DevTech Annual Tech Summit",
    cityName: "Бургас",
    latitude: 42.5048,
    longitude: 27.4626,
    coverImage: "/media/gallery/Tezza_2025_07_07_152559638_1.webp",
    galleryImages: [
      "/media/gallery/Tezza_2025_07_07_152559638_1.webp",
      "/media/gallery/Tezza_2025_07_13_155333570.webp",
    ],
    description: "Корпоративен брандинг и персонализирани подаръци за над 200 участници.",
    eventDate: "2026-08-22",
    createdAt: new Date().toISOString(),
  },
  {
    id: "MAP-03",
    eventName: "Юбилей 50г в Wave Resort",
    cityName: "Поморие",
    latitude: 42.5583,
    longitude: 27.6444,
    coverImage: "/media/gallery/Tezza_2025_07_13_155331795.webp",
    galleryImages: [
      "/media/gallery/Tezza_2025_07_13_155331795.webp",
      "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
    ],
    description: "Елегантно стилно парти с картички от драсканици за гостите.",
    eventDate: "2026-08-28",
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

    // Map snake_case database columns to camelCase EventLocation interface
    const formattedEvents: EventLocation[] = dbEvents.map((item) => ({
      id: item.id,
      eventName: item.event_name,
      cityName: item.city_name,
      latitude: Number(item.latitude),
      longitude: Number(item.longitude),
      coverImage: item.cover_image,
      galleryImages: Array.isArray(item.gallery_images) ? item.gallery_images : [],
      description: item.description,
      eventDate: item.event_date,
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
    const { eventName, cityName, latitude, longitude, coverImage, galleryImages, description, eventDate } = body;

    if (!eventName || !cityName || latitude === undefined || longitude === undefined || !coverImage) {
      return NextResponse.json(
        { error: "Всички задължителни полета трябва да бъдат попълнени." },
        { status: 400 }
      );
    }

    const newEvent: EventLocation = {
      id: `MAP-${Date.now()}`,
      eventName,
      cityName,
      latitude: Number(latitude),
      longitude: Number(longitude),
      coverImage,
      galleryImages: Array.isArray(galleryImages) ? galleryImages : [coverImage],
      description: description || "",
      eventDate: eventDate || new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    };

    try {
      const supabase = await createClient();
      
      // DB Insert: Create record in 'map_events' table
      const { data, error } = await supabase
        .from("map_events")
        .insert([
          {
            event_name: eventName,
            city_name: cityName,
            latitude: Number(latitude),
            longitude: Number(longitude),
            cover_image: coverImage,
            gallery_images: Array.isArray(galleryImages) ? galleryImages : [coverImage],
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
      // Fallback if Supabase is unconfigured
    }

    // Always update local memory store as fallback
    mockMapEvents = [newEvent, ...mockMapEvents];

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
    const { id, eventName, cityName, latitude, longitude, coverImage, galleryImages, description, eventDate } = body;

    if (!id) {
      return NextResponse.json({ error: "Липсва ИД на събитието за дублиране/редакция." }, { status: 400 });
    }

    let updatedEvent: EventLocation | null = null;

    try {
      const supabase = await createClient();
      
      // DB Update: Update record in 'map_events' table
      const { data, error } = await supabase
        .from("map_events")
        .update({
          event_name: eventName,
          city_name: cityName,
          latitude: Number(latitude),
          longitude: Number(longitude),
          cover_image: coverImage,
          gallery_images: Array.isArray(galleryImages) ? galleryImages : [],
          description: description,
          event_date: eventDate,
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
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
          coverImage: data.cover_image,
          galleryImages: data.gallery_images || [],
          description: data.description,
          eventDate: data.event_date,
        };
      }
    } catch {
      // Fallback if Supabase is unconfigured
    }

    // Update in-memory fallback
    mockMapEvents = mockMapEvents.map((ev) => {
      if (ev.id === id) {
        return {
          ...ev,
          eventName: eventName ?? ev.eventName,
          cityName: cityName ?? ev.cityName,
          latitude: latitude !== undefined ? Number(latitude) : ev.latitude,
          longitude: longitude !== undefined ? Number(longitude) : ev.longitude,
          coverImage: coverImage ?? ev.coverImage,
          galleryImages: galleryImages ?? ev.galleryImages,
          description: description ?? ev.description,
          eventDate: eventDate ?? ev.eventDate,
          updatedAt: new Date().toISOString(),
        };
      }
      return ev;
    });

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
      
      // DB Delete: Delete record from 'map_events' table
      await supabase.from("map_events").delete().eq("id", id);
    } catch {
      // Fallback
    }

    // Remove from in-memory array
    mockMapEvents = mockMapEvents.filter((ev) => ev.id !== id);

    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Грешка при изтриване на локацията.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
