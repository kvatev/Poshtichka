"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Начало" },
  { href: "/about", label: "За нас" },
  { href: "/services", label: "Услуги" },
  { href: "/gallery", label: "Галерия" },
  { href: "/faq", label: "ЧЗВ" },
  { href: "/contact", label: "Контакти" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-4 sm:px-8",
        scrolled
          ? "glass-panel py-3 shadow-sm border-b border-brand-primary/20"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 rounded-full bg-brand-primary/30 flex items-center justify-center border border-brand-primary/40 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-brand-accent" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-brand-dark">
              Пощичка
            </span>
            <span className="text-[10px] tracking-widest uppercase text-brand-accent font-sans">
              Interactive Memory Lab
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-sans text-sm tracking-wide transition-colors relative py-1",
                  isActive
                    ? "text-brand-accent font-semibold"
                    : "text-brand-dark/80 hover:text-brand-dark"
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
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/booking">
            <Button variant="primary" size="md">
              Резервирай събитие
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-full bg-brand-secondary text-brand-dark focus:outline-none"
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
            className="md:hidden glass-panel mt-4 rounded-2xl p-6 shadow-xl border border-brand-primary/30"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "font-sans text-base py-2 border-b border-brand-secondary/60 text-brand-dark",
                    pathname === link.href && "text-brand-accent font-bold"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
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
    </header>
  );
};
