"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const CheckDateCTA = () => {
  return (
    <section className="w-full bg-[#00b4b6] text-white py-16 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-8 lg:px-12 relative overflow-hidden select-none border-t border-white/20">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 lg:gap-14">
        {/* Left Side: Bird Stamp Asset (Significantly Enlarged for Desktop) */}
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
            width={320}
            height={320}
            className="w-36 sm:w-48 md:w-60 lg:w-72 xl:w-80 h-auto object-contain hover:rotate-3 transition-transform duration-300"
          />
        </motion.div>

        {/* Center Content: Title, Subtext, Arrow & Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex-1 text-center flex flex-col items-center justify-center space-y-4 sm:space-y-6 max-w-2xl lg:max-w-3xl"
        >
          <h2 className="font-salongbeach text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-wider text-white leading-tight">
            ЧУДИТЕ СЕ ДАЛИ ДАТАТА ВИ Е СВОБОДНА?
          </h2>

          <p className="font-sans text-base sm:text-xl lg:text-2xl font-light text-white/95 italic">
            Проверете дали Пощичка може да пътува за вашия специален ден!
          </p>

          {/* Button & Arrow Area */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 relative">
            <Link
              href="/calendar"
              className="inline-flex items-center justify-center px-9 py-4 rounded-full border-2 border-white bg-white/10 hover:bg-white hover:text-[#00b4b6] backdrop-blur-sm text-white font-salongbeach text-lg sm:text-xl lg:text-2xl font-bold uppercase tracking-wider transition-all duration-300 shadow-xl group cursor-pointer"
            >
              <span>ПРОВЕРЕТЕ ТУК</span>
            </Link>

            {/* Curly Arrow pointing to button */}
            <div className="hidden sm:block absolute -right-16 top-1/2 -translate-y-1/2">
              <Image
                src="/media/Main Page/curly-arrow-left.png"
                alt="Стрелка"
                width={70}
                height={70}
                className="w-12 sm:w-14 h-auto object-contain opacity-90"
              />
            </div>
          </div>
        </motion.div>

        {/* Right Side: Vending Booth Asset (Significantly Enlarged for Desktop) */}
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
            width={420}
            height={560}
            className="w-40 sm:w-56 md:w-80 lg:w-96 xl:w-[420px] h-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      </div>
    </section>
  );
};
