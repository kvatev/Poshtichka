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
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/40 flex items-center justify-center transition-transform hover:scale-110"
                title="Facebook - Poshtichka"
                aria-label="Facebook"
              >
                <Image
                  src="/media/Main Page/facebook.png"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="w-5 h-5 object-contain"
                />
              </a>

              <a
                href="https://www.instagram.com/poshtichka/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/40 flex items-center justify-center transition-transform hover:scale-110"
                title="Instagram - Poshtichka"
                aria-label="Instagram"
              >
                <Image
                  src="/media/Main Page/instagram.png"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="w-5 h-5 object-contain"
                />
              </a>
            </div>
          </div>

          {/* Column 3: Vending Booth Graphic */}
          <div className="flex flex-col items-center md:items-end justify-center">
            <Link href="/" className="group block">
              <Image
                src="/media/Main Page/poshtichka-booth-heart.png"
                alt="Пощичка машина"
                width={240}
                height={340}
                className="w-44 sm:w-56 h-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-white/20 pt-6 text-center text-xs sm:text-sm text-white/80 font-sans">
          <p>© {new Date().getFullYear()} Пощичка. Всички права запазени.</p>
        </div>
      </div>
    </footer>
  );
};
