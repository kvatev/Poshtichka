"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { defaultHomepageConfig } from "@/lib/content-store";

export const TopBar = () => {
  const [phrases, setPhrases] = useState<string[]>(
    (defaultHomepageConfig.topBarPhrases || [
      "БЕЗПЛАТЕН ТРАНСПОРТ ДО 50 КМ ОТ БУРГАС",
      "РЕЗЕРВИРАЙТЕ ВАШАТА ДАТА СЕГА",
      "ИНТЕРАКТИВНО ПРЕЖИВЯВАНЕ ЗА ВАШЕТО СЪБИТИЕ",
    ]).map((p) => p.replace(/✦/g, "").trim())
  );
  const [speedSeconds, setSpeedSeconds] = useState<number>(70);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("poshtichka_content_homepage_config");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.topBarPhrases && Array.isArray(parsed.topBarPhrases) && parsed.topBarPhrases.length > 0) {
          setPhrases(parsed.topBarPhrases.map((p: string) => p.replace(/✦/g, "").trim()));
        }
        if (typeof parsed.topBarSpeedSeconds === "number" && parsed.topBarSpeedSeconds > 0) {
          setSpeedSeconds(parsed.topBarSpeedSeconds * 4);
        }
      }
    } catch {}

    fetch("/api/content")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        if (data.homepage?.topBarPhrases && Array.isArray(data.homepage.topBarPhrases) && data.homepage.topBarPhrases.length > 0) {
          setPhrases(data.homepage.topBarPhrases.map((p: string) => p.replace(/✦/g, "").trim()));
        }
        if (data.homepage?.topBarSpeedSeconds && Number(data.homepage.topBarSpeedSeconds) > 0) {
          setSpeedSeconds(Number(data.homepage.topBarSpeedSeconds) * 4);
        }
      })
      .catch(() => {});
  }, []);

  const marqueeItems = [...phrases, ...phrases, ...phrases, ...phrases];

  return (
    <div className="w-full max-w-[100vw] bg-[#00b4b6] text-white py-2.5 px-4 text-xs sm:text-sm font-sans tracking-wider font-semibold overflow-hidden uppercase border-b border-white/10 select-none group">
      <div className="flex overflow-hidden whitespace-nowrap relative w-full max-w-[100vw]">
        <motion.div
          key={`marquee-${speedSeconds}-${phrases.length}`}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: Math.max(70, speedSeconds),
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
