"use client";

import React from "react";
import Image from "next/image";
import { formatTestimonialQuote } from "@/lib/utils";

export interface TestimonialData {
  id: string;
  name: string;
  quote?: string;
  content?: string;
  text?: string;
  role?: string;
  rating?: number;
  image?: string;
}

interface TestimonialCardProps {
  testimonial: TestimonialData;
  className?: string;
}

export const TestimonialCard = ({ testimonial, className = "" }: TestimonialCardProps) => {
  const quoteText = testimonial.quote || testimonial.content || testimonial.text || "Благодарим от сърце за прекрасното изживяване!";

  return (
    <div
      className={`w-[290px] sm:w-[360px] md:w-[410px] shrink-0 relative flex flex-col items-center justify-between p-7 sm:p-9 transition-transform duration-300 hover:scale-[1.02] select-none min-h-[460px] sm:min-h-[520px] ${className}`}
    >
      {/* Hand-drawn Frame Asset 92@2x.png */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <Image
          src={encodeURI("/media/Отзиви/Asset 92@2x.png")}
          alt=""
          aria-hidden="true"
          fill
          className="object-fill drop-shadow-xs"
          unoptimized
        />
      </div>

      {/* Inner Content matching exact design */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between space-y-4 text-center my-auto">
        {/* Client / Couple Name */}
        <h3 className="font-salongbeach text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider text-[#182b2c] pt-2">
          {testimonial.name}
        </h3>

        {/* Review Quote Text in Stampatello with automatic Bulgarian quotes */}
        <p className="font-stampatello text-base sm:text-lg md:text-xl text-[#182b2c]/90 leading-relaxed font-normal px-2 sm:px-4 my-auto">
          {formatTestimonialQuote(quoteText)}
        </p>

        {/* Hand-drawn Teal Heart Hands Asset 93@2x.png */}
        <div className="relative w-28 sm:w-36 md:w-40 h-20 sm:h-24 shrink-0 flex items-center justify-center pb-2">
          <Image
            src={encodeURI("/media/Отзиви/Asset 93@2x.png")}
            alt="Илюстрация на ръце държащи сърце от драсканици"
            fill
            className="object-contain pointer-events-none"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};
