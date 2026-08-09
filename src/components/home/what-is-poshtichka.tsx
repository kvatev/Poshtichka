"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const WhatIsPoshtichka = () => {
  return (
    <section className="py-16 sm:py-24 bg-brand-cream border-b border-[#00b4b6]/20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-4xl aspect-[16/10] sm:aspect-[16/9]"
        >
          <Image
            src="/media/Main Page/vending-machine-with-text.png"
            alt="Какво е Пощичка?"
            fill
            className="object-contain drop-shadow-md"
            priority
            unoptimized
          />
        </motion.div>
      </div>
    </section>
  );
};

