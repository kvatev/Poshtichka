"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator as CalcIcon, Users, MapPin, Check } from "lucide-react";

export const CalculatorWidget = () => {
  const [guests, setGuests] = useState<number>(100);
  const [distance, setDistance] = useState<number>(200);
  const [addInitials, setAddInitials] = useState<boolean>(false);

  // Math Logic:
  // Base price: 300 EUR min to 400 EUR max
  // Initials: +25 EUR min, +50 EUR max
  // Transport: First 50km FREE. After 50km, 0.23 EUR per km
  const transportCost = Math.max(0, distance - 50) * 0.23;
  const minPrice = Math.round(300 + (addInitials ? 25 : 0) + transportCost);
  const maxPrice = Math.round(400 + (addInitials ? 50 : 0) + transportCost);

  return (
    <section className="py-20 sm:py-28 bg-brand-cream border-b border-[#00b4b6]/20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-[#00b4b6]/10 px-4 py-1.5 rounded-full border border-[#00b4b6]/30 text-[#00b4b6] font-semibold text-xs uppercase tracking-widest">
            <CalcIcon className="w-4 h-4" />
            <span>Ориентировъчен калкулатор</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-wide text-brand-dark">
            КАЛКУЛАТОР
          </h2>
          <p className="font-sans text-sm sm:text-base text-brand-dark/70 max-w-xl mx-auto font-light">
            Пресметнете ориентировъчната цена за наем на Пощичка според вашите параметри.
          </p>
        </div>

        {/* Main Calculator Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#00b4b6]/30 shadow-xl space-y-8">
          {/* Slider 1: Guests */}
          <div className="space-y-4">
            <div className="flex justify-between items-center font-sans text-sm sm:text-base font-bold text-brand-dark uppercase tracking-wider">
              <span className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-[#00b4b6]" />
                <span>БРОЙ ГОСТИ</span>
              </span>
              <span className="text-lg font-extrabold text-[#00b4b6] bg-[#00b4b6]/10 px-4 py-1 rounded-full border border-[#00b4b6]/20">
                {guests} гости
              </span>
            </div>

            <input
              type="range"
              min={50}
              max={300}
              step={10}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full h-3 bg-brand-cream rounded-lg appearance-none cursor-pointer accent-[#00b4b6]"
            />
            <div className="flex justify-between text-xs text-brand-dark/50 font-mono">
              <span>50 гости</span>
              <span>150 гости</span>
              <span>300 гости</span>
            </div>
          </div>

          {/* Slider 2: Distance from Burgas */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center font-sans text-sm sm:text-base font-bold text-brand-dark uppercase tracking-wider">
              <span className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-[#00b4b6]" />
                <span>ЛОКАЦИЯ ОТ ГРАД БУРГАС</span>
              </span>
              <span className="text-lg font-extrabold text-[#00b4b6] bg-[#00b4b6]/10 px-4 py-1 rounded-full border border-[#00b4b6]/20">
                {distance} км
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={500}
              step={10}
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full h-3 bg-brand-cream rounded-lg appearance-none cursor-pointer accent-[#00b4b6]"
            />
            <div className="flex justify-between text-xs text-brand-dark/50 font-mono">
              <span>0 км (Бургас)</span>
              <span>250 км</span>
              <span>500 км</span>
            </div>
            <p className="text-xs text-[#00b4b6] font-medium text-center italic">
              *Първите 50 км са БЕЗПЛАТНИ! След 50-ия км се таксува по 0.23 € / км.
            </p>
          </div>

          {/* Custom Toggle: Add Initials */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-sans text-sm sm:text-base font-bold text-brand-dark uppercase tracking-wider block">
                ДОБАВЯНЕ НА ИНИЦИАЛИ / ПЕРСОНАЛИЗАЦИЯ
              </span>
              <span className="text-xs text-brand-dark/60 font-light block">
                Персонализиран авторски дизайн с вашите имена и дата
              </span>
            </div>

            <button
              type="button"
              onClick={() => setAddInitials(!addInitials)}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
                addInitials ? "bg-[#00b4b6]" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                  addInitials ? "translate-x-6" : "translate-x-0"
                }`}
              >
                {addInitials && <Check className="w-3.5 h-3.5 text-[#00b4b6]" />}
              </div>
            </button>
          </div>

          {/* Dynamic Result Card */}
          <div className="bg-brand-dark text-white rounded-2xl p-6 text-center space-y-4 shadow-xl border border-white/10 mt-6">
            <span className="text-xs font-sans uppercase tracking-widest text-white/70">
              Ориентировъчна цена:
            </span>
            <div className="font-display text-4xl sm:text-6xl font-bold tracking-wider text-white">
              {minPrice} € – {maxPrice} €
            </div>
            <p className="text-xs text-white/60 font-light">
              *Крайната цена се определя след уточняване на всички подробности за събитието.
            </p>

            <div className="pt-2">
              <Link
                href={`/booking?guests=${guests}&distance=${distance}&initials=${addInitials}`}
                className="inline-block w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#00b4b6] text-white font-sans text-sm font-semibold uppercase tracking-wider hover:bg-[#008b8d] transition-all shadow-md"
              >
                ИЗПРАТИ ЗАПИТВАНЕ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
