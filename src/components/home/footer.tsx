"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[#00b4b6] text-white pt-0 pb-0 relative overflow-hidden font-sans select-none">
      {/* Container maintaining the exact 3841 / 1116 aspect ratio of footer-banner.png */}
      <div className="relative w-full aspect-[3841/1116] min-h-[220px] max-w-[100vw] overflow-hidden">
        {/* 1. 4K High Quality Vector Graphic Background Banner */}
        <Image
          src="/media/Main Page/footer-banner.png"
          alt="Пощичка Футър"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />

        {/* 2. Interactive Hotspots Overlay Layer */}
        {/* Brand Logo (Top-Left Area) */}
        <Link
          href="/"
          className="absolute left-[6%] top-[12%] w-[28%] h-[38%] rounded-2xl transition-all hover:bg-white/10 cursor-pointer"
          title="Начало - Пощичка"
          aria-label="Начало"
        />

        {/* Reserve CTA Button (Bottom-Left Area) */}
        <Link
          href="/booking"
          className="absolute left-[6%] top-[58%] w-[28%] h-[28%] rounded-full transition-all hover:bg-white/15 cursor-pointer"
          title="Запази дата / Резервация"
          aria-label="Запази дата"
        />

        {/* Quick Links Column (Center Area) */}
        {/* Услуги */}
        <Link
          href="/services"
          className="absolute left-[38%] top-[30%] w-[24%] h-[8%] rounded-lg transition-all hover:bg-white/10 cursor-pointer"
          title="Услуги"
          aria-label="Услуги"
        />
        {/* Галерия */}
        <Link
          href="/gallery"
          className="absolute left-[38%] top-[39%] w-[24%] h-[8%] rounded-lg transition-all hover:bg-white/10 cursor-pointer"
          title="Галерия"
          aria-label="Галерия"
        />
        {/* За нас */}
        <Link
          href="/about"
          className="absolute left-[38%] top-[48%] w-[24%] h-[8%] rounded-lg transition-all hover:bg-white/10 cursor-pointer"
          title="За нас"
          aria-label="За нас"
        />
        {/* Календар */}
        <Link
          href="/calendar"
          className="absolute left-[38%] top-[57%] w-[24%] h-[8%] rounded-lg transition-all hover:bg-white/10 cursor-pointer"
          title="Календар заетост"
          aria-label="Календар заетост"
        />
        {/* ЧЗВ */}
        <Link
          href="/faq"
          className="absolute left-[38%] top-[66%] w-[24%] h-[8%] rounded-lg transition-all hover:bg-white/10 cursor-pointer"
          title="Често Задавани Въпроси"
          aria-label="Често Задавани Въпроси"
        />
        {/* Контакти */}
        <Link
          href="/contact"
          className="absolute left-[38%] top-[75%] w-[24%] h-[8%] rounded-lg transition-all hover:bg-white/10 cursor-pointer"
          title="Контакти"
          aria-label="Контакти"
        />

        {/* Social Media Channels (Right Area) */}
        {/* Facebook Icon */}
        <a
          href="https://www.facebook.com/poshtichka"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[67%] top-[54%] w-[9%] h-[30%] rounded-full transition-all hover:bg-white/15 cursor-pointer"
          title="Facebook - Poshtichka"
          aria-label="Facebook"
        />
        {/* Instagram Icon */}
        <a
          href="https://www.instagram.com/poshtichka/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[77%] top-[54%] w-[9%] h-[30%] rounded-full transition-all hover:bg-white/15 cursor-pointer"
          title="Instagram - Poshtichka"
          aria-label="Instagram"
        />
      </div>
    </footer>
  );
};




