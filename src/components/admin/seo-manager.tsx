"use client";

import React, { useState, useEffect } from "react";
import { Save, Check, Search, Share2, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SeoSettings, defaultSeoSettings, PageSeoConfig } from "@/lib/content-store";

export const SeoManager = () => {
  const [seo, setSeo] = useState<SeoSettings>(defaultSeoSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<keyof SeoSettings>("home");

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.seo) {
          setSeo((prev) => ({ ...prev, ...data.seo }));
        }
      })
      .catch(() => {});
  }, []);

  const handleUpdatePage = (
    pageKey: keyof SeoSettings,
    field: keyof PageSeoConfig,
    value: string
  ) => {
    setSeo((prev) => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "seo_settings", value: seo }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Save SEO error:", err);
    } finally {
      setSaving(false);
    }
  };

  const pagesList: { key: keyof SeoSettings; label: string }[] = [
    { key: "home", label: "Начало (/)" },
    { key: "about", label: "За нас (/about)" },
    { key: "services", label: "Услуги (/services)" },
    { key: "gallery", label: "Галерия (/gallery)" },
    { key: "calendar", label: "Календар (/calendar)" },
    { key: "booking", label: "Резервация (/booking)" },
    { key: "faq", label: "ЧЗВ (/faq)" },
    { key: "contact", label: "Контакти (/contact)" },
  ];

  const currentPageConfig = seo[activeTab];

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-xs">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            SEO & Метатегове Настройки (SEO Manager)
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            Оптимизирайте мета заглавията, описанията, ключовите думи и Open Graph изображенията за търсачки и социални мрежи
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
              <span>{saving ? "Запазване..." : "Запази SEO настройките"}</span>
            </>
          )}
        </Button>
      </div>

      {/* Tabs bar */}
      <div className="flex flex-wrap gap-2 border-b border-brand-primary/20 pb-2">
        {pagesList.map((p) => (
          <button
            key={p.key}
            onClick={() => setActiveTab(p.key)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === p.key
                ? "bg-brand-accent text-white shadow-sm"
                : "bg-white text-brand-dark/70 hover:bg-brand-secondary border border-brand-primary/20"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Page Form & Google/Social Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Form */}
        <Card className="lg:col-span-2 p-6 sm:p-8 space-y-6 bg-white border border-brand-primary/20 shadow-xs">
          <div className="flex items-center space-x-2 border-b border-brand-primary/10 pb-3">
            <Search className="w-5 h-5 text-brand-accent" />
            <h3 className="font-serif text-xl font-bold text-brand-dark capitalize">
              Настройки за {activeTab}
            </h3>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-dark">
              Meta Title (Мета Заглавие)
            </label>
            <input
              type="text"
              value={currentPageConfig.title}
              onChange={(e) => handleUpdatePage(activeTab, "title", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm font-sans text-brand-dark bg-brand-bg/40 focus:ring-2 focus:ring-brand-accent"
            />
            <p className="text-[10px] text-brand-muted text-right">
              {currentPageConfig.title.length} / 60 знака (Препоръчително 50-60)
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-dark">
              Meta Description (Мета Описание)
            </label>
            <textarea
              rows={3}
              value={currentPageConfig.description}
              onChange={(e) => handleUpdatePage(activeTab, "description", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm font-sans text-brand-dark bg-brand-bg/40 focus:ring-2 focus:ring-brand-accent"
            />
            <p className="text-[10px] text-brand-muted text-right">
              {currentPageConfig.description.length} / 160 знака (Препоръчително 150-160)
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-dark">
              Keywords (Ключови думи, разделени със запетая)
            </label>
            <input
              type="text"
              value={currentPageConfig.keywords}
              onChange={(e) => handleUpdatePage(activeTab, "keywords", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm font-sans text-brand-dark bg-brand-bg/40 focus:ring-2 focus:ring-brand-accent"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-dark">
              Open Graph Изображение (og:image URL)
            </label>
            <input
              type="text"
              value={currentPageConfig.ogImage}
              onChange={(e) => handleUpdatePage(activeTab, "ogImage", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm font-sans text-brand-dark bg-brand-bg/40 focus:ring-2 focus:ring-brand-accent"
            />
          </div>
        </Card>

        {/* Live Search Engine Preview */}
        <Card className="p-6 space-y-6 bg-white border border-brand-primary/20 shadow-xs h-fit">
          <div className="flex items-center space-x-2 border-b border-brand-primary/10 pb-3">
            <Share2 className="w-5 h-5 text-brand-accent" />
            <h3 className="font-serif text-lg font-bold text-brand-dark">
              Преглед в Google
            </h3>
          </div>

          <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <span className="text-xs text-emerald-700 font-sans block truncate">
              https://poshtichka.bg/{activeTab === "home" ? "" : activeTab}
            </span>
            <h4 className="text-blue-700 text-sm font-medium hover:underline cursor-pointer line-clamp-1">
              {currentPageConfig.title}
            </h4>
            <p className="text-xs text-gray-600 font-sans line-clamp-2 leading-relaxed">
              {currentPageConfig.description}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
