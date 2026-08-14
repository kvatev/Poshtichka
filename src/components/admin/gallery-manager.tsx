"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Edit2,
  Image as ImageIcon,
  CheckCircle2,
  Save,
  X,
  Calendar as CalendarIcon,
  MapPin,
  Upload,
  AlertTriangle,
  Building,
  Navigation,
  Link as LinkIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EventLocation } from "@/types/map-event";

// Preset Bulgarian cities with default coordinates
const bgCitiesPresets = [
  { name: "Созопол", lat: 42.4175, lng: 27.6958 },
  { name: "Каварна", lat: 43.4342, lng: 28.3392 },
  { name: "София", lat: 42.6977, lng: 23.3219 },
  { name: "Червен", lat: 43.6212, lng: 25.9961 },
  { name: "Перущица", lat: 42.0567, lng: 24.5458 },
  { name: "Велико Търново", lat: 43.0757, lng: 25.6172 },
  { name: "Бургас", lat: 42.5048, lng: 27.4626 },
  { name: "Пловдив", lat: 42.1354, lng: 24.7453 },
  { name: "Варна", lat: 43.2141, lng: 27.9147 },
];

/**
 * Client-side automatic image loader and WebP converter.
 * Converts PNG, JPG, or WEBP files to high-quality compressed WebP data URLs.
 */
const processFileToWebp = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const isWebp = file.type === "image/webp" || file.name.toLowerCase().endsWith(".webp");
    const reader = new FileReader();

    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (!src) return reject(new Error("Грешка при четене на файла."));

      if (isWebp) {
        return resolve(src);
      }

      // Convert PNG/JPG to WebP via Canvas
      const img = new window.Image();
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth || img.width || 800;
          canvas.height = img.naturalHeight || img.height || 600;
          const ctx = canvas.getContext("2d");
          if (!ctx) return resolve(src);
          ctx.drawImage(img, 0, 0);
          const webpDataUrl = canvas.toDataURL("image/webp", 0.85);
          resolve(webpDataUrl);
        } catch {
          resolve(src);
        }
      };
      img.onerror = () => resolve(src);
      img.src = src;
    };

    reader.onerror = () => reject(new Error("Неуспешно четене на снимката."));
    reader.readAsDataURL(file);
  });
};

