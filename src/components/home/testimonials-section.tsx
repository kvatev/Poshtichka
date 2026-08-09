"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonialImages = [
  { id: "nikol-daniel", name: "Никол и Даниел", image: "/media/Main Page/testimonial-nikol-daniel.png" },
  { id: "maya-niko", name: "Мая и Нико", image: "/media/Main Page/testimonial-maya-niko.png" },
  { id: "ralica-zhelyo", name: "Ралица и Жельо", image: "/media/Main Page/testimonial-ralica-zhelyo.png" },
  { id: "krisi-viktor", name: "Криси и Виктор", image: "/media/Main Page/testimonial-krisi-viktor.png" },
  { id: "marina-ivan", name: "Марина и Иван", image: "/media/Main Page/testimonial-marina-ivan.png" },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-brand-cream border-b border-[#00b4b6]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-wide text-[#00b4b6]">
            ОТЗИВИ И ВПЕЧАТЛЕНИЯ
          </h2>
        </div>

        {/* 5 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {testimonialImages.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex justify-center group"
            >
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                <Image
                  src={item.image}
                  alt={item.name}
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

