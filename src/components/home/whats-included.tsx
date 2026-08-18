"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface IncludedItem {
  icon: string;
  text: string;
  width: number;
  height: number;
}

const includedItems: IncludedItem[] = [
  {
    icon: "/media/Main Page/Asset 112@2x.webp",
    text: "Дизайн изготвен от графичен дизайнер, с 5 годишен опит в сферата.",
    width: 427,
    height: 471,
  },
  {
    icon: "/media/Main Page/Asset 111@2x.webp",
    text: "Висококачествен печат върху луксозни картони.",
    width: 467,
    height: 501,
  },
  {
    icon: "/media/Main Page/Asset 110@2x.webp",
    text: "Буркан с жетони, съобразен с бройката на вашите гости.",
    width: 505,
    height: 450,
  },
  {
    icon: "/media/Main Page/Asset 109@2x.webp",
    text: "Помощна маса, рамка с постер, пулверизатор за татуировки.",
    width: 349,
    height: 507,
  },
  {
    icon: "/media/Main Page/Asset 108@2x.webp",
    text: "Двама служители за транспорт, монтаж и съдействие на гостите.",
    width: 433,
    height: 467,
  },
];

export const WhatsIncluded = () => {
  return (
    <section className="w-full bg-[#00a89d] text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden select-none border-t border-white/20">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <h2 className="font-salongbeach text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-white text-center leading-tight drop-shadow-sm">
            КАКВО Е ВКЛЮЧЕНО В УСЛУГАТА?
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-white/90 font-light max-w-2xl mx-auto">
            Получавате цялостно премиум обслужване и всички необходими материали за Вашето събитие
          </p>
        </motion.div>

        {/* 5-Column Responsive Grid with Live Text */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-6 lg:gap-6 xl:gap-8 items-start justify-items-center">
          {includedItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center group w-full space-y-4"
            >
              {/* Scalable Icon Container */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-32 lg:h-32 xl:w-36 xl:h-36 flex items-center justify-center flex-shrink-0">
                <Image
                  src={item.icon}
                  alt={item.text}
                  width={item.width}
                  height={item.height}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
                />
              </div>

              {/* Crisp Live Typography */}
              <p className="font-sans text-xs sm:text-sm md:text-[13px] lg:text-sm font-medium text-white/95 leading-relaxed max-w-[210px] mx-auto text-balance">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
