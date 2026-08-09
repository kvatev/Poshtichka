"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const CheckDateCTA = () => {
  return (
    <section className="w-full bg-[#00b4b6] py-0 overflow-hidden leading-none">
      <Link href="/calendar" className="w-full block group cursor-pointer">
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full flex justify-center items-center"
        >
          <Image
            src="/media/Main Page/check-date-banner.png"
            alt="Чудите се дали датата ви е свободна? Проверете тук"
            width={3841}
            height={867}
            className="w-full h-auto object-cover block group-hover:scale-[1.005] transition-transform duration-300"
            priority
            unoptimized
          />
        </motion.div>
      </Link>
    </section>
  );
};



