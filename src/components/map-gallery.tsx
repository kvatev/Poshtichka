"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Sparkles, X, Layers, Navigation, ChevronRight, Calendar, Heart, Award } from "lucide-react";
import { EventLocation } from "@/types/map-event";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export const MapGallery = () => {
  const [events, setEvents] = useState<EventLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState<string>("Всички");
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([]);

  // Fetch locations from dynamic API endpoint /api/map-events
  useEffect(() => {
    fetch("/api/map-events")
      .then((res) => res.json())
      .then((data) => {
        if (data.events && Array.isArray(data.events)) {
          setEvents(data.events);
          if (data.events.length > 0) {
            setActiveEventId(data.events[0].id);
          }
        }
      })
      .catch((err) => {
        console.error("Грешка при зареждане на събитията за картата:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Active event object
  const activeEvent = useMemo(() => {
    return events.find((e) => e.id === activeEventId) || events[0] || null;
  }, [events, activeEventId]);

  // All visits for the currently active city
  const cityVisits = useMemo(() => {
    if (!activeEvent) return [];
    return events.filter((e) => e.cityName.toLowerCase() === activeEvent.cityName.toLowerCase());
  }, [events, activeEvent]);

  // Unique city list for filters
  const cities = ["Всички", ...Array.from(new Set(events.map((e) => e.cityName)))];

  const filteredEvents = selectedCity === "Всички"
    ? events
    : events.filter((e) => e.cityName === selectedCity);

  // Group events by city for map markers so each unique location has 1 marker with visit count
  const groupedCityMarkers = useMemo(() => {
    const map = new Map<string, EventLocation[]>();
    filteredEvents.forEach((ev) => {
      const key = ev.cityName.toLowerCase();
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(ev);
    });
    return Array.from(map.values());
  }, [filteredEvents]);

  // Initialize public Leaflet map with Abstract Blob Markers
  useEffect(() => {
    if (events.length === 0) return;

    let isMounted = true;

    // Load Leaflet CSS dynamically
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Custom icon setup
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!mapInstanceRef.current) {
        const centerLat = events[0]?.latitude || 42.5048;
        const centerLng = events[0]?.longitude || 27.4626;

        const map = L.map(mapContainerRef.current, {
          scrollWheelZoom: false,
        }).setView([centerLat, centerLng], 8);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        mapInstanceRef.current = map;
      }

      // Clear existing markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      // Add Abstract Blob Markers for each city group
      groupedCityMarkers.forEach((cityEventsGroup) => {
        const firstEvent = cityEventsGroup[0];
        const visitCount = cityEventsGroup.length;
        const isMultiVisit = visitCount > 1;

        // Custom Abstract Blob Marker HTML
        const blobMarkerHtml = `
          <div class="relative group cursor-pointer">
            <div class="absolute -inset-1.5 rounded-[45%_55%_65%_35%/40%_50%_60%_50%] bg-[#00b4b6]/40 blur-xs animate-pulse group-hover:scale-125 transition-transform"></div>
            <div class="relative w-10 h-10 bg-gradient-to-tr from-[#00b4b6] via-[#121212] to-emerald-400 border-2 border-white shadow-xl flex items-center justify-center text-white font-serif font-bold text-xs group-hover:scale-110 transition-transform" style="border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;">
              ${isMultiVisit ? `<span class="bg-amber-400 text-black rounded-full w-4 h-4 text-[9px] font-mono flex items-center justify-center font-bold absolute -top-1 -right-1 shadow-sm">${visitCount}</span>` : ""}
              <span class="text-xs drop-shadow-md">✦</span>
            </div>
          </div>
        `;

        const abstractBlobIcon = L.divIcon({
          className: "custom-abstract-blob-pin",
          html: blobMarkerHtml,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });

        const tooltipText = isMultiVisit
          ? `<b>${firstEvent.cityName}</b><br/>${visitCount} гостувания на Пощичка`
          : `<b>${firstEvent.eventName || "Пощичка"}</b><br/>${firstEvent.cityName}`;

        const marker = L.marker([firstEvent.latitude, firstEvent.longitude], { icon: abstractBlobIcon })
          .addTo(mapInstanceRef.current)
          .bindTooltip(tooltipText, { direction: "top", offset: [0, -10] });

        marker.on("click", () => {
          setActiveEventId(firstEvent.id);
          mapInstanceRef.current.panTo([firstEvent.latitude, firstEvent.longitude]);
        });

        markersRef.current.push(marker);
      });

      if (groupedCityMarkers.length > 0 && mapInstanceRef.current) {
        const group = L.featureGroup(markersRef.current);
        mapInstanceRef.current.fitBounds(group.getBounds().pad(0.25));
      }
    });

    return () => {
      isMounted = false;
    };
  }, [events, groupedCityMarkers]);

  return (
    <section className="py-16 sm:py-20 bg-brand-bg text-brand-dark relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-brand-primary/30 px-4 py-1.5 rounded-full text-xs font-semibold text-brand-accent uppercase tracking-widest border border-brand-primary/50 shadow-xs">
            <Sparkles className="w-4 h-4" />
            <span>Интерактивна Карта на Локациите</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-brand-dark">
            Пощичка На Живо Из Всяка Точка На България
          </h2>

          <p className="text-base sm:text-lg text-brand-dark/80 font-light leading-relaxed">
            Открийте локациите и събитията, на които нашият live memory lab сътвори усмивки и персонализирани спомени за гостите.
          </p>
        </div>

        {/* City Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedCity === city
                  ? "bg-brand-accent text-white shadow-md scale-105"
                  : "bg-white border border-brand-primary/30 text-brand-dark hover:bg-brand-secondary"
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Interactive Map & Active Event Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map View Container */}
          <Card className="lg:col-span-7 h-[450px] sm:h-[580px] rounded-3xl overflow-hidden border border-brand-primary/30 shadow-xl relative z-10">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center bg-brand-secondary/40 text-brand-dark">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-brand-accent border-t-transparent" />
              </div>
            ) : (
              <div ref={mapContainerRef} className="w-full h-full" />
            )}
          </Card>

          {/* Active Event Preview & Multi-Visit Selector Panel */}
          <Card className="lg:col-span-5 p-6 sm:p-8 bg-white border border-brand-primary/30 shadow-xl rounded-3xl flex flex-col justify-between space-y-6">
            {activeEvent ? (
              <div className="space-y-5 flex-1 flex flex-col justify-between">
                {/* Multi-Visit Header & Switcher Tabs if city has multiple visits */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-brand-primary/20 pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-brand-primary/30 border border-brand-primary/50 flex items-center justify-center text-brand-accent font-bold text-xs shadow-xs">
                        📍
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-lg text-brand-dark leading-none">
                          {activeEvent.cityName}
                        </h3>
                        <span className="text-[11px] text-brand-accent font-medium">
                          {cityVisits.length > 1
                            ? `${cityVisits.length} гостувания на тази локация`
                            : "Локация на Пощичка"}
                        </span>
                      </div>
                    </div>

                    {cityVisits.length > 1 && (
                      <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1">
                        <Award className="w-3 h-3 text-amber-600" />
                        <span>Множество събития</span>
                      </span>
                    )}
                  </div>

                  {/* Multi-Visit Event Tabs Switcher */}
                  {cityVisits.length > 1 && (
                    <div className="space-y-1.5 bg-brand-secondary/40 p-2.5 rounded-2xl border border-brand-primary/30">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-brand-dark/70 px-1">
                        Изберете събитие от {activeEvent.cityName}:
                      </span>
                      <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-1">
                        {cityVisits.map((visit, idx) => {
                          const visitTitle = visit.eventName && visit.eventName.trim()
                            ? visit.eventName
                            : `Гостуване #${idx + 1} в ${visit.cityName}`;
                          const isSelected = visit.id === activeEvent.id;

                          return (
                            <button
                              key={visit.id}
                              onClick={() => setActiveEventId(visit.id)}
                              className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between ${
                                isSelected
                                  ? "bg-brand-accent text-white font-bold shadow-xs"
                                  : "bg-white text-brand-dark hover:bg-brand-primary/30 border border-brand-primary/20"
                              }`}
                            >
                              <span className="truncate pr-2">{visitTitle}</span>
                              {visit.eventDate && (
                                <span className={`text-[10px] font-mono flex-shrink-0 ${isSelected ? "text-white/80" : "text-brand-dark/50"}`}>
                                  {visit.eventDate}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Active Event Cover Image or Fallback Brand Banner */}
                  <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden border border-brand-primary/20 shadow-md">
                    {activeEvent.coverImage ? (
                      <Image
                        src={activeEvent.coverImage}
                        alt={activeEvent.eventName || activeEvent.cityName}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand-accent/20 via-brand-primary/30 to-brand-secondary flex flex-col items-center justify-center p-6 text-center space-y-2">
                        <div className="w-12 h-12 rounded-2xl bg-white/80 border border-brand-accent/40 flex items-center justify-center shadow-md">
                          <Image src="/media/logos/logo.webp" alt="Пощичка" width={36} height={36} className="rounded-lg object-cover" />
                        </div>
                        <span className="font-serif font-bold text-lg text-brand-dark">
                          Пощичка в {activeEvent.cityName}
                        </span>
                        <span className="text-xs text-brand-dark/70 font-light">
                          Персонализирани спомени, сътворени на място
                        </span>
                      </div>
                    )}

                    {activeEvent.coverImage && (
                      <div className="absolute top-3 left-3 bg-brand-dark/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-brand-primary border border-brand-primary/40 flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                        <span>{activeEvent.cityName}</span>
                      </div>
                    )}

                    {activeEvent.eventDate && (
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] text-white flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-brand-accent" />
                        <span>{activeEvent.eventDate}</span>
                      </div>
                    )}
                  </div>

                  {/* Event Title & Description */}
                  <div className="space-y-1.5">
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark leading-tight">
                      {activeEvent.eventName || `Пощичка в ${activeEvent.cityName}`}
                    </h4>
                    <p className="text-xs sm:text-sm font-sans text-brand-dark/80 leading-relaxed">
                      {activeEvent.description || `Нашето гостуване в ${activeEvent.cityName} подари незабравими емоции на всички гости.`}
                    </p>
                  </div>
                </div>

                {/* Photo Gallery for Selected Event */}
                {activeEvent.galleryImages && activeEvent.galleryImages.length > 0 && (
                  <div className="space-y-2 pt-3 border-t border-brand-primary/20">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-accent flex items-center space-x-1">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Кадри от събитието ({activeEvent.galleryImages.length})</span>
                    </span>

                    <div className="grid grid-cols-4 gap-2">
                      {activeEvent.galleryImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveLightboxIndex(idx)}
                          className="relative h-16 rounded-xl overflow-hidden border border-brand-primary/30 hover:scale-105 transition-transform group shadow-xs"
                        >
                          <Image src={img} alt={`Кадър ${idx + 1}`} fill className="object-cover" unoptimized />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">
                            🔍
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <LinkBookingButton date={activeEvent.eventDate} />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-brand-dark/60 space-y-3">
                <Navigation className="w-10 h-10 text-brand-accent animate-bounce" />
                <p className="text-sm font-medium">
                  Изберете точка от картата, за да разгледате гостуванията и събитията на Пощичка.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Lightbox Modal for Gallery Photos */}
      <AnimatePresence>
        {activeLightboxIndex !== null && activeEvent && activeEvent.galleryImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveLightboxIndex(null)}
          >
            <div className="relative max-w-4xl w-full h-[80vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="absolute top-4 right-4 text-white hover:text-brand-primary p-2 bg-white/10 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative w-full h-full">
                <Image
                  src={
                    activeEvent.galleryImages[activeLightboxIndex] ||
                    activeEvent.coverImage ||
                    "/media/logos/logo.webp"
                  }
                  alt={activeEvent.eventName || activeEvent.cityName}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>

              <div className="mt-4 text-center text-white space-y-1">
                <p className="font-serif font-bold text-lg">{activeEvent.eventName || `Пощичка в ${activeEvent.cityName}`}</p>
                <p className="text-xs text-white/70">
                  Снимка {activeLightboxIndex + 1} от {activeEvent.galleryImages.length} ({activeEvent.cityName})
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const LinkBookingButton = ({ date }: { date?: string }) => {
  return (
    <a href={date ? `/booking?date=${date}` : "/booking"} className="block w-full">
      <Button variant="accent" size="lg" className="w-full flex items-center justify-center space-x-2 shadow-md py-3 text-sm font-semibold">
        <span>Резервирай Пощичка за Вашето събитие</span>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </a>
  );
};
