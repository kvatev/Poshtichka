"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const heroImage = "/media/Main Page/Main Banner.png";

  return (
    <section className="relative w-full min-h-[80vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden bg-brand-dark py-20 px-4">
      {/* Permanent High-Quality Background Image: /media/Main Page/Main Banner.png */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Пощичка събитие"
          fill
          className="object-cover object-center opacity-85"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-brand-dark/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center space-y-6 text-white px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider uppercase leading-tight drop-shadow-lg text-white sm:whitespace-nowrap"
        >
          Всеки гост си тръгва със спомен
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-lg sm:text-xl md:text-2xl font-light text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
        >
          Персонализирани подаръци, създадени по ваша идея!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-6 flex justify-center"
        >
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-10 py-3.5 rounded-full border-2 border-white bg-black/20 hover:bg-white hover:text-[#182b2c] backdrop-blur-md text-white font-stampatello text-lg sm:text-xl font-bold uppercase tracking-wider transition-all duration-300 shadow-xl group cursor-pointer"
          >
            <span>Разбери повече</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};


