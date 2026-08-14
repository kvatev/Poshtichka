"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { FAQContent } from "@/components/faq-content";

export default function FAQPage() {
  return (
    <PageWrapper>
      <div className="space-y-12 pb-24 font-sans select-none">
        {/* Top Banner */}
        <section className="bg-[#00b4b6] text-white py-12 sm:py-16 px-4 relative overflow-hidden border-b border-white/20">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <h1 className="font-salongbeach text-3xl sm:text-5xl font-bold uppercase tracking-wider text-white leading-tight">
              ЧЕСТО ЗАДАВАНИ ВЪПРОСИ
            </h1>
            <p className="font-sans text-sm sm:text-base lg:text-lg font-light text-white/95 max-w-2xl mx-auto italic">
              Събрали сме част от въпросите, които получаваме преди резервиране.
            </p>

            {/* Curly Arrow pointing down */}
            <div className="pt-2 flex items-center justify-center pointer-events-none">
              <Image
                src="/media/Main Page/curly-arrow-left.png"
                alt="Стрелка"
                width={50}
                height={50}
                className="w-8 sm:w-10 h-auto object-contain opacity-90 rotate-90"
              />
            </div>
          </div>
        </section>

        {/* FAQ Accordion List */}
        <section className="max-w-4xl mx-auto px-4 sm:px-8">
          <FAQContent />
        </section>

        {/* Bottom CTA Banner */}
        <section className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="bg-[#2d3a37] text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="font-salongbeach text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
                НЕ ОТКРИВАТЕ ОТГОВОРА НА ВАШИЯ ВЪПРОС?
              </h3>
              <p className="text-white/80 text-sm sm:text-base font-sans font-light">
                Нашият екип е на разположение да отговори на всички Ваши запитвания.
              </p>
            </div>

            <Link href="/contact">
              <button className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#00b4b6] hover:bg-[#008b8d] text-white font-salongbeach text-lg sm:text-xl font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer">
                <span>ЗАДАЙ ВЪПРОС</span>
              </button>
            </Link>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
