"use client";

import React, { useState, useEffect } from "react";
import { Save, Check, Sparkles, Gift, Eye, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface PopupConfigData {
  id?: number;
  title: string;
  badge: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  imageUrl: string;
  isActive: boolean;
}

export const PopupManager = () => {
  const [config, setConfig] = useState<PopupConfigData>({
    title: "Специална Сватбена Оферта",
    badge: "Промоция",
    description: "Запазете вашата дата за сватба или събитие с отстъпка за ранни запитвания.",
    ctaText: "Проверете наличност",
    ctaUrl: "/booking",
    imageUrl: "",
    isActive: true,
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/popup")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === "object") {
          setConfig({
            title: data.title || "Специална Сватбена Оферта",
            badge: data.badge || "Промоция",
            description: data.description || "Запазете вашата дата за сватба или събитие с отстъпка за ранни запитвания.",
            ctaText: data.ctaText || data.cta_text || "Проверете наличност",
            ctaUrl: data.ctaUrl || data.cta_url || "/booking",
            imageUrl: data.imageUrl || data.image_url || "",
            isActive: typeof data.isActive === "boolean" ? data.isActive : (data.is_active ?? true),
          });
        }
      })
      .catch((err) => console.error("Fetch popup config error:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("poshtichka_popup_config", JSON.stringify(config));
      }

      const res = await fetch("/api/popup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error("Save popup error:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-brand-dark/70 font-sans flex items-center justify-center space-x-2">
        <RefreshCw className="w-5 h-5 animate-spin text-brand-accent" />
        <span>Зареждане на попъп настройките...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-xs">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Управление на Промоционалния Попъп (Popup Manager)
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            Настройте изскачащия прозорец за промоции, който се появява за посетителите на сайта
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2 cursor-pointer shrink-0 shadow-md hover:shadow-lg transition-all"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Запазено в Supabase!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{saving ? "Запазване..." : "Запази промените"}</span>
            </>
          )}
        </Button>
      </div>

      {/* Main Form Card */}
      <Card className="p-6 sm:p-8 space-y-6 bg-white border border-brand-primary/20 shadow-sm">
        <div className="flex items-center justify-between border-b border-brand-primary/10 pb-4">
          <div className="flex items-center space-x-3">
            <Gift className="w-5 h-5 text-brand-accent" />
            <h3 className="font-serif text-xl font-bold text-brand-dark">
              Конфигурация на Попъпа
            </h3>
          </div>

          <label className="flex items-center space-x-2 cursor-pointer bg-brand-bg px-4 py-2 rounded-xl border border-brand-primary/30 text-xs font-bold text-brand-dark hover:bg-brand-primary/20 transition-colors">
            <span>Активен попъп на сайта:</span>
            <input
              type="checkbox"
              checked={config.isActive}
              onChange={(e) => setConfig({ ...config, isActive: e.target.checked })}
              className="w-5 h-5 rounded border-brand-primary/40 text-brand-accent focus:ring-brand-accent cursor-pointer"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-dark">
              Заглавие на промоцията (title)
            </label>
            <input
              type="text"
              value={config.title}
              onChange={(e) => setConfig({ ...config, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm font-sans text-brand-dark bg-brand-bg/40 focus:ring-2 focus:ring-brand-accent font-bold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-dark">
              Значка / Бадж (badge)
            </label>
            <input
              type="text"
              value={config.badge}
              onChange={(e) => setConfig({ ...config, badge: e.target.value })}
              placeholder="напр. Промоция или Оферта"
              className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm font-sans text-brand-dark bg-brand-bg/40 focus:ring-2 focus:ring-brand-accent"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-brand-dark">
            Описание / Текст на офертата (description)
          </label>
          <textarea
            rows={3}
            value={config.description}
            onChange={(e) => setConfig({ ...config, description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm font-sans text-brand-dark bg-brand-bg/40 focus:ring-2 focus:ring-brand-accent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-dark">
              Текст на бутона (ctaText)
            </label>
            <input
              type="text"
              value={config.ctaText}
              onChange={(e) => setConfig({ ...config, ctaText: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/40 font-semibold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-dark">
              Линк на бутона / Страница (ctaUrl)
            </label>
            <input
              type="text"
              value={config.ctaUrl}
              onChange={(e) => setConfig({ ...config, ctaUrl: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/40"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-dark">
              URL на изображение (imageUrl)
            </label>
            <input
              type="text"
              value={config.imageUrl}
              onChange={(e) => setConfig({ ...config, imageUrl: e.target.value })}
              placeholder="/media/..."
              className="w-full px-4 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/40"
            />
          </div>
        </div>
      </Card>

      {/* Live Preview Card */}
      <Card className="p-6 bg-brand-bg/60 border border-brand-primary/20 rounded-3xl space-y-4">
        <div className="flex items-center space-x-2 text-xs font-bold text-brand-dark uppercase tracking-wider">
          <Eye className="w-4 h-4 text-brand-accent" />
          <span>Предварителен Преглед на Попъпа (Live Preview)</span>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-brand-primary/30 max-w-md mx-auto text-center space-y-3 relative">
          {config.badge && (
            <span className="inline-flex items-center space-x-1 bg-brand-secondary px-3 py-1 rounded-full text-xs font-semibold text-brand-accent uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              <span>{config.badge}</span>
            </span>
          )}
          <h4 className="font-serif text-xl font-bold text-brand-dark">{config.title}</h4>
          <p className="text-xs text-brand-dark/80 font-light leading-relaxed">{config.description}</p>
          <div className="pt-2">
            <button className="px-6 py-2 rounded-full bg-brand-accent text-white font-bold text-xs uppercase tracking-wider">
              {config.ctaText}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};
