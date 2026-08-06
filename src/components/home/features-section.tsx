"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  {
    id: "marka",
    title: "МАРКА",
    image: "/media/Main Page/feature-marka.png",
    arrow: "/media/Main Page/arrow-1.png",
  },
  {
    id: "kartichka",
    title: "КАРТИЧКА",
    image: "/media/Main Page/feature-kartichka.png",
    arrow: "/media/Main Page/arrow-2.png",
  },
  {
    id: "stiker",
    title: "СТИКЕР",
    image: "/media/Main Page/feature-stiker.png",
    arrow: "/media/Main Page/arrow-3.png",
  },
  {
    id: "tatuirovka",
    title: "ТАТУИРОВКА",
    image: "/media/Main Page/feature-tatuirovka.png",
    arrow: "/media/Main Page/arrow-4.png",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-brand-cream border-b border-[#00b4b6]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              {/* Title with font-display */}
              <div className="relative mb-3">
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-brand-dark group-hover:text-[#00b4b6] transition-colors">
                  {feature.title}
                </h3>
              </div>

              {/* Hand Drawn Arrow Illustration */}
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 mb-3 opacity-80">
                <Image
                  src={feature.arrow}
                  alt="стрелка"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>

              {/* Product Photo Illustration */}
              <div className="relative w-full h-40 sm:h-48 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow bg-white p-2 border border-[#00b4b6]/20">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
