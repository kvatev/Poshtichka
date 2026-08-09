"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  {
    id: "marka",
    title: "МАРКА",
    image: "/media/Main Page/feature-marka.png",
  },
  {
    id: "kartichka",
    title: "КАРТИЧКА",
    image: "/media/Main Page/feature-kartichka.png",
  },
  {
    id: "stiker",
    title: "СТИКЕР",
    image: "/media/Main Page/feature-stiker.png",
  },
  {
    id: "tatuirovka",
    title: "ТАТУИРОВКА",
    image: "/media/Main Page/feature-tatuirovka.png",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-brand-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="relative w-full aspect-square sm:aspect-[4/5] flex items-center justify-center p-2">
                <Image
                  src={feature.image}
                  alt={feature.title}
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

