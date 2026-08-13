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
    <section className="py-16 sm:py-24 bg-brand-cream relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-wide text-[#00b4b6]">
            КАК РАБОТИ?
          </h2>
        </div>

        {/* 3 Step Cards - 100% Identical Edge-to-Edge Dimensions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 items-stretch justify-items-center w-full">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative w-full h-full flex flex-col justify-center items-center"
            >
              {/* Edge-to-Edge Image Container */}
              <div className="relative w-full h-[420px] sm:h-[480px] md:h-[500px] lg:h-[560px] aspect-[4/5] overflow-hidden rounded-3xl p-0 m-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 p-0 m-0 border-0"
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
