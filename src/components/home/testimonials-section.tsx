"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "МАРИЯ И ИВАН",
    role: "Сватбено събитие",
    text: "Страхотно изживяване! Гостите ни бяха абсолютно очаровани от картичките и жетоните. Незабравим спомен от нашата сватба!",
  },
  {
    id: 2,
    name: "DEVTECH TEAM",
    role: "Корпоративно парти",
    text: "Изключително професионално отношение. Пощичка беше главната атракция на нашия фирмен юбилей!",
  },
  {
    id: 3,
    name: "ЕМИЛИЯ И ИВАЙЛО",
    role: "Сватбено събитие",
    text: "Гостите ни не спряха да се снимат и да си печатат картички. Най-добрият подарък за нашия празничен ден!",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 sm:py-28 bg-brand-cream border-b border-[#00b4b6]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Title */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-wide text-brand-dark">
            ОТЗИВИ И ВПЕЧАТЛЕНИЯ
          </h2>
          <p className="font-sans text-sm sm:text-base text-brand-dark/70 font-light">
            Какво споделят младоженците и корпоративните ни клиенти за преживяването с Пощичка.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white rounded-3xl p-8 border border-[#00b4b6]/30 shadow-lg flex flex-col justify-between space-y-6 relative hover:shadow-xl transition-shadow"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex space-x-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                <p className="font-sans text-sm sm:text-base text-brand-dark/90 leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              {/* Bottom Author & Hand-Heart Graphic */}
              <div className="pt-4 border-t border-[#00b4b6]/15 flex items-end justify-between">
                <div>
                  <h4 className="font-display text-xl font-bold uppercase tracking-wider text-brand-dark">
                    {item.name}
                  </h4>
                  <span className="font-sans text-xs text-[#00b4b6] font-medium block">
                    {item.role}
                  </span>
                </div>

                {/* Hand Heart Doodle Graphic - Strict Path: /media/Main Page/heart-hands.png */}
                <div className="relative w-12 h-12">
                  <Image
                    src="/media/Main Page/heart-hands.png"
                    alt="Сърце от ръце"
                    fill
                    className="object-contain opacity-80"
                    unoptimized
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
