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
  coverImagePosition?: string;
  galleryImages: string[];
  imagePositions?: Record<string, string>;
  description?: string;
  eventDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

declare global {
  // eslint-disable-next-line no-var
  var __POSHTICHKA_MAP_EVENTS__: EventLocation[] | undefined;
}

const initialMapEvents: EventLocation[] = [];

async function getStoredEvents(): Promise<EventLocation[]> {
  return await readCloudOrFileData<EventLocation[]>("map-events", initialMapEvents);
}

async function saveStoredEvents(events: EventLocation[]): Promise<void> {
  globalThis.__POSHTICHKA_MAP_EVENTS__ = events;
  await writeCloudAndFileData("map-events", events);
}

export const dynamic = "force-dynamic";

/**
 * GET: Fetch all map events
 */
export async function GET() {
  // Cloud store priority (Supabase popup_config row id=10 + local file)
  const currentEvents = await getStoredEvents();
  const sorted = [...currentEvents].sort((a, b) => {
    const parseDate = (d?: string, fallback?: string) => {
      if (d && d.trim()) {
        const t = new Date(d.trim()).getTime();
        if (!isNaN(t)) return t;
      }
      if (fallback && fallback.trim()) {
        const t = new Date(fallback.trim()).getTime();
        if (!isNaN(t)) return t;
      }
      return 0;
    };
    return parseDate(b.eventDate, b.createdAt) - parseDate(a.eventDate, a.createdAt);
  });
  return NextResponse.json({ events: sorted, success: true });
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
      coverImagePosition,
      galleryImages,
      imagePositions,
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
    const finalCoverImagePosition = coverImagePosition ? String(coverImagePosition).trim() : undefined;
    const finalGalleryImages = Array.isArray(galleryImages) ? galleryImages : [];
    const finalImagePositions = imagePositions && typeof imagePositions === "object" ? imagePositions : undefined;

    const newEvent: EventLocation = {
      id: `MAP-${Date.now()}`,
      eventName: finalEventName,
      cityName: String(cityName).trim(),
      venueName: finalVenueName,
      eventType: finalEventType,
      latitude: Number(latitude),
      longitude: Number(longitude),
      coverImage: finalCoverImage || "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
      coverImagePosition: finalCoverImagePosition,
      galleryImages: finalGalleryImages.length > 0 ? finalGalleryImages : [finalCoverImage],
      imagePositions: finalImagePositions,
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

    return NextResponse.json({ success: true, event: newEvent, events: updatedList });
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
      coverImagePosition,
      galleryImages,
      imagePositions,
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
    const finalCoverImagePosition = coverImagePosition !== undefined ? String(coverImagePosition) : undefined;
    const finalGalleryImages = Array.isArray(galleryImages) ? galleryImages : [];
    const finalImagePositions = imagePositions && typeof imagePositions === "object" ? imagePositions : undefined;

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
          coverImagePosition: finalCoverImagePosition,
          galleryImages: data.gallery_images || [],
          imagePositions: finalImagePositions,
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
          coverImagePosition: finalCoverImagePosition ?? ev.coverImagePosition,
          galleryImages: finalGalleryImages.length > 0 ? finalGalleryImages : ev.galleryImages,
          imagePositions: finalImagePositions ?? ev.imagePositions,
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
    return NextResponse.json({ success: true, event: result, events: updatedList });
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

    return NextResponse.json({ success: true, id, events: updatedList });
  } catch (err: unknown) {
    console.error("Delete event error:", err);
    const msg = err instanceof Error ? err.message : "Грешка при изтриване на локацията.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
