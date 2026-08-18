"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { AboutInteractiveShowcase } from "@/components/about/about-interactive-showcase";

export default function AboutPage() {
  const [aboutHeading, setAboutHeading] = React.useState("НИЕ НЕ ПЕЧАТАМЕ КАРТИЧКИ");
  const [aboutSubheading, setAboutSubheading] = React.useState("НИЕ СЪЗДАВАМЕ СПОМЕНИ");
  const [aboutBody, setAboutBody] = React.useState(
    "Пощичка се роди с една ясна мисия: да превърне традиционния подарък за гости в интерактивно преживяване, което носи истинска радост."
  );

  React.useEffect(() => {
    fetch("/api/content")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.website_content && Array.isArray(data.website_content)) {
          const heroBlock = data.website_content.find((b: { sectionKey: string }) => b.sectionKey === "about_hero");
          if (heroBlock) {
            if (heroBlock.heading) {
              const parts = heroBlock.heading.split(".");
              if (parts.length >= 2) {
                setAboutHeading(parts[0].trim());
                setAboutSubheading(parts[1].trim());
              } else {
                setAboutHeading(heroBlock.heading);
              }
            }
            if (heroBlock.body) setAboutBody(heroBlock.body);
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <PageWrapper>
      <div className="space-y-6 sm:space-y-12 pb-2 font-sans select-none bg-[#f9f6f0]">
        {/* Section 1: Top Hero Photo */}
        <section className="relative w-full h-[40vh] sm:h-[55vh] lg:h-[65vh] overflow-hidden">
          <Image
            src={encodeURI("/media/За Пощичка/Asset 61@2x.webp")}
            alt="Интерактивна вендинг машина Пощичка на живо по време на сватбено събитие"
            fill
            draggable={false}
            className="object-cover object-[47%_center] sm:object-center select-none pointer-events-none"
            priority
            unoptimized
          />
        </section>

        {/* Section 2: Headline & Subtitle */}
        <section className="max-w-4xl mx-auto px-4 text-center space-y-4 pt-4">
          <h1 className="font-salongbeach text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-wider text-[#182b2c] leading-tight">
            {aboutHeading}
          </h1>
          <h2 className="font-salongbeach text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-wider text-[#00b4b6] leading-tight">
            {aboutSubheading}
          </h2>
          <p className="font-sans text-sm sm:text-base lg:text-lg font-light text-[#182b2c]/85 max-w-2xl mx-auto italic leading-relaxed pt-1">
            {aboutBody}
          </p>
        </section>

        {/* Section 3: 3 Feature Graphic Elements in Teal Bar */}
        <section className="w-full bg-[#00b4b6] py-10 sm:py-14 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center text-center">
            {/* Feature 1: Asset 65@2x.png (100% Авторски дизайн) */}
            <div className="flex justify-center items-center py-2">
              <div className="relative w-full max-w-[300px] sm:max-w-[350px] aspect-[4/3]">
                <Image
                  src={encodeURI("/media/За Пощичка/Asset 65@2x.png")}
                  alt="100% Авторски графичен дизайн на сватбени картички и марки"
                  fill
                  draggable={false}
                  className="object-contain object-center select-none pointer-events-none"
                  unoptimized
                  priority
                />
              </div>
            </div>

            {/* Feature 2: Asset 63@2x.png (Емоционална стойност) */}
            <div className="flex justify-center items-center py-2">
              <div className="relative w-full max-w-[300px] sm:max-w-[350px] aspect-[4/3]">
                <Image
                  src={encodeURI("/media/За Пощичка/Asset 63@2x.png")}
                  alt="Емоционална стойност и споделени мигове за гостите на събитието"
                  fill
                  draggable={false}
                  className="object-contain object-center select-none pointer-events-none"
                  unoptimized
                  priority
                />
              </div>
            </div>

            {/* Feature 3: Asset 64@2x.png (Гъвкавост и логистика) */}
            <div className="flex justify-center items-center py-2">
              <div className="relative w-full max-w-[300px] sm:max-w-[350px] aspect-[4/3]">
                <Image
                  src={encodeURI("/media/За Пощичка/Asset 64@2x.png")}
                  alt="Гъвкавост, доставка, монтаж и пълна логистика в цяла България"
                  fill
                  draggable={false}
                  className="object-contain object-center select-none pointer-events-none"
                  unoptimized
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: What is Poshtichka - Interactive Showcase with Live Typography & Stateful Badges */}
        <AboutInteractiveShowcase />

        {/* Section 5: Photo Banner 1 (Hands holding over booth) */}
        <section className="relative w-full h-[280px] sm:h-[450px] overflow-hidden">
          <Image
            src={encodeURI("/media/За Пощичка/Asset 67@2x.webp")}
            alt="Младоженци и гости се забавляват около машината Пощичка"
            fill
            draggable={false}
            className="object-cover object-center select-none pointer-events-none"
            unoptimized
          />
        </section>

        {/* Section 6: Who is Behind the Idea? (КОЙ СТОИ ЗАД ИДЕЯТА?) - Top Baseline Aligned */}
        <section className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10 py-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="font-salongbeach text-3xl sm:text-5xl font-bold uppercase tracking-wider text-[#00b4b6]">
              КОЙ СТОИ ЗАД ИДЕЯТА?
            </h2>
            <p className="font-sans text-sm sm:text-lg font-light text-[#182b2c]/85 italic">
              Млада двойка, за която няма проект, който да не може да стане “НАПРАВИ СИ САМ”.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start justify-items-center text-center">
            {/* Geri Column Graphic (Asset 68@2x.png) */}
            <div className="w-full flex justify-center items-start text-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] h-[580px] sm:h-[760px] lg:h-[840px]">
                <Image
                  src={encodeURI("/media/За Пощичка/Asset 68@2x.png")}
                  alt="Гери – графичен дизайнер и създател на концепцията Пощичка"
                  fill
                  draggable={false}
                  className="object-contain object-top select-none pointer-events-none"
                  unoptimized
                  priority
                />
              </div>
            </div>

            {/* Krasi Column Graphic (Asset 69@2x.png) */}
            <div className="w-full flex justify-center items-start text-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] h-[580px] sm:h-[760px] lg:h-[840px]">
                <Image
                  src={encodeURI("/media/За Пощичка/Asset 69@2x.png")}
                  alt="Краси – техническо изпълнение, хардуер и софтуер на Пощичка"
                  fill
                  draggable={false}
                  className="object-contain object-top select-none pointer-events-none"
                  unoptimized
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Photo Banner 2 (Hands holding postcards) */}
        <section className="relative w-full h-[280px] sm:h-[450px] overflow-hidden">
          <Image
            src={encodeURI("/media/За Пощичка/Asset 70@2x.webp")}
            alt="Гости на събитие разглеждат своите персонализирани сватбени картички"
            fill
            draggable={false}
            className="object-cover object-center select-none pointer-events-none"
            unoptimized
          />
        </section>

        {/* Section 8: Final Bottom CTA Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12 text-center relative">
            {/* Left Graphic: Asset 71@2x.png (Hands holding bird postcard) */}
            <div className="relative w-32 sm:w-44 md:w-52 lg:w-60 h-32 sm:h-44 md:h-52 lg:h-60 flex-shrink-0 mx-auto md:mx-0 mb-4 sm:mb-6 md:mb-0">
              <Image
                src={encodeURI("/media/За Пощичка/Asset 71@2x.png")}
                alt="Ръце с персонализирана картичка от Пощичка"
                fill
                draggable={false}
                className="object-contain object-center select-none pointer-events-none"
                unoptimized
              />
            </div>

            {/* Center Content */}
            <div className="max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center">
              <h2 className="font-salongbeach text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-[#00b4b6] leading-tight sm:leading-snug mb-4 sm:mb-6">
                ЧУДИТЕ СЕ ДАЛИ ДАТАТА ВИ Е СВОБОДНА?
              </h2>
              <p className="font-sans text-sm sm:text-base lg:text-lg text-[#182b2c]/85 italic leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto">
                Проверете дали Пощичка може да пътува за вашия специален ден!
              </p>

              <div className="mt-2 sm:mt-4 mb-8 sm:mb-12 md:mb-0 flex items-center justify-center relative">
                <div className="relative inline-flex items-center justify-center">
                  <Link href="/calendar">
                    <button className="inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 rounded-full border-2 border-[#00b4b6] bg-white hover:bg-[#00b4b6] hover:text-white text-[#00b4b6] font-salongbeach text-lg sm:text-xl font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer">
                      <span>ПРОВЕРЕТЕ ТУК</span>
                    </button>
                  </Link>

                  {/* Curly Arrow pointing directly at the button */}
                  <div className="flex items-center justify-center absolute -right-10 sm:-right-14 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
                    <Image
                      src={encodeURI("/media/Main Page/curly-arrow-left.png")}
                      alt=""
                      aria-hidden="true"
                      width={52}
                      height={52}
                      draggable={false}
                      className="w-8 sm:w-11 h-auto object-contain opacity-90 translate-y-[2px] select-none pointer-events-none"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Graphic: Asset 72@2x.png (Hands making heart) */}
            <div className="relative w-32 sm:w-44 md:w-52 lg:w-60 h-32 sm:h-44 md:h-52 lg:h-60 flex-shrink-0 mx-auto md:mx-0">
              <Image
                src={encodeURI("/media/За Пощичка/Asset 72@2x.png")}
                alt="Ръце оформящи сърце – символ на обич и спомени"
                fill
                draggable={false}
                className="object-contain object-center select-none pointer-events-none"
                unoptimized
              />
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
