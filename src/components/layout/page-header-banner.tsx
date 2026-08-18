"use client";

import React from "react";
import Image from "next/image";

interface PageHeaderBannerProps {
  title: string;
  subtitle?: string;
  extraText?: string;
  children?: React.ReactNode;
  showCurlyArrow?: boolean;
}

export const PageHeaderBanner = ({
  title,
  subtitle,
  extraText,
  children,
  showCurlyArrow = false,
}: PageHeaderBannerProps) => {
  return (
    <section className="relative w-full overflow-hidden flex items-center justify-center py-14 sm:py-18 md:py-20 px-4 sm:px-8 text-center border-b border-black/10 select-none">
      {/* Universal Background Image: Asset 88@2x.png */}
      <Image
        src={encodeURI("/media/Услуги/Asset 88@2x.png")}
        alt={`Пощичка – ${title}`}
        fill
        priority
        className="object-cover object-center pointer-events-none"
        unoptimized
      />

      {/* Banner Content */}
      <div className="relative z-10 space-y-3 sm:space-y-4 max-w-4xl mx-auto px-2">
        <h1 className="font-salongbeach text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider text-white leading-tight drop-shadow-sm">
          {title}
        </h1>

        {subtitle && (
          <p className="font-stampatello text-sm sm:text-base md:text-lg lg:text-xl text-[#182b2c] font-normal max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        {extraText && (
          <p className="font-sans text-xs sm:text-sm text-[#182b2c]/80 italic max-w-2xl mx-auto">
            {extraText}
          </p>
        )}

        {children && <div className="pt-2">{children}</div>}

        {showCurlyArrow && (
          <div className="pt-2 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <Image
              src="/media/Main Page/curly-arrow-left.png"
              alt=""
              aria-hidden="true"
              width={44}
              height={44}
              className="w-8 sm:w-10 h-auto object-contain opacity-85 -rotate-90"
            />
          </div>
        )}
      </div>
    </section>
  );
};
