"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const CheckDateCTA = () => {
  return (
    <section className="w-full bg-[#00b4b6] text-white pt-5 sm:pt-7 md:pt-8 lg:pt-10 pb-0 sm:pb-7 md:pb-8 lg:pb-10 px-4 sm:px-8 lg:px-12 relative overflow-hidden select-none border-t border-white/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-10">
        {/* Left Side: Bird Stamp Asset (Visible on Mobile & Desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-shrink-0 flex items-center justify-center"
        >
          <Image
            src="/media/Main Page/Asset 34@2x.webp"
            alt="Пощичка авторски печат за сватбени картички"
            width={240}
            height={240}
            className="w-24 sm:w-32 md:w-40 lg:w-48 max-h-[140px] sm:max-h-[180px] md:max-h-[200px] w-auto object-contain hover:rotate-3 transition-transform duration-300"
          />
        </motion.div>

        {/* Center Content: Title, Subtext, Arrow & Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex-1 text-center flex flex-col items-center justify-center space-y-2 sm:space-y-3 max-w-2xl lg:max-w-3xl"
        >
          <h2 className="font-salongbeach text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-white leading-tight text-center">
            ЧУДИТЕ СЕ ДАЛИ ДАТАТА ВИ Е СВОБОДНА?
          </h2>

          <p className="font-sans text-sm sm:text-base lg:text-lg font-light text-white/95 italic">
            Проверете дали Пощичка може да пътува за вашия специален ден!
          </p>

          {/* Button & Arrow Area */}
          <div className="pt-3 sm:pt-6 md:pt-7 flex items-center justify-center">
            <div className="relative inline-flex items-center justify-center">
              <Link
                href="/calendar"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 rounded-full border-2 border-white bg-white/10 hover:bg-white hover:text-[#00b4b6] backdrop-blur-sm text-white font-salongbeach text-base sm:text-lg font-bold uppercase tracking-wider transition-all duration-300 shadow-xl group cursor-pointer"
              >
                <span>ПРОВЕРЕТЕ ТУК</span>
              </Link>

              {/* Curly Arrow - Decorative */}
              <div className="flex items-center justify-center absolute -right-10 sm:-right-14 top-1/2 -translate-y-1/2 h-full pointer-events-none" aria-hidden="true">
                <Image
                  src="/media/Main Page/curly-arrow-left.png"
                  alt=""
                  aria-hidden="true"
                  width={60}
                  height={60}
                  className="w-8 sm:w-11 h-auto object-contain opacity-90 translate-y-[2px]"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Vending Booth Asset - 10% Larger & Flush at Bottom on Mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-shrink-0 flex items-center justify-center -mb-2 sm:mb-0"
        >
          <Image
            src="/media/Main Page/poshtichka-booth-blank.png"
            alt="Интерактивна ретро вендинг машина Пощичка"
            width={320}
            height={440}
            className="w-32 sm:w-40 md:w-48 lg:w-56 max-h-[200px] sm:max-h-[240px] md:max-h-[260px] w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      </div>
    </section>
  );
};
