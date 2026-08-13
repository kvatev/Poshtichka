"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const GUEST_STEPS = [70, 100, 150, "150+"] as const;
const PRICE_PER_KM = 0.23;

export const CalculatorWidget = () => {
  const [stepIndex, setStepIndex] = useState<number>(1); // Default: index 1 (100 guests)
  const [distance, setDistance] = useState<number>(50); // Default: 50 km one-way (free threshold)
  const [addInitials, setAddInitials] = useState<boolean>(false);

  const currentStep = GUEST_STEPS[stepIndex];
  const isLargeEvent = currentStep === "150+";
  const isFarLocation = distance >= 450;
  const needsInquiry = isLargeEvent || isFarLocation;

  const numericGuests = typeof currentStep === "number" ? currentStep : 150;

  // STRICT DISTANCE MATHEMATICS:
  // 1. Slider value (distance) = one-way distance from Burgas (50 km to 450 km)
  // 2. twoWayDistance = distance * 2
  // 3. First 50 km one-way (100 km two-way) is FREE
  // 4. chargeableDistance = Math.max(0, twoWayDistance - 100)
  // 5. travelCost = chargeableDistance * PRICE_PER_KM (0.23 €/km)
  const twoWayDistance = distance * 2;
  const chargeableDistance = Math.max(0, twoWayDistance - 100);
  const travelCost = chargeableDistance * PRICE_PER_KM;

  // BASE GUEST PRICING MAPPING:
  // 70 guests = 330 €
  // 100 guests = 350 €
  // 150 guests = 380 €
  const getGuestBasePrice = (idx: number): number => {
    if (idx === 0) return 330;
    if (idx === 1) return 350;
    return 380;
  };

  const basePrice = getGuestBasePrice(stepIndex);
  const initialsCost = addInitials ? 50 : 0;

  const minPrice = Math.round(basePrice + travelCost + initialsCost);
  const maxPrice = Math.round(basePrice * 1.2 + travelCost + initialsCost + 25);

  return (
    <section className="py-16 sm:py-24 bg-brand-cream relative select-none">
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
                Изчислете цена за Вашето събитие!
              </p>
            </div>

            {/* Slider 1: Guests (Exact 4 Steps: 70, 100, 150, 150+) */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-center space-x-2">
                <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#00b4b6]">
                  БРОЙ ГОСТИ: {isLargeEvent ? "150+ (ГОЛЯМО СЪБИТИЕ)" : `${numericGuests} ГОСТИ`}
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

            {/* Slider 2: Distance from Burgas (min=50, max=450, step=10, 5 linear labels) */}
            <div className="space-y-3 pt-4">
              <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#00b4b6]">
                ЛОКАЦИЯ ОТ ГРАД БУРГАС: {isFarLocation ? "НАД 450 КМ (ПО ЗАПИТВАНЕ)" : `${distance} КМ (${distance * 2} КМ ДВУПОСОЧНО)`}
              </h3>
              <div className="relative px-2">
                <input
                  type="range"
                  min={50}
                  max={450}
                  step={10}
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full h-3 bg-[#cdeef0] rounded-lg appearance-none cursor-pointer accent-[#00b4b6]"
                />
                <div className="flex justify-between text-xs sm:text-sm font-semibold text-[#2d3a37]/70 mt-2 px-1">
                  <span onClick={() => setDistance(50)} className="cursor-pointer hover:text-[#00b4b6]">50 км</span>
                  <span onClick={() => setDistance(150)} className="cursor-pointer hover:text-[#00b4b6]">150 км</span>
                  <span onClick={() => setDistance(250)} className="cursor-pointer hover:text-[#00b4b6]">250 км</span>
                  <span onClick={() => setDistance(350)} className="cursor-pointer hover:text-[#00b4b6]">350 км</span>
                  <span onClick={() => setDistance(450)} className={`cursor-pointer hover:text-[#00b4b6] ${isFarLocation ? "text-[#00b4b6] font-bold" : ""}`}>450+ км</span>
                </div>
              </div>

              {/* Notice for 450+ km vs Standard Explanation */}
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
                  *Километрите се изчисляват двупосочно (отиване и връщане от Бургас). Първите 50 км в посока (общо 100 км двупосочно) са безплатни!
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
                className={`w-10 h-10 rounded-xl border-2 transition-all flex items-center justify-center cursor-pointer ${
                  addInitials
                    ? "bg-[#00b4b6] border-[#00b4b6] text-white shadow-md scale-105"
                    : "bg-[#cdeef0]/50 border-[#00b4b6]/40 text-transparent hover:border-[#00b4b6]"
                }`}
              >
                <Check className="w-6 h-6 stroke-[3]" />
              </button>
            </div>

            {/* CTA Button without icon element */}
            <div className="pt-4">
              <Link
                href={`/booking?guests=${isLargeEvent ? "150+" : numericGuests}&distance=${isFarLocation ? "450+" : distance}&initials=${addInitials}`}
                className="inline-flex items-center justify-center bg-[#00b4b6] hover:bg-[#009da0] text-white font-display text-lg sm:text-xl font-bold uppercase tracking-wider px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>{needsInquiry ? "ПОИСКАЙ ИНДИВИДУАЛНА ОФЕРТА" : "ИЗПРАТИ ЗАПИТВАНЕ"}</span>
              </Link>
            </div>
          </div>

          {/* Dark Bottom Box: Result Price */}
          <div className="bg-[#2d3a37] text-white px-6 py-8 text-center space-y-3">
            <p className="font-sans text-base sm:text-lg font-light text-white/90">
              {needsInquiry ? "Специална такса за вашето събитие:" : "Крайна цена:"}
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
                  * Включва отиване и връщане ({distance * 2} км двупосочно). Крайната оферта се потвърждава след връзка с нас.
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
