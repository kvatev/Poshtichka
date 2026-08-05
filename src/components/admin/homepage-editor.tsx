"use client";

import React, { useState, useEffect } from "react";
import { Save, Check, Sparkles, Layout, Image as ImageIcon, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HomepageConfig, defaultHomepageConfig } from "@/lib/content-store";

export const HomepageEditor = () => {
  const [config, setConfig] = useState<HomepageConfig>(defaultHomepageConfig);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.homepage) {
          setConfig((prev) => ({ ...prev, ...data.homepage }));
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
        body: JSON.stringify({ key: "homepage_config", value: config }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Save homepage config error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-xs">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Редактор на Началната Страница (Homepage)
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            Персонализирайте текста, заглавията и медийното съдържание на главната страница без програмиране
          </p>
        </div>

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
              <span>{saving ? "Запазване..." : "Запази промените"}</span>
            </>
          )}
        </Button>
      </div>

      {/* Hero Section Form */}
      <Card className="p-6 sm:p-8 space-y-6 bg-white border border-brand-primary/20 shadow-sm">
        <div className="flex items-center space-x-2 border-b border-brand-primary/10 pb-4">
          <Sparkles className="w-5 h-5 text-brand-accent" />
          <h3 className="font-serif text-xl font-bold text-brand-dark">
            Hero Секция (Главен Банер)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-dark">
              Основно Заглавие (Ред 1)
            </label>
            <input
              type="text"
              value={config.heroTitleLine1}
              onChange={(e) => setConfig({ ...config, heroTitleLine1: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm font-sans text-brand-dark focus:ring-2 focus:ring-brand-accent bg-brand-bg/40"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-dark">
              Акцентирана фраза (Курсив)
            </label>
            <input
              type="text"
              value={config.heroTitleHighlight}
              onChange={(e) => setConfig({ ...config, heroTitleHighlight: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm font-sans text-brand-dark focus:ring-2 focus:ring-brand-accent bg-brand-bg/40"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-brand-dark">
            Подзаглавие / Маркетинг текст
          </label>
          <textarea
            rows={3}
            value={config.heroSubtitle}
            onChange={(e) => setConfig({ ...config, heroSubtitle: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm font-sans text-brand-dark focus:ring-2 focus:ring-brand-accent bg-brand-bg/40"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-dark">
              Основен бутон (Основен CTA)
            </label>
            <input
              type="text"
              value={config.primaryCtaText}
              onChange={(e) => setConfig({ ...config, primaryCtaText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm font-sans text-brand-dark focus:ring-2 focus:ring-brand-accent bg-brand-bg/40"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-dark">
              Вторичен бутон (Галерия CTA)
            </label>
            <input
              type="text"
              value={config.secondaryCtaText}
              onChange={(e) => setConfig({ ...config, secondaryCtaText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm font-sans text-brand-dark focus:ring-2 focus:ring-brand-accent bg-brand-bg/40"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-brand-dark flex items-center space-x-1">
            <ImageIcon className="w-4 h-4 text-brand-accent" />
            <span>URL на заден фон (Изображение)</span>
          </label>
          <input
            type="text"
            value={config.heroImageUrl}
            onChange={(e) => setConfig({ ...config, heroImageUrl: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm font-sans text-brand-dark focus:ring-2 focus:ring-brand-accent bg-brand-bg/40"
          />
        </div>
      </Card>

      {/* Section Headings Form */}
      <Card className="p-6 sm:p-8 space-y-6 bg-white border border-brand-primary/20 shadow-sm">
        <div className="flex items-center space-x-2 border-b border-brand-primary/10 pb-4">
          <Layout className="w-5 h-5 text-brand-accent" />
          <h3 className="font-serif text-xl font-bold text-brand-dark">
            Заглавия на Секциите в Homepage
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-dark">
              Заглавие "Как функционира?"
            </label>
            <input
              type="text"
              value={config.howItWorksTitle}
              onChange={(e) => setConfig({ ...config, howItWorksTitle: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/40"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-dark">
              Заглавие "Услуги & Събития"
            </label>
            <input
              type="text"
              value={config.servicesPreviewTitle}
              onChange={(e) => setConfig({ ...config, servicesPreviewTitle: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/40"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-dark">
              Заглавие "Калкулатор за цена"
            </label>
            <input
              type="text"
              value={config.calculatorTitle}
              onChange={(e) => setConfig({ ...config, calculatorTitle: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/40"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-dark">
              Заглавие "Галерия със спомени"
            </label>
            <input
              type="text"
              value={config.galleryTitle}
              onChange={(e) => setConfig({ ...config, galleryTitle: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/40"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-dark">
              Заглавие "Отзиви от младоженци & клиенти"
            </label>
            <input
              type="text"
              value={config.testimonialsTitle}
              onChange={(e) => setConfig({ ...config, testimonialsTitle: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/40"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-dark">
              Заглавие "Финална CTA покана"
            </label>
            <input
              type="text"
              value={config.finalCtaTitle}
              onChange={(e) => setConfig({ ...config, finalCtaTitle: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/40"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
