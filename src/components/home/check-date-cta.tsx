"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const CheckDateCTA = () => {
  return (
    <section className="w-full bg-[#00b4b6] text-white py-10 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 relative overflow-hidden select-none border-t border-white/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">
        {/* Left Side: Bird Stamp Asset */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-shrink-0 flex items-center justify-center"
        >
          <Image
            src="/media/Main Page/Asset 34@2x.png"
            alt="Пощичка печат"
            width={240}
            height={240}
            className="w-28 sm:w-36 md:w-44 lg:w-52 max-h-[180px] sm:max-h-[220px] md:max-h-[260px] w-auto object-contain hover:rotate-3 transition-transform duration-300"
          />
        </motion.div>

        {/* Center Content: Title, Subtext, Arrow & Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex-1 text-center flex flex-col items-center justify-center space-y-3 sm:space-y-4 max-w-2xl lg:max-w-3xl"
        >
          <h2 className="font-salongbeach text-3xl md:text-5xl font-bold uppercase tracking-wider text-white leading-tight text-center">
            ЧУДИТЕ СЕ ДАЛИ ДАТАТА ВИ Е СВОБОДНА?
          </h2>

          <p className="font-sans text-base sm:text-lg lg:text-xl font-light text-white/95 italic">
            Проверете дали Пощичка може да пътува за вашия специален ден!
          </p>

          {/* Button & Arrow Area */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 relative">
            <Link
              href="/calendar"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-white bg-white/10 hover:bg-white hover:text-[#00b4b6] backdrop-blur-sm text-white font-salongbeach text-base sm:text-lg lg:text-xl font-bold uppercase tracking-wider transition-all duration-300 shadow-xl group cursor-pointer"
            >
              <span>ПРОВЕРЕТЕ ТУК</span>
            </Link>

            {/* Curly Arrow pointing to button */}
            <div className="hidden sm:block absolute -right-14 top-1/2 -translate-y-1/2">
              <Image
                src="/media/Main Page/curly-arrow-left.png"
                alt="Стрелка"
                width={60}
                height={60}
                className="w-10 sm:w-12 h-auto object-contain opacity-90"
              />
            </div>
          </div>
        </motion.div>

        {/* Right Side: Vending Booth Asset */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-shrink-0 flex items-center justify-center"
        >
          <Image
            src="/media/Main Page/poshtichka-booth-blank.png"
            alt="Пощичка машина"
            width={320}
            height={440}
            className="w-32 sm:w-44 md:w-56 lg:w-64 max-h-[220px] sm:max-h-[280px] md:max-h-[340px] lg:max-h-[380px] w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      </div>
    </section>
  );
};
