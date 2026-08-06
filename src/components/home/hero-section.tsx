"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[80vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden bg-brand-dark py-20 px-4">
      {/* Background Image - Strict Path: /media/Main Page/hero-bg.png */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/media/Main Page/hero-bg.png"
          alt="Пощичка събитие"
          fill
          className="object-cover object-center opacity-85"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-brand-dark/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 text-white px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wide uppercase leading-tight drop-shadow-lg text-white"
        >
          Всеки гост си тръгва със спомен
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-lg sm:text-xl md:text-2xl font-light text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
        >
          Персонализирани спомени, създадени на живо по време на събитието.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-6"
        >
          <Link
            href="/services"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full border-2 border-white bg-white/10 backdrop-blur-md text-white font-sans text-sm sm:text-base font-semibold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-all duration-300 shadow-xl group"
          >
            <span>ВИЖ ПОВЕЧЕ</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
