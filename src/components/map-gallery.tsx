"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { EventLocation } from "@/types/map-event";
import { BG_LOCATIONS_DATABASE } from "@/lib/bg-locations";

// Default locations pre-populated matching exact user screenshots & data
const DEFAULT_LOCATIONS: EventLocation[] = [
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
    description: "Незабравима сватба в Голф клуб Св. София с персонализирани спомени и картички от драсканици за всички гости.",
    eventDate: "2026-06-20",
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
    description: "Празнично кръщение с авторски картички и специални монети-жетони в Park Hotel RAYA Garden.",
    eventDate: "2026-05-18",
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
    description: "Вълшебен сватбен ден във Вила Юстина, Перущица с мобилния кът на Пощичка.",
    eventDate: "2026-08-02",
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
    description: "Елегантен сватбен кът Пощичка с персонализиран дизайн на картички за тържеството.",
    eventDate: "2026-07-28",
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
    description: "Сватбено гостуване в Midalidare Estate, Червен с временни татуировки и картички.",
    eventDate: "2026-06-10",
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
  },
];

export const MapGallery = () => {
  const [events, setEvents] = useState<EventLocation[]>(DEFAULT_LOCATIONS);
  const [selectedCity, setSelectedCity] = useState<string>("Созопол");
  const [cityPresets, setCityPresets] = useState<string[]>([
    "Созопол", "Каварна", "София", "Червен", "Перущица", "Велико Търново", "Бургас", "Пловдив", "Варна"
  ]);
  const [activeModalEvent, setActiveModalEvent] = useState<EventLocation | null>(null);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number>(0);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([]);

  // Load from local cache immediately on mount to prevent any visual jumps
  useEffect(() => {
    try {
      const cached = localStorage.getItem("poshtichka_cached_events");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEvents(parsed);
        }
      }
    } catch {}
  }, []);

  // Fetch API locations & cities
  useEffect(() => {
    fetch("/api/map-events")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.events && Array.isArray(data.events) && data.events.length > 0) {
          setEvents(data.events);
          try {
            localStorage.setItem("poshtichka_cached_events", JSON.stringify(data.events));
          } catch {}
        }
      })
      .catch(() => {});

    fetch("/api/cities")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.cities) && data.cities.length > 0) {
          setCityPresets(data.cities.map((c: { name: string }) => c.name));
        }
      })
      .catch(() => {});
  }, []);

  const cityNamesList = useMemo(() => {
    const fromEvents = events.map((e) => e.cityName).filter(Boolean);
    return Array.from(new Set([...cityPresets, ...fromEvents]));
  }, [cityPresets, events]);

  // Active events for the selected city
  const selectedCityEvents = useMemo(() => {
    return events.filter(
      (e) => e.cityName.toLowerCase().trim() === selectedCity.toLowerCase().trim()
    );
  }, [events, selectedCity]);

  // Leaflet Map Initialization with Asset 82@2x.png pins (ScrollWheelZoom Enabled + Dynamic Events Markers)
  useEffect(() => {
    let isMounted = true;

    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          scrollWheelZoom: true,
          zoomControl: true,
          attributionControl: false,
        }).setView([42.75, 25.5], 7);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "",
        }).addTo(map);

        mapInstanceRef.current = map;
      }

      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      const customBoothIcon = L.icon({
        iconUrl: encodeURI("/media/Галерия/Asset 82@2x.png"),
        iconSize: [44, 48],
        iconAnchor: [22, 48],
        popupAnchor: [0, -44],
      });

      // Render markers for all dynamic event locations
      events.forEach((ev) => {
        if (!ev.latitude || !ev.longitude) return;

        const coords: [number, number] = [ev.latitude, ev.longitude];
        const label = ev.eventName ? `<b>${ev.eventName}</b><br/><span style="font-size:11px">${ev.cityName}</span>` : `<b>${ev.cityName}</b>`;

        const marker = L.marker(coords, { icon: customBoothIcon })
          .addTo(mapInstanceRef.current)
          .bindTooltip(label, { direction: "top", offset: [0, -10] });

        marker.on("click", () => {
          setSelectedCity(ev.cityName);
          if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo(coords, 13, {
              animate: true,
              duration: 1.2,
            });
          }
        });

        markersRef.current.push(marker);
      });
    });

    return () => {
      isMounted = false;
    };
  }, [events]);

  const zoomToCity = (cityName: string) => {
    setSelectedCity(cityName);

    if (!mapInstanceRef.current) return;

    // 1. Look in active events
    const match = events.find(
      (e) => e.cityName.toLowerCase().trim() === cityName.toLowerCase().trim()
    );

    if (match && match.latitude && match.longitude) {
      mapInstanceRef.current.flyTo([match.latitude, match.longitude], 13, {
        animate: true,
        duration: 1.2,
      });

      const targetMarker = markersRef.current.find((m) => {
        try {
          const pos = m.getLatLng();
          return (
            Math.abs(pos.lat - match.latitude) < 0.005 &&
            Math.abs(pos.lng - match.longitude) < 0.005
          );
        } catch {
          return false;
        }
      });
      if (targetMarker) {
        targetMarker.openTooltip();
      }
      return;
    }

    // 2. Look in Bulgarian locations database
    const bgMatch = BG_LOCATIONS_DATABASE.find(
      (loc) => loc.name.toLowerCase().trim() === cityName.toLowerCase().trim()
    );

    if (bgMatch && bgMatch.lat && bgMatch.lng) {
      mapInstanceRef.current.flyTo([bgMatch.lat, bgMatch.lng], 13, {
        animate: true,
        duration: 1.2,
      });
    }
  };

  // Center & zoom map on selected city when it changes
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedCity) return;

    const match = events.find(
      (e) => e.cityName.toLowerCase().trim() === selectedCity.toLowerCase().trim()
    );
    if (match && match.latitude && match.longitude) {
      mapInstanceRef.current.flyTo([match.latitude, match.longitude], 13, {
        animate: true,
        duration: 1.2,
      });
      return;
    }

    const bgMatch = BG_LOCATIONS_DATABASE.find(
      (loc) => loc.name.toLowerCase().trim() === selectedCity.toLowerCase().trim()
    );
    if (bgMatch && bgMatch.lat && bgMatch.lng) {
      mapInstanceRef.current.flyTo([bgMatch.lat, bgMatch.lng], 13, {
        animate: true,
        duration: 1.2,
      });
    }
  }, [selectedCity, events]);

  return (
    <div className="space-y-12 sm:space-y-16 py-6 font-sans select-none bg-[#f9f6f0]">
      {/* 1. Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-3 px-4">
        <h1 className="font-salongbeach text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-wider text-[#00b4b6] leading-tight">
          ГАЛЕРИЯ ОТ ИЗМИНАЛИ СЪБИТИЯ
        </h1>
        <p className="font-sans text-sm sm:text-base lg:text-lg text-[#182b2c]/80 italic">
          Разгледайте истински кадри от пътуването на Пощичка.
        </p>

        {/* Curly Arrow pointing down */}
        <div className="pt-2 flex justify-center pointer-events-none">
          <Image
            src={encodeURI("/media/Main Page/curly-arrow-left.png")}
            alt="Стрелка"
            width={44}
            height={44}
            className="w-8 sm:w-10 h-auto object-contain opacity-85 -rotate-90"
          />
        </div>
      </div>

      {/* 2. City Filter Oval Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 max-w-5xl mx-auto">
        {cityNamesList.map((cityName) => {
          const isSelected = selectedCity.toLowerCase() === cityName.toLowerCase();
          return (
            <button
              key={cityName}
              onClick={() => zoomToCity(cityName)}
              className={`px-5 sm:px-7 py-2 text-xs sm:text-sm font-salongbeach font-bold uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer shadow-xs ${
                isSelected
                  ? "bg-[#00b4b6] text-white shadow-md scale-105"
                  : "bg-[#f9f6f0] border border-[#00b4b6] text-[#182b2c] hover:bg-[#00b4b6]/10"
              }`}
            >
              {cityName}
            </button>
          );
        })}
      </div>

      {/* 3. Interactive Bulgaria Map Container with Asset 82@2x.png pins */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="relative w-full h-[320px] sm:h-[460px] md:h-[520px] rounded-[32px] overflow-hidden border-2 border-[#182b2c]/20 shadow-xl bg-[#e5e7eb]">
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>
      </div>

      {/* 4. Active City Title Section with Asset 83@2x.png icon (Centered) */}
      <div className="text-center space-y-2 px-4 pt-4 max-w-3xl mx-auto flex flex-col items-center justify-center">
        <div className="flex justify-center">
          <div className="relative w-12 sm:w-14 h-12 sm:h-14">
            <Image
              src={encodeURI("/media/Галерия/Asset 83@2x.png")}
              alt="Иконка локация"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
        <h2 className="font-salongbeach text-3xl sm:text-5xl font-bold uppercase tracking-wider text-[#182b2c]">
          {selectedCity}
        </h2>
        <p className="font-stampatello text-base sm:text-lg text-[#182b2c]/85 italic">
          {selectedCityEvents.length > 0
            ? `${selectedCityEvents.length} ${selectedCityEvents.length === 1 ? "гостуване" : "гостувания"} на тази локация`
            : "1 гостуване на тази локация"}
        </p>
      </div>

      {/* 5. Active City Event Banner Section (Teal Background #00b4b6) */}
      <section className="w-full bg-[#00b4b6] py-12 sm:py-16 px-4 sm:px-8 flex justify-center">
        <div className="max-w-6xl mx-auto w-full">
          {selectedCityEvents.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              {selectedCityEvents.map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => {
                    setActiveModalEvent(ev);
                    setActiveLightboxIndex(0);
                  }}
                  className="relative group w-[300px] sm:w-[340px] md:w-[360px] h-[430px] sm:h-[480px] border-[2.5px] border-[#182b2c] rounded-[40px] sm:rounded-[46px] overflow-hidden shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer flex flex-col mx-auto bg-[#f9f6f0]"
                >
                  {/* Photo Container filling top ~68% seamlessly */}
                  <div className="relative w-full h-[68%] overflow-hidden">
                    <Image
                      src={ev.coverImage || "/media/gallery/Tezza_2025_07_07_170901960_1.webp"}
                      alt={ev.eventName || ev.cityName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>

                  {/* Text Area filling bottom ~32% with solid cream/white background */}
                  <div className="relative w-full h-[32%] bg-[#f9f6f0] px-4 py-2.5 text-center flex flex-col items-center justify-center space-y-0.5 z-0">
                    {/* Line 1: ГЕРИ И КРАСИ (SALongBeach font, bold, uppercase, teal color #00b4b6) */}
                    <h3 className="font-salongbeach text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#00b4b6] leading-tight">
                      {ev.eventName || `ПОЩИЧКА В ${ev.cityName.toUpperCase()}`}
                    </h3>

                    {/* Line 2: Комплекс Свети Тома (Stampatello font, dark gray #182b2c) */}
                    <p className="font-stampatello text-lg sm:text-xl font-normal text-[#182b2c] leading-snug">
                      {ev.venueName || `Локация в гр. ${ev.cityName}`}
                    </p>

                    {/* Line 3: сватбено тържество (Stampatello font, teal color #00b4b6) */}
                    <p className="font-stampatello text-sm sm:text-base font-normal text-[#00b4b6] leading-tight">
                      {ev.eventType || "сватбено тържество"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-white space-y-2 py-8 font-sans">
              <p className="text-lg font-bold">Няма намерени събития за {selectedCity}</p>
              <p className="text-sm opacity-90">Изберете друг град от списъка или картата.</p>
            </div>
          )}
        </div>
      </section>

      {/* 6. ВСИЧКИ ЛОКАЦИИ Section with Asset 83@2x.png icon */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10 pt-6">
        <div className="text-center space-y-2 flex flex-col items-center justify-center">
          <div className="flex justify-center">
            <div className="relative w-10 sm:w-12 h-10 sm:h-12">
              <Image
                src={encodeURI("/media/Галерия/Asset 83@2x.png")}
                alt="Иконка локация"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
          <h2 className="font-salongbeach text-3xl sm:text-5xl font-bold uppercase tracking-wider text-[#182b2c]">
            ВСИЧКИ ЛОКАЦИИ
          </h2>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
          {events.map((ev) => (
            <div
              key={ev.id}
              onClick={() => {
                setActiveModalEvent(ev);
                setActiveLightboxIndex(0);
              }}
              className="relative group w-full max-w-[340px] sm:max-w-[360px] h-[430px] sm:h-[480px] border-[2.5px] border-[#182b2c] rounded-[40px] sm:rounded-[46px] overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer flex flex-col mx-auto bg-[#f9f6f0] text-center"
            >
              {/* Photo Container filling top ~68% seamlessly */}
              <div className="relative w-full h-[68%] overflow-hidden">
                <Image
                  src={ev.coverImage || "/media/gallery/Tezza_2025_07_07_170901960_1.webp"}
                  alt={ev.eventName || ev.cityName}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>

              {/* Text Area filling bottom ~32% with solid cream/white background */}
              <div className="relative w-full h-[32%] bg-[#f9f6f0] px-4 py-2.5 text-center flex flex-col items-center justify-center space-y-0.5 z-0">
                {/* Line 1: Event Name (SALongBeach font, bold, uppercase, teal color #00b4b6) */}
                <h3 className="font-salongbeach text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#00b4b6] leading-tight">
                  {ev.eventName || `ПОЩИЧКА В ${ev.cityName.toUpperCase()}`}
                </h3>

                {/* Line 2: Venue (Stampatello font, dark gray #182b2c) */}
                <p className="font-stampatello text-lg sm:text-xl font-normal text-[#182b2c] leading-snug">
                  {ev.venueName || `Локация в гр. ${ev.cityName}`}
                </p>

                {/* Line 3: Event Type (Stampatello font, teal color #00b4b6) */}
                <p className="font-stampatello text-sm sm:text-base font-normal text-[#00b4b6] leading-tight">
                  {ev.eventType || "сватбено тържество"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Lightbox Overlay Modal matching Screenshot 2 layout */}
      <AnimatePresence>
        {activeModalEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveModalEvent(null)}
          >
            <div
              className="relative max-w-5xl w-full bg-[#f9f6f0] rounded-[36px] overflow-hidden shadow-2xl border border-white/60 flex flex-col md:flex-row text-left font-sans max-h-[90vh] md:max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Side: Main Large Image */}
              <div className="w-full md:w-1/2 relative min-h-[300px] sm:min-h-[380px] md:min-h-[480px]">
                <Image
                  src={
                    (activeModalEvent.galleryImages && activeModalEvent.galleryImages[activeLightboxIndex]) ||
                    activeModalEvent.coverImage ||
                    "/media/gallery/Tezza_2025_07_07_170901960_1.webp"
                  }
                  alt={activeModalEvent.eventName || activeModalEvent.cityName}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Right Side: Info Content matching Screenshot 2 */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto relative">
                {/* Close Button in cyan circle ring */}
                <button
                  onClick={() => setActiveModalEvent(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full border-2 border-[#00b4b6] text-[#00b4b6] hover:bg-[#00b4b6] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-xs"
                  aria-label="Затвори"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-4 pr-6">
                  {/* Category / Type Tag */}
                  <span className="text-[#00b4b6] font-semibold text-xs uppercase tracking-wider block">
                    {activeModalEvent.eventType || "СВАТБЕНО ТЪРЖЕСТВО"}
                  </span>

                  {/* Main Title */}
                  <h3 className="font-salongbeach text-3xl sm:text-4xl font-bold uppercase tracking-wider text-[#182b2c] leading-tight">
                    {activeModalEvent.eventName || `ПОЩИЧКА В ${activeModalEvent.cityName.toUpperCase()}`}
                  </h3>

                  {/* Venue Name */}
                  <p className="font-sans text-xs sm:text-sm text-[#00b4b6] uppercase tracking-wider font-semibold">
                    {activeModalEvent.venueName || activeModalEvent.cityName}
                  </p>

                  {/* Paragraph Description */}
                  <p className="font-sans text-xs sm:text-sm text-[#182b2c]/85 leading-relaxed pt-1">
                    {activeModalEvent.description ||
                      "За събитието изготвихме авторски картички, стикери и татуировки за гостите. Персонализираното изживяване донесе много усмивки и спомени за цял живот!"}
                  </p>

                  {/* Thumbnails Row */}
                  {activeModalEvent.galleryImages && activeModalEvent.galleryImages.length > 0 && (
                    <div className="pt-2">
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {activeModalEvent.galleryImages.slice(0, 3).map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveLightboxIndex(idx)}
                            className={`relative h-20 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                              activeLightboxIndex === idx
                                ? "border-[#00b4b6] scale-105 shadow-md"
                                : "border-transparent opacity-80 hover:opacity-100"
                            }`}
                          >
                            <Image src={img} alt={`Снимка ${idx + 1}`} fill className="object-cover" unoptimized />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Row with Asset 72@2x.png heart icon */}
                <div className="pt-4 border-t border-[#00b4b6]/20 flex items-center space-x-3">
                  <div className="relative w-9 h-9 flex-shrink-0">
                    <Image
                      src={encodeURI("/media/За Пощичка/Asset 72@2x.png")}
                      alt="Автентичен спомен"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <span className="font-salongbeach text-[#00b4b6] font-bold text-base sm:text-lg uppercase tracking-wider">
                    АВТЕНТИЧЕН СПОМЕН ОТ ПОЩИЧКА
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
