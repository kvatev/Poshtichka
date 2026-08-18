"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Начало" },
  { href: "/about", label: "За Пощичка" },
  { href: "/calendar", label: "Заетост" },
  { href: "/gallery", label: "Галерия" },
  { href: "/services", label: "Услуги" },
  { href: "/booking", label: "Резервирай сега", isCta: true },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#f9f6f0]/95 backdrop-blur-md border-b border-[#00b4b6]/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5 flex flex-col items-center justify-center space-y-3 lg:space-y-6">
        {/* Top Centered Logo */}
        <div className="w-full flex items-center justify-between lg:justify-center relative">
          <Link href="/" className="group flex justify-center mx-auto">
            <div className="relative w-44 sm:w-64 h-12 sm:h-16">
              <Image
                src="/media/logos/Logo.png"
                alt="Пощичка от драсканици - лого на бутикова ретро вендинг машина"
                fill
                draggable={false}
                className="object-contain object-center group-hover:scale-105 transition-transform duration-300 select-none pointer-events-none"
                priority
              />
            </div>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-2xl hover:bg-[#00b4b6]/10 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            aria-label="Превключи меню"
          >
            {mobileMenuOpen ? (
              <X className="w-8 h-8 text-[#00b4b6]" />
            ) : (
              <div className="relative w-8 sm:w-9 h-8 sm:h-9">
                <Image
                  src={encodeURI("/media/Main Page/Asset 96@2x.png")}
                  alt="Икона за отваряне на мобилно меню"
                  fill
                  draggable={false}
                  className="object-contain select-none pointer-events-none"
                  unoptimized
                  priority
                />
              </div>
            )}
          </button>
        </div>

        {/* Desktop Nav Links Centered Below Logo */}
        <nav className="hidden lg:flex items-center justify-center space-x-7 xl:space-x-10 pt-2 font-stampatello">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={true}
              className={`text-base sm:text-lg font-medium transition-colors relative py-1 ${
                link.isCta
                  ? "text-[#00b4b6] hover:text-[#008b8d] font-semibold"
                  : "text-[#182b2c] hover:text-[#00b4b6]"
              }`}
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
                  prefetch={true}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 border-b border-[#f9f6f0] transition-colors ${
                    link.isCta ? "text-[#00b4b6] font-semibold" : "text-[#182b2c] hover:text-[#00b4b6]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
