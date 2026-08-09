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

  // Duplicate items 4x for smooth infinite marquee scrolling
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-16 sm:py-24 bg-brand-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-wide text-[#00b4b6]">
            ОТЗИВИ И ВПЕЧАТЛЕНИЯ
          </h2>
        </div>

        {/* Auto-Scrolling Continuous Infinite Marquee Loop */}
        <div className="relative w-full overflow-hidden select-none group py-4">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: Math.max(15, testimonials.length * 6),
            }}
            className="flex space-x-6 sm:space-x-8 shrink-0 group-hover:[animation-play-state:paused]"
          >
            {marqueeItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="w-[290px] sm:w-[360px] h-[340px] sm:h-[400px] shrink-0 bg-white rounded-[36px] border-2 border-[#2d3a37]/80 p-6 sm:p-8 flex flex-col justify-between items-center text-center shadow-lg transition-transform duration-300 hover:scale-[1.02]"
              >
                {/* Couple / Client Name */}
                <h3 className="font-stampatello text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#2d3a37] border-b border-[#00b4b6]/20 pb-3 w-full">
                  {item.name}
                </h3>

                {/* Review Quote */}
                <p className="font-stampatello text-sm sm:text-base text-[#2d3a37]/90 leading-relaxed italic my-auto px-2">
                  "{item.quote}"
                </p>

                {/* Hands Heart Cyan Vector Icon */}
                <div className="pt-3 flex justify-center items-center">
                  <svg
                    className="w-16 h-12 text-[#00b4b6]"
                    viewBox="0 0 100 65"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22,38 C18,30 20,20 30,16 C38,13 46,20 50,26 C54,20 62,13 70,16 C80,20 82,30 78,38 C72,50 56,60 50,62 C44,60 28,50 22,38 Z" />
                    <path d="M12,42 C8,35 12,28 20,28" strokeDasharray="3 3" />
                    <path d="M88,42 C92,35 88,28 80,28" strokeDasharray="3 3" />
                  </svg>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};



