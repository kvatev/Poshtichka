"use client";

import React, { useState, useEffect } from "react";
import { Save, Sparkles, Truck, Palette, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const PricingManager = () => {
  // Machine Rental Single Exact Price
  const [rentalPrice, setRentalPrice] = useState("350");

  // Design Price - Single Exact Price
  const [designPrice, setDesignPrice] = useState("50");

  // Transport Settings
  const [freeDistance, setFreeDistance] = useState("50");
  const [ratePerKm, setRatePerKm] = useState("0.23");

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        const p = data.pricing_settings || data.pricing;
        if (p) {
          if (p.rentalPrice) setRentalPrice(String(p.rentalPrice));
          else if (p.price100) setRentalPrice(String(p.price100));
          else if (p.minRental) setRentalPrice(String(p.minRental));

          if (p.designPrice) setDesignPrice(String(p.designPrice));
          else if (p.maxDesign) setDesignPrice(String(p.maxDesign));
          else if (p.minDesign) setDesignPrice(String(p.minDesign));

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

    const priceNum = Number(rentalPrice) || 350;
    const payload = {
      rentalPrice: priceNum,
      price70: Math.round(priceNum * 0.94),
      price100: priceNum,
      price150: Math.round(priceNum * 1.08),
      designPrice: Number(designPrice) || 50,
      freeDistance: Number(freeDistance) || 50,
      ratePerKm: Number(ratePerKm) || 0.23,
    };

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("poshtichka_content_pricing_settings", JSON.stringify(payload));
      }
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "pricing_settings", value: payload }),
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error("Save pricing error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Редактиране на Цени & Тарифи
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            Конфигурирайте ценовата рамка за калкулатора и офертите
          </p>
        </div>

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

      <form onSubmit={handleSavePricing} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Base Machine Rental - Single Price Field */}
          <Card className="p-6 space-y-4 bg-white border border-brand-primary/20 shadow-sm">
            <div className="flex items-center space-x-3 text-brand-accent pb-2 border-b border-brand-secondary">
              <Sparkles className="w-5 h-5 text-[#00b4b6]" />
              <h3 className="font-serif text-lg font-bold text-brand-dark">
                Наем на Машината
              </h3>
            </div>

            <p className="text-xs text-brand-dark/70 leading-relaxed">
              Базова цена за наем на Пощичка за времетраенето на събитието.
            </p>

            <div className="space-y-3 pt-1">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark flex justify-between">
                  <span>Цена за наем</span>
                  <span className="text-brand-dark/60">(€)</span>
                </label>
                <input
                  type="number"
                  value={rentalPrice}
                  onChange={(e) => setRentalPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-[#00b4b6] font-bold"
                />
              </div>
            </div>
          </Card>

          {/* Graphic Design */}
          <Card className="p-6 space-y-4 bg-white border border-brand-primary/20 shadow-sm">
            <div className="flex items-center space-x-3 text-brand-accent pb-2 border-b border-brand-secondary">
              <Palette className="w-5 h-5 text-[#00b4b6]" />
              <h3 className="font-serif text-lg font-bold text-brand-dark">
                Графичен Дизайн
              </h3>
            </div>

            <p className="text-xs text-brand-dark/70 leading-relaxed">
              Индивидуална изработка на авторски визии, инициали и илюстрации.
            </p>

            <div className="space-y-3 pt-1">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark flex justify-between">
                  <span>Цена за дизайн & инициали</span>
                  <span className="text-brand-dark/60">(€)</span>
                </label>
                <input
                  type="number"
                  value={designPrice}
                  onChange={(e) => setDesignPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-[#00b4b6] font-bold"
                />
              </div>
            </div>
          </Card>

          {/* Transport Logistics */}
          <Card className="p-6 space-y-4 bg-white border border-brand-primary/20 shadow-sm">
            <div className="flex items-center space-x-3 text-brand-accent pb-2 border-b border-brand-secondary">
              <Truck className="w-5 h-5 text-[#00b4b6]" />
              <h3 className="font-serif text-lg font-bold text-brand-dark">
                Транспортни Разходи
              </h3>
            </div>

            <p className="text-xs text-brand-dark/70 leading-relaxed">
              Първите {freeDistance} км от Бургас са безплатни. След това се таксува на км.
            </p>

            <div className="space-y-3 pt-1">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark flex justify-between">
                  <span>Безплатни километри</span>
                  <span className="text-brand-dark/60">(км)</span>
                </label>
                <input
                  type="number"
                  value={freeDistance}
                  onChange={(e) => setFreeDistance(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-[#00b4b6] font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark flex justify-between">
                  <span>Цена на километър</span>
                  <span className="text-brand-dark/60">(€/км)</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={ratePerKm}
                  onChange={(e) => setRatePerKm(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-[#00b4b6] font-bold"
                />
              </div>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};
