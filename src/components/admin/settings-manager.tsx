"use client";

import React, { useState, useEffect } from "react";
import { Save, CheckCircle2, Phone, Mail, MapPin, Instagram, Facebook, Clock, ShieldCheck, UserPlus, Lock, Key } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GeneralSettings, defaultGeneralSettings } from "@/lib/content-store";

export const SettingsManager = () => {
  const [settings, setSettings] = useState<GeneralSettings>(defaultGeneralSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Admin Team & Security State
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userMsg, setUserMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Password Update State
  const [myNewPassword, setMyNewPassword] = useState("");
  const [updatingPass, setUpdatingPass] = useState(false);
  const [passMsg, setPassMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

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

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingUser(true);
    setUserMsg(null);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newAdminEmail, password: newAdminPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setUserMsg({ type: "success", text: data.message || "Новият администратор бе регистриран!" });
        setNewAdminEmail("");
        setNewAdminPassword("");
      } else {
        setUserMsg({ type: "error", text: data.error || "Грешка при създаване." });
      }
    } catch (err) {
      setUserMsg({ type: "error", text: "Възникна системна грешка." });
    } finally {
      setCreatingUser(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingPass(true);
    setPassMsg(null);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_password", password: myNewPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setPassMsg({ type: "success", text: data.message || "Паролата Ви беше актуализирана успешно!" });
        setMyNewPassword("");
      } else {
        setPassMsg({ type: "error", text: data.error || "Грешка при промяна на паролата." });
      }
    } catch (err) {
      setPassMsg({ type: "error", text: "Възникна системна грешка." });
    } finally {
      setUpdatingPass(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-xs">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Общи Настройки & Управление на Екипа
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            Контакти, социални мрежи, добавки за сигурност и регистрация на нови администратори
          </p>
        </div>
        {saved && (
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-700 bg-emerald-100 px-4 py-2 rounded-xl">
            <CheckCircle2 className="w-4 h-4" />
            <span>Настройките бяха запазени!</span>
          </div>
        )}
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-brand-accent font-bold"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-brand-accent font-bold"
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
            className="flex items-center space-x-2 shrink-0 shadow-md hover:shadow-lg transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Запазване..." : "Запази основните настройки"}</span>
          </Button>
        </div>
      </form>

      {/* TEAM & SECURITY MODULE (Supabase Auth Integration) */}
      <div className="space-y-6 pt-4 border-t border-brand-primary/20">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-6 h-6 text-brand-accent" />
          <h3 className="font-serif text-2xl font-bold text-brand-dark">
            Екип & Сигурност (Team & Supabase Auth)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Register New Administrator */}
          <Card className="p-6 space-y-4 bg-white border border-brand-primary/20 shadow-sm">
            <div className="flex items-center space-x-2 pb-2 border-b border-brand-secondary">
              <UserPlus className="w-5 h-5 text-brand-accent" />
              <h4 className="font-serif text-lg font-bold text-brand-dark">
                Добави нов Администратор
              </h4>
            </div>

            <p className="text-xs text-brand-dark/70 leading-relaxed">
              Създайте нов профил с пълни права за достъп в Supabase Auth.
            </p>

            <form onSubmit={handleCreateAdmin} className="space-y-3">
              {userMsg && (
                <div
                  className={`p-3 rounded-xl text-xs font-semibold ${
                    userMsg.type === "success"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-red-100 text-red-800 border border-red-300"
                  }`}
                >
                  {userMsg.text}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark">
                  Имейл на новия админ *
                </label>
                <input
                  type="email"
                  required
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  placeholder="admin2@poshtichka.bg"
                  className="w-full px-3.5 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:ring-2 focus:ring-brand-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark">
                  Парола (мин. 6 символа) *
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:ring-2 focus:ring-brand-accent"
                />
              </div>

              <Button
                type="submit"
                variant="accent"
                size="md"
                disabled={creatingUser}
                className="w-full flex items-center justify-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>{creatingUser ? "Регистриране..." : "Регистрирай Администратор"}</span>
              </Button>
            </form>
          </Card>

          {/* Password Change for Current Admin */}
          <Card className="p-6 space-y-4 bg-white border border-brand-primary/20 shadow-sm">
            <div className="flex items-center space-x-2 pb-2 border-b border-brand-secondary">
              <Key className="w-5 h-5 text-brand-accent" />
              <h4 className="font-serif text-lg font-bold text-brand-dark">
                Промяна на собствена Парола
              </h4>
            </div>

            <p className="text-xs text-brand-dark/70 leading-relaxed">
              Актуализирайте секретната парола за текущия ви административен сеанс.
            </p>

            <form onSubmit={handleUpdatePassword} className="space-y-3">
              {passMsg && (
                <div
                  className={`p-3 rounded-xl text-xs font-semibold ${
                    passMsg.type === "success"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-red-100 text-red-800 border border-red-300"
                  }`}
                >
                  {passMsg.text}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark">
                  Нова Парола *
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={myNewPassword}
                  onChange={(e) => setMyNewPassword(e.target.value)}
                  placeholder="Нова сигурна парола"
                  className="w-full px-3.5 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:ring-2 focus:ring-brand-accent"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={updatingPass}
                className="w-full flex items-center justify-center space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>{updatingPass ? "Актуализиране..." : "Запази Новата Парола"}</span>
              </Button>
            </form>
          </Card>
        </div>

        {/* Supabase Cloud Database Status & 1-Click Setup Card */}
        <Card className="p-6 space-y-4 bg-white border-2 border-[#00b4b6]/30 shadow-md rounded-3xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#00b4b6]/15">
            <div className="flex items-center space-x-2.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <h4 className="font-salongbeach text-xl font-bold uppercase tracking-wider text-[#00b4b6]">
                Облачна База Данни (Supabase PostgreSQL)
              </h4>
            </div>
            <span className="text-xs font-mono bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full w-fit">
              🟢 СВЪРЗАНА
            </span>
          </div>

          <div className="space-y-2 text-xs font-sans text-[#182b2c]/80">
            <p>
              Проектът е свързан директно към вашия Supabase инстанс:
            </p>
            <div className="p-3 bg-[#f9f6f0] rounded-xl border border-[#00b4b6]/20 font-mono text-[11px] text-[#182b2c] break-all">
              https://nsrmhreocsjtrzjexrbu.supabase.co
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="https://supabase.com/dashboard/project/nsrmhreocsjtrzjexrbu/sql/new"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#00b4b6] hover:bg-[#008b8d] text-white font-salongbeach text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md text-center transition-colors"
            >
              Отвори Supabase SQL Editor ↗
            </a>
            <p className="text-[11px] text-[#182b2c]/60">
              Всички промени от админ панела се синхронизират постоянно с базата данни!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
