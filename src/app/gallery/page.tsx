import React from "react";
import { MapGallery } from "@/components/map-gallery";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { readCloudOrFileData } from "@/lib/server-storage";
import { EventLocation } from "@/types/map-event";

export const metadata = {
  title: "Галерия от изминали събития | Пощичка",
  description:
    "Разгледайте автентичната галерия от събития с Пощичка - интерактивна карта с вендинг машина и кадри от наши събития из цяла България.",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const rawEvents = await readCloudOrFileData<EventLocation[]>("map-events", []);
  
  // Pass all active events
  const cleanEvents = (rawEvents || []);

  // Sort descending by date (newest first, oldest last)
  const sortedEvents = cleanEvents.sort((a, b) => {
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

  return (
    <PageWrapper>
      <div className="pb-24 font-sans select-none bg-[#f9f6f0]">
        <MapGallery initialEvents={sortedEvents} />
      </div>
    </PageWrapper>
  );
}
