"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const FinalCTA = () => {
  return (
    <section className="relative w-full py-20 sm:py-32 flex items-center justify-center overflow-hidden bg-brand-dark px-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/media/Main Page/final-cta-bg.png"
          alt="Пощичка незабравим спомен"
          fill
          className="object-cover object-center opacity-85"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 text-white px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide leading-tight drop-shadow-lg text-white"
        >
          ГОТОВИ ЛИ СТЕ ДА СЪЗДАДЕМ НЕЗАБРАВИМ СПОМЕН?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-sans text-sm sm:text-lg font-light text-white/90 max-w-xl mx-auto drop-shadow-md"
        >
          Свържете се с нас и резервирайте Пощичка за вашето незабравимо събитие!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-4 flex justify-center"
        >
          <Link href="/booking" className="group block cursor-pointer">
            <div className="relative w-60 sm:w-80 h-16 sm:h-20 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/media/Main Page/btn-reserve-here.png"
                alt="Резервирай тук"
                fill
                className="object-contain drop-shadow-xl"
                unoptimized
              />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

