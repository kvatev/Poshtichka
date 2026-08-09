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

        {/* 2. Invisible Hotspot Overlay Layer (No translucent boxes, pure clickable targets) */}
        
        {/* Quick Links Column (Left Area - Under "БЪРЗИ ВРЪЗКИ") */}
        {/* Услуги */}
        <Link
          href="/services"
          className="absolute left-[6%] top-[25%] w-[18%] h-[8%] cursor-pointer transition-opacity hover:opacity-75"
          title="Услуги"
          aria-label="Услуги"
        />
        {/* Галерия */}
        <Link
          href="/gallery"
          className="absolute left-[6%] top-[34%] w-[18%] h-[8%] cursor-pointer transition-opacity hover:opacity-75"
          title="Галерия"
          aria-label="Галерия"
        />
        {/* За нас */}
        <Link
          href="/about"
          className="absolute left-[6%] top-[43%] w-[18%] h-[8%] cursor-pointer transition-opacity hover:opacity-75"
          title="За нас"
          aria-label="За нас"
        />
        {/* Календар */}
        <Link
          href="/calendar"
          className="absolute left-[6%] top-[52%] w-[18%] h-[8%] cursor-pointer transition-opacity hover:opacity-75"
          title="Календар заетост"
          aria-label="Календар заетост"
        />
        {/* ЧЗВ */}
        <Link
          href="/faq"
          className="absolute left-[6%] top-[61%] w-[18%] h-[8%] cursor-pointer transition-opacity hover:opacity-75"
          title="Често Задавани Въпроси"
          aria-label="Често Задавани Въпроси"
        />
        {/* Контакти */}
        <Link
          href="/contact"
          className="absolute left-[6%] top-[70%] w-[18%] h-[8%] cursor-pointer transition-opacity hover:opacity-75"
          title="Контакти"
          aria-label="Контакти"
        />

        {/* Social Media Channels (Center Area - Under "ЗА ПОЩИЧКА") */}
        {/* Facebook Icon */}
        <a
          href="https://www.facebook.com/poshtichka"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[46%] top-[69%] w-[3.2%] h-[8%] cursor-pointer transition-opacity hover:opacity-75"
          title="Facebook - Poshtichka"
          aria-label="Facebook"
        />
        {/* Instagram Icon */}
        <a
          href="https://www.instagram.com/poshtichka/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[49.5%] top-[69%] w-[3.5%] h-[8%] cursor-pointer transition-opacity hover:opacity-75"
          title="Instagram - Poshtichka"
          aria-label="Instagram"
        />

        {/* Vending Machine Graphic / Home Link (Right Area) */}
        <Link
          href="/"
          className="absolute left-[75%] top-[10%] w-[20%] h-[80%] cursor-pointer transition-opacity hover:opacity-90"
          title="Начало - Пощичка"
          aria-label="Начало"
        />
      </div>
    </footer>
  );
};






