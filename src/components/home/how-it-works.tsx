"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "1. Гостите взимат жетон",
    image: "/media/Main Page/step-1.png",
  },
  {
    id: 2,
    title: "2. Поставят го и завъртат ръчката",
    image: "/media/Main Page/step-2.png",
  },
  {
    id: 3,
    title: "3. Отварят картончето и получават подаръка си",
    image: "/media/Main Page/step-3.png",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-16 sm:py-24 bg-brand-cream border-b border-[#00b4b6]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-wide text-[#00b4b6]">
            КАК РАБОТИ?
          </h2>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative rounded-[32px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#00b4b6]/20 bg-white flex flex-col justify-center items-center p-2"
            >
              <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
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


