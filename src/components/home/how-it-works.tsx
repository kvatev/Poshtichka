"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "1. Гостите избират своя дизайн",
    image: "/media/Main Page/step-1.png",
  },
  {
    id: 2,
    title: "2. Машината печата картичката на място",
    image: "/media/Main Page/step-2.png",
  },
  {
    id: 3,
    title: "3. Всеки си тръгва с уникален спомен",
    image: "/media/Main Page/step-3.png",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 sm:py-28 bg-brand-cream border-b border-[#00b4b6]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-wide text-brand-dark">
            КАК РАБОТИ?
          </h2>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#00b4b6]/30 bg-white flex flex-col"
            >
              {/* Photo Image Container */}
              <div className="relative w-full h-64 sm:h-80 overflow-hidden bg-gray-100">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>

              {/* Bottom Teal Overlay Title */}
              <div className="bg-[#00b4b6] text-white p-5 text-center font-sans text-base sm:text-lg font-semibold tracking-wide border-t border-white/20">
                {step.title}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
