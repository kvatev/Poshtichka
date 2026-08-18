"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

export interface AboutStep {
  id: number;
  badge: string;
  number: string;
  shortLabel: string;
  title: string;
  text: string;
  hotspot: {
    top: string;
    left: string;
  };
}

const aboutSteps: AboutStep[] = [
  {
    id: 1,
    badge: "/media/Main Page/Asset 104@2x.webp",
    number: "1",
    shortLabel: "Какво е?",
    title: "КАКВО Е ПОЩИЧКА?",
    text: "Пощичка е вендинг машина, специално създадена за вашето събитие, каквото и да е то. Тя е интерактивен начин гостите на дадения повод, да получат спомен или подарък от него.",
    hotspot: { top: "18%", left: "20%" },
  },
  {
    id: 2,
    badge: "/media/Main Page/Asset 105@2x.webp",
    number: "2",
    shortLabel: "Как се създаде?",
    title: "КАК СЕ СЪЗДАДЕ?",
    text: "Идеята дойде, когато се чудихме какво интересно да включим на сватбения си ден. Идеята толкова се хареса, че успя да дебютира като продукт преди нашата сватба!",
    hotspot: { top: "42%", left: "80%" },
  },
  {
    id: 3,
    badge: "/media/Main Page/Asset 106@2x.webp",
    number: "3",
    shortLabel: "Как работи?",
    title: "КАК РАБОТИ?",
    text: "Всеки гост получава жетон, който поставя в машината, завърта ръчката и от там излиза картонче, в което е поместен и самия подарък!",
    hotspot: { top: "64%", left: "18%" },
  },
  {
    id: 4,
    badge: "/media/Main Page/Asset 107@2x.webp",
    number: "4",
    shortLabel: "Какво се поставя?",
    title: "КАКВО МОЖЕ ДА СЕ ПОСТАВИ?",
    text: "Всичко на хартиен носител – марка, картичка, снимка, стикер, татуировка, предизвикателство, благодарствена картичка и още много други.",
    hotspot: { top: "84%", left: "78%" },
  },
];

