"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  MessageSquareQuote,
  Plus,
  Trash2,
  Save,
  Check,
  Edit2,
  X,
  Star,
  Upload,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TestimonialItem, defaultTestimonials } from "@/lib/content-store";

export const TestimonialsManager = () => {
  const [items, setItems] = useState<TestimonialItem[]>(defaultTestimonials);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Add / Edit Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("Сватбено тържество");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [avatarUrl, setAvatarUrl] = useState("");

  const fetchTestimonials = () => {
    setLoading(true);
    fetch("/api/content")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.testimonials) && data.testimonials.length > 0) {
          setItems(data.testimonials);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setName("");
    setRole("Сватбено тържество");
    setQuote("");
    setRating(5);
    setAvatarUrl("/media/gallery/Tezza_2025_07_07_170901960_1.webp");
    setErrorMsg("");
    setShowModal(true);
  };

  const openEditModal = (item: TestimonialItem) => {
    setEditingItem(item);
    setName(item.name || "");
    setRole(item.role || "Сватбено тържество");
    setQuote(item.quote || "");
    setRating(item.rating || 5);
    setAvatarUrl(item.image || "/media/gallery/Tezza_2025_07_07_170901960_1.webp");
    setErrorMsg("");
    setShowModal(true);
  };

  // Auto-convert any image to WebP via HTML5 Canvas
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
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setErrorMsg("");
    try {
      const webpDataUrl = await processFileToWebp(files[0]);
      setAvatarUrl(webpDataUrl);
    } catch {
      setErrorMsg("Възникна грешка при обработка на снимката.");
    } finally {
      e.target.value = "";
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Моля, въведете име / младоженци.");
      return;
    }
    if (!quote.trim()) {
      setErrorMsg("Моля, въведете текст на отзива.");
      return;
    }

    const updatedList = [...items];

    if (editingItem) {
      // Edit existing
      const idx = updatedList.findIndex((i) => i.id === editingItem.id);
      if (idx !== -1) {
        updatedList[idx] = {
          ...editingItem,
          name: name.trim().toUpperCase(),
          role: role.trim(),
          quote: quote.trim(),
          rating,
          image: avatarUrl,
        };
      }
    } else {
      // Add new
      const newItem: TestimonialItem = {
        id: `TST-${Date.now()}`,
        name: name.trim().toUpperCase(),
        role: role.trim(),
        quote: quote.trim(),
        rating,
        image: avatarUrl || "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
      };
      updatedList.unshift(newItem);
    }

    setItems(updatedList);
    setShowModal(false);
    persistTestimonials(updatedList);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Сигурни ли сте, че искате да изтриете този отзив?")) return;
    const updatedList = items.filter((item) => item.id !== id);
    setItems(updatedList);
    persistTestimonials(updatedList);
  };

  const persistTestimonials = async (updatedList: TestimonialItem[]) => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "testimonials", value: updatedList }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error("Save testimonials error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 font-sans text-[#182b2c]">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#00b4b6]/20 shadow-sm">
        <div>
          <h2 className="font-salongbeach text-2xl font-bold uppercase tracking-wider text-[#182b2c] flex items-center space-x-2">
            <MessageSquareQuote className="w-6 h-6 text-[#00b4b6]" />
            <span>Управление на Отзивите & Впечатленията ({items.length})</span>
          </h2>
          <p className="text-xs text-[#182b2c]/70 mt-1">
            Добавяйте и редактирайте отзивите с автентичния шрифт и дизайн на Пощичка!
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            onClick={openAddModal}
            className="bg-[#00b4b6] hover:bg-[#008b8d] text-white font-salongbeach text-base font-bold uppercase tracking-wider px-5 py-2.5 rounded-full flex items-center space-x-2 shadow-md cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span>Добави нов отзив</span>
          </Button>

          {saved && (
            <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
              <Check className="w-4 h-4" />
              <span>Запазено!</span>
            </span>
          )}
        </div>
      </div>

      {/* Grid of Testimonials with Boutique Website Font & Design */}
      {loading ? (
        <div className="p-12 text-center text-[#182b2c]/60">Зареждане на отзивите...</div>
      ) : items.length === 0 ? (
        <Card className="p-12 text-center text-[#182b2c]/60 bg-white rounded-3xl border border-[#00b4b6]/20">
          Няма намерени отзиви. Натиснете бутона горе, за да добавите първия!
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card
              key={item.id}
              className="bg-[#f9f6f0] border-2 border-[#182b2c]/20 rounded-[28px] p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 relative group"
            >
              <div className="space-y-3">
                {/* Header info */}
                <div className="flex items-start justify-between gap-2 border-b border-[#182b2c]/10 pb-3">
                  <div className="flex items-center space-x-3">
                    {/* User Avatar / Photo */}
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#00b4b6] flex-shrink-0 bg-gray-100">
                      <Image
                        src={item.image || "/media/gallery/Tezza_2025_07_07_170901960_1.webp"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div>
                      <h3 className="font-salongbeach text-xl font-bold uppercase tracking-wider text-[#00b4b6]">
                        {item.name}
                      </h3>
                      {item.role && (
                        <p className="text-[11px] font-sans font-medium text-[#182b2c]/75">
                          {item.role}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-2 rounded-xl bg-white text-[#00b4b6] border border-[#00b4b6]/30 hover:bg-[#00b4b6]/10 transition-colors cursor-pointer shadow-xs"
                      title="Редактирай"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-xl bg-white text-red-500 border border-red-200 hover:bg-red-50 transition-colors cursor-pointer shadow-xs"
                      title="Изтрий"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 5-Star Rating */}
                <div className="flex items-center space-x-1 text-amber-400">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote / Review Text */}
                <p className="font-sans text-xs sm:text-sm text-[#182b2c]/90 italic leading-relaxed pt-1">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#182b2c]/10 flex items-center justify-between text-[11px] text-[#182b2c]/60">
                <span>Показва се на началната страница</span>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                  Активен
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Testimonial Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-[#00b4b6] max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-salongbeach text-2xl font-bold uppercase tracking-wider text-[#00b4b6]">
              {editingItem ? "Редактиране на отзив" : "Добавяне на нов отзив"}
            </h3>

            {errorMsg && (
              <div className="p-4 rounded-2xl bg-red-50 text-red-800 border border-red-200 flex items-center space-x-2 text-sm font-semibold">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveModal} className="space-y-4 font-sans text-left">
              {/* Client / Couple Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#182b2c]">
                  Име на клиента / Младоженците (главни букви) *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="напр. НИКОЛ и ДАНИЕЛ, МАЯ и НИКО"
                  className="w-full px-4 py-3 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6] font-salongbeach uppercase tracking-wider font-bold"
                />
              </div>

              {/* Event Type / Subtitle */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#182b2c]">
                  Повод / Град / Описание на събитието
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="напр. Сватбено тържество в Бургас, Корпоративно парти"
                  className="w-full px-4 py-3 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6]"
                />
              </div>

              {/* Quote / Testimonial Text */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#182b2c]">
                  Текст на отзива / Коментар *
                </label>
                <textarea
                  rows={4}
                  required
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Напишете отзива на клиентите тук..."
                  className="w-full px-4 py-3 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6] resize-none italic"
                />
              </div>

              {/* Rating */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#182b2c]">Оценка (звезди)</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6] cursor-pointer"
                >
                  <option value={5}>5 Звезди (★★★★★)</option>
                  <option value={4}>4 Звезди (★★★★☆)</option>
                  <option value={3}>3 Звезди (★★★☆☆)</option>
                </select>
              </div>

              {/* Photo Upload (Strict .webp) */}
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <label className="text-xs font-semibold text-[#182b2c]">
                  Снимка / Аватар от събитието (JPG, PNG или WEBP)
                </label>

                <div className="flex items-center space-x-4">
                  {avatarUrl && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#00b4b6] flex-shrink-0">
                      <Image src={avatarUrl} alt="Аватар" fill className="object-cover" unoptimized />
                    </div>
                  )}

                  <label className="cursor-pointer border-2 border-dashed border-[#00b4b6]/50 bg-[#00b4b6]/5 hover:bg-[#00b4b6]/10 p-3 rounded-2xl flex flex-col items-center justify-center space-y-1 transition-colors text-center w-full">
                    <Upload className="w-5 h-5 text-[#00b4b6]" />
                    <span className="text-xs font-bold text-[#182b2c]">
                      Прикачи снимка
                    </span>
                    <input
                      type="file"
                      accept="image/webp,image/jpeg,image/png,image/jpg,.webp,.jpg,.jpeg,.png"
                      onChange={handleWebpUpload}
                      className="hidden"
                    />
                  </label>
                </div>
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
                  <span>{saving ? "Запазване..." : "Запази отзива"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
