"use client";

import React, { useState, useEffect } from "react";
import { Save, Check, FileText, Globe, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ContentBlock {
  page: string;
  sectionKey: string;
  sectionTitle: string;
  heading: string;
  body: string;
}

const defaultBlocks: ContentBlock[] = [
  {
    page: "about",
    sectionKey: "about_hero",
    sectionTitle: "За нас - Hero Заглавие",
    heading: "Ние не печатаме картички. Ние създаваме спомени.",
    body: "Пощичка се роди с една ясна мисия: да превърне традиционния подарък за гости в интерактивно преживяване, което носи истинска радост.",
  },
  {
    page: "about",
    sectionKey: "about_story",
    sectionTitle: "За нас - Нашата история",
    heading: "По-различно от стандартната фото кабина",
    body: "Често ни питат: 'Какво точно е Пощичка?'. Ние отговаряме, че това е мястото, където Вашите гости се събират, усмихват се и общуват помежду си.",
  },
  {
    page: "services",
    sectionKey: "services_hero",
    sectionTitle: "Услуги - Hero Текст",
    heading: "Персонализирани концепции за всяко събитие",
    body: "От традиционни градински сватби до мащабни корпоративни празненства и фестивали.",
  },
  {
    page: "contact",
    sectionKey: "contact_hero",
    sectionTitle: "Контакти - Hero Текст",
    heading: "Очакваме Вашето запитване",
    body: "Имате въпрос или искате да проверите наличност за Вашата дата? Свържете се с нас по удобен за Вас начин.",
  },
];

export const WebsiteContentManager = () => {
  const [blocks, setBlocks] = useState<ContentBlock[]>(defaultBlocks);
  const [activePage, setActivePage] = useState<string>("all");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.website_content && Array.isArray(data.website_content)) {
          setBlocks(data.website_content);
        }
      })
      .catch(() => {});
  }, []);

  const handleUpdate = (index: number, field: "heading" | "body", value: string) => {
    setBlocks((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "website_content", value: blocks }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Save content error:", err);
    } finally {
      setSaving(false);
    }
  };

  const filteredBlocks = blocks.filter(
    (b) => activePage === "all" || b.page === activePage
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-xs">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Управление на Текстовото Съдържание
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            Редактирайте параграфите, заглавията и текстовете на целия уебсайт
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 border border-brand-primary/20 rounded-xl p-1 bg-brand-bg text-xs">
            {["all", "about", "services", "contact"].map((p) => (
              <button
                key={p}
                onClick={() => setActivePage(p)}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium capitalize cursor-pointer ${
                  activePage === p
                    ? "bg-brand-accent text-white"
                    : "text-brand-dark/70 hover:bg-white"
                }`}
              >
                {p === "all" ? "Всички" : p === "about" ? "За нас" : p === "services" ? "Услуги" : "Контакти"}
              </button>
            ))}
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
                <span>{saving ? "Запазване..." : "Запази текста"}</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Content Blocks Form */}
      <div className="space-y-6">
        {filteredBlocks.map((block, idx) => (
          <Card key={block.sectionKey} className="p-6 sm:p-8 space-y-4 bg-white border border-brand-primary/20 shadow-xs">
            <div className="flex items-center justify-between border-b border-brand-primary/10 pb-3">
              <span className="text-xs uppercase tracking-widest text-brand-accent font-bold">
                {block.sectionTitle} ({block.page})
              </span>
              <span className="text-[10px] font-mono bg-brand-secondary px-2 py-0.5 rounded text-brand-dark">
                {block.sectionKey}
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-brand-dark">
                Заглавие
              </label>
              <input
                type="text"
                value={block.heading}
                onChange={(e) => handleUpdate(idx, "heading", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm font-serif font-bold text-brand-dark bg-brand-bg/40 focus:ring-2 focus:ring-brand-accent"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-brand-dark">
                Основен параграф / Текст
              </label>
              <textarea
                rows={3}
                value={block.body}
                onChange={(e) => handleUpdate(idx, "body", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm font-sans text-brand-dark bg-brand-bg/40 focus:ring-2 focus:ring-brand-accent leading-relaxed"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
