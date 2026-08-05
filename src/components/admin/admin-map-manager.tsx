"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  MapPin,
  Plus,
  Trash2,
  Edit2,
  Image as ImageIcon,
  Save,
  Search,
  CheckCircle2,
  X,
  RefreshCw,
  Calendar,
  Layers,
  Sparkles,
  Navigation,
} from "lucide-react";
import { EventLocation, CreateEventLocationInput } from "@/types/map-event";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Preset Bulgarian cities with coordinates for quick pan
const bgCitiesPresets = [
  { name: "Бургас", lat: 42.5048, lng: 27.4626 },
  { name: "Созопол", lat: 42.4175, lng: 27.6958 },
  { name: "Поморие", lat: 42.5583, lng: 27.6444 },
  { name: "Несебър", lat: 42.6592, lng: 27.7354 },
  { name: "Варна", lat: 43.2141, lng: 27.9147 },
  { name: "Пловдив", lat: 42.1354, lng: 24.7453 },
  { name: "София", lat: 42.6977, lng: 23.3219 },
  { name: "Банско", lat: 41.8383, lng: 23.4885 },
];

// Preset demo gallery images for easy picking
const sampleGalleryAssets = [
  "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
  "/media/gallery/Tezza_2025_07_07_152559638_1.webp",
  "/media/gallery/Tezza_2025_07_13_155324686.webp",
  "/media/gallery/Tezza_2025_07_13_155326413.webp",
  "/media/gallery/Tezza_2025_07_13_155331795.webp",
  "/media/gallery/Tezza_2025_07_13_155333570.webp",
];

