import React from "react";
import Link from "next/link";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/layout/page-wrapper";

export const metadata = {
  title: "Често задавани въпроси (ЧЗВ) | Пощичка",
  description:
    "Всичко, което трябва да знаете за наемането на Пощичка: цени, транспорт от Бургас, индивидуален дизайн, ревизии и обслужване по време на събитието.",
};

const fullFaqList = [
  {
    id: "1",
    question: "Колко струва наемът на Пощичка за сватба или събитие?",
    answer:
      "Наемът на машината за типично събитие варира между 350€ и 500€. Цената се определя спрямо броя на гостите, времетраенето на събитието, избраните продукти (картички, временни татуировки, книгоразделители) и локацията. Всяко събитие получава прозрачна оферта без скрити такси.",
  },
  {
    id: "2",
    question: "Колко струва изработката на графичния дизайн?",
    answer:
      "Индивидуалният графичен дизайн се таксува отделно между 25€ и 50€ в зависимост от сложността на визията. В тази цена са включени до 3 кръга от корекции до постигане на перфектния за Вас резултат.",
  },
  {
    id: "3",
    question: "Как се изчисляват транспортните разходи от Бургас?",
    answer:
      "Пощичка е базирана в гр. Бургас. Първите 50 километра са абсолютно безплатни! За разстояния над 50-ия километър се начислява 0.23€ на изминат километър.",
  },
  {
    id: "4",
    question: "Заплащат ли гостите по време на събитието?",
    answer:
      "Абсолютно не! Организаторът заплаща цялостното изживяване. На събитието гостите получават специални монети-жетони и се наслаждават на преживяването напълно безплатно.",
  },
  {
    id: "5",
    question: "Може ли дизайнът да включва наши снимки, имена или лого?",
    answer:
      "Да! Ние не използваме генерични шаблони. Всеки дизайн е уникален и се създава специално за Вашата сватба или корпоративно събитие — с вашите имена, дата, илюстрации или фирмено лого.",
  },
  {
    id: "6",
    question: "Пътувате ли до други градове в България?",
    answer:
      "Да, пътуваме из цялата страна! Обслужвали сме събития в София, Пловдив, Варна, Велико Търново, Созопол, Несебър и много други населени места.",
  },
  {
    id: "7",
    question: "Колко време предварително трябва да резервираме дата?",
    answer:
      "Препоръчваме да се свържете с нас възможно най-рано (особено за силния сватбен сезон от май до октомври), за да гарантирате наличността за Вашата дата.",
  },
];

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
          <Accordion items={fullFaqList} />
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

