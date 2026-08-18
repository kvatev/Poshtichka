"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { href: "/services", label: "Услуги" },
  { href: "/gallery", label: "Галерия" },
  { href: "/about", label: "За нас" },
  { href: "/calendar", label: "Календар" },
  { href: "/faq", label: "ЧЗВ" },
  { href: "/contact", label: "Контакти" },
];

export const Footer = () => {
  return (
    <footer className="bg-[#00b4b6] text-white pt-16 pb-8 border-t border-white/20 font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Main 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-start">
          {/* Column 1: Quick Links */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="font-salongbeach text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white border-b border-white/30 pb-2 inline-block md:block">
              БЪРЗИ ВРЪЗКИ
            </h3>
            <ul className="space-y-2.5 pt-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-stampatello text-base sm:text-lg text-white/90 hover:text-white transition-colors duration-200 hover:underline inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: About Poshtichka & Socials */}
          <div className="space-y-5 text-center md:text-left">
            <h3 className="font-salongbeach text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white border-b border-white/30 pb-2 inline-block md:block">
              ЗА ПОЩИЧКА
            </h3>
            <p className="font-stampatello text-base sm:text-lg text-white/95 leading-relaxed font-light pt-2">
              Интерактивно преживяване на живо по време на Вашето събитие. Всеки гост си тръгва с персонализиран спомен, създаден с любов.
            </p>

            {/* Social Media Icons */}
            <div className="pt-2 flex items-center justify-center md:justify-start space-x-4">
              <a
                href="https://www.facebook.com/poshtichka"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 border border-white/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-sm"
                title="Facebook - Пощичка"
                aria-label="Facebook"
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <Image
                    src={encodeURI("/media/Main Page/Asset 98@2x.png")}
                    alt="Пощичка във Facebook"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </a>

              <a
                href="https://www.instagram.com/poshtichka/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 border border-white/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-sm"
                title="Instagram - Пощичка"
                aria-label="Instagram"
              >
                <div className="relative w-7 h-7 flex items-center justify-center">
                  <Image
                    src={encodeURI("/media/Main Page/Asset 97@2x.png")}
                    alt="Пощичка в Instagram"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </a>
            </div>
          </div>

          {/* Column 3: Vending Booth Graphic */}
          <div className="flex flex-col items-center md:items-end justify-center">
            <Link href="/" className="group block">
              <Image
                src="/media/Main Page/poshtichka-booth-heart.png"
                alt="Бутикова ретро вендинг машина Пощичка"
                width={240}
                height={340}
                className="w-44 sm:w-56 h-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-white/80 font-sans">
          <p>© {new Date().getFullYear()} Пощичка. Всички права запазени.</p>
          <div className="flex items-center space-x-3 text-xs sm:text-sm">
            <Link
              href="/privacy-policy"
              className="text-white/85 hover:text-white hover:underline transition-colors duration-200"
            >
              Политика за поверителност
            </Link>
            <span className="text-white/40">•</span>
            <Link
              href="/terms"
              className="text-white/85 hover:text-white hover:underline transition-colors duration-200"
            >
              Общи условия
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