export const GalleryManager = () => {
  const [items, setItems] = useState<EventLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<EventLocation | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Form State
  const [eventName, setEventName] = useState("");
  const [cityName, setCityName] = useState("Созопол");
  const [venueName, setVenueName] = useState("");
  const [eventType, setEventType] = useState("сватбено тържество");
  const [latitude, setLatitude] = useState<number>(42.4175);
  const [longitude, setLongitude] = useState<number>(27.6958);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [customPathInput, setCustomPathInput] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");

  // Map Container Ref for Modal
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerInstanceRef = useRef<any>(null);

  const fetchItems = () => {
    setLoading(true);
    fetch("/api/map-events")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.events)) {
          setItems(data.events);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Initialize modal map when modal opens
  useEffect(() => {
    if (!showModal) {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerInstanceRef.current = null;
      }
      return;
    }

    let isMounted = true;

    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const timer = setTimeout(() => {
      import("leaflet").then((L) => {
        if (!isMounted || !mapContainerRef.current) return;

        if (!mapInstanceRef.current) {
          const map = L.map(mapContainerRef.current, {
            attributionControl: false,
          }).setView([latitude, longitude], 9);

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "",
          }).addTo(map);

          const customBoothIcon = L.icon({
            iconUrl: encodeURI("/media/Галерия/Asset 82@2x.png"),
            iconSize: [40, 44],
            iconAnchor: [20, 44],
          });

          const marker = L.marker([latitude, longitude], {
            icon: customBoothIcon,
            draggable: true,
          }).addTo(map);

          marker.on("dragend", (e) => {
            const latLng = e.target.getLatLng();
            setLatitude(Number(latLng.lat.toFixed(6)));
            setLongitude(Number(latLng.lng.toFixed(6)));
          });

          map.on("click", (e) => {
            const { lat, lng } = e.latlng;
            marker.setLatLng([lat, lng]);
            setLatitude(Number(lat.toFixed(6)));
            setLongitude(Number(lng.toFixed(6)));
          });

          mapInstanceRef.current = map;
          markerInstanceRef.current = marker;
        }
      });
    }, 150);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [showModal, latitude, longitude]);

  // Sync marker position when coordinates change
  useEffect(() => {
    if (mapInstanceRef.current && markerInstanceRef.current) {
      markerInstanceRef.current.setLatLng([latitude, longitude]);
      mapInstanceRef.current.panTo([latitude, longitude]);
    }
  }, [latitude, longitude]);

  const openAddModal = () => {
    setEditingItem(null);
    setEventName("");
    setCityName("Созопол");
    setVenueName("");
    setEventType("сватбено тържество");
    setLatitude(42.4175);
    setLongitude(27.6958);
    setGalleryImages([]); // Start clean with 0/4 images so user can upload theirs!
    setCustomPathInput("");
    setDescription("");
    setEventDate(new Date().toISOString().split("T")[0]);
    setErrorMsg("");
    setSuccessMsg("");
    setShowModal(true);
  };

  const openEditModal = (item: EventLocation) => {
    setEditingItem(item);
    setEventName(item.eventName || "");
    setCityName(item.cityName);
    setVenueName(item.venueName || "");
    setEventType(item.eventType || "сватбено тържество");
    setLatitude(item.latitude);
    setLongitude(item.longitude);
    const existing = item.galleryImages && item.galleryImages.length > 0 ? item.galleryImages : [item.coverImage || ""];
    setGalleryImages(existing.filter((img) => Boolean(img)));
    setCustomPathInput("");
    setDescription(item.description || "");
    setEventDate(item.eventDate || new Date().toISOString().split("T")[0]);
    setErrorMsg("");
    setSuccessMsg("");
    setShowModal(true);
  };

  const handleSelectCityPreset = (city: typeof bgCitiesPresets[0]) => {
    setCityName(city.name);
    setLatitude(city.lat);
    setLongitude(city.lng);
  };

  // Image Upload Handler with Automatic WebP Conversion & Max 4 Images limit
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setErrorMsg("");

    const currentCount = galleryImages.length;
    const availableSlots = 4 - currentCount;

    if (availableSlots <= 0) {
      setErrorMsg("Можете да качите максимум до 4 снимки за едно събитие.");
      e.target.value = "";
      return;
    }

    const selectedFiles = Array.from(files).slice(0, availableSlots);

    try {
      const convertedDataUrls = await Promise.all(
        selectedFiles.map((file) => processFileToWebp(file))
      );

      setGalleryImages((prev) => [...prev, ...convertedDataUrls].slice(0, 4));
    } catch {
      setErrorMsg("Възникна грешка при обработка на снимките.");
    } finally {
      e.target.value = ""; // Reset input so same file can be re-selected if needed
    }
  };

  const handleAddCustomPath = () => {
    if (!customPathInput.trim()) return;
    if (galleryImages.length >= 4) {
      setErrorMsg("Можете да добавите максимум до 4 снимки за едно събитие.");
      return;
    }

    setGalleryImages((prev) => [...prev, customPathInput.trim()].slice(0, 4));
    setCustomPathInput("");
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setGalleryImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName.trim()) {
      setErrorMsg("Моля, попълнете заглавие/име на събитието.");
      return;
    }
    if (!cityName.trim()) {
      setErrorMsg("Моля, изберете град/локация.");
      return;
    }
    if (galleryImages.length === 0) {
      setErrorMsg("Моля, качете поне 1 снимка за събитието.");
      return;
    }

    setSaving(true);
    setErrorMsg("");
    setSuccessMsg("");

    const payload = {
      id: editingItem?.id,
      eventName: eventName.trim(),
      cityName: cityName.trim(),
      venueName: venueName.trim(),
      eventType: eventType.trim(),
      latitude,
      longitude,
      coverImage: galleryImages[0] || "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
      galleryImages: galleryImages.slice(0, 4),
      description: description.trim(),
      eventDate,
    };

    try {
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch("/api/map-events", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccessMsg(editingItem ? "Събитието бе обновено успешно!" : "Новото събитие бе добавено в галерията!");
        fetchItems();
        setTimeout(() => {
          setShowModal(false);
          setSuccessMsg("");
        }, 1000);
      } else {
        throw new Error("Грешка при запис.");
      }
    } catch {
      setErrorMsg("Възникна грешка при запазването на събитието.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Сигурни ли сте, че искате да премахнете това събитие от галерията?")) return;

    try {
      const res = await fetch(`/api/map-events?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }
    } catch {
      alert("Грешка при изтриването.");
    }
  };

  return (
    <div className="space-y-6 font-sans text-[#182b2c]">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#00b4b6]/20 shadow-sm">
        <div>
          <h2 className="font-salongbeach text-2xl font-bold uppercase tracking-wider text-[#182b2c]">
            Управление на Галерията & Събитията ({items.length})
          </h2>
          <p className="text-xs text-[#182b2c]/70 mt-1">
            Добавяйте събития с точна локация на картата и до 4 WebP снимки!
          </p>
        </div>

        <Button
          onClick={openAddModal}
          className="bg-[#00b4b6] hover:bg-[#008b8d] text-white font-salongbeach text-base font-bold uppercase tracking-wider px-5 py-2.5 rounded-full flex items-center space-x-2 shadow-md cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Добави ново събитие</span>
        </Button>
      </div>

      {/* Grid of Events */}
      {loading ? (
        <div className="p-12 text-center text-[#182b2c]/60">Зареждане на събитията...</div>
      ) : items.length === 0 ? (
        <Card className="p-12 text-center text-[#182b2c]/60 bg-white rounded-3xl border border-[#00b4b6]/20">
          Няма намерени събития в галерията. Натиснете бутона горе, за да добавите първото!
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const title = item.eventName || `Пощичка в ${item.cityName}`;
            const cover = item.coverImage || (item.galleryImages && item.galleryImages[0]) || "/media/gallery/Tezza_2025_07_07_170901960_1.webp";

            return (
              <Card
                key={item.id}
                className="p-0 overflow-hidden bg-white border border-[#00b4b6]/20 shadow-md group rounded-3xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={cover}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <span className="absolute top-3 left-3 text-[11px] uppercase font-bold bg-[#00b4b6] text-white px-3 py-1 rounded-full backdrop-blur-md shadow-xs">
                      {item.cityName}
                    </span>
                    <span className="absolute bottom-3 right-3 text-[10px] uppercase font-semibold bg-[#182b2c]/85 text-white px-2.5 py-0.5 rounded-full">
                      {item.galleryImages?.length || 1} / 4 снимки
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <h4 className="font-salongbeach text-lg font-bold text-[#00b4b6] leading-snug line-clamp-1">
                      {title}
                    </h4>
                    <p className="text-xs font-semibold text-[#182b2c]/85">
                      {item.venueName || item.cityName} • <span className="text-[#00b4b6] font-normal">{item.eventType || "сватба"}</span>
                    </p>
                    {item.description && (
                      <p className="text-xs font-sans text-[#182b2c]/75 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-[#f9f6f0]/60 border-t border-[#00b4b6]/15 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#182b2c]/60">
                    📍 {item.latitude}, {item.longitude}
                  </span>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-2 rounded-xl bg-white text-[#00b4b6] border border-[#00b4b6]/30 hover:bg-[#00b4b6]/10 transition-colors shadow-xs cursor-pointer"
                      title="Редактирай събитие"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-xl bg-white text-red-500 border border-red-200 hover:bg-red-50 transition-colors shadow-xs cursor-pointer"
                      title="Премахни събитие"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add / Edit Event Modal with Map Pin Picker & Image Upload */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-[#00b4b6] max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-salongbeach text-2xl font-bold uppercase tracking-wider text-[#00b4b6]">
              {editingItem ? "Редактиране на събитие" : "Добавяне на ново събитие"}
            </h3>

            {successMsg && (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center space-x-2 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-2xl bg-red-50 text-red-800 border border-red-200 flex items-center space-x-2 text-sm font-semibold">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 font-sans text-left">
              {/* Event Name / Title */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#182b2c]">
                  Име на събитието / Заглавие *
                </label>
                <input
                  type="text"
                  required
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="напр. ГЕРИ И КРАСИ, МИЛКА И АНДРЕЙ"
                  className="w-full px-4 py-3 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6]"
                />
              </div>

              {/* City Name & Venue Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#182b2c] flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00b4b6]" />
                    <span>Град / Локация *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    placeholder="напр. Созопол, София, Каварна"
                    className="w-full px-4 py-3 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#182b2c] flex items-center space-x-1">
                    <Building className="w-3.5 h-3.5 text-[#00b4b6]" />
                    <span>Име на комплекса / Мястото</span>
                  </label>
                  <input
                    type="text"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder="напр. Комплекс Свети Тома, Вила Юстина"
                    className="w-full px-4 py-3 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6]"
                  />
                </div>
              </div>

              {/* City Presets */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-[#182b2c]/70">Бърз избор на град:</span>
                <div className="flex flex-wrap gap-1.5">
                  {bgCitiesPresets.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => handleSelectCityPreset(c)}
                      className={`text-xs px-2.5 py-1 rounded-xl border transition-all cursor-pointer ${
                        cityName === c.name
                          ? "bg-[#00b4b6] text-white font-bold border-[#00b4b6]"
                          : "bg-white border-gray-300 text-[#182b2c] hover:bg-[#00b4b6]/10"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Map Pin Selector inside Modal */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#182b2c]">
                  <span className="flex items-center space-x-1">
                    <Navigation className="w-4 h-4 text-[#00b4b6] animate-pulse" />
                    <span>Кликнете директно върху картата за локация</span>
                  </span>
                  <span className="font-mono text-[11px] text-[#00b4b6]">
                    📍 {latitude}, {longitude}
                  </span>
                </div>

                <div className="relative w-full h-44 rounded-2xl overflow-hidden border-2 border-[#00b4b6]/30 shadow-inner">
                  <div ref={mapContainerRef} className="w-full h-full" />
                </div>
              </div>

              {/* Event Type & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#182b2c]">Вид на събитието</label>
                  <input
                    type="text"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    placeholder="напр. сватбено тържество, кръщение"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#182b2c]">Дата на събитието</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6] cursor-pointer"
                  />
                </div>
              </div>

              {/* Image Upload Zone (Strict .WEBP, Max 4 Photos) */}
              <div className="space-y-3 pt-2 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#182b2c] flex items-center space-x-1">
                    <ImageIcon className="w-4 h-4 text-[#00b4b6]" />
                    <span>Снимки за събитието (До 4 снимки) *</span>
                  </label>
                  <span className="text-[11px] font-bold text-[#00b4b6]">
                    {galleryImages.length} / 4 качени
                  </span>
                </div>

                {/* Upload Card Dropzone */}
                {galleryImages.length < 4 && (
                  <label className="cursor-pointer border-2 border-dashed border-[#00b4b6]/50 bg-[#00b4b6]/5 hover:bg-[#00b4b6]/10 p-4 rounded-2xl flex flex-col items-center justify-center space-y-1.5 transition-colors text-center">
                    <Upload className="w-6 h-6 text-[#00b4b6]" />
                    <span className="text-xs font-bold text-[#182b2c]">
                      Кликнете тук за да качите снимка от компютъра
                    </span>
                    <span className="text-[10px] text-[#182b2c]/60">
                      (Автоматично ги конвертира и съхранява в .WEBP формат)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}

                {/* Optional Custom Image Path / URL Input */}
                <div className="flex items-center space-x-2 pt-1">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      value={customPathInput}
                      onChange={(e) => setCustomPathInput(e.target.value)}
                      placeholder="Или въведете път към снимката (напр. /media/gallery/photo.webp)"
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-[#00b4b6]/30 text-xs text-[#182b2c] focus:outline-none focus:ring-1 focus:ring-[#00b4b6]"
                    />
                    <LinkIcon className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddCustomPath}
                    className="text-xs py-2 px-3 rounded-xl border-[#00b4b6] text-[#00b4b6] hover:bg-[#00b4b6]/10"
                  >
                    Добави
                  </Button>
                </div>

                {/* WebP Thumbnails Grid (Up to 4) */}
                {galleryImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 pt-1">
                    {galleryImages.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className="relative group h-20 rounded-xl overflow-hidden border border-[#00b4b6]/40 bg-gray-100"
                      >
                        <Image src={imgUrl} alt={`Снимка ${idx + 1}`} fill className="object-cover" unoptimized />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-90 hover:opacity-100 transition-opacity shadow-xs cursor-pointer"
                          title="Премахни снимка"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        {idx === 0 && (
                          <span className="absolute bottom-0 left-0 right-0 bg-[#00b4b6] text-white text-[9px] text-center font-bold py-0.5">
                            Корица
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1 pt-1">
                <label className="text-xs font-semibold text-[#182b2c]">
                  Описание на събитието / спомена
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="За събитието изготвихме авторски картички, стикери и татуировки..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6] resize-none"
                />
              </div>

              {/* Actions */}
              <div className="pt-3 flex justify-end space-x-3 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  className="rounded-full"
                >
                  Отказ
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-[#00b4b6] hover:bg-[#008b8d] text-white font-salongbeach text-base font-bold uppercase tracking-wider px-6 py-2.5 rounded-full shadow-md cursor-pointer flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "Запазване..." : "Запази събитието"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
