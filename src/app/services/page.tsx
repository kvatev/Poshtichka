"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { ServiceItem } from "@/components/admin/services-manager";

const initialServices: ServiceItem[] = [
  {
    id: "SRV-01",
    title: "ВЕНДИНГ МАШИНА",
    subtitle: "подходящо за сватбено тържество, кръщение, юбилей, корпоративно събитие",
    description:
      "Подарете на гостите си момент на радост и изненада. Дизайните се изготвят по идея на клиента, съобразно цветовата гама на събитието.",
    features: [
      "НАЕМ НА ВЕНДНИГ МАШИНА ЗА КОНКРЕТНИ ЧАСОВЕ",
      "БУРКАН СЪС ЖЕТОНИ, СПРЯМО ГОСТИТЕ НА СЪБИТИЕТО",
      "ДИЗАЙН НА 4 ВИДА ИЛЮСТРАЦИИ, КАКТО И ЗА ПОСТЕРИТЕ",
      "ПЕЧАТ + СТАНДАРТНИ/ПЕРСОНАЛИЗИРАНИ КАРТОНЧЕТА",
      "2-МА СЛУЖИТЕЛИ ЗА СЪДЕЙСТВИЕ НА ГОСТИТЕ И МОНТАЖ",
    ],
    image: "/media/gallery/Tezza_2025_07_13_155326413.webp",
    badgeAsset: "/media/Услуги/Asset 88@2x.png",
  },
  {
    id: "SRV-02",
    title: "ТАБЛО С МАРКИ И КАРТИЧКИ",
    subtitle: "подходящо за сватбено тържество, юбилей, частни партита",
    description:
      "Елегантен кът с авторски марки, пликове за спомени и възможност за пожелания от вашите близки.",
    features: [
      "АВТОРСКО ТАБЛО С МАРКИ И ДИЗАЙН ПО ИЗБОР",
      "ПЕРСОНАЛИЗИРАНИ ПЛИКОВЕ ЗА СПОМЕНИ ЗА ВСЕКИ ГОСТ",
      "ДАРСТВЕНИ КАРТИЧКИ С БЛАГОДАРСТВЕНИ ПОСЛАНИЯ",
      "ДЕКОРАТИВЕН СТАНОК И МОНТАЖ НА МЯСТО НА СЪБИТИЕТО",
    ],
    image: "/media/gallery/Tezza_2025_07_13_155324686.webp",
    badgeAsset: "/media/Услуги/Asset 89@2x.png",
  },
  {
    id: "SRV-03",
    title: "ВРЕМЕННИ ТАТУИРОВКИ",
    subtitle: "подходящо за рождени дни, сватби, фестивали и партита",
    description:
      "Забавна интерактивна станция с уникални временни татуировки по ваш собствен мотив или илюстрация.",
    features: [
      "АВТОРСКИ ДИЗАЙНИ НА ТАТУИРОВКИ С ИНИЦИАЛИ ИЛИ ЛОГО",
      "БЕЗОПАСНИ И ВОДОУСТОЙЧИВИ МАТЕРИАЛИ ЗА ГОСТИТЕ",
      "ИНТЕРАКТИВЕН КЪТ С ИНСТРУКЦИИ И АКСЕСОАРИ",
      "ПЪЛНА КООРДИНАЦИЯ И СЪДЕЙСТВИЕ ОТ ЕКИПА",
    ],
    image: "/media/gallery/Tezza_2025_07_13_155331795.webp",
    badgeAsset: "/media/Услуги/Asset 90@2x.png",
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.services) && data.services.length > 0) {
          setServices(data.services);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <PageWrapper>
      <div className="space-y-16 sm:space-y-24 py-10 pb-24 font-sans select-none bg-[#f9f6f0]/50">
        {/* Header */}
        <section className="text-center max-w-4xl mx-auto space-y-4 px-4">
          <span className="text-xs uppercase tracking-widest text-[#00b4b6] font-semibold bg-[#00b4b6]/10 px-4 py-1.5 rounded-full">
            Нашите Услуги
          </span>
          <h1 className="font-salongbeach text-3xl sm:text-5xl md:text-6xl font-bold text-[#182b2c] uppercase tracking-wider leading-tight">
            Преживяване, съобразено с <br className="hidden sm:inline" />
            <span className="text-[#00b4b6]">Вашия специален повод</span>
          </h1>
          <p className="text-[#182b2c]/80 text-base sm:text-xl font-sans max-w-2xl mx-auto font-light leading-relaxed">
            Всяко събитие получава напълно индивидуален подход — от графичния дизайн до избора на продуктите в машината.
          </p>
        </section>

        {/* Detailed Services Cards matching user screenshot layout */}
        <section className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12">
          {services.map((service, index) => (
            <div
              key={service.id || index}
              className="bg-[#f9f6f0] border-2 border-[#182b2c]/20 shadow-xl rounded-[36px] p-6 sm:p-10 transition-all duration-300 hover:shadow-2xl flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
            >
              {/* Left Side: Photo Frame with Decorative Rays (Asset 86@2x.png) */}
              <div className="relative w-full lg:w-1/2 flex-shrink-0 flex items-center justify-center">
                {/* Decorative Spark / Ray Asset 86@2x.png on left */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 sm:w-12 h-16 sm:h-20 pointer-events-none z-10 hidden sm:block">
                  <Image
                    src={encodeURI("/media/Услуги/Asset 86@2x.png")}
                    alt="Декорация"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>

                {/* Main Photo Frame */}
                <div className="relative w-full h-[320px] sm:h-[400px] md:h-[440px] rounded-[28px] overflow-hidden border-2 border-[#182b2c]/10 shadow-lg bg-gray-100">
                  <Image
                    src={service.image || "/media/gallery/Tezza_2025_07_13_155326413.webp"}
                    alt={service.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Decorative Spark / Ray Asset 86@2x.png on right */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 sm:w-12 h-16 sm:h-20 pointer-events-none z-10 hidden sm:block rotate-180">
                  <Image
                    src={encodeURI("/media/Услуги/Asset 86@2x.png")}
                    alt="Декорация"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>

              {/* Right Side: Title, Subtitle, Description & Bullet List */}
              <div className="w-full lg:w-1/2 space-y-5 text-left">
                <div className="space-y-1.5">
                  <h2 className="font-salongbeach text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-[#182b2c] tracking-wider leading-none">
                    {service.title}
                  </h2>
                  {service.subtitle && (
                    <p className="font-sans text-xs sm:text-sm text-[#00b4b6] font-medium leading-relaxed">
                      {service.subtitle}
                    </p>
                  )}
                </div>

                {service.description && (
                  <p className="font-sans text-sm sm:text-base text-[#182b2c]/85 leading-relaxed">
                    {service.description}
                  </p>
                )}

                {/* Bullet List with Teal Circular Checkmarks matching Asset 88@2x.png */}
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-3.5 pt-2">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center space-x-3.5">
                        {/* Teal Circular Checkmark Icon Asset 88@2x.png */}
                        <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 relative flex items-center justify-center">
                          <img
                            src="/media/Услуги/Asset 88@2x.png"
                            alt="Отметка"
                            className="w-full h-full object-contain pointer-events-none"
                          />
                        </div>

                        <span className="font-salongbeach font-bold uppercase text-sm sm:text-base lg:text-lg text-[#182b2c] tracking-wider leading-snug">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA Booking Button */}
                <div className="pt-3">
                  <Link href="/booking">
                    <Button
                      variant="primary"
                      className="bg-[#00b4b6] hover:bg-[#008b8d] text-white font-salongbeach text-base font-bold uppercase tracking-wider px-8 py-3.5 rounded-full shadow-md flex items-center space-x-2 cursor-pointer"
                    >
                      <span>Резервирай тази услуга</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </PageWrapper>
  );
}
