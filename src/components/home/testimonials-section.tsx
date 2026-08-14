"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

const testimonialItems = [
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

  // Duplicate items 6x for seamless infinite scrolling
  const marqueeItems = [
    ...testimonialItems,
    ...testimonialItems,
    ...testimonialItems,
    ...testimonialItems,
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
  }, [isHoveredOrTouched]);

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
        className="w-full overflow-x-auto flex space-x-6 sm:space-x-8 px-4 sm:px-8 py-4 cursor-grab active:cursor-grabbing scrollbar-none select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {marqueeItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="w-[280px] sm:w-[340px] md:w-[380px] shrink-0 relative flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={400}
              height={500}
              className="w-full h-auto object-contain pointer-events-none"
              unoptimized
            />
          </div>
        ))}
      </div>
    </section>
  );
};
