"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Начало" },
  { href: "/about", label: "За нас" },
  { href: "/services", label: "Услуги" },
  { href: "/gallery", label: "Галерия" },
  { href: "/calendar", label: "Календар" },
  { href: "/faq", label: "ЧЗВ" },
  { href: "/contact", label: "Контакти" },
];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="w-full py-3 sm:py-3.5 px-4 sm:px-8 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-10 h-10 rounded-full bg-brand-primary/30 flex items-center justify-center border border-brand-primary/40 group-hover:scale-105 transition-transform shadow-xs">
            <Sparkles className="w-5 h-5 text-brand-accent" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-brand-dark leading-none">
              Пощичка
            </span>
            <span className="text-[10px] tracking-widest uppercase text-brand-accent font-sans mt-0.5">
              Interactive Memory Lab
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-sans text-sm tracking-wide transition-colors relative py-1",
                  isActive
                    ? "text-brand-accent font-bold"
                    : "text-brand-dark/80 hover:text-brand-dark font-medium"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center space-x-3">
          <Link href="/calendar">
            <Button
              variant="outline"
              size="sm"
              className="hidden xl:flex items-center space-x-1.5 border-brand-accent/40 text-brand-dark hover:bg-brand-secondary"
            >
              <Calendar className="w-4 h-4 text-brand-accent" />
              <span>Заетост</span>
            </Button>
          </Link>
          <Link href="/booking">
            <Button variant="primary" size="md" className="shadow-sm">
              Резервирай събитие
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-full bg-brand-secondary text-brand-dark focus:outline-none hover:bg-brand-primary/40 transition-colors"
          aria-label="Превключи меню"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-3 rounded-2xl p-5 shadow-xl border border-brand-primary/30 bg-white"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "font-sans text-base py-2 border-b border-brand-secondary/60 text-brand-dark flex items-center justify-between",
                    pathname === link.href && "text-brand-accent font-bold"
                  )}
                >
                  <span>{link.label}</span>
                  {link.href === "/calendar" && (
                    <span className="text-xs bg-brand-secondary px-2.5 py-0.5 rounded-full text-brand-accent font-semibold">
                      Заетост
                    </span>
                  )}
                </Link>
              ))}
              <div className="pt-3 space-y-2">
                <Link href="/booking" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">
                    Резервирай събитие
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
