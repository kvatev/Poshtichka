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
    <section className="w-full bg-[#00b4b6] text-white py-16 sm:py-24 md:py-28 lg:py-32 xl:py-36 px-4 sm:px-8 md:px-10 lg:px-12 overflow-hidden select-none border-t border-white/20">
      <div className="max-w-[1600px] mx-auto space-y-12 sm:space-y-16 lg:space-y-24">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <h2 className="font-salongbeach text-3xl md:text-5xl font-bold uppercase tracking-wider text-white text-center leading-tight">
            КАКВО Е ВКЛЮЧЕНО В УСЛУГАТА?
          </h2>
        </motion.div>

        {/* 5-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 sm:gap-10 md:gap-6 lg:gap-10 xl:gap-12 items-center justify-items-center">
          {includedItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center group w-full"
            >
              {/* Scaled Image Container for Legibility */}
              <div className="relative w-56 sm:w-64 md:w-48 lg:w-64 xl:w-72 aspect-square flex items-center justify-center p-2 mx-auto">
                <Image
                  src={item.icon}
                  alt={item.alt}
                  width={350}
                  height={350}
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
