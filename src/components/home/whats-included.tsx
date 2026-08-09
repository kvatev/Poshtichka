"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const WhatsIncluded = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#00b4b6] text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full aspect-[2.7/1] min-h-[220px] sm:min-h-[320px]"
        >
          <Image
            src="/media/Main Page/whats-included-banner.png"
            alt="Какво е включено в услугата?"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </motion.div>
      </div>
    </section>
  );
};

