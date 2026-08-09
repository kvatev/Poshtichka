"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ChevronRight,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#00b4b6] text-white pt-10 pb-8 relative overflow-hidden font-sans border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* 1. High Quality Footer Vector Banner - Stretched Full Width */}
        <div className="w-full flex justify-center items-center">
          <Image
            src="/media/Main Page/footer-banner.png"
            alt="Пощичка Футър Банер"
            width={1200}
            height={340}
            className="w-full max-w-5xl h-auto object-contain drop-shadow-xl"
            priority
            unoptimized
          />
        </div>

        {/* 2. Interactive Functional Footer Navigation & Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-8 border-t border-white/20 text-white">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="relative w-44 h-12">
              <Image
                src="/media/logos/Logo.png"
                alt="Пощичка"
                fill
                className="object-contain object-left brightness-0 invert"
                priority
              />
            </div>
            <p className="text-xs text-white/90 leading-relaxed">
              Пощичка е бутикова машина за събития в България. Персонализирани картички, татуировки и спомени, създадени на живо за Вашите гости.
            </p>
            <div className="pt-2">
              <Link
                href="/booking"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white text-[#00b4b6] font-semibold text-xs uppercase tracking-wider hover:bg-brand-cream transition-all shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Запази дата</span>
              </Link>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white border-b border-white/20 pb-2">
              Навигация
            </h4>
            <ul className="space-y-2 text-xs text-white/90">
              {[
                { label: "Начало", href: "/" },
                { label: "За нас", href: "/about" },
                { label: "Услуги & Пакет", href: "/services" },
                { label: "Галерия със спомени", href: "/gallery" },
                { label: "Публичен Календар", href: "/calendar" },
                { label: "Често Задавани Въпроси", href: "/faq" },
                { label: "Контакти", href: "/contact" },
                { label: "Резервация за събитие", href: "/booking" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="hover:text-white/70 transition-colors flex items-center space-x-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-white/60" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white border-b border-white/20 pb-2">
              Контакти
            </h4>
            <ul className="space-y-3 text-xs text-white/90">
              <li className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-white flex-shrink-0" />
                <span>гр. Бургас, България (Обслужваме цялата страна)</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-white flex-shrink-0" />
                <a href="tel:+359888000000" className="hover:underline font-semibold">
                  +359 888 000 000
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-white flex-shrink-0" />
                <a href="mailto:hello@poshtichka.bg" className="hover:underline font-semibold">
                  hello@poshtichka.bg
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Channels */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white border-b border-white/20 pb-2">
              Последвайте Ни
            </h4>
            <p className="text-xs text-white/80">
              Следете най-новите събития, картички и моменти от Пощичка в социалните ни мрежи:
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com/poshtichka.bg"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#00b4b6] flex items-center justify-center transition-all border border-white/30"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/poshtichka.bg"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#00b4b6] flex items-center justify-center transition-all border border-white/30"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com/@poshtichka.bg"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#00b4b6] flex items-center justify-center transition-all border border-white/30 font-bold text-xs"
                aria-label="TikTok"
              >
                TT
              </a>
            </div>
          </div>
        </div>

        {/* 3. Bottom Legal & Copyright Bar */}
        <div className="w-full pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between text-xs text-white/80 space-y-3 sm:space-y-0">
          <p>© {new Date().getFullYear()} Пощичка. Всички права запазени.</p>
          <div className="flex items-center space-x-6 text-xs text-white/80">
            <Link href="/privacy" className="hover:underline">Политика за поверителност</Link>
            <Link href="/terms" className="hover:underline">Общи условия</Link>
            <Link href="/admin" className="hover:underline opacity-60 hover:opacity-100">Админ Панел</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};


