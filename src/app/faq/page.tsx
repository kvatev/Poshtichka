import React from "react";
import Link from "next/link";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/layout/page-wrapper";

import { FAQContent } from "@/components/faq-content";

export const metadata = {
  title: "Често задавани въпроси (ЧЗВ) | Пощичка",
  description:
    "Всичко, което трябва да знаете за наемането на Пощичка: цени, транспорт от Бургас, индивидуален дизайн, ревизии и обслужване по време на събитието.",
};

export default function FAQPage() {
  return (
    <PageWrapper>
      <div className="space-y-16 pb-24">
        {/* Header */}
        <section className="bg-brand-cream py-16 sm:py-24 border-b border-[#00b4b6]/20">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#00b4b6] font-semibold">
              Въпроси & Отговори
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-brand-dark">
              Често задавани въпроси
            </h1>
            <p className="text-brand-dark/80 text-lg sm:text-xl font-sans max-w-2xl mx-auto font-light leading-relaxed">
              Тук ще намерите подробна информация за ценообразуването, транспорта от Бургас, дизайна и организационните детайли.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-8">
          <FAQContent />
        </section>

        <section className="max-w-3xl mx-auto text-center px-4 space-y-6 bg-white p-10 rounded-3xl border border-[#00b4b6]/30 shadow-glass">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-dark">
            Не откривате отговора на Вашия въпрос?
          </h2>
          <p className="text-brand-dark/75 font-sans">
            Нашият екип е на разположение да отговори на всички Ваши запитвания.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="md">
              Свържете се с нас
            </Button>
          </Link>
        </section>
      </div>
    </PageWrapper>
  );
}

