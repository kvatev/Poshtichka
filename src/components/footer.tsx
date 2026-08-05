"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Instagram, Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-12 border-t border-brand-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-full bg-brand-accent/20 flex items-center justify-center border border-brand-accent/40">
              <Sparkles className="w-5 h-5 text-brand-primary" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-white">
              Пощичка
            </span>
          </div>
          <p className="text-sm font-sans text-white/70 leading-relaxed">
            Интерактивно преживяване на живо по време на Вашето събитие. Всеки гост си тръгва с персонализиран спомен.
          </p>
          <p className="text-xs text-brand-primary font-sans">
            Бургас, България (Обслужваме цялата страна)
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h3 className="font-serif text-lg font-semibold text-brand-primary">
            Навигация
          </h3>
          <ul className="space-y-2 text-sm font-sans text-white/70">
            <li>
              <Link href="/about" className="hover:text-brand-primary transition-colors">
                За нас & Философия
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-brand-primary transition-colors">
                Услуги & Събития
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-brand-primary transition-colors">
                Галерия със спомени
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-brand-primary transition-colors">
                Често задавани въпроси
              </Link>
            </li>
          </ul>
        </div>

        {/* Services Links */}
        <div className="space-y-3">
          <h3 className="font-serif text-lg font-semibold text-brand-primary">
            Видове събития
          </h3>
          <ul className="space-y-2 text-sm font-sans text-white/70">
            <li>Сватбени тържества</li>
            <li>Корпоративни партита & Брандинг</li>
            <li>Рождени дни & Юбилеи</li>
            <li>Бейби шауър & Кръщенета</li>
            <li>Фестивали & Маркетинг активации</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-semibold text-brand-primary">
            Контакти & Резервации
          </h3>
          <ul className="space-y-3 text-sm font-sans text-white/80">
            <li className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-brand-primary flex-shrink-0" />
              <span>гр. Бургас, България</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-brand-primary flex-shrink-0" />
              <a href="tel:+359888000000" className="hover:text-brand-primary transition-colors">
                +359 888 000 000
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-brand-primary flex-shrink-0" />
              <a href="mailto:hello@poshtichka.bg" className="hover:text-brand-primary transition-colors">
                hello@poshtichka.bg
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <Instagram className="w-4 h-4 text-brand-primary flex-shrink-0" />
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-primary transition-colors"
              >
                @poshtichka.bg
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 font-sans space-y-4 sm:space-y-0">
        <p>© {new Date().getFullYear()} Пощичка. Всички права запазени.</p>
        <div className="flex space-x-6">
          <Link href="/privacy" className="hover:text-brand-primary transition-colors">
            Политика за поверителност
          </Link>
          <Link href="/terms" className="hover:text-brand-primary transition-colors">
            Общи условия
          </Link>
        </div>
      </div>
    </footer>
  );
};
