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
  ArrowUp,
  ArrowDown,
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
  const [quote, setQuote] = useState("");

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
    setQuote("");
    setErrorMsg("");
    setShowModal(true);
  };

  const openEditModal = (item: TestimonialItem) => {
    setEditingItem(item);
    setName(item.name || "");
    setQuote(item.quote || "");
    setErrorMsg("");
    setShowModal(true);
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);

    setItems(newItems);
    persistTestimonials(newItems);
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
          quote: quote.trim(),
        };
      }
    } else {
      // Add new
      const newItem: TestimonialItem = {
        id: `TST-${Date.now()}`,
        name: name.trim().toUpperCase(),
        quote: quote.trim(),
        rating: 5,
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
        try {
          localStorage.setItem("poshtichka_cached_testimonials", JSON.stringify(updatedList));
        } catch {}
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
            Отзивите се изписват автоматично в авторската рамка с рисуваното сърце от ръце!
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

      {/* Grid of Testimonial Cards matching exact boutique design */}
      {loading ? (
        <div className="p-12 text-center text-[#182b2c]/60">Зареждане на отзивите...</div>
      ) : items.length === 0 ? (
        <Card className="p-12 text-center text-[#182b2c]/60 bg-white rounded-3xl border border-[#00b4b6]/20">
          Няма намерени отзиви. Натиснете бутона горе, за да добавите първия!
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white rounded-[32px] p-4 border border-[#00b4b6]/20 shadow-sm flex flex-col justify-between space-y-4 relative group"
            >
              {/* Card visual preview */}
              <div className="relative w-full aspect-[4/5] min-h-[380px] flex flex-col items-center justify-between p-6 sm:p-7 select-none">
                {/* Hand-drawn Frame Asset 92@2x.png */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  <Image
                    src={encodeURI("/media/Отзиви/Asset 92@2x.png")}
                    alt="Рамка"
                    fill
                    className="object-fill"
                    unoptimized
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-between space-y-3 text-center my-auto">
                  {/* Name in Salongbeach */}
                  <h3 className="font-salongbeach text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#182b2c] pt-2">
                    {item.name}
                  </h3>

                  {/* Quote in Stampatello */}
                  <p className="font-stampatello text-sm sm:text-base text-[#182b2c]/90 leading-relaxed font-normal px-2 my-auto">
                    {item.quote}
                  </p>

                  {/* Heart Hands Asset 93@2x.png */}
                  <div className="relative w-24 sm:w-28 h-16 sm:h-18 shrink-0 flex items-center justify-center pb-2">
                    <Image
                      src={encodeURI("/media/Отзиви/Asset 93@2x.png")}
                      alt="Сърце"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleMove(idx, "up")}
                    disabled={idx === 0}
                    className="p-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    title="Премести нагоре"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleMove(idx, "down")}
                    disabled={idx === items.length - 1}
                    className="p-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    title="Премести надолу"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-bold text-gray-400 pl-1">#{idx + 1}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="px-3 py-1.5 rounded-xl bg-[#00b4b6]/10 text-[#00b4b6] hover:bg-[#00b4b6] hover:text-white transition-all font-bold text-xs flex items-center space-x-1 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Редактирай</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                    title="Изтрий"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Testimonial Modal with Real-time Live Preview */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 font-sans">
          <div className="bg-white rounded-3xl border-2 border-[#00b4b6] max-w-4xl w-full flex flex-col max-h-[92vh] shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Fixed Header */}
            <div className="px-6 py-4 border-b border-[#00b4b6]/20 flex items-center justify-between flex-shrink-0 bg-white z-10">
              <h3 className="font-salongbeach text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#00b4b6]">
                {editingItem ? "Редактиране на отзив" : "Добавяне на нов отзив"}
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

            {/* Modal Body: Form (Left) + Live Preview (Right) */}
            <div className="px-6 py-6 overflow-y-auto custom-modal-scroll flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Form Controls */}
              <div className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-2xl bg-red-50 text-red-800 border border-red-200 flex items-center space-x-2 text-xs font-semibold">
                    <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form id="testimonial-form" onSubmit={handleSaveModal} className="space-y-4 font-sans text-left">
                  {/* Client / Couple Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#182b2c] uppercase tracking-wider">
                      Име на клиента / Младоженците (главни букви) *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="напр. МАРИНА И ИВАН"
                      className="w-full px-4 py-3 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6] font-salongbeach uppercase tracking-wider font-bold"
                    />
                  </div>

                  {/* Review Text */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#182b2c] uppercase tracking-wider">
                      Текст на отзива *
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      placeholder="Въведете думите и впечатленията на клиента..."
                      className="w-full px-4 py-3 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-base focus:outline-none focus:ring-2 focus:ring-[#00b4b6] font-stampatello leading-relaxed resize-none"
                    />
                  </div>
                </form>
              </div>

              {/* Real-time Live Card Preview */}
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00b4b6] mb-2">
                  Визуализация в реално време:
                </span>

                <div className="relative w-full max-w-[340px] aspect-[4/5] min-h-[420px] flex flex-col items-center justify-between p-7 select-none bg-[#f9f6f0] rounded-[32px]">
                  {/* Hand-drawn Frame Asset 92@2x.png */}
                  <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <Image
                      src={encodeURI("/media/Отзиви/Asset 92@2x.png")}
                      alt="Рамка"
                      fill
                      className="object-fill"
                      unoptimized
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-between space-y-3 text-center my-auto">
                    {/* Name in Salongbeach */}
                    <h3 className="font-salongbeach text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#182b2c] pt-2">
                      {name.trim() || "ИМЕ НА КЛИЕНТА"}
                    </h3>

                    {/* Quote in Stampatello */}
                    <p className="font-stampatello text-sm sm:text-base text-[#182b2c]/90 leading-relaxed font-normal px-2 my-auto">
                      {quote.trim() || "Тук ще се появи текстът на отзива в автентичен ръкописен шрифт..."}
                    </p>

                    {/* Heart Hands Asset 93@2x.png */}
                    <div className="relative w-24 sm:w-28 h-16 sm:h-18 shrink-0 flex items-center justify-center pb-2">
                      <Image
                        src={encodeURI("/media/Отзиви/Asset 93@2x.png")}
                        alt="Сърце"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </div>
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
                form="testimonial-form"
                disabled={saving}
                className="bg-[#00b4b6] hover:bg-[#008b8d] text-white font-salongbeach text-base font-bold uppercase tracking-wider px-6 py-2.5 rounded-full shadow-md cursor-pointer flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Запазване..." : "Запази отзива"}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
