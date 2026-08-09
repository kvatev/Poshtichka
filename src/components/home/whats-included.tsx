"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const WhatsIncluded = () => {
  return (
    <section className="w-full py-8 sm:py-16 bg-[#00b4b6] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full flex items-center justify-center"
        >
          <Image
            src="/media/Main Page/whats-included-banner.png"
            alt="Какво е включено в услугата?"
            width={1200}
            height={340}
            className="w-full max-w-5xl h-auto object-contain drop-shadow-lg"
            priority
            unoptimized
          />
        </motion.div>
      </div>
    </section>
  );
};


