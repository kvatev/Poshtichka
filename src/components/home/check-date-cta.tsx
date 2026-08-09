"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const CheckDateCTA = () => {
  return (
    <section className="w-full py-8 sm:py-16 bg-[#00b4b6] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 flex flex-col items-center justify-center">
        <Link href="/calendar" className="w-full flex items-center justify-center group cursor-pointer">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full flex items-center justify-center"
          >
            <Image
              src="/media/Main Page/check-date-banner.png"
              alt="Чудите се дали датата ви е свободна? Проверете тук"
              width={1200}
              height={300}
              className="w-full max-w-5xl h-auto object-contain group-hover:scale-[1.02] transition-transform duration-300 drop-shadow-lg"
              priority
              unoptimized
            />
          </motion.div>
        </Link>
      </div>
    </section>
  );
};


