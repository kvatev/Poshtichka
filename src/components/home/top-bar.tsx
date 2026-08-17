"use client";

import React from "react";
import { motion } from "framer-motion";

interface TopBarProps {
  phrases?: string[];
  speedSeconds?: number;
}

export const TopBar = ({
  phrases = [
    "БЕЗПЛАТЕН ТРАНСПОРТ ДО 50 КМ ОТ БУРГАС",
    "РЕЗЕРВИРАЙТЕ ВАШАТА ДАТА СЕГА",
    "ИНТЕРАКТИВНО ПРЕЖИВЯВАНЕ ЗА ВАШЕТО СЪБИТИЕ",
  ],
  speedSeconds = 35,
}: TopBarProps) => {
  const cleanPhrases = (phrases && phrases.length > 0 ? phrases : [
    "БЕЗПЛАТЕН ТРАНСПОРТ ДО 50 КМ ОТ БУРГАС",
    "РЕЗЕРВИРАЙТЕ ВАШАТА ДАТА СЕГА",
    "ИНТЕРАКТИВНО ПРЕЖИВЯВАНЕ ЗА ВАШЕТО СЪБИТИЕ",
  ]).map((p) => p.replace(/✦/g, "").trim());

  const marqueeItems = [...cleanPhrases, ...cleanPhrases, ...cleanPhrases, ...cleanPhrases];
  const duration = Math.max(70, Number(speedSeconds || 35) * 4);

  return (
    <div className="w-full max-w-[100vw] bg-[#00b4b6] text-white py-2.5 px-4 text-xs sm:text-sm font-sans tracking-wider font-semibold overflow-hidden uppercase border-b border-white/10 select-none group">
      <div className="flex overflow-hidden whitespace-nowrap relative w-full max-w-[100vw]">
        <motion.div
          key={`marquee-${duration}-${cleanPhrases.length}`}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: duration,
          }}
          className="inline-flex items-center space-x-8 shrink-0 pr-8"
        >
          {marqueeItems.map((phrase, idx) => (
            <div key={idx} className="inline-flex items-center space-x-8">
              <span>{phrase}</span>
              <span className="text-white/60">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
