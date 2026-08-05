"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Sparkles, X, Layers, Navigation, ChevronRight, Calendar } from "lucide-react";
import { EventLocation } from "@/types/map-event";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export const MapGallery = () => {
  const [events, setEvents] = useState<EventLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState<string>("Всички");
  const [activeEvent, setActiveEvent] = useState<EventLocation | null>(null);
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
            setActiveEvent(data.events[0]);
          }
        }
      })
      .catch((err) => {
        console.error("Грешка при зареждане на събитията за картата:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Unique city list for filters
  const cities = ["Всички", ...Array.from(new Set(events.map((e) => e.cityName)))];

  const filteredEvents = selectedCity === "Всички"
    ? events
    : events.filter((e) => e.cityName === selectedCity);

  // Initialize public Leaflet map
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

      // Add pins for filtered events
      filteredEvents.forEach((ev) => {
        const customIcon = L.divIcon({
          className: "custom-map-pin",
          html: `<div class="w-8 h-8 rounded-full bg-[#00b4b6] text-white border-2 border-white shadow-lg flex items-center justify-center font-bold text-xs hover:scale-125 transition-transform cursor-pointer">📍</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });

        const marker = L.marker([ev.latitude, ev.longitude], { icon: customIcon })
          .addTo(mapInstanceRef.current)
          .bindTooltip(`<b>${ev.eventName}</b><br/>${ev.cityName}`, { direction: "top" });

        marker.on("click", () => {
          setActiveEvent(ev);
          mapInstanceRef.current.panTo([ev.latitude, ev.longitude]);
        });

        markersRef.current.push(marker);
      });

      if (filteredEvents.length > 0 && mapInstanceRef.current) {
        const group = L.featureGroup(markersRef.current);
        mapInstanceRef.current.fitBounds(group.getBounds().pad(0.2));
      }
    });

    return () => {
      isMounted = false;
    };
  }, [events, filteredEvents]);

  return (
    <section className="py-20 bg-brand-bg text-brand-dark relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-brand-primary/30 px-4 py-1.5 rounded-full text-xs font-semibold text-brand-accent uppercase tracking-widest border border-brand-primary/50 shadow-xs">
            <Sparkles className="w-4 h-4" />
            <span>Карта на Нашите Събития</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-brand-dark">
            Пощичка На Живо Из Всяка Точка На България
          </h2>

          <p className="text-base sm:text-lg text-brand-dark/80 font-light leading-relaxed">
            Открийте сватби, корпоративни партита и специални събития, на които нашият live memory lab сътвори усмивки и персонализирани спомени.
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
          <Card className="lg:col-span-7 h-[450px] sm:h-[550px] rounded-3xl overflow-hidden border border-brand-primary/30 shadow-xl relative z-10">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center bg-brand-secondary/40 text-brand-dark">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-brand-accent border-t-transparent" />
              </div>
            ) : (
              <div ref={mapContainerRef} className="w-full h-full" />
            )}
          </Card>

          {/* Active Event Preview Box */}
          <Card className="lg:col-span-5 p-6 sm:p-8 bg-white border border-brand-primary/30 shadow-xl rounded-3xl flex flex-col justify-between space-y-6">
            {activeEvent ? (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Cover Image */}
                  <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden border border-brand-primary/20 shadow-md">
                    <Image
                      src={activeEvent.coverImage}
                      alt={activeEvent.eventName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute top-3 left-3 bg-brand-dark/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-brand-primary border border-brand-primary/40 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                      <span>{activeEvent.cityName}</span>
                    </div>

                    {activeEvent.eventDate && (
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] text-white flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-brand-accent" />
                        <span>{activeEvent.eventDate}</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-brand-dark leading-tight">
                      {activeEvent.eventName}
                    </h3>
                    <p className="text-sm font-sans text-brand-dark/80 leading-relaxed">
                      {activeEvent.description || "Гостите си тръгнаха с незабравими персонализирани спомени, изработени на място."}
                    </p>
                  </div>
                </div>

                {/* Gallery Images Mini Grid */}
                <div className="space-y-2 pt-4 border-t border-brand-primary/20">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-accent flex items-center space-x-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Галерия от събитието ({activeEvent.galleryImages?.length || 1})</span>
                  </span>

                  <div className="grid grid-cols-4 gap-2">
                    {(activeEvent.galleryImages && activeEvent.galleryImages.length > 0
                      ? activeEvent.galleryImages
                      : [activeEvent.coverImage]
                    ).map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveLightboxIndex(idx)}
                        className="relative h-16 rounded-xl overflow-hidden border border-brand-primary/30 hover:scale-105 transition-transform group"
                      >
                        <Image src={img} alt={`Галерия ${idx + 1}`} fill className="object-cover" unoptimized />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">
                          🔍
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <LinkBookingButton date={activeEvent.eventDate} />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-brand-dark/60 space-y-3">
                <Navigation className="w-10 h-10 text-brand-accent animate-bounce" />
                <p className="text-sm font-medium">
                  Изберете пин от картата, за да разгледате снимките и спомените от събитието.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Lightbox Modal for Gallery Photos */}
      <AnimatePresence>
        {activeLightboxIndex !== null && activeEvent && (
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
                    activeEvent.coverImage
                  }
                  alt={activeEvent.eventName}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>

              <div className="mt-4 text-center text-white space-y-1">
                <p className="font-serif font-bold text-lg">{activeEvent.eventName}</p>
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
      <Button variant="accent" size="lg" className="w-full flex items-center justify-center space-x-2 shadow-md">
        <span>Резервирай Пощичка за подобна дата</span>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </a>
  );
};
