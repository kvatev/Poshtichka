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
    badgeAssets: ["/media/Услуги/Asset 86@2x.png", "/media/Услуги/Asset 90@2x.png"],
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
    badgeAsset: "/media/Услуги/Asset 86@2x.png",
    badgeAssets: ["/media/Услуги/Asset 86@2x.png", "/media/Услуги/Asset 90@2x.png"],
  },
  {
    id: "SRV-03",
    title: "ВРЕМЕННИ ТАТУИРОВКИ",
    subtitle: "подходящо за рождени дни, сватби, фестивали и партита",
    description:
      "Забавна интерактивна станция с уникални временни татуировки по ваш собствен мотив или илюстрация.",
    features: [
      "ПЕРСОНАЛИЗИРАНИ ВРЕМЕННИ ТАТУИРОВКИ ПО ВАШ ДИЗАЙН",
      "БЕЗВРЕДНИ, ВОДОУСТОЙЧИВИ И ДЕРМАТОЛОГИЧНО ТЕСТВАНИ",
      "СТАНЦИЯ ЗА БЪРЗО И ЛЕСНО ПОСТАВЯНЕ НА СЪБИТИЕТО",
      "СТРАХОТНО ЗАБАВЛЕНИЕ КАКТО ЗА ДЕЦА, ТАКА И ЗА ВЪЗРАСТНИ",
    ],
    image: "/media/gallery/Tezza_2025_07_13_155331795.webp",
    badgeAsset: "/media/Услуги/Asset 90@2x.png",
    badgeAssets: ["/media/Услуги/Asset 86@2x.png", "/media/Услуги/Asset 90@2x.png"],
  },
  {
    id: "SRV-04",
    title: "ПЕРСОНАЛИЗИРАНИ КАРТИЧКИ И ПЛИКОВЕ",
    subtitle: "подходящо за сватби, фирмени събития, лични празници",
    description:
      "Уникални авторски илюстрации и дизайн, превърнати в картички, които гостите отнасят със себе си като вечен спомен.",
    features: [
      "ИНДИВИДУАЛНА КОНЦЕПЦИЯ И АВТОРСКИ ИЛЮСТРАЦИИ",
      "ПРЕМИУМ ПЕЧАТ И КАЧЕСТВЕНИ КАРТОНИ",
      "РАЗНООБРАЗИЕ ОТ ФОРМАТИ И ДОВЪРШИТЕЛНИ ЕФЕКТИ",
      "ИДЕАЛЕН ПОДАРЪК-СПОМЕН ЗА ВСЕКИ ПРИСЪСТВАЩ",
    ],
    image: "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
    badgeAsset: "/media/Услуги/Asset 86@2x.png",
    badgeAssets: ["/media/Услуги/Asset 86@2x.png", "/media/Услуги/Asset 90@2x.png"],
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);

  useEffect(() => {
    try {
      const cached = localStorage.getItem("poshtichka_cached_services");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setServices(parsed);
        }
      }
    } catch {}

    fetch("/api/services")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.services)) {
          setServices(data.services);
          try {
            localStorage.setItem("poshtichka_cached_services", JSON.stringify(data.services));
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  return (
    <PageWrapper>
      <div className="pb-24 space-y-12 sm:space-y-16 bg-[#f9f6f0] text-[#182b2c] min-h-screen">
        {/* Top Header Banner with Asset 88@2x.png Background: Edge-to-Edge Full Width */}
        <section className="relative w-full overflow-hidden flex items-center justify-center py-14 sm:py-20 md:py-24 px-4 sm:px-8 text-center border-b border-black/10">
          {/* Background Image: Asset 88@2x.png */}
          <Image
            src={encodeURI("/media/Услуги/Asset 88@2x.png")}
            alt="Всички услуги"
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />

          {/* Banner Text Content */}
          <div className="relative z-10 space-y-3 sm:space-y-4 max-w-4xl mx-auto px-2">
            <h1 className="font-salongbeach text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider text-white leading-tight drop-shadow-sm">
              ВСИЧКИ УСЛУГИ
            </h1>
            <p className="font-stampatello text-sm sm:text-base md:text-lg lg:text-xl text-[#182b2c] font-normal max-w-3xl mx-auto leading-relaxed">
              Предлагаме широка гама от услуги, подходящи за вашето събитие – от поканата, до подарък за самия повод!
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12">
          {services.map((service, index) => {
            return (
              <div
                key={service.id || index}
                className="relative bg-[#f9f6f0] border-2 border-[#182b2c] shadow-xl rounded-[36px] sm:rounded-[44px] p-6 sm:p-10 lg:p-12 transition-all duration-300 hover:shadow-2xl flex flex-col lg:flex-row items-center gap-8 lg:gap-14 overflow-hidden"
              >
                <div className="relative w-full lg:w-1/2 flex-shrink-0 flex items-center justify-center z-0">
                  <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[520px] rounded-[32px] sm:rounded-[36px] overflow-hidden border-2 border-[#182b2c] shadow-lg bg-gray-100">
                    <Image
                      src={service.image || "/media/gallery/Tezza_2025_07_13_155326413.webp"}
                      alt={service.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>

                <div className="w-full lg:w-1/2 space-y-6 text-left z-0">
                  <div className="space-y-2">
                    <h2 className="font-salongbeach text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-[#182b2c] tracking-wider leading-none">
                      {service.title}
                    </h2>
                    {service.subtitle && (
                      <p className="font-stampatello text-base sm:text-lg text-[#00b4b6] font-normal leading-relaxed">
                        {service.subtitle}
                      </p>
                    )}
                  </div>

                  {service.description && (
                    <p className="font-stampatello text-base sm:text-lg text-[#182b2c]/85 leading-relaxed font-normal">
                      {service.description}
                    </p>
                  )}

                  {/* Bullet List with Official Teal Hand-Drawn Checkmark Asset 86@2x.png */}
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-4 pt-2">
                      {service.features.map((feat, i) => (
                        <li key={i} className="flex items-center space-x-3.5 sm:space-x-4">
                          {/* Official Hand-Drawn Teal Checkmark Asset 86@2x.png */}
                          <div className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 relative flex items-center justify-center">
                            <Image
                              src={encodeURI("/media/Услуги/Asset 86@2x.png")}
                              alt="Отметка"
                              width={32}
                              height={32}
                              className="w-full h-full object-contain pointer-events-none"
                              unoptimized
                            />
                          </div>

                          <span className="font-salongbeach font-bold uppercase text-base sm:text-lg lg:text-xl text-[#182b2c] tracking-wider leading-snug">
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA Booking Button */}
                  <div className="pt-4">
                    <Link href="/contact">
                      <Button
                        variant="primary"
                        className="bg-[#00b4b6] hover:bg-[#008b8d] text-white font-salongbeach text-lg font-bold uppercase tracking-wider px-9 py-4 rounded-full shadow-lg flex items-center space-x-2 cursor-pointer"
                      >
                        <span>Резервирай тази услуга</span>
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </PageWrapper>
  );
}
