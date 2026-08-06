"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const WhatIsPoshtichka = () => {
  return (
    <section className="py-20 sm:py-28 bg-brand-cream border-b border-[#00b4b6]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column Text Blocks */}
          <div className="lg:col-span-4 space-y-12 text-center lg:text-right order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-3 bg-white/60 backdrop-blur-xs p-6 rounded-3xl border border-[#00b4b6]/20 shadow-xs relative"
            >
              <p className="font-sans text-base sm:text-lg text-brand-dark/90 leading-relaxed">
                Бутикова вендинг машина, която печата картички и спомени на живо по време на събитието.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3 bg-white/60 backdrop-blur-xs p-6 rounded-3xl border border-[#00b4b6]/20 shadow-xs relative"
            >
              <p className="font-sans text-base sm:text-lg text-brand-dark/90 leading-relaxed">
                Интерактивно преживяване, което ангажира гостите и създава специални емоции.
              </p>
            </motion.div>
          </div>

          {/* Center Column: Vending Machine Illustration */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative w-64 sm:w-80 h-80 sm:h-[420px]"
            >
              <Image
                src="/media/Main Page/vending-machine.png"
                alt="Вендинг машина Пощичка"
                fill
                className="object-contain drop-shadow-2xl"
                priority
                unoptimized
              />
            </motion.div>

            {/* Badge Overlay */}
            <div className="mt-4 bg-[#00b4b6] text-white px-6 py-2 rounded-full font-display text-xl sm:text-2xl font-bold uppercase tracking-wider shadow-md">
              КАКВО Е ПОЩИЧКА?
            </div>
          </div>

          {/* Right Column Text Blocks */}
          <div className="lg:col-span-4 space-y-12 text-center lg:text-left order-3">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-3 bg-white/60 backdrop-blur-xs p-6 rounded-3xl border border-[#00b4b6]/20 shadow-xs relative"
            >
              <p className="font-sans text-base sm:text-lg text-brand-dark/90 leading-relaxed">
                Всеки гост си тръгва с уникален персонализиран подарък от вашето събитие.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3 bg-white/60 backdrop-blur-xs p-6 rounded-3xl border border-[#00b4b6]/20 shadow-xs relative"
            >
              <p className="font-sans text-base sm:text-lg text-brand-dark/90 leading-relaxed">
                Подарък, който остава завинаги за спомен!
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