export const AdminMapManager = () => {
  const [events, setEvents] = useState<EventLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<CreateEventLocationInput>({
    eventName: "",
    cityName: "Бургас",
    latitude: 42.5048,
    longitude: 27.4626,
    coverImage: "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
    galleryImages: [
      "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
      "/media/gallery/Tezza_2025_07_13_155324686.webp",
    ],
    description: "",
    eventDate: new Date().toISOString().split("T")[0],
  });

  const [newGalleryUrl, setNewGalleryUrl] = useState("");

  // Map Container Ref
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerInstanceRef = useRef<any>(null);

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/map-events");
      const data = await res.json();
      if (data.events) {
        setEvents(data.events);
      }
    } catch {
      setErrorMsg("Грешка при зареждане на локациите за картата.");
    } finally {
      setLoading(false);
    }
  };

  // Initialize interactive Leaflet map
  useEffect(() => {
    let isMounted = true;

    // Dynamically load Leaflet CSS if not already injected
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    // Load Leaflet library dynamically
    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Fix default Leaflet icon paths
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!mapInstanceRef.current) {
        // Create Leaflet map centered at form coordinates
        const map = L.map(mapContainerRef.current).setView(
          [formData.latitude, formData.longitude],
          9
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        const marker = L.marker([formData.latitude, formData.longitude], {
          draggable: true,
        }).addTo(map);

        // Update coordinates on drag or map click
        marker.on("dragend", (e) => {
          const latLng = e.target.getLatLng();
          setFormData((prev) => ({
            ...prev,
            latitude: Number(latLng.lat.toFixed(6)),
            longitude: Number(latLng.lng.toFixed(6)),
          }));
        });

        map.on("click", (e) => {
          const { lat, lng } = e.latlng;
          marker.setLatLng([lat, lng]);
          setFormData((prev) => ({
            ...prev,
            latitude: Number(lat.toFixed(6)),
            longitude: Number(lng.toFixed(6)),
          }));
        });

        mapInstanceRef.current = map;
        markerInstanceRef.current = marker;
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Sync marker when form coordinates or city preset changes
  useEffect(() => {
    if (mapInstanceRef.current && markerInstanceRef.current) {
      const lat = formData.latitude;
      const lng = formData.longitude;
      markerInstanceRef.current.setLatLng([lat, lng]);
      mapInstanceRef.current.panTo([lat, lng]);
    }
  }, [formData.latitude, formData.longitude]);

  // Handle City Preset Click
  const handleSelectCityPreset = (city: typeof bgCitiesPresets[0]) => {
    setFormData((prev) => ({
      ...prev,
      cityName: city.name,
      latitude: city.lat,
      longitude: city.lng,
    }));
  };

  // Handle Edit Event
  const handleEdit = (event: EventLocation) => {
    setEditingId(event.id);
    setFormData({
      eventName: event.eventName,
      cityName: event.cityName,
      latitude: event.latitude,
      longitude: event.longitude,
      coverImage: event.coverImage,
      galleryImages: event.galleryImages && event.galleryImages.length > 0 ? event.galleryImages : [event.coverImage],
      description: event.description || "",
      eventDate: event.eventDate || new Date().toISOString().split("T")[0],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle Reset / Cancel Edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      eventName: "",
      cityName: "Бургас",
      latitude: 42.5048,
      longitude: 27.4626,
      coverImage: "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
      galleryImages: [
        "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
        "/media/gallery/Tezza_2025_07_13_155324686.webp",
      ],
      description: "",
      eventDate: new Date().toISOString().split("T")[0],
    });
  };

  // Handle Form Submit (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.eventName || !formData.cityName || !formData.coverImage) {
      setErrorMsg("Моля, попълнете заглавието на събитието, града и коричната снимка.");
      return;
    }

    setSaving(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const endpoint = "/api/map-events";
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { id: editingId, ...formData } : formData;

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Грешка при запис на събитието.");
      }

      setSuccessMsg(editingId ? "Събитието бе успешно обновено!" : "Новата локация бе успешно добавена към картата!");
      handleCancelEdit();
      await fetchEvents();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Възникна неочаквана грешка.");
    } finally {
      setSaving(false);
    }
  };

  // Handle Delete Event
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Сигурни ли сте, че искате да изтриете локацията "${name}"?`)) return;

    try {
      const res = await fetch(`/api/map-events?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Грешка при изтриване.");

      setEvents((prev) => prev.filter((ev) => ev.id !== id));
      setSuccessMsg(`Локацията "${name}" бе изтрита.`);
    } catch {
      setErrorMsg("Грешка при изтриване на локацията.");
    }
  };

  // Add Image to Gallery
  const handleAddGalleryImage = (url: string) => {
    if (!url.trim()) return;
    if (formData.galleryImages.includes(url)) return;
    setFormData((prev) => ({
      ...prev,
      galleryImages: [...prev.galleryImages, url.trim()],
    }));
    setNewGalleryUrl("");
  };

  // Remove Image from Gallery
  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const filteredEvents = events.filter(
    (ev) =>
      ev.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.cityName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 font-sans text-white">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-brand-accent/20 via-brand-primary/10 to-transparent p-6 rounded-3xl border border-brand-accent/30 shadow-lg">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 bg-brand-accent/20 px-3 py-1 rounded-full text-xs text-brand-primary font-medium border border-brand-accent/40">
            <MapPin className="w-3.5 h-3.5" />
            <span>Интерактивна Карта със Спомени</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Управление на Картата с Локации (`&lt;MapGallery /&gt;`)
          </h1>
          <p className="text-xs sm:text-sm text-white/70">
            Добавяйте, редактирайте и позиционирайте събития на картата с живи снимки за Вашите гости.
          </p>
        </div>

        <Button
          onClick={fetchEvents}
          variant="outline"
          size="sm"
          className="border-white/20 text-white hover:bg-white/10"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Обнови
        </Button>
      </div>

      {/* Messages */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-sm flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg("")} className="hover:opacity-75">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-200 text-sm flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <X className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg("")} className="hover:opacity-75">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Grid: Form & Interactive Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <Card className="lg:col-span-6 p-6 sm:p-8 bg-white/5 border border-white/10 rounded-3xl space-y-6 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h2 className="font-serif text-xl font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-brand-primary" />
              <span>{editingId ? "Редактиране на събитие" : "Ново събитие на картата"}</span>
            </h2>
            {editingId && (
              <button
                onClick={handleCancelEdit}
                className="text-xs text-brand-primary hover:underline flex items-center space-x-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Отказ</span>
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Event Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/80">Име на събитието / Двойка *</label>
              <input
                type="text"
                required
                value={formData.eventName}
                onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                placeholder="напр. Сватба: Светлана & Димитър"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
              />
            </div>

            {/* City Name & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/80">Град / Локация *</label>
                <input
                  type="text"
                  required
                  value={formData.cityName}
                  onChange={(e) => setFormData({ ...formData, cityName: e.target.value })}
                  placeholder="напр. Созопол"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-brand-primary transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/80 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                  <span>Дата на събитието</span>
                </label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-brand-primary transition-all"
                />
              </div>
            </div>

            {/* Quick City Presets */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-white/60">Бърз избор на регион в България:</span>
              <div className="flex flex-wrap gap-1.5">
                {bgCitiesPresets.map((city) => (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => handleSelectCityPreset(city)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                      formData.cityName === city.name
                        ? "bg-brand-primary/30 border-brand-primary text-brand-primary font-bold"
                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Coordinates Lat / Lng */}
            <div className="grid grid-cols-2 gap-4 p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-white/70">Ширина (Latitude)</label>
                <input
                  type="number"
                  step="0.000001"
                  required
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-brand-primary font-mono text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-white/70">Дължина (Longitude)</label>
                <input
                  type="number"
                  step="0.000001"
                  required
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-brand-primary font-mono text-xs focus:outline-none"
                />
              </div>
            </div>

            {/* Cover Image Selection */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/80 flex items-center space-x-1">
                <ImageIcon className="w-4 h-4 text-brand-accent" />
                <span>Основна Корична Снимка (Cover Image URL) *</span>
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="/media/gallery/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-brand-primary"
                />
              </div>

              {/* Cover Image Preview */}
              {formData.coverImage && (
                <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-white/20 shadow-md">
                  <Image
                    src={formData.coverImage}
                    alt="Корица Преглед"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] text-white">
                    Корична снимка
                  </div>
                </div>
              )}
            </div>

            {/* Gallery Images List & Picker */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <label className="text-xs font-medium text-white/80 flex items-center justify-between">
                <span className="flex items-center space-x-1">
                  <Layers className="w-4 h-4 text-brand-primary" />
                  <span>Галерия със снимки за локацията ({formData.galleryImages.length})</span>
                </span>
              </label>

              {/* Existing Gallery Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {formData.galleryImages.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="relative group h-20 rounded-xl overflow-hidden border border-white/20 bg-black/40"
                  >
                    <Image src={imgUrl} alt={`Снимка ${idx + 1}`} fill className="object-cover" unoptimized />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-600/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Премахни снимка"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Gallery Image URL */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newGalleryUrl}
                  onChange={(e) => setNewGalleryUrl(e.target.value)}
                  placeholder="Добави URL на снимка за галерията..."
                  className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none"
                />
                <Button
                  type="button"
                  onClick={() => handleAddGalleryImage(newGalleryUrl)}
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Добави
                </Button>
              </div>

              {/* Sample Preset Thumbnails quick add */}
              <div className="space-y-1">
                <span className="text-[10px] text-white/50">Быстро кликнете за добавяне от налични медии:</span>
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {sampleGalleryAssets.map((asset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleAddGalleryImage(asset)}
                      className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/20 hover:scale-105 transition-transform flex-shrink-0"
                    >
                      <Image src={asset} alt="Sample" fill className="object-cover" unoptimized />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/80">Кратко описание за спомена</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Кратък отзив или описание на атмосферата..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-xs focus:outline-none focus:border-brand-primary"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 pt-4">
              <Button
                type="submit"
                variant="accent"
                disabled={saving}
                className="flex-1 py-3 font-semibold shadow-lg"
              >
                <Save className="w-4 h-4 mr-2" />
                <span>{saving ? "Записване..." : editingId ? "Обнови събитието" : "Запази на картата"}</span>
              </Button>

              {editingId && (
                <Button
                  type="button"
                  onClick={handleCancelEdit}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Отказ
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* Map Picker Column */}
        <Card className="lg:col-span-6 p-6 sm:p-8 bg-white/5 border border-white/10 rounded-3xl space-y-4 backdrop-blur-md shadow-2xl flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-white flex items-center space-x-2">
                <Navigation className="w-5 h-5 text-brand-accent animate-pulse" />
                <span>Кликнете върху картата за избор на пин</span>
              </h2>
              <span className="text-xs text-brand-primary bg-brand-primary/20 px-2.5 py-1 rounded-full border border-brand-primary/30">
                Интерактивна GPS иконизация
              </span>
            </div>
            <p className="text-xs text-white/70">
              Кликнете или плъзнете маркера върху точната локация. Координатите се попълват автоматически.
            </p>
          </div>

          {/* Interactive Leaflet Map Container */}
          <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-white/20 shadow-inner z-10">
            <div ref={mapContainerRef} className="w-full h-full" />
            <div className="absolute top-3 right-3 z-[1000] bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-[11px] text-white font-mono shadow-md">
              📍 {formData.latitude}, {formData.longitude}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/70 space-y-1">
            <span className="font-bold text-brand-primary">💡 Подсказка:</span>
            <p>
              Можете да кликвате върху произволно място на картата или да плъзгате маркера. За бърз избор на регион използвайте бутоните под полето &quot;Град&quot;.
            </p>
          </div>
        </Card>
      </div>

      {/* List of Saved Map Events */}
      <Card className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-3xl space-y-6 backdrop-blur-md shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <h2 className="font-serif text-2xl font-bold text-white flex items-center space-x-2">
              <MapPin className="w-6 h-6 text-brand-accent" />
              <span>Запазени Локации ({filteredEvents.length})</span>
            </h2>
            <p className="text-xs text-white/60">
              Управление на публичните пинове, показани в компонента &lt;MapGallery /&gt;.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Търсене по име или град..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-brand-primary"
            />
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="py-12 text-center text-white/60 space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand-primary" />
            <p className="text-xs">Зареждане на локациите...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="py-12 text-center text-white/50 space-y-2 border border-dashed border-white/10 rounded-2xl">
            <MapPin className="w-8 h-8 mx-auto text-white/30" />
            <p className="text-sm">Няма намерени локации.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group relative bg-white/5 border border-white/10 hover:border-brand-primary/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg flex flex-col justify-between"
              >
                {/* Cover Image */}
                <div className="relative w-full h-44 bg-black/40">
                  <Image
                    src={event.coverImage}
                    alt={event.eventName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-brand-dark/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-brand-primary border border-brand-primary/30 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-brand-accent" />
                    <span>{event.cityName}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-serif font-bold text-lg leading-tight drop-shadow-md">
                      {event.eventName}
                    </h3>
                    <p className="text-[11px] text-white/80 font-mono mt-0.5">
                      GPS: {event.latitude}, {event.longitude}
                    </p>
                  </div>
                </div>

                {/* Content & Gallery Info */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-white/70 line-clamp-2 leading-relaxed font-sans">
                    {event.description || "Интерактивно събитие с персонализирани спомени."}
                  </p>

                  <div className="flex items-center justify-between text-xs text-white/60 pt-2 border-t border-white/10">
                    <span className="flex items-center space-x-1">
                      <ImageIcon className="w-3.5 h-3.5 text-brand-primary" />
                      <span>{event.galleryImages?.length || 1} снимки</span>
                    </span>
                    {event.eventDate && (
                      <span className="text-[11px] font-mono text-white/50">{event.eventDate}</span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-3 bg-black/30 border-t border-white/10 flex items-center justify-end space-x-2">
                  <Button
                    onClick={() => handleEdit(event)}
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 text-xs py-1 h-8"
                  >
                    <Edit2 className="w-3.5 h-3.5 mr-1 text-brand-primary" />
                    Редактирай
                  </Button>

                  <Button
                    onClick={() => handleDelete(event.id, event.eventName)}
                    size="sm"
                    variant="outline"
                    className="border-red-500/30 text-red-300 hover:bg-red-500/20 text-xs py-1 h-8"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                    Изтрий
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
