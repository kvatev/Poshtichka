"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

export const CheckDateCTA = () => {
  return (
    <section className="py-20 sm:py-24 bg-[#00b4b6] text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wide text-white drop-shadow-md">
            ЧУДИТЕ СЕ ДАЛИ ДАТАТА ВИ Е СВОБОДНА?
          </h2>
          <p className="font-sans text-base sm:text-xl font-light text-white/90 max-w-xl mx-auto">
            Проверете наличността за вашето събитие за по-малко от минута.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-2 flex justify-center"
        >
          <Link
            href="/calendar"
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-full border-2 border-white bg-white/10 backdrop-blur-md text-white font-sans text-sm sm:text-base font-semibold uppercase tracking-widest hover:bg-white hover:text-[#00b4b6] transition-all duration-300 shadow-xl group"
          >
            <Calendar className="w-5 h-5" />
            <span>ПРОВЕРЕТЕ ТУК</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Decorative Illustrations */}
      <div className="absolute left-4 bottom-4 w-24 h-24 sm:w-36 sm:h-36 opacity-30 pointer-events-none">
        <Image
          src="/media/Main Page/cta-postcard.png"
          alt="Картичка"
          fill
          className="object-contain"
          unoptimized
        />
      </div>

      <div className="absolute right-4 top-4 w-24 h-24 sm:w-36 sm:h-36 opacity-30 pointer-events-none">
        <Image
          src="/media/Main Page/cta-machine.png"
          alt="Вендинг"
          fill
          className="object-contain"
          unoptimized
        />
      </div>
    </section>
  );
};
