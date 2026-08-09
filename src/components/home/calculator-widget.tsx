"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles, MessageCircle } from "lucide-react";

const GUEST_STEPS = [70, 100, 150, "150+"] as const;

export const CalculatorWidget = () => {
  const [stepIndex, setStepIndex] = useState<number>(1); // Default: index 1 (100 guests)
  const [distance, setDistance] = useState<number>(100); // Distance in 1 direction (km)
  const [addInitials, setAddInitials] = useState<boolean>(false);

  const currentStep = GUEST_STEPS[stepIndex];
  const isLargeEvent = currentStep === "150+";
  const isFarLocation = distance > 450;
  const needsInquiry = isLargeEvent || isFarLocation;

  const numericGuests = typeof currentStep === "number" ? currentStep : 150;

  // Round-trip kilometer calculation (двупосочен пробег = 2 * distance):
  // First 50km in 1 direction (100km round-trip) is FREE!
  // Billable round-trip km = Math.max(0, (distance - 50) * 2)
  // Transport cost = billable km * 0.23 € / km
  const totalRoundTripKm = distance * 2;
  const billableRoundTripKm = Math.max(0, (distance - 50) * 2);
  const transportCost = billableRoundTripKm * 0.23;

  // Math Logic for standard events:
  // Base rental up to 50 guests: 350 €
  // Extra guests: ~0.50 € / guest
  // Initials: +50 €
  const extraGuestsCost = Math.max(0, numericGuests - 50) * 0.5;
  const initialsCost = addInitials ? 50 : 0;

  const minPrice = Math.round(350 + extraGuestsCost + transportCost + initialsCost);
  const maxPrice = Math.round(450 + (extraGuestsCost * 1.2) + transportCost + initialsCost + 25);


  return (
    <section className="py-16 sm:py-24 bg-brand-cream relative">
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

            {/* Slider 1: Guests (Exact 4 Steps: 70, 100, 150, 150+) */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-center space-x-2">
                <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#00b4b6]">
                  БРОЙ ГОСТИ: {isLargeEvent ? "150+ (Голямо събитие)" : `${numericGuests} гости`}
                </h3>
              </div>

              <div className="relative px-2">
                <input
                  type="range"
                  min={0}
                  max={3}
                  step={1}
                  value={stepIndex}
                  onChange={(e) => setStepIndex(Number(e.target.value))}
                  className="w-full h-3 bg-[#cdeef0] rounded-lg appearance-none cursor-pointer accent-[#00b4b6]"
                />
                <div className="flex justify-between text-sm sm:text-base font-semibold text-[#2d3a37]/70 mt-2 px-1">
                  <span
                    onClick={() => setStepIndex(0)}
                    className={`cursor-pointer ${stepIndex === 0 ? "text-[#00b4b6] font-bold scale-110" : ""}`}
                  >
                    70
                  </span>
                  <span
                    onClick={() => setStepIndex(1)}
                    className={`cursor-pointer ${stepIndex === 1 ? "text-[#00b4b6] font-bold scale-110" : ""}`}
                  >
                    100
                  </span>
                  <span
                    onClick={() => setStepIndex(2)}
                    className={`cursor-pointer ${stepIndex === 2 ? "text-[#00b4b6] font-bold scale-110" : ""}`}
                  >
                    150
                  </span>
                  <span
                    onClick={() => setStepIndex(3)}
                    className={`cursor-pointer ${stepIndex === 3 ? "text-[#00b4b6] font-bold scale-110" : ""}`}
                  >
                    150+
                  </span>
                </div>
              </div>

              {/* Large Event Banner Prompt */}
              {isLargeEvent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-2xl bg-[#00b4b6]/10 border border-[#00b4b6]/30 text-[#2d3a37] text-sm sm:text-base space-y-1 flex flex-col items-center"
                >
                  <div className="flex items-center space-x-2 text-[#00b4b6] font-bold font-display text-base sm:text-lg">
                    <Sparkles className="w-5 h-5" />
                    <span>Индивидуална оферта за над 150 гости!</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#2d3a37]/90 italic">
                    За събития с над 150 гости изготвяме преференциални пакети с допълнителен екип и индивидуални условия.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Slider 2: Distance from Burgas (Up to 450 km, >450 = Inquiry, Double km for round-trip) */}
            <div className="space-y-3 pt-4">
              <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#00b4b6]">
                ЛОКАЦИЯ ОТ ГРАД БУРГАС: {isFarLocation ? "Над 450 км (По запитване)" : `${distance} км (${totalRoundTripKm} км двупосочно)`}
              </h3>
              <div className="relative px-2">
                <input
                  type="range"
                  min={0}
                  max={460}
                  step={10}
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full h-3 bg-[#cdeef0] rounded-lg appearance-none cursor-pointer accent-[#00b4b6]"
                />
                <div className="flex justify-between text-xs sm:text-sm font-semibold text-[#2d3a37]/70 mt-2 px-1">
                  <span>0 км</span>
                  <span>150 км</span>
                  <span>300 км</span>
                  <span>450 км</span>
                  <span className={isFarLocation ? "text-[#00b4b6] font-bold" : ""}>450+ км</span>
                </div>
              </div>

              {/* Notice for 450+ km */}
              {isFarLocation ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-2xl bg-[#00b4b6]/10 border border-[#00b4b6]/30 text-[#2d3a37] text-sm sm:text-base space-y-1 flex flex-col items-center"
                >
                  <div className="flex items-center space-x-2 text-[#00b4b6] font-bold font-display text-base sm:text-lg">
                    <Sparkles className="w-5 h-5" />
                    <span>Индивидуална оферта за над 450 км!</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#2d3a37]/90 italic">
                    За отдалечени дестинации над 450 км изготвяме специална оферта с включени нощувки и логистика.
                  </p>
                </motion.div>
              ) : (
                <p className="text-xs sm:text-sm text-[#00b4b6] font-medium italic pt-1">
                  * Километрите се изчисляват двупосочно (отиване и връщане от Бургас). Първите 50 км в посока (100 км двупосочно) са безплатни!
                </p>
              )}
            </div>

            {/* Custom Checkbox: Add Initials (+50 EUR) */}
            <div className="space-y-3 pt-4 flex flex-col items-center">
              <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#00b4b6]">
                ДОБАВЯНЕ НА ИНИЦИАЛИ (+50 €)
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
                href={`/booking?guests=${isLargeEvent ? "150+" : numericGuests}&distance=${isFarLocation ? "450+" : distance}&initials=${addInitials}`}
                className="inline-flex items-center space-x-2 bg-[#00b4b6] hover:bg-[#009da0] text-white font-display text-lg sm:text-xl font-bold uppercase tracking-wider px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{needsInquiry ? "ПОИСКАЙ ИНДИВИДУАЛНА ОФЕРТА" : "ИЗПРАТИ ЗАПИТВАНЕ"}</span>
              </Link>
            </div>
          </div>

          {/* Dark Bottom Box: Result Price */}
          <div className="bg-[#2d3a37] text-white px-6 py-8 text-center space-y-3">
            <p className="font-sans text-base sm:text-lg font-light text-white/90">
              {needsInquiry ? "Специална такса за вашето събитие:" : "Ориентировъчна цена:"}
            </p>

            {needsInquiry ? (
              <div className="space-y-2">
                <div className="font-display text-3xl sm:text-5xl font-bold tracking-wider text-[#00b4b6]">
                  ПО ЗАПИТВАНЕ
                </div>
                <p className="text-xs sm:text-sm text-white/90 font-light max-w-lg mx-auto leading-relaxed">
                  {isLargeEvent && isFarLocation
                    ? "За събития с над 150 гости и дестинации над 450 км изготвяме персонална оферта. Изпратете запитване за преференциални условия!"
                    : isLargeEvent
                    ? "За събития с над 150 гости изготвяме персонална оферта с преференциални условия."
                    : "За отдалечени дестинации над 450 км изготвяме персонална оферта с транспорт и логистика."}
                </p>
              </div>
            ) : (
              <>
                <div className="font-display text-4xl sm:text-6xl font-bold tracking-wider text-white">
                  {minPrice} € – {maxPrice} €
                </div>
                <p className="text-xs sm:text-sm text-white/70 font-light max-w-lg mx-auto leading-relaxed">
                  * Включва отиване и връщане ({totalRoundTripKm} км двупосочно). Крайната оферта се потвърждава след връзка с нас.
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};





