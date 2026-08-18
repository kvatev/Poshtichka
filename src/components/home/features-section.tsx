"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  {
    id: "marka",
    title: "МАРКА",
    alt: "Авторска пощенска марка с инициали и дата на сватбата",
    image: "/media/Main Page/feature-marka.webp",
  },
  {
    id: "kartichka",
    title: "КАРТИЧКА",
    alt: "Персонализирана сватбена картичка с благодарствено послание",
    image: "/media/Main Page/feature-kartichka.webp",
  },
  {
    id: "stiker",
    title: "СТИКЕР",
    alt: "Илюстрован дизайнерски стикер за гости",
    image: "/media/Main Page/feature-stiker.webp",
  },
  {
    id: "tatuirovka",
    title: "ТАТУИРОВКА",
    alt: "Временна сватбена татуировка с вода за забавление на тържеството",
    image: "/media/Main Page/feature-tatuirovka.webp",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="pt-8 sm:pt-12 pb-2 sm:pb-4 bg-brand-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="relative w-full aspect-square sm:aspect-[4/5] flex items-center justify-center p-1">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
