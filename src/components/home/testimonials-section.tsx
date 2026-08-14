"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Star, MessageSquareQuote } from "lucide-react";

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
    fetch("/api/content")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.testimonials) && data.testimonials.length > 0) {
          setTestimonials(data.testimonials);
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
            className="w-[280px] sm:w-[340px] md:w-[380px] shrink-0 relative flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
          >
            {item.image && item.image.includes("testimonial-") ? (
              <Image
                src={item.image}
                alt={item.name}
                width={400}
                height={500}
                className="w-full h-auto object-contain pointer-events-none drop-shadow-sm"
                unoptimized
              />
            ) : (
              <div className="bg-[#f9f6f0] border-2 border-[#182b2c]/20 rounded-[32px] p-6 sm:p-8 shadow-lg w-full flex flex-col justify-between space-y-4 text-left min-h-[360px]">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 border-b border-[#182b2c]/10 pb-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#00b4b6] flex-shrink-0 bg-gray-100">
                      <Image
                        src={item.image || "/media/gallery/Tezza_2025_07_07_170901960_1.webp"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h3 className="font-salongbeach text-xl font-bold uppercase tracking-wider text-[#00b4b6]">
                        {item.name}
                      </h3>
                      {item.role && (
                        <p className="text-[11px] font-sans text-[#182b2c]/75 font-medium">
                          {item.role}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-amber-400">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  {item.quote && (
                    <p className="font-sans text-xs sm:text-sm text-[#182b2c]/90 italic leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-[#182b2c]/10 flex items-center justify-between text-[11px] text-[#00b4b6] font-bold uppercase">
                  <span>Автентичен спомен</span>
                  <MessageSquareQuote className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
