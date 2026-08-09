"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { defaultTestimonials, TestimonialItem } from "@/lib/content-store";

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(defaultTestimonials);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.testimonials && Array.isArray(data.testimonials) && data.testimonials.length > 0) {
          setTestimonials(data.testimonials);
        }
      })
      .catch(() => {});
  }, []);

  // Duplicate items 6x for seamless full-width infinite marquee scrolling
  const marqueeItems = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section className="py-16 sm:py-24 bg-brand-cream relative overflow-hidden w-full">
      {/* Section Heading (Centered) */}
      <div className="text-center space-y-3 max-w-3xl mx-auto px-4 mb-10">
        <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-wide text-[#00b4b6]">
          ОТЗИВИ И ВПЕЧАТЛЕНИЯ
        </h2>
      </div>

      {/* Auto-Scrolling Continuous Infinite Marquee Loop (Edge-to-Edge Full Screen Width) */}
      <div className="relative w-full max-w-[100vw] overflow-hidden select-none group py-4">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: Math.max(20, testimonials.length * 7),
          }}
          className="flex space-x-6 sm:space-x-8 shrink-0 group-hover:[animation-play-state:paused]"
        >
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[280px] sm:w-[340px] h-[350px] sm:h-[400px] shrink-0 bg-white rounded-[36px] border-2 border-[#2d3a37]/80 p-6 sm:p-8 flex flex-col justify-between items-center text-center shadow-lg transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Couple / Client Name */}
              <div className="w-full space-y-2 border-b border-[#00b4b6]/25 pb-3">
                <h3 className="font-stampatello text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#2d3a37] leading-tight">
                  {item.name}
                </h3>
              </div>

              {/* Review Quote */}
              <p className="font-stampatello text-sm sm:text-base text-[#2d3a37]/90 leading-relaxed italic my-auto px-2">
                "{item.quote}"
              </p>

              {/* Cyan Heart Icon (Matching mockup-layout.jpg) */}
              <div className="pt-2 flex justify-center items-center">
                <svg
                  className="w-10 h-10 text-[#00b4b6]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  <path d="M9 19c-1.5 1.5-3 1-3.5 0.5" />
                  <path d="M15 19c1.5 1.5 3 1 3.5 0.5" />
                </svg>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};




