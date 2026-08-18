"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const FinalCTA = () => {
  const [title, setTitle] = React.useState("ГОТОВИ ЛИ СТЕ ДА СЪЗДАДЕМ НЕЗАБРАВИМ СПОМЕН?");
  const [subtitle, setSubtitle] = React.useState(
    "Датите за сватбения сезон се запълват бързо. Побързайте, за да запазите Пощичка за вашия повод!"
  );

  React.useEffect(() => {
    fetch("/api/content")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        if (data.homepage?.finalCtaTitle) {
          setTitle(data.homepage.finalCtaTitle.toUpperCase());
        }
        if (data.homepage?.finalCtaSubtitle) {
          setSubtitle(data.homepage.finalCtaSubtitle);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative w-full py-20 sm:py-32 flex items-center justify-center overflow-hidden bg-brand-dark px-4">
      {/* Background Image: Right-aligned focus on mobile (object-[80%_center]), centered on desktop (md:object-center) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/media/Main Page/final-cta-bg.webp"
          alt="Пощичка – незабравими спомени и персонализирани подаръци за сватби и събития"
          fill
          className="object-cover object-[80%_center] md:object-center opacity-95 sm:opacity-100"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center space-y-6 text-white px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-salongbeach text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-center leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-sans text-base sm:text-xl font-light text-white/95 max-w-3xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-4 flex justify-center"
        >
          <Link
            href="/booking"
            className="inline-flex items-center justify-center px-10 py-3.5 rounded-full border-2 border-white bg-black/20 hover:bg-white hover:text-[#182b2c] backdrop-blur-md text-white font-stampatello text-lg sm:text-xl font-bold uppercase tracking-wider transition-all duration-300 shadow-xl group cursor-pointer"
          >
            <span>РЕЗЕРВИРАЙ ТУК</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