export const AboutInteractiveShowcase = () => {
  const [activeId, setActiveId] = useState<number>(1);

  const activeIndex = aboutSteps.findIndex((item) => item.id === activeId);
  const activeItem = aboutSteps[activeIndex] || aboutSteps[0];

  const handlePrev = () => {
    const nextIdx = (activeIndex - 1 + aboutSteps.length) % aboutSteps.length;
    setActiveId(aboutSteps[nextIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % aboutSteps.length;
    setActiveId(aboutSteps[nextIdx].id);
  };

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 bg-brand-cream relative overflow-hidden select-none">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-[#00b4b6]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center space-x-2 bg-[#00b4b6]/10 px-4 py-1.5 rounded-full border border-[#00b4b6]/30 text-[#00b4b6] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Интерактивна история</span>
          </div>
          <h2 className="font-salongbeach text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider text-[#182b2c] leading-tight drop-shadow-xs">
            КАКВО Е ПОЩИЧКА?
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#182b2c]/80 font-light max-w-2xl mx-auto">
            Кликнете върху номерата, за да научите защо създадохме Пощичка и как работи тя
          </p>
        </motion.div>

        {/* Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left / Center Column: Vending Machine Illustration with Hotspots */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex justify-center items-center relative"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px] aspect-[740/2134] flex items-center justify-center">
              {/* Central Machine Image: Asset 114@2x.webp */}
              <Image
                src="/media/Main Page/Asset 114@2x.webp"
                alt="Пощичка машина със сърце"
                fill
                priority
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 420px"
              />

              {/* Desktop Hotspot Pins Floating on the Machine */}
              {aboutSteps.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <button
                    key={`hotspot-${item.id}`}
                    onClick={() => setActiveId(item.id)}
                    aria-label={`Избери въпрос ${item.number}: ${item.title}`}
                    style={{ top: item.hotspot.top, left: item.hotspot.left }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300 group cursor-pointer focus:outline-none hidden sm:block ${
                      isActive
                        ? "scale-125 z-30 drop-shadow-[0_0_16px_rgba(0,180,182,0.8)]"
                        : "scale-100 opacity-85 hover:opacity-100 hover:scale-115"
                    }`}
                  >
                    <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden shadow-lg border-2 border-white bg-white/90 backdrop-blur-xs flex items-center justify-center">
                      <Image
                        src={item.badge}
                        alt={`Номер ${item.number}`}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    {isActive && (
                      <span className="absolute -inset-1 rounded-full border-2 border-[#00b4b6] animate-ping pointer-events-none opacity-60" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Number Badges Selector + Active Text Reveal Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 space-y-6 sm:space-y-8 flex flex-col justify-center"
          >
            {/* Number Badges Selector Row (1, 2, 3, 4) */}
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#182b2c]/70 block text-center lg:text-left">
                Изберете въпрос:
              </span>
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 sm:gap-4">
                {aboutSteps.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <button
                      key={`btn-${item.id}`}
                      onClick={() => setActiveId(item.id)}
                      aria-label={`Въпрос ${item.number} - ${item.title}`}
                      className={`relative flex items-center space-x-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-white border-[#00b4b6] shadow-lg scale-105 ring-2 ring-[#00b4b6]/30 text-[#182b2c]"
                          : "bg-white/70 hover:bg-white border-[#182b2c]/15 text-[#182b2c]/70 hover:text-[#182b2c] hover:scale-102"
                      }`}
                    >
                      <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0">
                        <Image
                          src={item.badge}
                          alt={`Икона ${item.number}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="font-salongbeach font-bold text-sm sm:text-base uppercase tracking-wider">
                        {item.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Display Card with Dynamic AnimatePresence Fade Reveal */}
            <div className="relative bg-white border-2 border-[#00b4b6] rounded-[32px] p-6 sm:p-8 md:p-10 shadow-xl overflow-hidden min-h-[220px] sm:min-h-[260px] flex flex-col justify-between">
              {/* Background watermark badge */}
              <div className="absolute -right-6 -bottom-6 w-36 h-36 opacity-10 pointer-events-none">
                <Image
                  src={activeItem.badge}
                  alt="Badge Watermark"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Dynamic Text Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 relative z-10"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 drop-shadow-md">
                      <Image
                        src={activeItem.badge}
                        alt={`Въпрос ${activeItem.number}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[#00b4b6] text-xs font-bold uppercase tracking-widest block">
                        ВЪПРОС 0{activeItem.number}
                      </span>
                      <h3 className="font-salongbeach text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#182b2c]">
                        {activeItem.title}
                      </h3>
                    </div>
                  </div>

                  <p className="font-sans text-base sm:text-lg md:text-xl font-medium text-[#182b2c]/90 leading-relaxed pt-1">
                    &ldquo;{activeItem.text}&rdquo;
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Footer Controls: Indicators and Prev/Next Navigation */}
              <div className="pt-6 mt-4 border-t border-[#00b4b6]/20 flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-1.5">
                  {aboutSteps.map((item) => (
                    <button
                      key={`dot-${item.id}`}
                      onClick={() => setActiveId(item.id)}
                      aria-label={`Към въпрос ${item.number}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        activeId === item.id
                          ? "w-8 bg-[#00b4b6]"
                          : "w-2 bg-[#182b2c]/20 hover:bg-[#182b2c]/40"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Предишен въпрос"
                    className="w-9 h-9 rounded-full border border-[#00b4b6]/40 hover:border-[#00b4b6] bg-brand-cream/80 hover:bg-[#00b4b6] text-[#182b2c] hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-90"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-salongbeach text-xs font-bold text-[#182b2c] px-1">
                    {activeIndex + 1} / {aboutSteps.length}
                  </span>
                  <button
                    onClick={handleNext}
                    aria-label="Следващ въпрос"
                    className="w-9 h-9 rounded-full border border-[#00b4b6]/40 hover:border-[#00b4b6] bg-brand-cream/80 hover:bg-[#00b4b6] text-[#182b2c] hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-90"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
