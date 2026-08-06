"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    id: "wedding",
    title: "СВАТБА",
    subtitle: "Романтика & Незабравими спомени",
    image: "/media/Main Page/category-wedding.png",
  },
  {
    id: "baptism",
    title: "КРЪЩЕНЕ",
    subtitle: "Свето Кръщение & Семейни празници",
    image: "/media/Main Page/category-baptism.png",
  },
  {
    id: "corporate",
    title: "ФИРМЕНО ПАРТИ",
    subtitle: "Корпоративен брандинг & Събития",
    image: "/media/Main Page/category-corporate.png",
  },
];

export const GalleryCategories = () => {
  return (
    <section className="py-20 sm:py-28 bg-brand-cream border-b border-[#00b4b6]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <Link href="/gallery" className="group block relative rounded-3xl overflow-hidden shadow-lg border border-[#00b4b6]/30 bg-white">
                <div className="relative w-full h-80 sm:h-96">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
                </div>

                <div className="p-6 bg-white text-center border-t border-[#00b4b6]/20 space-y-1">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-wider text-brand-dark group-hover:text-[#00b4b6] transition-colors">
                    {category.title}
                  </h3>
                  <p className="font-sans text-xs text-brand-dark/70 font-light">
                    {category.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
