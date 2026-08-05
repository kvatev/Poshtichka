"use client";

import React, { useState } from "react";
import { Tag, Save, Sparkles, CheckCircle2, Truck, Palette } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const PricingManager = () => {
  const [minRental, setMinRental] = useState("350");
  const [maxRental, setMaxRental] = useState("500");

  const [minDesign, setMinDesign] = useState("25");
  const [maxDesign, setMaxDesign] = useState("50");

  const [freeDistance, setFreeDistance] = useState("50");
  const [ratePerKm, setRatePerKm] = useState("0.23");

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
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
        {savedSuccess && (
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-700 bg-emerald-100 px-4 py-2 rounded-xl">
            <CheckCircle2 className="w-4 h-4" />
            <span>Промените бяха запазени успешно!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSavePricing} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Base Machine Rental */}
          <Card className="p-6 space-y-4 bg-white border border-brand-primary/20 shadow-sm">
            <div className="flex items-center space-x-3 text-brand-accent pb-2 border-b border-brand-secondary">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-serif text-lg font-bold text-brand-dark">
                Наем на Машината
              </h3>
            </div>

            <p className="text-xs text-brand-dark/70 leading-relaxed">
              Базова цена за наем на Пощичка за времетраенето на събитието.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark">
                  Мин. цена (€)
                </label>
                <input
                  type="number"
                  value={minRental}
                  onChange={(e) => setMinRental(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark">
                  Макс. цена (€)
                </label>
                <input
                  type="number"
                  value={maxRental}
                  onChange={(e) => setMaxRental(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </div>
            </div>
          </Card>

          {/* Graphic Design */}
          <Card className="p-6 space-y-4 bg-white border border-brand-primary/20 shadow-sm">
            <div className="flex items-center space-x-3 text-brand-accent pb-2 border-b border-brand-secondary">
              <Palette className="w-5 h-5" />
              <h3 className="font-serif text-lg font-bold text-brand-dark">
                Графичен Дизайн
              </h3>
            </div>

            <p className="text-xs text-brand-dark/70 leading-relaxed">
              Индивидуална изработка на авторски визии и илюстрации.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark">
                  Мин. цена (€)
                </label>
                <input
                  type="number"
                  value={minDesign}
                  onChange={(e) => setMinDesign(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark">
                  Макс. цена (€)
                </label>
                <input
                  type="number"
                  value={maxDesign}
                  onChange={(e) => setMaxDesign(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </div>
            </div>
          </Card>

          {/* Transport Logistics */}
          <Card className="p-6 space-y-4 bg-white border border-brand-primary/20 shadow-sm">
            <div className="flex items-center space-x-3 text-brand-accent pb-2 border-b border-brand-secondary">
              <Truck className="w-5 h-5" />
              <h3 className="font-serif text-lg font-bold text-brand-dark">
                Транспортни Разходи
              </h3>
            </div>

            <p className="text-xs text-brand-dark/70 leading-relaxed">
              Първите {freeDistance} км от Бургас са безплатни.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark">
                  Безплатни км
                </label>
                <input
                  type="number"
                  value={freeDistance}
                  onChange={(e) => setFreeDistance(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark">
                  Цена (€/км)
                </label>
                <input
                  type="text"
                  value={ratePerKm}
                  onChange={(e) => setRatePerKm(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-brand-primary/30 text-sm text-brand-dark bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button variant="primary" size="lg" type="submit" className="flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Запази промените в цените</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
