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
  Upload,
  Tag,
  Building,
} from "lucide-react";
import { EventLocation, CreateEventLocationInput } from "@/types/map-event";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Preset Bulgarian cities with coordinates for quick selection
const bgCitiesPresets = [
  { name: "Бургас", lat: 42.5048, lng: 27.4626 },
  { name: "Созопол", lat: 42.4175, lng: 27.6958 },
  { name: "Поморие", lat: 42.5583, lng: 27.6444 },
  { name: "Несебър", lat: 42.6592, lng: 27.7354 },
  { name: "Каварна", lat: 43.4342, lng: 28.3392 },
  { name: "Варна", lat: 43.2141, lng: 27.9147 },
  { name: "Пловдив", lat: 42.1354, lng: 24.7453 },
  { name: "София", lat: 42.6977, lng: 23.3219 },
  { name: "Велико Търново", lat: 43.0757, lng: 25.6172 },
  { name: "Перущица", lat: 42.0567, lng: 24.5458 },
  { name: "Червен", lat: 43.6212, lng: 25.9961 },
];

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
    cityName: "Созопол",
    venueName: "",
    eventType: "сватбено тържество",
    latitude: 42.4175,
    longitude: 27.6958,
    coverImage: "",
    galleryImages: [],
    description: "",
    eventDate: new Date().toISOString().split("T")[0],
  });

  const [newGalleryUrl, setNewGalleryUrl] = useState("");

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerInstanceRef = useRef<any>(null);

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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          attributionControl: false,
        }).setView(
          [formData.latitude, formData.longitude],
          9
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "",
        }).addTo(map);

        const marker = L.marker([formData.latitude, formData.longitude], {
          draggable: true,
        }).addTo(map);

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

  useEffect(() => {
    if (mapInstanceRef.current && markerInstanceRef.current) {
      const lat = formData.latitude;
      const lng = formData.longitude;
      markerInstanceRef.current.setLatLng([lat, lng]);
      mapInstanceRef.current.panTo([lat, lng]);
    }
  }, [formData.latitude, formData.longitude]);

  const handleSelectCityPreset = (city: typeof bgCitiesPresets[0]) => {
    setFormData((prev) => ({
      ...prev,
      cityName: city.name,
      latitude: city.lat,
      longitude: city.lng,
    }));
  };

  const handleEdit = (event: EventLocation) => {
    setEditingId(event.id);
    setFormData({
      eventName: event.eventName || "",
      cityName: event.cityName,
      venueName: event.venueName || "",
      eventType: event.eventType || "сватбено тържество",
      latitude: event.latitude,
      longitude: event.longitude,
      coverImage: event.coverImage || "",
      galleryImages: event.galleryImages || [],
      description: event.description || "",
      eventDate: event.eventDate || new Date().toISOString().split("T")[0],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      eventName: "",
      cityName: "Созопол",
      venueName: "",
      eventType: "сватбено тържество",
      latitude: 42.4175,
      longitude: 27.6958,
      coverImage: "",
      galleryImages: [],
      description: "",
      eventDate: new Date().toISOString().split("T")[0],
    });
  };

  const handleUploadCoverFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setFormData((prev) => ({ ...prev, coverImage: dataUrl }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUploadGalleryFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl && !(formData.galleryImages || []).includes(dataUrl)) {
        setFormData((prev) => ({
          ...prev,
          galleryImages: [...(prev.galleryImages || []), dataUrl],
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cityName) {
      setErrorMsg("Моля, попълнете град или изберете такъв от картата.");
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

      setSuccessMsg(editingId ? "Локацията бе успешно обновена!" : "Новото събитие бе успешно добавено към картата!");
      handleCancelEdit();
      await fetchEvents();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Възникна неочаквана грешка.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name?: string) => {
    const displayName = name || "тази локация";
    if (!confirm(`Сигурни ли сте, че искате да изтриете локацията "${displayName}"?`)) return;

    try {
      const res = await fetch(`/api/map-events?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Грешка при изтриване.");

      setEvents((prev) => prev.filter((ev) => ev.id !== id));
      setSuccessMsg(`Локацията бе изтрита.`);
    } catch {
      setErrorMsg("Грешка при изтриване на локацията.");
    }
  };

  const handleAddGalleryImage = (url: string) => {
    if (!url.trim()) return;
    if ((formData.galleryImages || []).includes(url.trim())) return;
    setFormData((prev) => ({
      ...prev,
      galleryImages: [...(prev.galleryImages || []), url.trim()],
    }));
    setNewGalleryUrl("");
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: (prev.galleryImages || []).filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const filteredEvents = events.filter(
    (ev) =>
      (ev.eventName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.cityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ev.venueName || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 font-sans text-brand-dark">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-brand-primary/20 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 bg-brand-primary/20 px-3 py-1 rounded-full text-xs text-brand-accent font-semibold border border-brand-primary/40">
            <MapPin className="w-3.5 h-3.5" />
            <span>Добавяне на Нови Събития и Локации</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            Добавяне на Гостувания и Снимки на Пощичка
          </h1>
          <p className="text-xs sm:text-sm text-brand-dark/70">
            Добавете нови събития, на които е гостувала Пощичка — с място, описания и галерия от снимки!
          </p>
        </div>

        <Button
          onClick={fetchEvents}
          variant="outline"
          size="sm"
          className="border-brand-primary/30 text-brand-dark hover:bg-brand-secondary"
        >
          <RefreshCw className={`w-4 h-4 mr-2 text-brand-accent ${loading ? "animate-spin" : ""}`} />
          <span>Обнови</span>
        </Button>
      </div>

      {/* Messages */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg("")} className="hover:opacity-75 text-emerald-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-2">
            <X className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg("")} className="hover:opacity-75 text-red-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Grid: Form & Interactive Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <Card className="lg:col-span-6 p-6 sm:p-8 bg-white border border-brand-primary/20 shadow-sm rounded-3xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-brand-primary/10">
            <h2 className="font-serif text-xl font-bold text-brand-dark flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-brand-accent" />
              <span>{editingId ? "Редактиране на събитие" : "Добави ново събитие на Пощичка"}</span>
            </h2>
            {editingId && (
              <button
                onClick={handleCancelEdit}
                className="text-xs text-brand-accent font-semibold hover:underline flex items-center space-x-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Отказ</span>
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title / Couple */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark">Име на събитието / Двойката *</label>
              <input
                type="text"
                required
                value={formData.eventName}
                onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                placeholder="напр. ГЕРИ И КРАСИ, МИЛКА И АНДРЕЙ"
                className="w-full px-4 py-3 rounded-xl border border-brand-primary/30 bg-brand-bg text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all font-sans"
              />
            </div>

            {/* City & Venue */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark">Град / Локация *</label>
                <input
                  type="text"
                  required
                  value={formData.cityName}
                  onChange={(e) => setFormData({ ...formData, cityName: e.target.value })}
                  placeholder="напр. Созопол, София, Каварна"
                  className="w-full px-4 py-3 rounded-xl border border-brand-primary/30 bg-brand-bg text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark flex items-center space-x-1">
                  <Building className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Име на локацията / Комплекса</span>
                </label>
                <input
                  type="text"
                  value={formData.venueName}
                  onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                  placeholder="напр. Комплекс Свети Тома, Вила Юстина"
                  className="w-full px-4 py-3 rounded-xl border border-brand-primary/30 bg-brand-bg text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all font-sans"
                />
              </div>
            </div>

            {/* Event Type & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark flex items-center space-x-1">
                  <Tag className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Вид на събитието</span>
                </label>
                <input
                  type="text"
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  placeholder="напр. сватбено тържество, кръщение"
                  className="w-full px-4 py-3 rounded-xl border border-brand-primary/30 bg-brand-bg text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Дата</span>
                </label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-brand-primary/30 bg-brand-bg text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all font-sans cursor-pointer"
                />
              </div>
            </div>

            {/* Quick City Presets */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-brand-dark/70">Бърз избор на град:</span>
              <div className="flex flex-wrap gap-1.5">
                {bgCitiesPresets.map((city) => (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => handleSelectCityPreset(city)}
                    className={`text-xs px-3 py-1 rounded-xl border transition-all ${
                      formData.cityName === city.name
                        ? "bg-brand-accent text-white font-bold border-brand-accent shadow-xs"
                        : "bg-brand-bg border-brand-primary/30 text-brand-dark hover:bg-brand-secondary"
                    }`}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Coordinates */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-brand-secondary/30 border border-brand-primary/20">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-brand-dark/80">Ширина (Lat)</label>
                <input
                  type="number"
                  step="0.000001"
                  required
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-brand-primary/30 text-brand-dark font-mono text-xs focus:outline-none focus:ring-1 focus:ring-brand-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-brand-dark/80">Дължина (Lng)</label>
                <input
                  type="number"
                  step="0.000001"
                  required
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-brand-primary/30 text-brand-dark font-mono text-xs focus:outline-none focus:ring-1 focus:ring-brand-accent"
                />
              </div>
            </div>

            {/* Cover Image */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-brand-dark flex items-center space-x-1">
                <ImageIcon className="w-4 h-4 text-brand-accent" />
                <span>Основна снимка за събитието</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="URL адрес на снимка..."
                  className="w-full px-3 py-2 rounded-xl border border-brand-primary/30 bg-brand-bg text-brand-dark text-xs focus:outline-none focus:ring-1 focus:ring-brand-accent"
                />

                <label className="cursor-pointer flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl border border-dashed border-brand-accent/60 bg-brand-secondary/40 text-brand-dark hover:bg-brand-secondary text-xs font-semibold transition-colors">
                  <Upload className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Прикачи файл от устройството</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadCoverFile}
                    className="hidden"
                  />
                </label>
              </div>

              {formData.coverImage && (
                <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-brand-primary/30 shadow-xs">
                  <Image src={formData.coverImage} alt="Корица Преглед" fill className="object-cover" unoptimized />
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, coverImage: "" }))}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full shadow-xs"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Gallery Images */}
            <div className="space-y-3 pt-2 border-t border-brand-primary/10">
              <label className="text-xs font-semibold text-brand-dark flex items-center space-x-1">
                <Layers className="w-4 h-4 text-brand-accent" />
                <span>Галерия със допълнителни кадри ({formData.galleryImages?.length || 0})</span>
              </label>

              {(formData.galleryImages?.length || 0) > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {(formData.galleryImages || []).map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="relative group h-20 rounded-xl overflow-hidden border border-brand-primary/30 bg-brand-bg"
                    >
                      <Image src={imgUrl} alt={`Снимка ${idx + 1}`} fill className="object-cover" unoptimized />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-xs"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    placeholder="URL на снимка..."
                    className="flex-1 px-3 py-2 rounded-xl border border-brand-primary/30 bg-brand-bg text-xs text-brand-dark placeholder:text-brand-dark/40 focus:outline-none"
                  />
                  <Button
                    type="button"
                    onClick={() => handleAddGalleryImage(newGalleryUrl)}
                    size="sm"
                    variant="outline"
                    className="border-brand-primary/40 text-brand-dark hover:bg-brand-secondary"
                  >
                    <Plus className="w-4 h-4 text-brand-accent" />
                  </Button>
                </div>

                <label className="cursor-pointer flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl border border-dashed border-brand-accent/60 bg-brand-secondary/40 text-brand-dark hover:bg-brand-secondary text-xs font-semibold transition-colors">
                  <Upload className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Качи още снимка</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadGalleryFile}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-brand-dark/60 font-medium">Или бърз избор от мострите:</span>
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {sampleGalleryAssets.map((asset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleAddGalleryImage(asset)}
                      className="relative w-10 h-10 rounded-lg overflow-hidden border border-brand-primary/30 hover:scale-105 transition-transform flex-shrink-0 shadow-xs"
                    >
                      <Image src={asset} alt="Sample" fill className="object-cover" unoptimized />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark">Текст и описание за събитието</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="напр. За сватбения ден на Гери и Краси изготвихме 2 марки, стикер и татуировка..."
                className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 bg-brand-bg text-brand-dark placeholder:text-brand-dark/40 text-xs focus:outline-none focus:ring-2 focus:ring-brand-accent"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 pt-4">
              <Button
                type="submit"
                variant="accent"
                disabled={saving}
                className="flex-1 py-3 font-semibold shadow-md"
              >
                <Save className="w-4 h-4 mr-2" />
                <span>{saving ? "Записване..." : editingId ? "Обнови събитието" : "Запази новото събитие"}</span>
              </Button>

              {editingId && (
                <Button
                  type="button"
                  onClick={handleCancelEdit}
                  variant="outline"
                  className="border-brand-primary/40 text-brand-dark hover:bg-brand-secondary"
                >
                  Отказ
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* Map Picker Column */}
        <Card className="lg:col-span-6 p-6 sm:p-8 bg-white border border-brand-primary/20 shadow-sm rounded-3xl space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-brand-dark flex items-center space-x-2">
                <Navigation className="w-5 h-5 text-brand-accent animate-pulse" />
                <span>Кликнете за пин на събитието</span>
              </h2>
              <span className="text-xs font-semibold text-brand-accent bg-brand-primary/20 px-3 py-1 rounded-full border border-brand-primary/40">
                Карта на Локациите
              </span>
            </div>
            <p className="text-xs text-brand-dark/70">
              Кликнете върху картата на България за да посочите координати на събитието.
            </p>
          </div>

          <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-brand-primary/30 shadow-inner z-10">
            <div ref={mapContainerRef} className="w-full h-full" />
            <div className="absolute top-3 right-3 z-[1000] bg-brand-dark/90 text-white backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-[11px] font-mono shadow-md">
              📍 {formData.latitude}, {formData.longitude}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-brand-secondary/30 border border-brand-primary/20 text-xs text-brand-dark/80 space-y-1">
            <span className="font-bold text-brand-accent">💡 Добавяне на събития:</span>
            <p>
              Можете да добавяте неограничен брой нови събития със снимки и описания за всеки град!
            </p>
          </div>
        </Card>
      </div>

      {/* List of Saved Map Events */}
      <Card className="p-6 sm:p-8 bg-white border border-brand-primary/20 shadow-sm rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-primary/10">
          <div>
            <h2 className="font-serif text-2xl font-bold text-brand-dark flex items-center space-x-2">
              <MapPin className="w-6 h-6 text-brand-accent" />
              <span>Всички Добавени Събития ({filteredEvents.length})</span>
            </h2>
            <p className="text-xs text-brand-dark/70">
              Управление на всички гостувания и локации на Пощичка.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-brand-dark/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Търсене по име или град..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-brand-primary/30 bg-brand-bg text-xs text-brand-dark placeholder:text-brand-dark/40 focus:outline-none focus:ring-1 focus:ring-brand-accent"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-brand-dark/60 space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand-accent" />
            <p className="text-xs font-medium">Зареждане на събитията...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="py-12 text-center text-brand-dark/50 space-y-2 border border-dashed border-brand-primary/30 rounded-2xl">
            <MapPin className="w-8 h-8 mx-auto text-brand-dark/30" />
            <p className="text-sm font-medium">Няма намерени събития.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const title = event.eventName && event.eventName.trim() ? event.eventName : `Пощичка в ${event.cityName}`;
              const hasCover = Boolean(event.coverImage && event.coverImage.trim());

              return (
                <div
                  key={event.id}
                  className="group relative bg-white border border-brand-primary/20 hover:border-brand-accent/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
                >
                  <div className="relative w-full h-44 bg-gradient-to-br from-brand-accent/30 via-brand-primary/20 to-brand-secondary flex items-center justify-center">
                    {hasCover ? (
                      <Image
                        src={event.coverImage!}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-brand-accent space-y-1 p-4 text-center">
                        <MapPin className="w-10 h-10 animate-bounce text-brand-accent" />
                        <span className="font-serif font-bold text-sm text-brand-dark">Пощичка бе тук!</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    
                    <div className="absolute top-3 left-3 bg-brand-dark/90 text-white backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold border border-white/20 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-brand-primary" />
                      <span>{event.cityName}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="font-serif font-bold text-lg leading-tight drop-shadow-md">
                        {title}
                      </h3>
                      <p className="text-[11px] text-white/90 font-mono mt-0.5">
                        {event.venueName ? `${event.venueName} • ` : ""}{event.cityName}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-brand-dark/80 line-clamp-2 leading-relaxed font-sans">
                      {event.description || `Пощичка на гостуване и събитие в ${event.cityName}.`}
                    </p>

                    <div className="flex items-center justify-between text-xs text-brand-dark/70 pt-2 border-t border-brand-primary/10 font-sans">
                      <span className="flex items-center space-x-1 font-medium">
                        <ImageIcon className="w-3.5 h-3.5 text-brand-accent" />
                        <span>{event.galleryImages?.length || 0} снимки</span>
                      </span>
                      {event.eventDate && (
                        <span className="text-[11px] font-mono text-brand-dark/50">{event.eventDate}</span>
                      )}
                    </div>
                  </div>

                  <div className="p-3 bg-brand-secondary/30 border-t border-brand-primary/10 flex items-center justify-end space-x-2">
                    <Button
                      onClick={() => handleEdit(event)}
                      size="sm"
                      variant="outline"
                      className="border-brand-primary/40 text-brand-dark hover:bg-brand-secondary text-xs py-1 h-8"
                    >
                      <Edit2 className="w-3.5 h-3.5 mr-1 text-brand-accent" />
                      <span>Редактирай</span>
                    </Button>

                    <Button
                      onClick={() => handleDelete(event.id, title)}
                      size="sm"
                      variant="outline"
                      className="border-red-200 text-red-700 hover:bg-red-50 text-xs py-1 h-8"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1" />
                      <span>Изтрий</span>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};
