"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const includedItems = [
  {
    icon: "/media/feature-design.png",
    alt: "Индивидуален дизайн",
    text: "Дизайн изготвен от графичен дизайнер, с 5 годишен опит в сферата.",
  },
  {
    icon: "/media/feature-printer.png",
    alt: "Висококачествен печат",
    text: "Висококачествен печат върху луксозни картони.",
  },
  {
    icon: "/media/feature-jar.png",
    alt: "Буркан с жетони",
    text: "Буркан със жетони, съобразен с бройката на вашите гости.",
  },
  {
    icon: "/media/feature-setup.png",
    alt: "Помощна маса и декорация",
    text: "Помощна маса, рамка с постер, пулверизатор за татуировки.",
  },
  {
    icon: "/media/feature-transport.png",
    alt: "Транспорт и асистенти",
    text: "Двама служители за транспорт, монтаж и съдействие на гостите.",
  },
];

export const WhatsIncluded = () => {
  return (
    <section className="w-full bg-[#00b4b6] text-white py-16 sm:py-24 md:py-28 lg:py-32 xl:py-36 px-4 sm:px-8 md:px-10 lg:px-12 overflow-hidden select-none border-t border-white/20">
      <div className="max-w-[1500px] mx-auto space-y-12 sm:space-y-16 lg:space-y-24">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <h2 className="font-stampatello text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-wider text-white">
            КАКВО Е ВКЛЮЧЕНО В УСЛУГАТА?
          </h2>
        </motion.div>

        {/* 5-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-start">
          {includedItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center space-y-4 md:space-y-6 lg:space-y-8 group"
            >
              {/* Significantly Scaled Icon Box for Desktop */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 flex items-center justify-center p-1">
                <Image
                  src={item.icon}
                  alt={item.alt}
                  width={240}
                  height={240}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Scaled Text Label */}
              <p className="font-stampatello text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 leading-relaxed font-medium px-1 sm:px-2">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
