"use client";

import React, { useEffect, useState, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { TestimonialCard, TestimonialData } from "@/components/home/testimonial-card";

const defaultTestimonialItems: TestimonialData[] = [
  {
    id: "1",
    name: "НИКОЛ и ДАНИЕЛ",
    quote: "За нас беше изключително удоволствие да бъде част от нашият ден! Благодарим от сърце!",
    image: "/media/Main Page/testimonial-nikol-daniel.png",
  },
  {
    id: "2",
    name: "МАЯ и НИКО",
    quote: "Още веднъж да ви благодарим за всичко и че бяхте част от нашия празник, беше прекрасно и гостите много харесаха картичките!",
    image: "/media/Main Page/testimonial-maya-niko.png",
  },
  {
    id: "3",
    name: "РАЛИЦА и ЖЕЛЬО",
    quote: "Всички бяха много изненадани и много са се забавлявали с вендинг машината, татуировките определено са били хит. Много благодаря!",
    image: "/media/Main Page/testimonial-ralica-zhelyo.png",
  },
  {
    id: "4",
    name: "КРИСИ и ВИКТОР",
    quote: "Гери, много ти благодаря отново! Всичко беше прекрасно! Гостите толкова се зарадваха, не можем да си представим! Наистина много се радвам! Просто уникален подарък остана за гостите толкова съм впечатлена.",
    image: "/media/Main Page/testimonial-krisi-viktor.png",
  },
  {
    id: "5",
    name: "МАРИНА и ИВАН",
    quote: "Искам пак да ви благодаря, бяхте прекрасни и хората се изкефиха супер много! И без това съм емоционален тези дни, от постовете ви пак се разплаках. Много се радваме, че ви намерихме. С удоволствие ви препоръчвам на всички!",
    image: "/media/Main Page/testimonial-marina-ivan.png",
  },
];

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>(defaultTestimonialItems);

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

  // Ensure enough items for a seamless infinite loop across large screens
  const displayItems = useMemo(() => {
    if (testimonials.length === 0) return [];
    if (testimonials.length < 10) {
      return [...testimonials, ...testimonials, ...testimonials];
    }
    return [...testimonials, ...testimonials];
  }, [testimonials]);

  // Embla Carousel with native gesture swipe, mouse drag, and smooth infinite auto-scroll
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: "start",
      containScroll: false,
    },
    [
      AutoScroll({
        speed: 0.9,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
      }),
    ]
  );

  return (
    <section className="py-16 sm:py-24 bg-brand-cream relative overflow-hidden w-full select-none">
      {/* Section Heading (Centered) */}
      <div className="text-center space-y-3 max-w-3xl mx-auto px-4 mb-10">
        <h2 className="font-salongbeach text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-[#00b4b6] text-center leading-tight">
          ОТЗИВИ И ВПЕЧАТЛЕНИЯ
        </h2>
      </div>

      {/* Embla Carousel Viewport with Native Mouse Drag & Touch Swipe */}
      <div
        ref={emblaRef}
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
      >
        <div className="flex touch-pan-y gap-6 sm:gap-8 px-4 sm:px-8 py-4">
          {displayItems.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="flex-[0_0_auto] min-w-0">
              <TestimonialCard testimonial={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
