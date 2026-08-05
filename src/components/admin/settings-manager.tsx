"use client";

import React, { useState, useEffect } from "react";
import { Save, CheckCircle2, Phone, Mail, MapPin, Instagram, Facebook, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GeneralSettings, defaultGeneralSettings } from "@/lib/content-store";

export const SettingsManager = () => {
  const [settings, setSettings] = useState<GeneralSettings>(defaultGeneralSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.general) {
          setSettings((prev) => ({ ...prev, ...data.general }));
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "general_settings", value: settings }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Save settings error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-xs">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Общи Настройки на Сайта
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            Управление на контакти, социални мрежи, Google Maps и работно време
          </p>
        </div>
        {saved && (
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-700 bg-emerald-100 px-4 py-2 rounded-xl">
            <CheckCircle2 className="w-4 h-4" />
            <span>Настройките бяха запазени!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <Card className="p-6 space-y-4 bg-white border border-brand-primary/20 shadow-xs">
            <h3 className="font-serif text-lg font-bold text-brand-dark pb-2 border-b border-brand-secondary">
              Заводски Контакти & Локация
            </h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Телефонен номер</span>
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Публичен Имейл</span>
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Базова Локация</span>
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Работно време</span>
                </label>
                <input
                  type="text"
                  value={settings.businessHours}
                  onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </div>
            </div>
          </Card>

          {/* Social Media & Maps */}
          <Card className="p-6 space-y-4 bg-white border border-brand-primary/20 shadow-xs">
            <h3 className="font-serif text-lg font-bold text-brand-dark pb-2 border-b border-brand-secondary">
              Социални Мрежи & Google Maps Embed
            </h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark flex items-center space-x-1.5">
                  <Instagram className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Instagram Профил</span>
                </label>
                <input
                  type="url"
                  value={settings.instagramUrl}
                  onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark flex items-center space-x-1.5">
                  <Facebook className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Facebook Страница</span>
                </label>
                <input
                  type="url"
                  value={settings.facebookUrl}
                  onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark flex items-center space-x-1.5">
                  <span>TikTok Профил</span>
                </label>
                <input
                  type="url"
                  value={settings.tiktokUrl}
                  onChange={(e) => setSettings({ ...settings, tiktokUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Google Maps Embed URL</span>
                </label>
                <input
                  type="text"
                  value={settings.googleMapsUrl}
                  onChange={(e) => setSettings({ ...settings, googleMapsUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button
            variant="primary"
            size="lg"
            type="submit"
            disabled={saving}
            className="flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Запазване..." : "Запази настройките"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
