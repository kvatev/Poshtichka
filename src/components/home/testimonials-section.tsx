"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Star, MessageSquareQuote } from "lucide-react";
import { formatTestimonialQuote } from "@/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  quote?: string;
  rating?: number;
  image?: string;
}

const defaultTestimonialItems: Testimonial[] = [
  {
    id: "1",
    name: "НИКОЛ и ДАНИЕЛ",
    image: "/media/Main Page/testimonial-nikol-daniel.png",
  },
  {
    id: "2",
    name: "МАЯ и НИКО",
    image: "/media/Main Page/testimonial-maya-niko.png",
  },
  {
    id: "3",
    name: "РАЛИЦА и ЖЕЛЬО",
    image: "/media/Main Page/testimonial-ralica-zhelyo.png",
  },
  {
    id: "4",
    name: "КРИСИ и ВИКТОР",
    image: "/media/Main Page/testimonial-krisi-viktor.png",
  },
  {
    id: "5",
    name: "МАРИНА и ИВАН",
    image: "/media/Main Page/testimonial-marina-ivan.png",
  },
];

export const TestimonialsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHoveredOrTouched, setIsHoveredOrTouched] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonialItems);

  useEffect(() => {
    try {
      const cached = localStorage.getItem("poshtichka_cached_testimonials");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTestimonials(parsed);
        }
      }
    } catch {}

    fetch("/api/content")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.testimonials) && data.testimonials.length > 0) {
          setTestimonials(data.testimonials);
          try {
            localStorage.setItem("poshtichka_cached_testimonials", JSON.stringify(data.testimonials));
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  // Duplicate items 4x for seamless infinite scrolling
  const marqueeItems = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let lastTime: number | null = null;

    const scrollSpeed = 0.8; // Pixels per frame for smooth continuous movement

    const step = (time: number) => {
      if (lastTime !== null && !isHoveredOrTouched) {
        if (container) {
          container.scrollLeft += scrollSpeed;

          // Seamless infinite loop reset
          if (container.scrollLeft >= container.scrollWidth / 2) {
            container.scrollLeft -= container.scrollWidth / 4;
          }
        }
      }
      lastTime = time;
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHoveredOrTouched, testimonials]);

  return (
    <section className="py-16 sm:py-24 bg-brand-cream relative overflow-hidden w-full select-none">
      {/* Section Heading (Centered) */}
      <div className="text-center space-y-3 max-w-3xl mx-auto px-4 mb-10">
        <h2 className="font-salongbeach text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-[#00b4b6] text-center leading-tight">
          ОТЗИВИ И ВПЕЧАТЛЕНИЯ
        </h2>
      </div>

      {/* Scrollable Container with Auto-Scroll & Native Drag/Swipe */}
      <div
        ref={scrollContainerRef}
        onMouseEnter={() => setIsHoveredOrTouched(true)}
        onMouseLeave={() => setIsHoveredOrTouched(false)}
        onTouchStart={() => setIsHoveredOrTouched(true)}
        onTouchEnd={() => setIsHoveredOrTouched(false)}
        className="w-full overflow-x-auto flex space-x-6 sm:space-x-8 px-4 sm:px-8 py-4 cursor-grab active:cursor-grabbing scrollbar-none select-none items-stretch"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {marqueeItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="w-[290px] sm:w-[360px] md:w-[410px] shrink-0 relative flex flex-col items-center justify-between p-7 sm:p-9 transition-transform duration-300 hover:scale-[1.02] select-none min-h-[460px] sm:min-h-[520px]"
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
                {item.name}
              </h3>

              {/* Review Quote Text in Stampatello */}
              <p className="font-stampatello text-base sm:text-lg md:text-xl text-[#182b2c]/90 leading-relaxed font-normal px-2 sm:px-4 my-auto">
                {formatTestimonialQuote(item.quote || "Благодарим от сърце за прекрасното изживяване!")}
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
        ))}
      </div>
    </section>
  );
};
