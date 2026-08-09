"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[#00b4b6] text-white pt-0 pb-0 relative overflow-hidden font-sans select-none border-t border-white/20">
      {/* Container maintaining the exact 3841 / 1116 aspect ratio of footer-banner.png */}
      <div className="relative w-full aspect-[3841/1116] min-h-[220px] max-w-[100vw] overflow-hidden">
        {/* 1. 4K High Quality Vector Graphic Background Banner */}
        <Image
          src="/media/Main Page/footer-banner.png"
          alt="Пощичка Футър"
          fill
          className="object-contain object-center"
          priority
          unoptimized
        />

        {/* 2. Interactive Hotspots Overlay Layer with Visual Feedback */}
        {/* Brand Logo (Top-Left Area) */}
        <Link
          href="/"
          className="absolute left-[5%] top-[10%] w-[30%] h-[40%] rounded-2xl transition-all hover:bg-white/10 hover:ring-2 hover:ring-white/30 cursor-pointer"
          title="Начало - Пощичка"
          aria-label="Начало"
        />

        {/* Reserve CTA Button (Bottom-Left Area) */}
        <Link
          href="/booking"
          className="absolute left-[5%] top-[55%] w-[30%] h-[32%] rounded-full transition-all hover:bg-white/15 hover:ring-2 hover:ring-white/50 cursor-pointer"
          title="Запази дата / Резервация"
          aria-label="Запази дата"
        />

        {/* Quick Links Column (Center Area) */}
        {/* Услуги */}
        <Link
          href="/services"
          className="absolute left-[40%] top-[30%] w-[20%] h-[8%] rounded-xl transition-all hover:bg-white/15 hover:ring-1 hover:ring-white/40 cursor-pointer flex items-center justify-center"
          title="Услуги"
          aria-label="Услуги"
        />
        {/* Галерия */}
        <Link
          href="/gallery"
          className="absolute left-[40%] top-[39%] w-[20%] h-[8%] rounded-xl transition-all hover:bg-white/15 hover:ring-1 hover:ring-white/40 cursor-pointer flex items-center justify-center"
          title="Галерия"
          aria-label="Галерия"
        />
        {/* За нас */}
        <Link
          href="/about"
          className="absolute left-[40%] top-[48%] w-[20%] h-[8%] rounded-xl transition-all hover:bg-white/15 hover:ring-1 hover:ring-white/40 cursor-pointer flex items-center justify-center"
          title="За нас"
          aria-label="За нас"
        />
        {/* Календар */}
        <Link
          href="/calendar"
          className="absolute left-[40%] top-[57%] w-[20%] h-[8%] rounded-xl transition-all hover:bg-white/15 hover:ring-1 hover:ring-white/40 cursor-pointer flex items-center justify-center"
          title="Календар заетост"
          aria-label="Календар заетост"
        />
        {/* ЧЗВ */}
        <Link
          href="/faq"
          className="absolute left-[40%] top-[66%] w-[20%] h-[8%] rounded-xl transition-all hover:bg-white/15 hover:ring-1 hover:ring-white/40 cursor-pointer flex items-center justify-center"
          title="Често Задавани Въпроси"
          aria-label="Често Задавани Въпроси"
        />
        {/* Контакти */}
        <Link
          href="/contact"
          className="absolute left-[40%] top-[75%] w-[20%] h-[8%] rounded-xl transition-all hover:bg-white/15 hover:ring-1 hover:ring-white/40 cursor-pointer flex items-center justify-center"
          title="Контакти"
          aria-label="Контакти"
        />

        {/* Social Media Channels (Right Area) */}
        {/* Facebook Icon */}
        <a
          href="https://www.facebook.com/poshtichka"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[68%] top-[52%] w-[8%] h-[34%] rounded-full transition-all hover:bg-white/20 hover:ring-2 hover:ring-white/50 cursor-pointer"
          title="Facebook - Poshtichka"
          aria-label="Facebook"
        />
        {/* Instagram Icon */}
        <a
          href="https://www.instagram.com/poshtichka/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[77%] top-[52%] w-[8%] h-[34%] rounded-full transition-all hover:bg-white/20 hover:ring-2 hover:ring-white/50 cursor-pointer"
          title="Instagram - Poshtichka"
          aria-label="Instagram"
        />
      </div>
    </footer>
  );
};





