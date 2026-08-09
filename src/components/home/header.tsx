"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Начало" },
  { href: "/services", label: "Услуги" },
  { href: "/about", label: "За Пощичка" },
  { href: "/gallery", label: "Галерия" },
  { href: "/calendar", label: "Заетост" },
  { href: "/faq", label: "ЧЗВ" },
  { href: "/contact", label: "Контакти" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#f9f6f0]/95 backdrop-blur-md border-b border-[#00b4b6]/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-col items-center justify-center space-y-6 sm:space-y-8">
        {/* Top Centered Logo */}
        <div className="w-full flex items-center justify-between lg:justify-center relative">
          <Link href="/" className="group flex justify-center mx-auto">
            <div className="relative w-52 sm:w-64 h-14 sm:h-16">
              <Image
                src="/media/logos/Logo.png"
                alt="Пощичка от драсканици"
                fill
                className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
          </Link>

          {/* Mobile Menu Toggle Button (Absolute positioning for mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-white border border-[#00b4b6]/30 text-[#182b2c] hover:bg-[#00b4b6]/10 transition-colors"
            aria-label="Превключи меню"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#00b4b6]" /> : <Menu className="w-6 h-6 text-[#182b2c]" />}
          </button>
        </div>

        {/* Desktop Nav Links Centered Below Logo with Spacious Padding */}
        <nav className="hidden lg:flex items-center justify-center space-x-10 sm:space-x-14 pt-3 font-stampatello">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base sm:text-lg font-medium text-[#182b2c] hover:text-[#00b4b6] transition-colors relative py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-[#00b4b6]/20 px-6 py-6 space-y-4 shadow-xl font-stampatello"
          >
            <div className="flex flex-col space-y-3 text-lg font-medium text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-[#f9f6f0] text-[#182b2c] hover:text-[#00b4b6] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-[#00b4b6] text-white font-sans text-sm font-semibold uppercase tracking-wider hover:bg-[#008b8d] transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Резервирай събитие</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

