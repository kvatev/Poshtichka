"use client";

import React from "react";

export const TopBar = () => {
  return (
    <div className="bg-[#00b4b6] text-white py-2 px-4 text-center text-xs sm:text-sm font-sans tracking-wide font-medium overflow-hidden uppercase border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 sm:space-x-4">
        <span>✦ БЕЗПЛАТЕН ТРАНСПОРТ ДО 50 КМ ОТ БУРГАС</span>
        <span className="hidden md:inline">•</span>
        <span className="hidden md:inline">РЕЗЕРВИРАЙТЕ ВАШАТА ДАТА СЕГА</span>
        <span className="hidden lg:inline">•</span>
        <span className="hidden lg:inline">ИНТЕРАКТИВНО ПРЕЖИВЯВАНЕ ЗА ВАШЕТО СЪБИТИЕ ✦</span>
      </div>
    </div>
  );
};
