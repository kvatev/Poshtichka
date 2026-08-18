"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    id: "wedding",
    title: "СВАТБА",
    alt: "Вендинг машина Пощичка за сватби и сватбени тържества",
    image: "/media/Main Page/category-wedding.webp",
  },
  {
    id: "baptism",
    title: "КРЪЩЕНЕ",
    alt: "Интерактивна машина Пощичка за кръщенета и рождени дни",
    image: "/media/Main Page/category-baptism.webp",
  },
  {
    id: "corporate",
    title: "ФИРМЕНО ПАРТИ",
    alt: "Вендинг машина за корпоративни събития, тиймбилдинги и бранд партита",
    image: "/media/Main Page/category-corporate.webp",
  },
];

export const GalleryCategories = () => {
  return (
    <section className="py-16 sm:py-24 bg-brand-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* 3 Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center">
          {categories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex justify-center items-center"
            >
              <Link
                href="/gallery"
                aria-label={`Разгледай галерия за ${category.title}`}
                className="group block w-full relative flex justify-center items-center cursor-pointer"
              >
                <div className="relative w-full aspect-[4/5] flex justify-center items-center">
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    draggable={false}
                    className="object-contain group-hover:scale-105 transition-transform duration-500 select-none pointer-events-none"
                    unoptimized
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
