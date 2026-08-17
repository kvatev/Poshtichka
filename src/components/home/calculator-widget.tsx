"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const GUEST_STEPS = [70, 100, 150, "150+"] as const;

export const CalculatorWidget = () => {
  const [stepIndex, setStepIndex] = useState<number>(1); // Default: index 1 (100 guests)
  const [distance, setDistance] = useState<number>(50); // Default: 50 km one-way (free threshold)
  const [addInitials, setAddInitials] = useState<boolean>(false);

  const [pricing, setPricing] = useState({
    price70: 330,
    price100: 350,
    price150: 380,
    designPrice: 50,
    freeDistance: 50,
    ratePerKm: 0.23,
  });

  useEffect(() => {
    try {
      const cached = localStorage.getItem("poshtichka_content_pricing_settings");
      if (cached) {
        const p = JSON.parse(cached);
        if (p && typeof p === "object") {
          setPricing((prev) => ({
            ...prev,
            price70: Number(p.price70) || prev.price70,
            price100: Number(p.price100) || Number(p.rentalPrice) || prev.price100,
            price150: Number(p.price150) || prev.price150,
            designPrice: Number(p.designPrice) || prev.designPrice,
            freeDistance: Number(p.freeDistance) || prev.freeDistance,
            ratePerKm: Number(p.ratePerKm) || prev.ratePerKm,
          }));
        }
      }
    } catch {}

    fetch("/api/content", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const p = data?.pricing_settings || data?.pricing;
        if (p) {
          setPricing((prev) => {
            const updated = {
              price70: Number(p.price70) || prev.price70,
              price100: Number(p.price100) || Number(p.rentalPrice) || prev.price100,
              price150: Number(p.price150) || prev.price150,
              designPrice: Number(p.designPrice) || prev.designPrice,
              freeDistance: Number(p.freeDistance) || prev.freeDistance,
              ratePerKm: Number(p.ratePerKm) || prev.ratePerKm,
            };
            try {
              localStorage.setItem("poshtichka_content_pricing_settings", JSON.stringify(updated));
            } catch {}
            return updated;
          });
        }
      })
      .catch(() => {});
  }, []);

  const currentStep = GUEST_STEPS[stepIndex];
  const isLargeEvent = currentStep === "150+";
  const isFarLocation = distance >= 450;
  const needsInquiry = isLargeEvent || isFarLocation;

  const numericGuests = typeof currentStep === "number" ? currentStep : 150;

  // DYNAMIC DISTANCE MATHEMATICS:
  // 1. Slider value (distance) = one-way distance from Burgas (50 km to 450 km)
  // 2. twoWayDistance = distance * 2
  // 3. Free threshold two-way = freeDistance * 2
  // 4. chargeableDistance = Math.max(0, twoWayDistance - freeThresholdTwoWay)
  // 5. travelCost = chargeableDistance * ratePerKm
  const twoWayDistance = distance * 2;
  const freeThresholdTwoWay = pricing.freeDistance * 2;
  const chargeableDistance = Math.max(0, twoWayDistance - freeThresholdTwoWay);
  const travelCost = chargeableDistance * pricing.ratePerKm;

  // DYNAMIC GUEST BASE PRICING FOR 70, 100, 150:
  const getGuestBasePrice = (idx: number): number => {
    if (idx === 0) return pricing.price70;
    if (idx === 1) return pricing.price100;
    return pricing.price150;
  };

  const basePrice = getGuestBasePrice(stepIndex);
  const initialsCost = addInitials ? pricing.designPrice : 0;

  // TOTAL PRICE: Base Price + Add-ons + Travel Cost
  const totalPrice = Math.round(basePrice + travelCost + initialsCost);

  return (
    <section className="py-4 sm:py-8 bg-brand-cream relative select-none">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Outer Bordered Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[32px] border-2 border-[#2d3a37]/80 overflow-hidden shadow-2xl"
        >
          {/* Top Form Section */}
          <div className="p-5 sm:p-8 md:p-9 space-y-5 sm:space-y-6 text-center">
            {/* Title & Subtitle */}
            <div className="space-y-1">
              <h2 className="font-salongbeach text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-[#2d3a37] text-center leading-tight">
                КАЛКУЛАТОР
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#2d3a37]/80 italic">
                Изчислете цена за Вашето събитие!
              </p>
            </div>

            {/* Slider 1: Guests (Exact 4 Steps: 70, 100, 150, 150+) */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-center space-x-2">
                <label
                  htmlFor="guest-slider"
                  className="font-display text-lg sm:text-xl font-bold uppercase tracking-wider text-[#00b4b6] cursor-pointer"
                >
                  БРОЙ ГОСТИ: {isLargeEvent ? "150+ (ГОЛЯМО СЪБИТИЕ)" : `${numericGuests} ГОСТИ`}
                </label>
              </div>

              <div className="relative px-2">
                <input
                  id="guest-slider"
                  type="range"
                  min={0}
                  max={3}
                  step={1}
                  value={stepIndex}
                  onChange={(e) => setStepIndex(Number(e.target.value))}
                  aria-label="Избор на брой гости за събитието"
                  aria-valuemin={0}
                  aria-valuemax={3}
                  aria-valuenow={stepIndex}
                  aria-valuetext={isLargeEvent ? "150+ гости (Голямо събитие)" : `${numericGuests} гости`}
                  className="w-full h-2.5 bg-[#cdeef0] rounded-lg appearance-none cursor-pointer accent-[#00b4b6]"
                />
                <div className="flex justify-between text-xs sm:text-sm font-semibold text-[#2d3a37]/70 mt-1.5 px-1">
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
                  className="p-3 rounded-2xl bg-[#00b4b6]/10 border border-[#00b4b6]/30 text-[#2d3a37] text-xs sm:text-sm space-y-1 flex flex-col items-center"
                >
                  <div className="flex items-center space-x-2 text-[#00b4b6] font-bold font-display text-sm sm:text-base">
                    <Sparkles className="w-4 h-4" />
                    <span>По договаряне за над 150 гости</span>
                  </div>
                  <p className="text-xs text-[#2d3a37]/90 italic">
                    За големи събития над 150 гости цената се определя индивидуално според продължителността и екипа.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Slider 2: Distance from Burgas (min=50, max=450, step=10) */}
            <div className="space-y-2 pt-2">
              <label
                htmlFor="distance-slider"
                className="font-display text-lg sm:text-xl font-bold uppercase tracking-wider text-[#00b4b6] block cursor-pointer"
              >
                ЛОКАЦИЯ ОТ ГРАД БУРГАС: {isFarLocation ? "НАД 450 КМ (ПО ЗАПИТВАНЕ)" : `${distance} КМ (${distance * 2} КМ ДВУПОСОЧНО)`}
              </label>
              <div className="relative px-2">
                <input
                  id="distance-slider"
                  type="range"
                  min={50}
                  max={450}
                  step={10}
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  aria-label="Избор на разстояние в километри от Бургас"
                  aria-valuemin={50}
                  aria-valuemax={450}
                  aria-valuenow={distance}
                  aria-valuetext={isFarLocation ? "Над 450 км (По запитване)" : `${distance} километра от Бургас`}
                  className="w-full h-2.5 bg-[#cdeef0] rounded-lg appearance-none cursor-pointer accent-[#00b4b6]"
                />
                <div className="flex justify-between text-xs sm:text-sm font-semibold text-[#2d3a37]/70 mt-1.5 px-1">
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
                  className="p-3 rounded-2xl bg-[#00b4b6]/10 border border-[#00b4b6]/30 text-[#2d3a37] text-xs sm:text-sm space-y-1 flex flex-col items-center"
                >
                  <div className="flex items-center space-x-2 text-[#00b4b6] font-bold font-display text-sm sm:text-base">
                    <Sparkles className="w-4 h-4" />
                    <span>Индивидуална оферта за над 450 км!</span>
                  </div>
                  <p className="text-xs text-[#2d3a37]/90 italic">
                    За отдалечени дестинации над 450 км изготвяме специална оферта с включени нощувки и логистика.
                  </p>
                </motion.div>
              ) : (
                <p className="text-xs text-[#00b4b6] font-medium italic pt-0.5">
                  *Километрите се изчисляват двупосочно (отиване и връщане от Бургас). Първите {pricing.freeDistance} км в посока (общо {pricing.freeDistance * 2} км двупосочно) са безплатни!
                </p>
              )}
            </div>

            {/* Custom Checkbox: Add Initials (+designPrice EUR) */}
            <div className="space-y-1 pt-1 flex flex-col items-center">
              <label
                htmlFor="initials-toggle-btn"
                className="font-display text-base sm:text-lg font-bold uppercase tracking-wider text-[#00b4b6] cursor-pointer"
              >
                ДОБАВЯНЕ НА ИНИЦИАЛИ (+{pricing.designPrice} €)
              </label>
              <button
                id="initials-toggle-btn"
                type="button"
                role="checkbox"
                aria-checked={addInitials}
                aria-label={`Добавяне на персонализиран дизайн и инициали (+${pricing.designPrice} €)`}
                onClick={() => setAddInitials(!addInitials)}
                className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center cursor-pointer ${
                  addInitials
                    ? "bg-[#00b4b6] border-[#00b4b6] text-white shadow-sm scale-105"
                    : "bg-[#cdeef0]/50 border-[#00b4b6]/40 text-transparent hover:border-[#00b4b6]"
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>

            {/* CTA Button */}
            <div className="pt-1">
              <Link
                href={`/booking?guests=${isLargeEvent ? "150+" : numericGuests}&distance=${isFarLocation ? "450+" : distance}&initials=${addInitials}`}
                className="inline-flex items-center justify-center bg-[#00b4b6] hover:bg-[#009da0] text-white font-display text-base sm:text-lg font-bold uppercase tracking-wider px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>{needsInquiry ? "ПОИСКАЙ ИНДИВИДУАЛНА ОФЕРТА" : "ИЗПРАТИ ЗАПИТВАНЕ"}</span>
              </Link>
            </div>
          </div>

          {/* Dark Bottom Box: Result Price */}
          <div className="bg-[#2d3a37] text-white px-6 py-4 sm:py-5 text-center space-y-1.5">
            <p className="font-sans text-sm sm:text-base font-light text-white/90">
              {isLargeEvent
                ? "Цена за вашето събитие:"
                : isFarLocation
                ? "Специална такса за локацията:"
                : "Крайна цена:"}
            </p>

            {isLargeEvent ? (
              <div className="space-y-1">
                <div className="font-display text-3xl sm:text-4xl font-bold tracking-wider text-[#00b4b6]">
                  ПО ДОГОВАРЯНЕ
                </div>
                <p className="text-xs text-white/90 font-light max-w-lg mx-auto leading-relaxed">
                  Свържете се с нас за персонална оферта за големи събития.
                </p>
              </div>
            ) : isFarLocation ? (
              <div className="space-y-1">
                <div className="font-display text-3xl sm:text-4xl font-bold tracking-wider text-[#00b4b6]">
                  ПО ЗАПИТВАНЕ
                </div>
                <p className="text-xs text-white/90 font-light max-w-lg mx-auto leading-relaxed">
                  За отдалечени дестинации над 450 км изготвяме персонална оферта с транспорт и логистика.
                </p>
              </div>
            ) : (
              <>
                <div className="font-display text-3xl sm:text-5xl font-bold tracking-wider text-white">
                  {totalPrice} €
                </div>
                <p className="text-xs text-white/70 font-light max-w-lg mx-auto leading-relaxed">
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
