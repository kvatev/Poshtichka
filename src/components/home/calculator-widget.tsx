"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export const CalculatorWidget = () => {
  const [guests, setGuests] = useState<number>(100);
  const [distance, setDistance] = useState<number>(200);
  const [addInitials, setAddInitials] = useState<boolean>(false);

  // Math Logic:
  // Base rental up to 50 guests: 350 €
  // Extra guests: ~0.50 € / guest
  // Distance: first 50km FREE, then 0.23 € / km
  // Initials: +20 €
  const extraGuestsCost = Math.max(0, guests - 50) * 0.5;
  const transportCost = Math.max(0, distance - 50) * 0.23;
  const initialsCost = addInitials ? 25 : 0;

  const minPrice = Math.round(350 + extraGuestsCost + transportCost + initialsCost);
  const maxPrice = Math.round(450 + (extraGuestsCost * 1.2) + transportCost + initialsCost + 25);

  return (
    <section className="py-16 sm:py-24 bg-brand-cream border-b border-[#00b4b6]/20 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Outer Bordered Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[36px] border-2 border-[#2d3a37]/80 overflow-hidden shadow-2xl"
        >
          {/* Top Form Section */}
          <div className="p-8 sm:p-12 space-y-8 text-center">
            {/* Title & Subtitle */}
            <div className="space-y-2">
              <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-wide text-[#2d3a37]">
                КАЛКУЛАТОР
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#2d3a37]/80 italic">
                Изчислете ориентировъчна цена за Вашето събитие!
              </p>
            </div>

            {/* Slider 1: Guests */}
            <div className="space-y-4 pt-4">
              <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#00b4b6]">
                БРОЙ ГОСТИ
              </h3>
              <div className="relative px-2">
                <input
                  type="range"
                  min={50}
                  max={250}
                  step={10}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full h-3 bg-[#cdeef0] rounded-lg appearance-none cursor-pointer accent-[#00b4b6]"
                />
                <div className="flex justify-between text-sm sm:text-base font-semibold text-[#2d3a37]/70 mt-2 px-1">
                  <span>50</span>
                  <span>100</span>
                  <span>150+</span>
                </div>
              </div>
            </div>

            {/* Slider 2: Distance from Burgas */}
            <div className="space-y-3 pt-4">
              <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#00b4b6]">
                ЛОКАЦИЯ ОТ ГРАД БУРГАС
              </h3>
              <div className="relative px-2">
                <input
                  type="range"
                  min={0}
                  max={300}
                  step={10}
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full h-3 bg-[#cdeef0] rounded-lg appearance-none cursor-pointer accent-[#00b4b6]"
                />
                <div className="flex justify-between text-sm sm:text-base font-semibold text-[#2d3a37]/70 mt-2 px-1">
                  <span>100 км</span>
                  <span>200 км</span>
                  <span>300 км</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#00b4b6] font-medium italic pt-1">
                * Първите 50 км са включени безплатно! След 50-ия км цената е 0.23 €/км.
              </p>
            </div>

            {/* Custom Checkbox: Add Initials */}
            <div className="space-y-3 pt-4 flex flex-col items-center">
              <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#00b4b6]">
                ДОБАВЯНЕ НА ИНИЦИАЛИ
              </h3>
              <button
                type="button"
                onClick={() => setAddInitials(!addInitials)}
                className={`w-10 h-10 rounded-xl border-2 transition-all flex items-center justify-center ${
                  addInitials
                    ? "bg-[#00b4b6] border-[#00b4b6] text-white shadow-md scale-105"
                    : "bg-[#cdeef0]/50 border-[#00b4b6]/40 text-transparent hover:border-[#00b4b6]"
                }`}
              >
                <Check className="w-6 h-6 stroke-[3]" />
              </button>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                href={`/booking?guests=${guests}&distance=${distance}&initials=${addInitials}`}
                className="inline-block bg-[#00b4b6] hover:bg-[#009da0] text-white font-display text-lg sm:text-xl font-bold uppercase tracking-wider px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                ИЗПРАТИ ЗАПИТВАНЕ
              </Link>
            </div>
          </div>

          {/* Dark Bottom Box: Result Price */}
          <div className="bg-[#2d3a37] text-white px-6 py-8 text-center space-y-3">
            <p className="font-sans text-base sm:text-lg font-light text-white/90">
              Ориентировъчна цена:
            </p>
            <div className="font-display text-4xl sm:text-6xl font-bold tracking-wider text-white">
              {minPrice} € – {maxPrice} €
            </div>
            <p className="text-xs sm:text-sm text-white/70 font-light max-w-lg mx-auto leading-relaxed">
              * Крайната оферта се определя след връзка с нас и обсъждане на дизайните и мястото на събитието.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

