"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const includedItems = [
  {
    icon: "/media/Main Page/feature-design.png",
    alt: "Индивидуален дизайн - Дизайн изготвен от графичен дизайнер, с 5 годишен опит в сферата.",
  },
  {
    icon: "/media/Main Page/feature-printer.png",
    alt: "Висококачествен печат - Висококачествен печат върху луксозни картони.",
  },
  {
    icon: "/media/Main Page/feature-jar.png",
    alt: "Буркан с жетони - Буркан със жетони, съобразен с бройката на вашите гости.",
  },
  {
    icon: "/media/Main Page/feature-setup.png",
    alt: "Помощна маса и декорация - Помощна маса, рамка с постер, пулверизатор за татуировки.",
  },
  {
    icon: "/media/Main Page/feature-transport.png",
    alt: "Транспорт и асистенти - Двама служители за транспорт, монтаж и съдействие на гостите.",
  },
];

export const WhatsIncluded = () => {
  return (
    <section className="w-full bg-[#00b4b6] text-white py-8 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-8 md:px-10 lg:px-12 overflow-hidden select-none border-t border-white/20">
      <div className="max-w-[1600px] mx-auto space-y-6 sm:space-y-8 md:space-y-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-2"
        >
          <h2 className="font-salongbeach text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-white text-center leading-tight">
            КАКВО Е ВКЛЮЧЕНО В УСЛУГАТА?
          </h2>
        </motion.div>

        {/* 5-Column Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 md:gap-4 lg:gap-6 items-center justify-items-center">
          {includedItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center group w-full"
            >
              {/* Compact Image Container */}
              <div className="relative w-44 sm:w-56 md:w-44 lg:w-56 xl:w-60 aspect-square flex items-center justify-center p-2 mx-auto">
                <Image
                  src={item.icon}
                  alt={item.alt}
                  width={320}
                  height={320}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
