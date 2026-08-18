"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonUrl?: string;
  imageUrl?: string;
}

export const HeroSection = ({
  title = "ВЕНДИНГ МАШИНА ЗА СВАТБИ И СЪБИТИЯ",
  subtitle = "Превръщаме традиционните подаръци за гости в незабравимо забавление!",
  buttonText = "Разбери повече",
  buttonUrl = "/about",
  imageUrl = "/media/Main Page/Main Banner.webp",
}: HeroSectionProps) => {
  return (
    <section className="relative w-full min-h-[75vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden bg-brand-dark py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      {/* Permanent High-Quality Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt="Пощичка събитие"
          fill
          priority
          quality={75}
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, 1920px"
          className="object-cover object-center opacity-95 sm:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center space-y-6 text-white px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-salongbeach text-[34px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wider uppercase leading-tight sm:leading-tight text-white whitespace-normal break-words max-w-4xl mx-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-base sm:text-xl md:text-2xl font-light text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-4 sm:pt-6 flex justify-center"
        >
          <Link
            href={buttonUrl}
            className="inline-flex items-center justify-center px-9 py-3.5 rounded-full border-2 border-white bg-black/20 hover:bg-white hover:text-[#182b2c] backdrop-blur-md text-white font-stampatello text-lg sm:text-xl font-bold uppercase tracking-wider transition-all duration-300 shadow-xl group cursor-pointer"
          >
            <span>{buttonText}</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
