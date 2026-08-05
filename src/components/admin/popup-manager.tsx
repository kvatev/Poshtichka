"use client";

import React, { useState, useEffect } from "react";
import { Save, Check, Plus, Trash2, Eye, Sparkles, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PromoPopup, defaultPopups } from "@/lib/content-store";

export const PopupManager = () => {
  const [popups, setPopups] = useState<PromoPopup[]>(defaultPopups);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.popups && Array.isArray(data.popups)) {
          setPopups(data.popups);
        }
      })
      .catch(() => {});
  }, []);

  const handleToggleEnable = (id: string) => {
    setPopups((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const handleUpdate = (id: string, field: keyof PromoPopup, value: any) => {
    setPopups((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleAddPopup = () => {
    const newPop: PromoPopup = {
      id: `pop-${Date.now()}`,
      title: "Нова Промоционална Оферта",
      subtitle: "Запазете дата за събитие с отстъпка за ранни запитвания.",
      buttonText: "Проверете наличност",
      buttonLink: "/calendar",
      badgeText: "Промоция",
      enabled: false,
    };
    setPopups([...popups, newPop]);
  };

  const handleDeletePopup = (id: string) => {
    if (!confirm("Сигурни ли сте, че искате да изтриете този попъп?")) return;
    setPopups((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "popups", value: popups }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Save popups error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-xs">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Управление на Промоционалните Попъпи (Popup Manager)
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            Създавайте и насрочвайте изскачащи прозорци за специални оферти, сватбени изложения и сезонни намаления
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="md"
            onClick={handleAddPopup}
            className="flex items-center space-x-1.5 border-brand-accent/40 text-brand-dark"
          >
            <Plus className="w-4 h-4 text-brand-accent" />
            <span>Добави нов попъп</span>
          </Button>

          <Button
            variant="primary"
            size="md"
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
                <span>{saving ? "Запазване..." : "Запази попъпите"}</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Popups List */}
      <div className="space-y-6">
        {popups.map((pop) => (
          <Card
            key={pop.id}
            className={`p-6 sm:p-8 space-y-6 bg-white border transition-all ${
              pop.enabled
                ? "border-emerald-400/80 shadow-md ring-1 ring-emerald-300/40"
                : "border-brand-primary/20 opacity-80"
            }`}
          >
            <div className="flex items-center justify-between border-b border-brand-primary/10 pb-4">
              <div className="flex items-center space-x-3">
                <Gift className="w-5 h-5 text-brand-accent" />
                <h3 className="font-serif text-xl font-bold text-brand-dark">
                  {pop.title}
                </h3>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer text-xs font-bold text-brand-dark">
                  <span>Активен:</span>
                  <input
                    type="checkbox"
                    checked={pop.enabled}
                    onChange={() => handleToggleEnable(pop.id)}
                    className="w-5 h-5 rounded border-brand-primary/40 text-brand-accent focus:ring-brand-accent cursor-pointer"
                  />
                </label>

                <button
                  onClick={() => handleDeletePopup(pop.id)}
                  className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                  title="Изтрий"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark">
                  Заглавие на офертата
                </label>
                <input
                  type="text"
                  value={pop.title}
                  onChange={(e) => handleUpdate(pop.id, "title", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm font-sans text-brand-dark bg-brand-bg/40 focus:ring-2 focus:ring-brand-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark">
                  Значка / Бадж (напр. Специална оферта)
                </label>
                <input
                  type="text"
                  value={pop.badgeText || ""}
                  onChange={(e) => handleUpdate(pop.id, "badgeText", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm font-sans text-brand-dark bg-brand-bg/40 focus:ring-2 focus:ring-brand-accent"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-brand-dark">
                Подзаглавие / Описание на промоцията
              </label>
              <textarea
                rows={2}
                value={pop.subtitle}
                onChange={(e) => handleUpdate(pop.id, "subtitle", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm font-sans text-brand-dark bg-brand-bg/40 focus:ring-2 focus:ring-brand-accent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark">
                  Текст на бутона (CTA)
                </label>
                <input
                  type="text"
                  value={pop.buttonText}
                  onChange={(e) => handleUpdate(pop.id, "buttonText", e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/40"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark">
                  Линк на бутона (URL)
                </label>
                <input
                  type="text"
                  value={pop.buttonLink}
                  onChange={(e) => handleUpdate(pop.id, "buttonLink", e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/40"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark">
                  URL на изображение (по избор)
                </label>
                <input
                  type="text"
                  value={pop.imageUrl || ""}
                  onChange={(e) => handleUpdate(pop.id, "imageUrl", e.target.value)}
                  placeholder="/media/gallery/..."
                  className="w-full px-4 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/40"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
