"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const CheckDateCTA = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#00b4b6] text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col items-center">
        <Link href="/calendar" className="w-full block group cursor-pointer">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-[3.2/1] min-h-[200px] sm:min-h-[300px]"
          >
            <Image
              src="/media/Main Page/check-date-banner.png"
              alt="Чудите се дали датата ви е свободна? Проверете тук"
              fill
              className="object-contain group-hover:scale-[1.01] transition-transform duration-300"
              priority
              unoptimized
            />
          </motion.div>
        </Link>
      </div>
    </section>
  );
};

