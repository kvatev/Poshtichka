"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[#00b4b6] text-white pt-10 pb-6 relative overflow-hidden font-sans border-t border-white/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col items-center">
        {/* Footer Banner Vector Graphic */}
        <div className="relative w-full aspect-[3/1] min-h-[220px] sm:min-h-[300px]">
          <Image
            src="/media/Main Page/footer-banner.png"
            alt="Пощичка Футър"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>

        {/* Footer Links & Copyright */}
        <div className="w-full pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between text-xs text-white/80 space-y-3 sm:space-y-0">
          <p>© {new Date().getFullYear()} Пощичка. Всички права запазени.</p>
          <div className="flex space-x-6 text-xs text-white/80">
            <Link href="/privacy" className="hover:underline">Политика за поверителност</Link>
            <Link href="/terms" className="hover:underline">Общи условия</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

