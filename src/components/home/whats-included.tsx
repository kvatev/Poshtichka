"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const WhatsIncluded = () => {
  return (
    <section className="w-full bg-[#00b4b6] py-0 overflow-hidden leading-none">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full flex justify-center items-center"
      >
        <Image
          src="/media/Main Page/whats-included-banner.png"
          alt="Какво е включено в услугата?"
          width={3841}
          height={1092}
          className="w-full h-auto object-cover block"
          priority
          unoptimized
        />
      </motion.div>
    </section>
  );
};



