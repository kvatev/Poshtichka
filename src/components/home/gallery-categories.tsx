"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    id: "wedding",
    title: "СВАТБА",
    image: "/media/Main Page/category-wedding.png",
  },
  {
    id: "baptism",
    title: "КРЪЩЕНЕ",
    image: "/media/Main Page/category-baptism.png",
  },
  {
    id: "corporate",
    title: "ФИРМЕНО ПАРТИ",
    image: "/media/Main Page/category-corporate.png",
  },
];

export const GalleryCategories = () => {
  return (
    <section className="py-16 sm:py-24 bg-brand-cream border-b border-[#00b4b6]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
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
                className="group block w-full relative rounded-[32px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white p-2 border border-[#00b4b6]/20"
              >
                <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
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


