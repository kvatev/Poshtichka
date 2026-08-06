"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Начало" },
  { href: "/about", label: "За нас" },
  { href: "/services", label: "Услуги" },
  { href: "/gallery", label: "Галерия" },
  { href: "/calendar", label: "Календар" },
  { href: "/faq", label: "ЧЗВ" },
  { href: "/contact", label: "Контакти" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#f9f6f0]/95 backdrop-blur-md border-b border-[#00b4b6]/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo - STRICT PATH: /media/logos/Logo.png */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative w-36 sm:w-44 h-10 sm:h-12 flex items-center">
            <Image
              src="/media/logos/Logo.png"
              alt="Пощичка"
              fill
              className="object-contain object-left group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-sm font-medium text-brand-dark/80 hover:text-[#00b4b6] transition-colors relative py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link
            href="/booking"
            className="px-5 py-2.5 rounded-full bg-[#00b4b6] text-white font-sans text-xs font-semibold uppercase tracking-wider hover:bg-[#008b8d] transition-all shadow-sm hover:shadow-md flex items-center space-x-1.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Резервирай</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-white border border-[#00b4b6]/30 text-brand-dark hover:bg-[#00b4b6]/10 transition-colors"
          aria-label="Превключи меню"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#00b4b6]" /> : <Menu className="w-6 h-6 text-brand-dark" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-[#00b4b6]/20 px-6 py-6 space-y-4 shadow-xl"
          >
            <div className="flex flex-col space-y-3 font-sans text-base font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-brand-cream text-brand-dark hover:text-[#00b4b6] transition-colors"
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
