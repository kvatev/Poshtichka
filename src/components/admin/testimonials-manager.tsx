"use client";

import React, { useState, useEffect } from "react";
import { MessageSquareQuote, Plus, Trash2, Save, Check, Edit2, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TestimonialItem, defaultTestimonials } from "@/lib/content-store";

export const TestimonialsManager = () => {
  const [items, setItems] = useState<TestimonialItem[]>(defaultTestimonials);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // New item form modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newQuote, setNewQuote] = useState("");
  const [newRole, setNewRole] = useState("Сватбено тържество");

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editQuote, setEditQuote] = useState("");
  const [editRole, setEditRole] = useState("");

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.testimonials && Array.isArray(data.testimonials)) {
          setItems(data.testimonials);
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "testimonials", value: items }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Save testimonials error:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleAddTestimonial = () => {
    if (!newName.trim() || !newQuote.trim()) return;

    const newItem: TestimonialItem = {
      id: Date.now().toString(),
      name: newName.trim().toUpperCase(),
      quote: newQuote.trim(),
      role: newRole.trim() || "Сватбено тържество",
      rating: 5,
    };

    setItems([newItem, ...items]);
    setNewName("");
    setNewQuote("");
    setNewRole("Сватбено тържество");
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const startEditing = (item: TestimonialItem) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditQuote(item.quote);
    setEditRole(item.role || "");
  };

  const saveEditing = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              name: editName.trim().toUpperCase(),
              quote: editQuote.trim(),
              role: editRole.trim(),
            }
          : item
      )
    );
    setEditingId(null);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark flex items-center space-x-2">
            <MessageSquareQuote className="w-6 h-6 text-brand-accent" />
            <span>Отзиви & Впечатления от Клиенти ({items.length})</span>
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            Добавяйте, редактирайте и управлявайте отзивите, които се показват в сайта
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4 text-brand-accent" />
            <span>Добави нов отзив</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Запазено!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{saving ? "Запазване..." : "Запази промените"}</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Add New Testimonial Form / Card */}
      {showAddModal && (
        <Card className="p-6 bg-white border-2 border-brand-accent/40 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-brand-primary/10 pb-3">
            <h3 className="font-serif font-bold text-brand-dark text-lg">
              Нов Отзив от Клиент
            </h3>
            <button
              onClick={() => setShowAddModal(false)}
              className="text-brand-dark/60 hover:text-red-500 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-brand-dark">
                Имена на младоженци / Клиент (напр. "НИКОЛ и ДАНИЕЛ")
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="НИКОЛ и ДАНИЕЛ"
                className="w-full px-4 py-2 rounded-xl border border-brand-primary/30 text-sm bg-brand-bg/40 font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-brand-dark">
                Вид събитие / Повод (напр. "Сватбено тържество")
              </label>
              <input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="Сватбено тържество в Бургас"
                className="w-full px-4 py-2 rounded-xl border border-brand-primary/30 text-sm bg-brand-bg/40"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-dark">
              Текст на отзива / Коментар
            </label>
            <textarea
              rows={3}
              value={newQuote}
              onChange={(e) => setNewQuote(e.target.value)}
              placeholder="Напишете отзива тук..."
              className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm bg-brand-bg/40"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
              Отказ
            </Button>
            <Button variant="primary" size="sm" onClick={handleAddTestimonial}>
              Добави
            </Button>
          </div>
        </Card>
      )}

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((t) => (
          <Card
            key={t.id}
            className="p-6 bg-white border border-brand-primary/20 shadow-sm space-y-4 flex flex-col justify-between relative group"
          >
            {editingId === t.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border text-sm font-bold uppercase"
                />
                <input
                  type="text"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full px-3 py-1 rounded-lg border text-xs"
                  placeholder="Повод / Градове"
                />
                <textarea
                  rows={4}
                  value={editQuote}
                  onChange={(e) => setEditQuote(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border text-xs leading-relaxed"
                />
                <div className="flex space-x-2 pt-1">
                  <button
                    onClick={() => saveEditing(t.id)}
                    className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                  >
                    Запази
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-xs"
                  >
                    Отказ
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-bold text-brand-dark text-base uppercase tracking-wider text-[#00b4b6]">
                      {t.name}
                    </h4>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => startEditing(t)}
                        className="p-1 text-gray-400 hover:text-brand-dark"
                        title="Редактирай"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                        title="Изтрий"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-brand-dark/90 italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-brand-secondary/40 flex items-center justify-between">
                  <span className="text-[11px] text-brand-muted italic">
                    {t.role || "Сватбено тържество"}
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full">
                    Активен
                  </span>
                </div>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

