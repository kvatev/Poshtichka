"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const items = [
  {
    id: 1,
    title: "Индивидуален дизайн на картичките и сувенирите",
    icon: "/media/Main Page/inc-1.png",
  },
  {
    id: 2,
    title: "Мобилен кът и бутикова вендинг машина на място",
    icon: "/media/Main Page/inc-2.png",
  },
  {
    id: 3,
    title: "Неограничен брой разпечатки за всички гости",
    icon: "/media/Main Page/inc-3.png",
  },
  {
    id: 4,
    title: "Персонализирани монети-жетони за гостите",
    icon: "/media/Main Page/inc-4.png",
  },
  {
    id: 5,
    title: "Организация, съдействие и координация по време на цялото събитие",
    icon: "/media/Main Page/inc-5.png",
  },
];

export const WhatsIncluded = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#00b4b6] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 sm:space-y-16">
        {/* Section Heading */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wide text-white drop-shadow-md">
            КАКВО Е ВКЛЮЧЕНО В УСЛУГАТА?
          </h2>
        </div>

        {/* 5 Grid Items */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center space-y-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                <Image
                  src={item.icon}
                  alt={item.title}
                  fill
                  className="object-contain filter drop-shadow-md"
                  unoptimized
                />
              </div>
              <p className="font-sans text-xs sm:text-sm font-medium text-white/95 leading-relaxed">
                {item.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
