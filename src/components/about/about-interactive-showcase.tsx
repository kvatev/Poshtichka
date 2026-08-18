"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface AboutStep {
  id: number;
  badge: string;
  number: string;
  shortLabel: string;
  title: string;
  altText: string;
  text: string;
  anchor: {
    top: string;
    position: "left" | "right";
    offset: string;
  };
}

const aboutSteps: AboutStep[] = [
  {
    id: 1,
    badge: "/media/Main Page/Asset 104@2x.webp",
    number: "1",
    shortLabel: "Какво е?",
    title: "КАКВО Е ПОЩИЧКА?",
    altText: "Акцент 1: Споделени емоции за гостите",
    text: "Пощичка е вендинг машина, специално създадена за вашето събитие, каквото и да е то. Тя е интерактивен начин гостите на дадения повод, да получат спомен или подарък от него.",
    anchor: { top: "18%", position: "left", offset: "-left-4 sm:-left-8 md:-left-12" },
  },
  {
    id: 2,
    badge: "/media/Main Page/Asset 105@2x.webp",
    number: "2",
    shortLabel: "Как се създаде?",
    title: "КАК СЕ СЪЗДАДЕ?",
    altText: "Акцент 2: Траен спомен от сватбения ден",
    text: "Идеята дойде, когато се чудихме какво интересно да включим на сватбения си ден. Идеята толкова се хареса, че успя да дебютира като продукт преди нашата сватба!",
    anchor: { top: "38%", position: "right", offset: "-right-4 sm:-right-8 md:-right-12" },
  },
  {
    id: 3,
    badge: "/media/Main Page/Asset 106@2x.webp",
    number: "3",
    shortLabel: "Как работи?",
    title: "КАК РАБОТИ?",
    altText: "Акцент 3: Персонализирано изживяване на живо",
    text: "Всеки гост получава жетон, който поставя в машината, завърта ръчката и от там излиза картонче, в което е поместен и самия подарък!",
    anchor: { top: "62%", position: "left", offset: "-left-4 sm:-left-8 md:-left-12" },
  },
  {
    id: 4,
    badge: "/media/Main Page/Asset 107@2x.webp",
    number: "4",
    shortLabel: "Какво се поставя?",
    title: "КАКВО МОЖЕ ДА СЕ ПОСТАВИ?",
    altText: "Акцент 4: Всичко в едно – забавление и подарък",
    text: "Всичко на хартиен носител – марка, картичка, снимка, стикер, татуировка, предизвикателство, благодарствена картичка и още много други.",
    anchor: { top: "80%", position: "right", offset: "-right-4 sm:-right-8 md:-right-12" },
  },
];

export const AboutInteractiveShowcase = () => {
  const [selectedStep, setSelectedStep] = useState<AboutStep | null>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedStep(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 bg-brand-cream relative overflow-hidden select-none">
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-[#00b4b6]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-2.5"
        >
          <h2 className="font-salongbeach text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider text-[#182b2c] leading-tight drop-shadow-xs">
            КАКВО Е ПОЩИЧКА?
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#182b2c]/80 font-light max-w-xl mx-auto">
            Кликнете върху номерата около машината, за да научите за концепцията и създаването
          </p>
        </motion.div>

        {/* Central Machine Showcase with Anchored Interactive Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-sm sm:max-w-md md:max-w-lg mx-auto flex items-center justify-center py-4 px-8 sm:px-12"
        >
          {/* Scaled Machine Container: Fits entirely within viewport */}
          <div className="relative w-auto h-[380px] sm:h-[440px] md:h-[500px] aspect-[740/2134] flex items-center justify-center">
            <Image
              src="/media/Main Page/Asset 114@2x.webp"
              alt="Илюстрация на машина Пощичка със сърце от драсканици"
              fill
              priority
              draggable={false}
              className="object-contain drop-shadow-2xl select-none pointer-events-none"
              sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 220px"
            />

            {/* Positioned Numbered Badges (1, 2, 3, 4) at Natural Anchor Points */}
            {aboutSteps.map((item) => (
              <button
                key={`about-badge-anchor-${item.id}`}
                onClick={() => setSelectedStep(item)}
                aria-label={`Номер ${item.number}: ${item.title}`}
                style={{ top: item.anchor.top }}
                className={`absolute ${item.anchor.offset} -translate-y-1/2 z-20 group cursor-pointer focus:outline-none transition-transform duration-300 hover:scale-115 active:scale-95`}
              >
                <div className="relative w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full overflow-hidden shadow-xl border-2 border-white bg-white/95 backdrop-blur-xs flex items-center justify-center group-hover:border-[#00b4b6] group-hover:shadow-[0_0_16px_rgba(0,180,182,0.6)] transition-all">
                  <Image
                    src={item.badge}
                    alt={item.altText}
                    fill
                    draggable={false}
                    className="object-contain p-1 select-none pointer-events-none"
                  />
                </div>
                {/* Subtle Pulsing Beacon Ring */}
                <span className="absolute -inset-1 rounded-full border-2 border-[#00b4b6] animate-ping pointer-events-none opacity-40 group-hover:opacity-75" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightweight Pop-up Modal Dialog with Backdrop Blur */}
      <AnimatePresence>
        {selectedStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999999] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 select-text"
            onClick={() => setSelectedStep(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-[28px] sm:rounded-[32px] border-2 border-[#00b4b6] p-6 sm:p-8 shadow-2xl space-y-5 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button ("X") */}
              <button
                onClick={() => setSelectedStep(null)}
                aria-label="Затвори"
                className="absolute top-4 right-4 w-9 h-9 rounded-full border border-[#00b4b6]/40 text-[#00b4b6] hover:bg-[#00b4b6] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-90"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Badge Icon Header & Title */}
              <div className="flex flex-col items-center space-y-2.5 pt-2">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md">
                  <Image
                    src={selectedStep.badge}
                    alt={selectedStep.altText}
                    fill
                    draggable={false}
                    className="object-contain select-none pointer-events-none"
                  />
                </div>
                <h3 className="font-salongbeach text-xl sm:text-2xl font-bold uppercase tracking-wider text-brand-dark">
                  {selectedStep.title}
                </h3>
              </div>

              {/* Text Description */}
              <p className="font-sans text-sm sm:text-base md:text-lg font-medium text-[#182b2c]/90 leading-relaxed px-2">
                &ldquo;{selectedStep.text}&rdquo;
              </p>

              {/* Action Button */}
              <div className="pt-3">
                <button
                  onClick={() => setSelectedStep(null)}
                  className="px-6 py-2.5 rounded-full bg-[#00b4b6] hover:bg-[#008b8d] text-white font-salongbeach text-sm font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Разбрах
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
