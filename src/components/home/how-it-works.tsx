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
    <section className="pt-10 sm:pt-14 pb-3 sm:pb-5 bg-brand-cream relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8 sm:space-y-10">
        {/* Section Heading */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="font-salongbeach text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-[#00b4b6] text-center leading-tight">
            КАК РАБОТИ?
          </h2>
        </div>

        {/* 3 Step Cards - 100% Identical Uniform Sizing Without Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 items-start justify-items-center w-full">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative w-full flex flex-col justify-center items-center"
            >
              {/* Natural Uniform Image Container */}
              <div className="relative w-full flex items-center justify-center">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={1112}
                  height={1426}
                  className="w-full h-auto object-contain select-none"
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
