import React from "react";
import { PageWrapper } from "@/components/layout/page-wrapper";

export const metadata = {
  title: "Общи условия | Пощичка",
  description: "Условия за наемане и ползване на услугите на Пощичка.",
};

export default function TermsPage() {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-16 space-y-8">
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-brand-dark">
          Общи условия
        </h1>

        <div className="space-y-6 font-sans text-brand-dark/80 text-sm sm:text-base leading-relaxed">
          <p>Последна промяна: Август 2026 г.</p>

          <h2 className="font-display text-xl font-bold text-brand-dark pt-4">
            1. Предмет и резервация
          </h2>
          <p>
            Пощичка предоставя под наем интерактивно оборудване за събития с включен печат на живо. Резервацията се счита за потвърдена след писмено потвърждение и заплащане на капаро.
          </p>

          <h2 className="font-display text-xl font-bold text-brand-dark pt-4">
            2. Дизайн и ревизии
          </h2>
          <p>
            Графичният дизайн се изработва по индивидуално задание. Включената цена за дизайн включва до 3 кръга от корекции. Всички последващи промени се таксуват отделно.
          </p>

          <h2 className="font-display text-xl font-bold text-brand-dark pt-4">
            3. Транспорт и разходи
          </h2>
          <p>
            Транспортът от гр. Бургас до 50 км е безплатен. Всеки допълнителен километър извън този периметър се таксува по 0.23 €/км.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}

