"use client";

import React, { useState, useEffect } from "react";
import { Save, Sparkles, Truck, Palette, Check, Users, Lock, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const PricingManager = () => {
  // 3 Editable Guest Tiers
  const [price70, setPrice70] = useState("330");
  const [price100, setPrice100] = useState("350");
  const [price150, setPrice150] = useState("380");

  // Graphic Design Price
  const [designPrice, setDesignPrice] = useState("50");

  // Transport Settings
  const [freeDistance, setFreeDistance] = useState("50");
  const [ratePerKm, setRatePerKm] = useState("0.23");

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/content", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        const p = data.pricing_settings || data.pricing;
        if (p) {
          if (p.price70) setPrice70(String(p.price70));
          if (p.price100) setPrice100(String(p.price100));
          else if (p.rentalPrice) setPrice100(String(p.rentalPrice));
          if (p.price150) setPrice150(String(p.price150));

          if (p.designPrice) setDesignPrice(String(p.designPrice));
          if (p.freeDistance) setFreeDistance(String(p.freeDistance));
          if (p.ratePerKm) setRatePerKm(String(p.ratePerKm));
        }
      })
      .catch(() => {});
  }, []);

  const handleSavePricing = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    setSaveError(null);

    const payload = {
      price70: Number(price70) || 330,
      price100: Number(price100) || 350,
      price150: Number(price150) || 380,
      rentalPrice: Number(price100) || 350,
      designPrice: Number(designPrice) || 50,
      freeDistance: Number(freeDistance) || 50,
      ratePerKm: Number(ratePerKm) || 0.23,
    };

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("poshtichka_content_pricing_settings", JSON.stringify(payload));
      }
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "pricing_settings", value: payload }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Грешка при запис.");
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err: any) {
      console.error("Save pricing error:", err);
      setSaveError(err?.message || "Грешка при запис на цените.");
      setTimeout(() => setSaveError(null), 5000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Цени & Калкулатор
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            Управлявайте ценовите пакети според брой гости, дизайна и транспортната логистика
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {saveError && (
            <span className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-xl">
              {saveError}
            </span>
          )}
          <Button
            variant="primary"
            size="md"
            onClick={() => handleSavePricing()}
            disabled={saving}
            className="flex items-center space-x-2 shrink-0 cursor-pointer shadow-md hover:shadow-lg transition-all"
          >
            {savedSuccess ? (
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
      </div>

      <form onSubmit={handleSavePricing} className="space-y-8">
        {/* Section 1: Guest Tiers */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-[#00b4b6]" />
            <h3 className="font-serif text-xl font-bold text-brand-dark">
              Ценови пакети според брой гости
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tier 1: Up to 70 Guests */}
            <Card className="p-6 space-y-4 bg-white border border-brand-primary/20 shadow-sm hover:border-[#00b4b6]/40 transition-colors">
              <div className="flex items-center justify-between pb-2 border-b border-brand-secondary">
                <span className="font-serif text-base font-bold text-brand-dark">
                  До 70 гости
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#00b4b6]/10 text-[#00b4b6]">
                  Пакет 1
                </span>
              </div>
              <p className="text-xs text-brand-dark/70 leading-relaxed">
                Включва наем на машината, консумативи и екип за събития до 70 гости.
              </p>
              <div className="space-y-1 pt-1">
                <label className="text-xs font-semibold text-brand-dark flex justify-between">
                  <span>Цена на пакета</span>
                  <span className="text-brand-dark/60">(€)</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={price70}
                    onChange={(e) => setPrice70(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30 text-base text-brand-dark bg-brand-bg/40 focus:outline-none focus:ring-2 focus:ring-[#00b4b6] font-bold"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-dark/40">
                    €
                  </span>
                </div>
              </div>
            </Card>

            {/* Tier 2: Up to 100 Guests */}
            <Card className="p-6 space-y-4 bg-white border-2 border-[#00b4b6]/30 shadow-sm hover:border-[#00b4b6] transition-colors relative">
              <div className="flex items-center justify-between pb-2 border-b border-brand-secondary">
                <span className="font-serif text-base font-bold text-brand-dark">
                  До 100 гости
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#00b4b6] text-white">
                  Най-популярен
                </span>
              </div>
              <p className="text-xs text-brand-dark/70 leading-relaxed">
                Стандартен сватбен пакет с пълен капацитет до 100 гости.
              </p>
              <div className="space-y-1 pt-1">
                <label className="text-xs font-semibold text-brand-dark flex justify-between">
                  <span>Цена на пакета</span>
                  <span className="text-brand-dark/60">(€)</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={price100}
                    onChange={(e) => setPrice100(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#00b4b6]/40 text-base text-brand-dark bg-brand-bg/40 focus:outline-none focus:ring-2 focus:ring-[#00b4b6] font-bold"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-dark/40">
                    €
                  </span>
                </div>
              </div>
            </Card>

            {/* Tier 3: Up to 150 Guests */}
            <Card className="p-6 space-y-4 bg-white border border-brand-primary/20 shadow-sm hover:border-[#00b4b6]/40 transition-colors">
              <div className="flex items-center justify-between pb-2 border-b border-brand-secondary">
                <span className="font-serif text-base font-bold text-brand-dark">
                  До 150 гости
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#00b4b6]/10 text-[#00b4b6]">
                  Пакет 3
                </span>
              </div>
              <p className="text-xs text-brand-dark/70 leading-relaxed">
                Разширен пакет с допълнително зареждане до 150 гости.
              </p>
              <div className="space-y-1 pt-1">
                <label className="text-xs font-semibold text-brand-dark flex justify-between">
                  <span>Цена на пакета</span>
                  <span className="text-brand-dark/60">(€)</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={price150}
                    onChange={(e) => setPrice150(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30 text-base text-brand-dark bg-brand-bg/40 focus:outline-none focus:ring-2 focus:ring-[#00b4b6] font-bold"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-dark/40">
                    €
                  </span>
                </div>
              </div>
            </Card>

            {/* Tier 4: 150+ Guests (Locked / Custom Quote) */}
            <Card className="p-6 space-y-4 bg-brand-bg/60 border border-dashed border-[#00b4b6]/40 shadow-none flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-brand-secondary">
                  <span className="font-serif text-base font-bold text-brand-dark flex items-center space-x-1.5">
                    <span>150+ гости</span>
                    <Lock className="w-3.5 h-3.5 text-brand-dark/50" />
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    По договаряне
                  </span>
                </div>
                <p className="text-xs text-brand-dark/70 leading-relaxed">
                  За големи събития над 150 гости цената се определя индивидуално според продължителността и екипа.
                </p>
              </div>

              <div className="p-3 bg-white/80 rounded-2xl border border-brand-primary/20 space-y-1">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-[#00b4b6]">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>Фиксиран статус в калкулатора</span>
                </div>
                <p className="text-[11px] text-brand-dark/70 italic">
                  Калкулаторът автоматично превключва на „По договаряне“ и показва форма за персонална оферта.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Section 2: Design & Transport */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#00b4b6]" />
            <h3 className="font-serif text-xl font-bold text-brand-dark">
              Допълнителни услуги & Транспорт
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Graphic Design */}
            <Card className="p-6 space-y-4 bg-white border border-brand-primary/20 shadow-sm">
              <div className="flex items-center space-x-3 text-brand-accent pb-2 border-b border-brand-secondary">
                <Palette className="w-5 h-5 text-[#00b4b6]" />
                <h4 className="font-serif text-lg font-bold text-brand-dark">
                  Графичен Дизайн & Инициали
                </h4>
              </div>

              <p className="text-xs text-brand-dark/70 leading-relaxed">
                Индивидуална изработка на авторски визии, инициали на младоженците и персонализирани илюстрации.
              </p>

              <div className="space-y-3 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-dark flex justify-between">
                    <span>Цена за дизайн & инициали</span>
                    <span className="text-brand-dark/60">(€)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={designPrice}
                      onChange={(e) => setDesignPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30 text-base text-brand-dark bg-brand-bg/40 focus:outline-none focus:ring-2 focus:ring-[#00b4b6] font-bold"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-dark/40">
                      €
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Transport Logistics */}
            <Card className="p-6 space-y-4 bg-white border border-brand-primary/20 shadow-sm">
              <div className="flex items-center space-x-3 text-brand-accent pb-2 border-b border-brand-secondary">
                <Truck className="w-5 h-5 text-[#00b4b6]" />
                <h4 className="font-serif text-lg font-bold text-brand-dark">
                  Транспортни Разходи
                </h4>
              </div>

              <p className="text-xs text-brand-dark/70 leading-relaxed">
                Първите {freeDistance} км от гр. Бургас са безплатни. След това се таксува на изминат километър.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-dark flex justify-between">
                    <span>Безплатни км</span>
                    <span className="text-brand-dark/60">(км)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={freeDistance}
                      onChange={(e) => setFreeDistance(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30 text-base text-brand-dark bg-brand-bg/40 focus:outline-none focus:ring-2 focus:ring-[#00b4b6] font-bold"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-dark/40">
                      км
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-dark flex justify-between">
                    <span>Цена на км</span>
                    <span className="text-brand-dark/60">(€/км)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      value={ratePerKm}
                      onChange={(e) => setRatePerKm(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/30 text-base text-brand-dark bg-brand-bg/40 focus:outline-none focus:ring-2 focus:ring-[#00b4b6] font-bold"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-dark/40">
                      €/км
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};
