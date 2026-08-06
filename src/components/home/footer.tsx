"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Instagram, Facebook, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#00b4b6] text-white pt-16 pb-8 border-t border-white/20 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Logo Column */}
          <div className="md:col-span-4 space-y-4">
            {/* STRICT PATH: /media/logos/Logo.png */}
            <div className="relative w-44 h-14 bg-white/90 rounded-2xl p-2 shadow-md">
              <Image
                src="/media/logos/Logo.png"
                alt="Пощичка"
                fill
                className="object-contain p-1"
                unoptimized
              />
            </div>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light">
              Пощичка е бутикова вендинг машина, създаваща уникални персонализирани спомени на живо по време на Вашата сватба, корпоративно събитие или личен празник.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display text-lg font-bold uppercase tracking-wider text-white">
              БЪРЗИ ВРЪЗКИ
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/90">
              <li>
                <Link href="/" className="hover:underline hover:text-white/80 transition-colors">Начало</Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline hover:text-white/80 transition-colors">За нас</Link>
              </li>
              <li>
                <Link href="/services" className="hover:underline hover:text-white/80 transition-colors">Услуги</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:underline hover:text-white/80 transition-colors">Галерия</Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:underline hover:text-white/80 transition-colors">Календар</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline hover:text-white/80 transition-colors">Контакти</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display text-lg font-bold uppercase tracking-wider text-white">
              ЗА ПОЩИЧКА
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-white/90">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-white" />
                <span>Бургас & цяла България</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-white" />
                <a href="tel:+359888000000" className="hover:underline">+359 88 800 0000</a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-white" />
                <a href="mailto:hello@poshtichka.bg" className="hover:underline">hello@poshtichka.bg</a>
              </li>
            </ul>

            <div className="flex space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white hover:text-[#00b4b6] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white hover:text-[#00b4b6] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Vending Machine Illustration Right Column */}
          <div className="md:col-span-2 flex justify-center md:justify-end">
            <div className="relative w-28 h-36 opacity-90">
              <Image
                src="/media/Main Page/footer-machine.png"
                alt="Пощичка вендинг"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/20 text-center text-xs text-white/80 space-y-1">
          <p>© {new Date().getFullYear()} Пощичка. Всички права са запазени.</p>
          <div className="flex justify-center space-x-4 text-[11px] text-white/70 pt-1">
            <Link href="/privacy" className="hover:underline">Политика за поверителност</Link>
            <span>•</span>
            <Link href="/terms" className="hover:underline">Общи условия</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
