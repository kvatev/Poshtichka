"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonialItems = [
  {
    id: "1",
    name: "НИКОЛ и ДАНИЕЛ",
    image: "/media/Main Page/testimonial-nikol-daniel.png",
  },
  {
    id: "2",
    name: "МАЯ и НИКО",
    image: "/media/Main Page/testimonial-maya-niko.png",
  },
  {
    id: "3",
    name: "РАЛИЦА и ЖЕЛЬО",
    image: "/media/Main Page/testimonial-ralica-zhelyo.png",
  },
  {
    id: "4",
    name: "КРИСИ и ВИКТОР",
    image: "/media/Main Page/testimonial-krisi-viktor.png",
  },
  {
    id: "5",
    name: "МАРИНА и ИВАН",
    image: "/media/Main Page/testimonial-marina-ivan.png",
  },
];

export const TestimonialsSection = () => {
  // Duplicate items 6x for seamless full-width infinite marquee scrolling
  const marqueeItems = [
    ...testimonialItems,
    ...testimonialItems,
    ...testimonialItems,
    ...testimonialItems,
    ...testimonialItems,
    ...testimonialItems,
  ];

  return (
    <section className="py-16 sm:py-24 bg-brand-cream relative overflow-hidden w-full select-none">
      {/* Section Heading (Centered) */}
      <div className="text-center space-y-3 max-w-3xl mx-auto px-4 mb-10">
        <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-wide text-[#00b4b6]">
          ОТЗИВИ И ВПЕЧАТЛЕНИЯ
        </h2>
      </div>

      {/* Auto-Scrolling Continuous Infinite Marquee Loop */}
      <div className="relative w-full max-w-[100vw] overflow-hidden select-none group py-4">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: Math.max(20, testimonialItems.length * 7),
          }}
          className="flex space-x-6 sm:space-x-8 shrink-0 group-hover:[animation-play-state:paused]"
        >
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[280px] sm:w-[340px] md:w-[380px] shrink-0 relative flex items-center justify-center transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={400}
                height={500}
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
