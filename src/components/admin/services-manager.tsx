"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Save,
  X,
  Upload,
  AlertTriangle,
  Sparkles,
  ListPlus,
  ImageIcon,
  GripVertical,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  imagePosition?: string;
  badgeAsset?: string;
  badgeAssets?: string[];
}

const availableAssets = [
  { path: "/media/Услуги/Asset 86@2x.png", label: "Рисувано кръгче с тикче (Отметка)" },
  { path: "/media/Услуги/Asset 88@2x.png", label: "Тюркоазена лента" },
  { path: "/media/Услуги/Asset 90@2x.png", label: "Заоблена рамка за картичка" },
];

export const ServicesManager = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Drag-and-drop reordering state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);
  const [image, setImage] = useState("");
  const [imagePosX, setImagePosX] = useState(50);
  const [imagePosY, setImagePosY] = useState(50);
  const defaultAssets = ["/media/Услуги/Asset 86@2x.png", "/media/Услуги/Asset 90@2x.png"];
  const [selectedAssets, setSelectedAssets] = useState<string[]>(defaultAssets);

  const parsePosition = (posStr?: string) => {
    if (!posStr) return { x: 50, y: 50 };
    if (posStr === "top") return { x: 50, y: 0 };
    if (posStr === "bottom") return { x: 50, y: 100 };
    if (posStr === "center") return { x: 50, y: 50 };
    if (posStr === "left") return { x: 0, y: 50 };
    if (posStr === "right") return { x: 100, y: 50 };
    const parts = posStr.split(" ");
    if (parts.length === 2) {
      const x = parseInt(parts[0]) || 50;
      const y = parseInt(parts[1]) || 50;
      return { x, y };
    }
    return { x: 50, y: 50 };
  };

  const fetchServices = () => {
    setLoading(true);
    try {
      const cached = localStorage.getItem("poshtichka_cached_services");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setServices(parsed);
        }
      }
    } catch {}

    fetch("/api/services")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.services)) {
          setServices(data.services);
          try {
            localStorage.setItem("poshtichka_cached_services", JSON.stringify(data.services));
          } catch {}
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openAddModal = () => {
    setEditingService(null);
    setTitle("");
    setSubtitle("подходящо за сватбено тържество, кръщение, юбилей, корпоративно събитие");
    setDescription(
      "Подарете на гостите си момент на радост и изненада. Дизайните се изготвят по идея на клиента, съобразно цветовата гама на събитието."
    );
    setFeatures([
      "НАЕМ НА ВЕНДИНГ МАШИНА ЗА КОНКРЕТНИ ЧАСОВЕ",
      "БУРКАН СЪС ЖЕТОНИ, СПРЯМО ГОСТИТЕ НА СЪБИТИЕТО",
      "ДИЗАЙН НА 4 ВИДА ИЛЮСТРАЦИИ, КАКТО И ЗА ПОСТЕРИТЕ",
      "ПЕЧАТ + СТАНДАРТНИ/ПЕРСОНАЛИЗИРАНИ КАРТОНЧЕТА",
      "2-МА СЛУЖИТЕЛИ ЗА СЪДЕЙСТВИЕ НА ГОСТИТЕ И МОНТАЖ",
    ]);
    setImage("/media/gallery/Tezza_2025_07_13_155326413.webp");
    setImagePosX(50);
    setImagePosY(50);
    setSelectedAssets(defaultAssets);
    setErrorMsg("");
    setSuccessMsg("");
    setShowModal(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setEditingService(service);
    setTitle(service.title);
    setSubtitle(service.subtitle || "");
    setDescription(service.description || "");
    setFeatures(service.features && service.features.length > 0 ? service.features : [""]);
    setImage(service.image || "/media/gallery/Tezza_2025_07_13_155326413.webp");
    const pos = parsePosition(service.imagePosition);
    setImagePosX(pos.x);
    setImagePosY(pos.y);
    setSelectedAssets(defaultAssets);
    setErrorMsg("");
    setSuccessMsg("");
    setShowModal(true);
  };

  const handleAddFeatureField = () => {
    setFeatures((prev) => [...prev, ""]);
  };

  const handleRemoveFeatureField = (index: number) => {
    setFeatures((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleFeatureChange = (index: number, val: string) => {
    setFeatures((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const processFileToWebp = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) { reject("Canvas not supported"); return; }
          ctx.drawImage(img, 0, 0);
          const webpDataUrl = canvas.toDataURL("image/webp", 0.85);
          resolve(webpDataUrl);
        };
        img.onerror = () => reject("Image load error");
        img.src = event.target?.result as string;
      };
      reader.onerror = () => reject("File read error");
      reader.readAsDataURL(file);
    });
  };

  const handleWebpUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const webpBase64 = await processFileToWebp(file);
      setImage(webpBase64);
    } catch {
      setErrorMsg("Неуспешно конвертиране на изображението в WebP.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg("Моля, попълнете заглавие на услугата.");
      return;
    }

    setSaving(true);
    setErrorMsg("");
    setSuccessMsg("");

    const cleanFeatures = features.map((f) => f.trim()).filter((f) => f.length > 0);

    const payload = {
      id: editingService?.id,
      title: title.trim(),
      subtitle: subtitle.trim(),
      description: description.trim(),
      features: cleanFeatures,
      image: image || "/media/gallery/Tezza_2025_07_13_155326413.webp",
      imagePosition: `${imagePosX}% ${imagePosY}%`,
      badgeAsset: selectedAssets[0] || "",
      badgeAssets: selectedAssets,
    };

    try {
      const method = editingService ? "PUT" : "POST";
      const res = await fetch("/api/services", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccessMsg(editingService ? "Услугата бе обновена успешно!" : "Новата услуга бе добавена!");
        fetchServices();
        setTimeout(() => {
          setShowModal(false);
          setSuccessMsg("");
        }, 1000);
      } else {
        throw new Error("Грешка при запис.");
      }
    } catch {
      setErrorMsg("Възникна грешка при запазването на услугата.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Сигурни ли сте, че искате да премахнете тази услуга?")) return;

    try {
      const res = await fetch(`/api/services?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
      }
    } catch {
      alert("Грешка при изтриването.");
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const reordered = [...services];
    const [movedItem] = reordered.splice(draggedIndex, 1);
    reordered.splice(targetIndex, 0, movedItem);

    setServices(reordered);
    setDraggedIndex(null);
    setDragOverIndex(null);

    try {
      await fetch("/api/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ services: reordered }),
      });
      localStorage.setItem("poshtichka_cached_services", JSON.stringify(reordered));
    } catch (err) {
      console.error("Reorder save failed:", err);
    }
  };

  const moveService = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= services.length) return;

    const reordered = [...services];
    const [movedItem] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, movedItem);

    setServices(reordered);

    try {
      await fetch("/api/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ services: reordered }),
      });
      localStorage.setItem("poshtichka_cached_services", JSON.stringify(reordered));
    } catch (err) {
      console.error("Move save failed:", err);
    }
  };

  return (
    <div className="space-y-6 font-sans text-[#182b2c]">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#00b4b6]/20 shadow-sm">
        <div>
          <h2 className="font-salongbeach text-2xl font-bold uppercase tracking-wider text-[#182b2c]">
            Управление на Услугите ({services.length})
          </h2>
          <p className="text-xs text-[#182b2c]/70 mt-1">
            Хванете и плъзнете (Drag & Drop) или използвайте стрелките за пренареждане на услугите!
          </p>
        </div>

        <Button
          onClick={openAddModal}
          className="bg-[#00b4b6] hover:bg-[#008b8d] text-white font-salongbeach text-base font-bold uppercase tracking-wider px-5 py-2.5 rounded-full flex items-center space-x-2 shadow-md cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Добави нова услуга</span>
        </Button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center space-x-2 text-sm font-semibold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Services Grid / Cards List */}
      {loading ? (
        <div className="p-12 text-center text-[#182b2c]/60">Зареждане на услугите...</div>
      ) : services.length === 0 ? (
        <Card className="p-12 text-center text-[#182b2c]/60 bg-white rounded-3xl border border-[#00b4b6]/20">
          Няма намерени услуги. Натиснете бутона горе, за да добавите първата!
        </Card>
      ) : (
        <div className="space-y-6">
          {services.map((srv, idx) => (
            <div
              key={srv.id}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={(e) => handleDrop(e, idx)}
              className={`p-6 sm:p-8 bg-[#f9f6f0] border-2 rounded-[32px] shadow-lg flex flex-col md:flex-row items-start gap-6 relative group transition-all duration-200 ${
                dragOverIndex === idx
                  ? "border-[#00b4b6] ring-4 ring-[#00b4b6]/30 scale-[1.01]"
                  : "border-[#182b2c]/20 hover:border-[#00b4b6]/60"
              }`}
            >
              {/* Drag Handle & Reorder Controls */}
              <div className="flex md:flex-col items-center justify-center gap-1 text-[#182b2c]/50 group-hover:text-[#00b4b6] shrink-0 pt-2">
                <div
                  className="cursor-grab active:cursor-grabbing p-1.5 rounded-lg hover:bg-white transition-colors"
                  title="Хванете и плъзнете за пренареждане"
                >
                  <GripVertical className="w-6 h-6" />
                </div>
                <button
                  type="button"
                  onClick={() => moveService(idx, "up")}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg bg-white border border-[#182b2c]/10 hover:bg-[#00b4b6]/10 hover:text-[#00b4b6] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  title="Премести нагоре"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveService(idx, "down")}
                  disabled={idx === services.length - 1}
                  className="p-1.5 rounded-lg bg-white border border-[#182b2c]/10 hover:bg-[#00b4b6]/10 hover:text-[#00b4b6] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  title="Премести надолу"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Service Image Preview */}
              <div className="relative w-full md:w-64 h-52 sm:h-60 rounded-[24px] overflow-hidden border-2 border-white shadow-md flex-shrink-0 bg-gray-100">
                <Image 
                    src={srv.image} 
                    alt={srv.title} 
                    fill 
                    className="object-cover" 
                    style={{ objectPosition: srv.imagePosition || "center" }}
                    unoptimized 
                />
              </div>

              {/* Service Details */}
              <div className="flex-grow space-y-3 w-full">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-[#00b4b6] uppercase tracking-wider bg-[#00b4b6]/10 px-2.5 py-0.5 rounded-md mb-1 inline-block">
                      Позиция #{idx + 1}
                    </span>
                    <h3 className="font-salongbeach text-2xl sm:text-3xl font-bold uppercase text-[#182b2c] tracking-wider">
                      {srv.title}
                    </h3>
                    {srv.subtitle && (
                      <p className="text-xs font-semibold text-[#00b4b6] mt-0.5">{srv.subtitle}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      onClick={() => openEditModal(srv)}
                      className="p-2.5 rounded-xl bg-white text-[#00b4b6] border border-[#00b4b6]/30 hover:bg-[#00b4b6]/10 transition-colors shadow-xs cursor-pointer"
                      title="Редактирай услуга"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(srv.id)}
                      className="p-2.5 rounded-xl bg-white text-red-500 border border-red-200 hover:bg-red-50 transition-colors shadow-xs cursor-pointer"
                      title="Премахни услуга"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {srv.description && (
                  <p className="text-xs sm:text-sm text-[#182b2c]/80 leading-relaxed font-sans">
                    {srv.description}
                  </p>
                )}

                {/* Features List Preview */}
                {srv.features && srv.features.length > 0 && (
                  <ul className="space-y-2 pt-2">
                    {srv.features.map((f, i) => (
                      <li key={i} className="flex items-center space-x-2.5 text-xs font-bold text-[#182b2c]">
                        <div className="w-5 h-5 shrink-0 relative flex items-center justify-center">
                          <Image
                            src={encodeURI("/media/Услуги/Asset 86@2x.png")}
                            alt="Отметка"
                            width={20}
                            height={20}
                            className="w-full h-full object-contain pointer-events-none"
                            unoptimized
                          />
                        </div>
                        <span className="font-salongbeach uppercase tracking-wider">{f}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Service Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 font-sans overflow-y-auto">
          <div className="bg-white rounded-3xl border-2 border-[#00b4b6] max-w-2xl w-full flex flex-col my-8 max-h-[90vh] shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Fixed Header */}
            <div className="px-6 py-4 border-b border-[#00b4b6]/20 flex items-center justify-between flex-shrink-0 bg-white z-10">
              <h3 className="font-salongbeach text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#00b4b6]">
                {editingService ? "Редактиране на услуга" : "Добавяне на нова услуга"}
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors"
                title="Затвори"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="px-6 py-5 overflow-y-auto custom-modal-scroll flex-1 space-y-4">
              {successMsg && (
                <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center space-x-2 text-sm font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{successMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className="p-4 rounded-2xl bg-red-50 text-red-800 border border-red-200 flex items-center space-x-2 text-sm font-semibold">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form id="service-form" onSubmit={handleSave} className="space-y-4 font-sans text-left">
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#182b2c]">
                    Заглавие на услугата (главни букви) *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="напр. ВЕНДИНГ МАШИНА, ТАБЛО С МАРКИ"
                    className="w-full px-4 py-3 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6] font-salongbeach uppercase tracking-wider"
                  />
                </div>

                {/* Subtitle */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#182b2c]">
                    Подзаглавие / Подходящо за
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="подходящо за сватбено тържество, кръщение, юбилей, корпоративно събитие"
                    className="w-full px-4 py-3 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6]"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#182b2c]">
                    Описание на услугата
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Подарете на гостите си момент на радост и изненада..."
                    className="w-full px-4 py-3 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6] resize-none"
                  />
                </div>

                {/* Features List / Bullets */}
                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#182b2c] flex items-center space-x-1">
                      <ListPlus className="w-4 h-4 text-[#00b4b6]" />
                      <span>Списък с включени предимства</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleAddFeatureField}
                      className="text-xs font-bold text-[#00b4b6] hover:underline flex items-center space-x-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Добави предимство</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {features.map((feat, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-[#00b4b6]/15 text-[#00b4b6] font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={feat}
                          onChange={(e) => handleFeatureChange(idx, e.target.value)}
                          placeholder="напр. НАЕМ НА ВЕНДИНГ МАШИНА..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00b4b6]"
                        />
                        {features.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveFeatureField(idx)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Премахни"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Main Image (Strict .webp) & Positioning */}
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <label className="text-xs font-semibold text-[#182b2c] flex items-center space-x-1">
                    <ImageIcon className="w-4 h-4 text-[#00b4b6]" />
                    <span>Снимка на услугата (Задължително .WEBP) *</span>
                  </label>

                  <div className="flex items-center space-x-4">
                    <label className="cursor-pointer border-2 border-dashed border-[#00b4b6]/50 bg-[#00b4b6]/5 hover:bg-[#00b4b6]/10 p-3.5 rounded-2xl flex flex-col items-center justify-center space-y-1 transition-colors text-center w-full">
                      <Upload className="w-5 h-5 text-[#00b4b6]" />
                      <span className="text-xs font-bold text-[#182b2c]">
                        {image ? "Смени снимката" : "Прикачи снимка"}
                      </span>
                      <input
                        type="file"
                        accept="image/webp,image/jpeg,image/png,image/jpg,.webp,.jpg,.jpeg,.png"
                        onChange={handleWebpUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Image Positioning & Live Preview in Modal */}
                  {image && (
                    <div className="bg-[#f9f6f0] p-4 sm:p-5 rounded-2xl border border-[#00b4b6]/30 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#182b2c] flex items-center space-x-1.5">
                          <Sparkles className="w-4 h-4 text-[#00b4b6]" />
                          <span>Наместване / Позиция на снимката</span>
                        </span>
                        <span className="text-xs font-mono font-bold text-[#00b4b6] bg-white px-2 py-0.5 rounded-md border border-[#00b4b6]/20">
                          X: {imagePosX}% | Y: {imagePosY}%
                        </span>
                      </div>

                      {/* Quick Preset Buttons */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => { setImagePosX(50); setImagePosY(0); }}
                          className={`px-3 py-1 text-xs rounded-xl border transition-all cursor-pointer font-bold ${
                            imagePosX === 50 && imagePosY === 0
                              ? "bg-[#00b4b6] text-white border-[#00b4b6]"
                              : "bg-white text-[#182b2c] border-[#182b2c]/20 hover:border-[#00b4b6]"
                          }`}
                        >
                          ⬆️ Горе
                        </button>
                        <button
                          type="button"
                          onClick={() => { setImagePosX(50); setImagePosY(50); }}
                          className={`px-3 py-1 text-xs rounded-xl border transition-all cursor-pointer font-bold ${
                            imagePosX === 50 && imagePosY === 50
                              ? "bg-[#00b4b6] text-white border-[#00b4b6]"
                              : "bg-white text-[#182b2c] border-[#182b2c]/20 hover:border-[#00b4b6]"
                          }`}
                        >
                          ⏺️ Център
                        </button>
                        <button
                          type="button"
                          onClick={() => { setImagePosX(50); setImagePosY(100); }}
                          className={`px-3 py-1 text-xs rounded-xl border transition-all cursor-pointer font-bold ${
                            imagePosX === 50 && imagePosY === 100
                              ? "bg-[#00b4b6] text-white border-[#00b4b6]"
                              : "bg-white text-[#182b2c] border-[#182b2c]/20 hover:border-[#00b4b6]"
                          }`}
                        >
                          ⬇️ Долу
                        </button>
                        <button
                          type="button"
                          onClick={() => { setImagePosX(0); setImagePosY(50); }}
                          className={`px-3 py-1 text-xs rounded-xl border transition-all cursor-pointer font-bold ${
                            imagePosX === 0 && imagePosY === 50
                              ? "bg-[#00b4b6] text-white border-[#00b4b6]"
                              : "bg-white text-[#182b2c] border-[#182b2c]/20 hover:border-[#00b4b6]"
                          }`}
                        >
                          ⬅️ Ляво
                        </button>
                        <button
                          type="button"
                          onClick={() => { setImagePosX(100); setImagePosY(50); }}
                          className={`px-3 py-1 text-xs rounded-xl border transition-all cursor-pointer font-bold ${
                            imagePosX === 100 && imagePosY === 50
                              ? "bg-[#00b4b6] text-white border-[#00b4b6]"
                              : "bg-white text-[#182b2c] border-[#182b2c]/20 hover:border-[#00b4b6]"
                          }`}
                        >
                          ➡️ Дясно
                        </button>
                      </div>

                      {/* Sliders */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#182b2c] flex justify-between">
                            <span>Вертикално преместване (Y-ос)</span>
                            <span className="text-[#00b4b6] font-bold">{imagePosY}%</span>
                          </label>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            step={1}
                            value={imagePosY}
                            onChange={(e) => setImagePosY(Number(e.target.value))}
                            className="w-full h-2 bg-[#00b4b6]/20 rounded-lg appearance-none cursor-pointer accent-[#00b4b6]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#182b2c] flex justify-between">
                            <span>Хоризонтално преместване (X-ос)</span>
                            <span className="text-[#00b4b6] font-bold">{imagePosX}%</span>
                          </label>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            step={1}
                            value={imagePosX}
                            onChange={(e) => setImagePosX(Number(e.target.value))}
                            className="w-full h-2 bg-[#00b4b6]/20 rounded-lg appearance-none cursor-pointer accent-[#00b4b6]"
                          />
                        </div>
                      </div>

                      {/* Live Card Preview Box */}
                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#182b2c]/60">
                          Преглед на живо (как ще изглежда в картата):
                        </span>
                        <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-[#182b2c] bg-gray-100 shadow-sm">
                          <Image
                            src={image}
                            alt="Преглед на наместването"
                            fill
                            className="object-cover transition-all duration-75"
                            style={{ objectPosition: `${imagePosX}% ${imagePosY}%` }}
                            unoptimized
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Modal Fixed Footer */}
            <div className="px-6 py-4 bg-[#f9f6f0]/80 border-t border-[#00b4b6]/20 flex justify-end space-x-3 flex-shrink-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowModal(false)}
                className="rounded-full cursor-pointer px-5"
              >
                Отказ
              </Button>
              <Button
                type="submit"
                form="service-form"
                disabled={saving}
                className="bg-[#00b4b6] hover:bg-[#008b8d] text-white font-salongbeach text-base font-bold uppercase tracking-wider px-6 py-2.5 rounded-full shadow-md cursor-pointer flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Запазване..." : "Запази услугата"}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
