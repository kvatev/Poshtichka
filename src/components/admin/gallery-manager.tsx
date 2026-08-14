"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit2, Image as ImageIcon, CheckCircle2, Save, X, Calendar as CalendarIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  category: "weddings" | "corporate" | "tattoos" | "postcards" | "private";
  categoryLabel: string;
  description: string;
  eventDate?: string;
  createdAt: string;
}

const categories = [
  { id: "weddings", label: "Сватби & Кът" },
  { id: "corporate", label: "Корпоративни събития" },
  { id: "tattoos", label: "Временни татуировки" },
  { id: "postcards", label: "Картички & Жетони" },
  { id: "private", label: "Частни събития & Интеракция" },
];

export const GalleryManager = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"weddings" | "corporate" | "tattoos" | "postcards" | "private">("weddings");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");

  const fetchItems = () => {
    setLoading(true);
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setTitle("");
    setCategory("weddings");
    setImageUrl("/media/gallery/Tezza_2025_07_07_170901960_1.webp");
    setDescription("");
    setEventDate(new Date().toISOString().split("T")[0]);
    setShowModal(true);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setImageUrl(item.imageUrl);
    setDescription(item.description);
    setEventDate(item.eventDate || new Date().toISOString().split("T")[0]);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");

    const categoryObj = categories.find((c) => c.id === category);
    const categoryLabel = categoryObj ? categoryObj.label : "Събития";

    const payload = {
      id: editingItem?.id,
      title,
      category,
      categoryLabel,
      imageUrl: imageUrl || "/media/Main Page/Main Banner.webp",
      description,
      eventDate,
    };

    try {
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch("/api/gallery", {
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
      }
    } catch {
      alert("Възникна грешка при запазването.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Сигурни ли сте, че искате да премахнете това събитие от галерията?")) return;

    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }
    } catch {
      alert("Грешка при изтриването.");
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#00b4b6]/20 shadow-sm">
        <div>
          <h2 className="font-salongbeach text-2xl font-bold uppercase tracking-wider text-[#182b2c]">
            Управление на Галерията & Събитията ({items.length})
          </h2>
          <p className="text-xs text-[#182b2c]/70 mt-1">
            Добавяйте и редактирайте лесно всяко следващо събитие за галерията на сайта.
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
          {items.map((item) => (
            <Card
              key={item.id}
              className="p-0 overflow-hidden bg-white border border-[#00b4b6]/20 shadow-md group rounded-3xl flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <span className="absolute top-3 left-3 text-[11px] uppercase font-bold bg-[#182b2c]/85 text-white px-3 py-1 rounded-full backdrop-blur-md">
                    {item.categoryLabel}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h4 className="font-salongbeach text-lg font-bold text-[#182b2c] leading-snug line-clamp-2">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-xs font-sans text-[#182b2c]/75 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  {item.eventDate && (
                    <div className="flex items-center space-x-1.5 text-xs text-[#00b4b6] pt-1">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      <span>{item.eventDate}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-[#f9f6f0]/60 border-t border-[#00b4b6]/15 flex items-center justify-between">
                <span className="text-[11px] text-[#182b2c]/50 truncate max-w-[180px]">
                  {item.imageUrl}
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 rounded-xl bg-white text-[#00b4b6] border border-[#00b4b6]/30 hover:bg-[#00b4b6]/10 transition-colors shadow-xs"
                    title="Редактирай събитие"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-xl bg-white text-red-500 border border-red-200 hover:bg-red-50 transition-colors shadow-xs"
                    title="Премахни събитие"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Event Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-[#00b4b6] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-salongbeach text-2xl font-bold uppercase tracking-wider text-[#00b4b6]">
              {editingItem ? "Редактиране на събитие" : "Добавяне на ново събитие"}
            </h3>

            {successMsg ? (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center space-x-2 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-4 font-sans">
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#182b2c]">
                    Име на събитието / Заглавие *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="напр. Сватбата на Никол & Даниел - Бургас"
                    className="w-full px-4 py-3 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6]"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#182b2c]">
                    Категория *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6] cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Image URL / Path */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#182b2c]">
                    Снимка URL / Път към снимката *
                  </label>
                  <input
                    type="text"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="/media/gallery/Tezza_2025_07_07_170901960_1.webp"
                    className="w-full px-4 py-3 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6]"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#182b2c]">
                    Описание на събитието / спомена
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Елегантна декоративна визия, авторски картички и щастливи гости..."
                    className="w-full px-4 py-3 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6] resize-none"
                  />
                </div>

                {/* Event Date */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#182b2c]">
                    Дата на събитието
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6]"
                  />
                </div>

                <div className="pt-4 flex justify-end space-x-3">
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};
