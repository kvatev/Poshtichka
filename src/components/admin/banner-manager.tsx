"use client";

import React, { useState, useEffect } from "react";
import { Save, Check, Plus, Trash2, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PromoBanner, defaultBanners } from "@/lib/content-store";

export const BannerManager = () => {
  const [banners, setBanners] = useState<PromoBanner[]>(defaultBanners);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.banners && Array.isArray(data.banners)) {
          setBanners(data.banners);
        }
      })
      .catch(() => {});
  }, []);

  const handleToggleEnable = (id: string) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, enabled: !b.enabled } : b))
    );
  };

  const handleUpdate = (id: string, field: keyof PromoBanner, value: any) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  };

  const handleAddBanner = () => {
    const newBan: PromoBanner = {
      id: `ban-${Date.now()}`,
      type: "top",
      message: "🎉 Нова оферта за събития! Безплатен индивидуален дизайн при резервация.",
      buttonText: "Виж повече",
      buttonLink: "/calendar",
      enabled: false,
      theme: "gold",
    };
    setBanners([...banners, newBan]);
  };

  const handleDeleteBanner = (id: string) => {
    if (!confirm("Сигурни ли сте, че искате да изтриете този банер?")) return;
    setBanners((prev) => prev.filter((b) => b.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "banners", value: banners }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Save banners error:", err);
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
            Управление на Промо Банерите (Banner Manager)
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            Активирайте или деактивирайте горни информационни ленти и сезонни съобщения без промяна в кода
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="md"
            onClick={handleAddBanner}
            className="flex items-center space-x-1.5 border-brand-accent/40 text-brand-dark"
          >
            <Plus className="w-4 h-4 text-brand-accent" />
            <span>Добави банер</span>
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
                <span>{saving ? "Запазване..." : "Запази банерите"}</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Banners List */}
      <div className="space-y-6">
        {banners.map((ban) => (
          <Card
            key={ban.id}
            className={`p-6 sm:p-8 space-y-6 bg-white border transition-all ${
              ban.enabled
                ? "border-emerald-400/80 shadow-md ring-1 ring-emerald-300/40"
                : "border-brand-primary/20 opacity-80"
            }`}
          >
            <div className="flex items-center justify-between border-b border-brand-primary/10 pb-4">
              <div className="flex items-center space-x-3">
                <Megaphone className="w-5 h-5 text-brand-accent" />
                <h3 className="font-serif text-xl font-bold text-brand-dark">
                  Банер: {ban.id}
                </h3>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer text-xs font-bold text-brand-dark">
                  <span>Активен на сайта:</span>
                  <input
                    type="checkbox"
                    checked={ban.enabled}
                    onChange={() => handleToggleEnable(ban.id)}
                    className="w-5 h-5 rounded border-brand-primary/40 text-brand-accent focus:ring-brand-accent cursor-pointer"
                  />
                </label>

                <button
                  onClick={() => handleDeleteBanner(ban.id)}
                  className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                  title="Изтрий"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-brand-dark">
                Текст на съобщението
              </label>
              <textarea
                rows={2}
                value={ban.message}
                onChange={(e) => handleUpdate(ban.id, "message", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm font-sans text-brand-dark bg-brand-bg/40 focus:ring-2 focus:ring-brand-accent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark">
                  Текст на бутона (по избор)
                </label>
                <input
                  type="text"
                  value={ban.buttonText || ""}
                  onChange={(e) => handleUpdate(ban.id, "buttonText", e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/40"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark">
                  Линк на бутона (URL)
                </label>
                <input
                  type="text"
                  value={ban.buttonLink || ""}
                  onChange={(e) => handleUpdate(ban.id, "buttonLink", e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/40"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark">
                  Позиция / Тип
                </label>
                <select
                  value={ban.type}
                  onChange={(e) => handleUpdate(ban.id, "type", e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/40"
                >
                  <option value="top">Най-горе на целия сайт (Top Banner)</option>
                  <option value="homepage">Само в Началната страница</option>
                  <option value="seasonal">Сезонен банер</option>
                  <option value="announcement">Извънредно съобщение</option>
                </select>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
