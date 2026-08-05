"use client";

import React, { useState } from "react";
import { Settings, Save, CheckCircle2, Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const SettingsManager = () => {
  const [phone, setPhone] = useState("+359 888 000 000");
  const [email, setEmail] = useState("hello@poshtichka.bg");
  const [location, setLocation] = useState("гр. Бургас, България");
  const [instagram, setInstagram] = useState("https://instagram.com/poshtichka.bg");
  const [facebook, setFacebook] = useState("https://facebook.com/poshtichka.bg");
  const [notificationsEmail, setNotificationsEmail] = useState("admin@poshtichka.bg");

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Общи Настройки на Сайта
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            Управление на контакти, социални мрежи и известия
          </p>
        </div>
        {saved && (
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-700 bg-emerald-100 px-4 py-2 rounded-xl">
            <CheckCircle2 className="w-4 h-4" />
            <span>Настройките бяха обновени!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <Card className="p-6 space-y-4 bg-white border border-brand-primary/20 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-brand-dark pb-2 border-b border-brand-secondary">
              Заводски Контакти
            </h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Телефонен номер</span>
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </div>
            </div>
          </Card>

          {/* Social Media & Notifications */}
          <Card className="p-6 space-y-4 bg-white border border-brand-primary/20 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-brand-dark pb-2 border-b border-brand-secondary">
              Социални Мрежи & Известия
            </h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark flex items-center space-x-1.5">
                  <Instagram className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Instagram Профил</span>
                </label>
                <input
                  type="url"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
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
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Имейл за Резервационни Известия</span>
                </label>
                <input
                  type="email"
                  value={notificationsEmail}
                  onChange={(e) => setNotificationsEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button variant="primary" size="lg" type="submit" className="flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Запази настройките</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
