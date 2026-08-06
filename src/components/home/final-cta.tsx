"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="relative w-full py-24 sm:py-32 flex items-center justify-center overflow-hidden bg-brand-dark px-4">
      {/* Background Image - Strict Path: /media/Main Page/final-cta-bg.png */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/media/Main Page/final-cta-bg.png"
          alt="Пощичка незабравим спомен"
          fill
          className="object-cover object-center opacity-75"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/50 to-brand-dark/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 text-white px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wide leading-tight drop-shadow-md text-white"
        >
          ГОТОВИ ЛИ СТЕ ДА СЪЗДАДЕМ НЕЗАБРАВИМ СПОМЕН?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-sans text-base sm:text-xl font-light text-white/90 max-w-xl mx-auto drop-shadow-sm"
        >
          Свържете се с нас и резервирайте Пощичка за вашето незабравимо събитие!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-4"
        >
          <Link
            href="/booking"
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-full border-2 border-white bg-white/10 backdrop-blur-md text-white font-sans text-sm sm:text-base font-semibold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-all duration-300 shadow-2xl group"
          >
            <span>РЕЗЕРВИРАЙ ТУК</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
