"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { defaultHomepageConfig } from "@/lib/content-store";

export const TopBar = () => {
  const [phrases, setPhrases] = useState<string[]>(
    defaultHomepageConfig.topBarPhrases || [
      "✦ БЕЗПЛАТЕН ТРАНСПОРТ ДО 50 КМ ОТ БУРГАС",
      "РЕЗЕРВИРАЙТЕ ВАШАТА ДАТА СЕГА",
      "ИНТЕРАКТИВНО ПРЕЖИВЯВАНЕ ЗА ВАШЕТО СЪБИТИЕ ✦",
    ]
  );
  const [speedSeconds, setSpeedSeconds] = useState<number>(
    defaultHomepageConfig.topBarSpeedSeconds || 15
  );

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.homepage?.topBarPhrases && Array.isArray(data.homepage.topBarPhrases)) {
          setPhrases(data.homepage.topBarPhrases);
        }
        if (data.homepage?.topBarSpeedSeconds) {
          setSpeedSeconds(Number(data.homepage.topBarSpeedSeconds));
        }
      })
      .catch(() => {});
  }, []);

  // Duplicate items 4x for continuous seamless loop
  const marqueeItems = [...phrases, ...phrases, ...phrases, ...phrases];

  return (
    <div className="bg-[#00b4b6] text-white py-2.5 px-4 text-xs sm:text-sm font-sans tracking-wider font-semibold overflow-hidden uppercase border-b border-white/10 select-none group">
      <div className="flex overflow-hidden whitespace-nowrap relative w-full">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: Math.max(3, speedSeconds),
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

