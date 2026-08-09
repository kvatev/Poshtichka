"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const WhatIsPoshtichka = () => {
  return (
    <section className="py-12 sm:py-20 bg-brand-cream relative overflow-hidden flex justify-center items-center">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full flex justify-center items-center"
        >
          <Image
            src="/media/Main Page/vending-machine-with-text.png"
            alt="Какво е Пощичка?"
            width={3701}
            height={2135}
            className="w-full max-w-6xl h-auto object-contain drop-shadow-md"
            priority
            unoptimized
          />
        </motion.div>
      </div>
    </section>
  );
};


