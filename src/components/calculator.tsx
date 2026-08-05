"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator as CalcIcon, MapPin, Users, Palette, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { calculateEventEstimate } from "@/lib/utils";

export const CalculatorWidget = () => {
  const [guestCount, setGuestCount] = useState<number>(100);
  const [distanceKm, setDistanceKm] = useState<number>(30);
  const [includeDesign, setIncludeDesign] = useState<boolean>(true);

  const estimate = calculateEventEstimate({
    guestCount,
    distanceKm,
    includeCustomDesign: includeDesign,
  });

  return (
    <Card className="max-w-4xl mx-auto border-2 border-brand-primary/30 shadow-card bg-white/90 backdrop-blur-md p-6 sm:p-10">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-accent">
          <CalcIcon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-serif text-2xl font-bold text-brand-dark">
            Калкулатор за събитие
          </h3>
          <p className="text-sm font-sans text-brand-dark/70">
            Изчислете примерна ориентировъчна цена за Вашето събитие
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Controls */}
        <div className="space-y-6">
          {/* Guest Count Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-sans">
              <label className="flex items-center font-medium text-brand-dark">
                <Users className="w-4 h-4 mr-2 text-brand-accent" />
                Очакван брой гости
              </label>
              <span className="font-bold text-brand-accent text-base">
                {guestCount} гости
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="350"
              step="10"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full h-2 bg-brand-secondary rounded-lg appearance-none cursor-pointer accent-brand-accent"
            />
            <div className="flex justify-between text-xs text-brand-muted font-sans">
              <span>20 гости</span>
              <span>150 гости</span>
              <span>350+ гости</span>
            </div>
          </div>

          {/* Distance Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-sans">
              <label className="flex items-center font-medium text-brand-dark">
                <MapPin className="w-4 h-4 mr-2 text-brand-accent" />
                Разстояние от гр. Бургас (км)
              </label>
              <span className="font-bold text-brand-accent text-base">
                {distanceKm} км
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="400"
              step="10"
              value={distanceKm}
              onChange={(e) => setDistanceKm(Number(e.target.value))}
              className="w-full h-2 bg-brand-secondary rounded-lg appearance-none cursor-pointer accent-brand-accent"
            />
            <div className="flex justify-between text-xs text-brand-muted font-sans">
              <span>0 км (Бургас)</span>
              <span>50 км (Безплатно)</span>
              <span>400 км</span>
            </div>
            <p className="text-xs text-brand-muted font-sans bg-brand-secondary/40 p-2 rounded-lg">
              ✨ Първите 50 км са включени безплатно! След 50-ия км цената е 0.23 €/км.
            </p>
          </div>

          {/* Custom Artwork Toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-brand-secondary/30 border border-brand-primary/20">
            <div className="flex items-center space-x-3">
              <Palette className="w-5 h-5 text-brand-accent flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-brand-dark">
                  Индивидуален дизайн
                </p>
                <p className="text-xs text-brand-muted">
                  Авторска визия с имена, дати или лого (25€–50€)
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={includeDesign}
              onChange={(e) => setIncludeDesign(e.target.checked)}
              className="w-5 h-5 accent-brand-accent rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-brand-bg border border-brand-primary/30 rounded-2xl p-6 space-y-6 flex flex-col justify-between h-full">
          <div>
            <h4 className="font-serif text-lg font-bold text-brand-dark mb-4 pb-2 border-b border-brand-primary/20">
              Примерна калкулация
            </h4>

            <div className="space-y-3 text-sm font-sans">
              <div className="flex justify-between text-brand-dark/80">
                <span>Наем на машината & Консумативи:</span>
                <span className="font-semibold">{estimate.baseRental} €</span>
              </div>
              <div className="flex justify-between text-brand-dark/80">
                <span>Графичен дизайн (до 3 корекции):</span>
                <span className="font-semibold">
                  {estimate.designFee > 0 ? "~35 €" : "0 €"}
                </span>
              </div>
              <div className="flex justify-between text-brand-dark/80">
                <span>Транспорт ({distanceKm} км):</span>
                <span className="font-semibold">
                  {estimate.transportFee === 0
                    ? "Безплатно"
                    : `${estimate.transportFee} €`}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-dashed border-brand-primary/30">
              <span className="text-xs uppercase tracking-wider text-brand-muted font-sans font-medium">
                Ориентировъчен общ диапазон:
              </span>
              <div className="text-3xl font-serif font-bold text-brand-accent mt-1">
                {estimate.totalEstimateMin} € – {estimate.totalEstimateMax} €
              </div>
              <p className="text-[11px] text-brand-muted mt-1 font-sans">
                * Крайната оферта се определя според избраните продукти (картички, татуировки, книгоразделители) и времетраенето.
              </p>
            </div>
          </div>

          <Link href={`/booking?guests=${guestCount}&distance=${distanceKm}`}>
            <Button variant="accent" size="lg" className="w-full flex items-center justify-center space-x-2">
              <span>Започнете резервация</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
