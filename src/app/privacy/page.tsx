import React from "react";

export const metadata = {
  title: "Политика за поверителност | Пощичка",
  description: "Политика за защита на личните данни на Пощичка съгласно GDPR.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-16 space-y-8">
      <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-dark">
        Политика за поверителност
      </h1>
      
      <div className="space-y-6 font-sans text-brand-dark/80 text-sm sm:text-base leading-relaxed">
        <p>
          Последна промяна: Август 2026 г.
        </p>

        <h2 className="font-serif text-xl font-bold text-brand-dark pt-4">
          1. Събиране на лични данни
        </h2>
        <p>
          Пощичка (базирана в гр. Бургас, България) събира лични данни (име, телефон, имейл, дата и място на събитието) единствено с цел обработка на запитвания и организиране на наемането на машината.
        </p>

        <h2 className="font-serif text-xl font-bold text-brand-dark pt-4">
          2. Защита и съхранение
        </h2>
        <p>
          Вашите данни се съхраняват сигурно и не се предоставят на трети лица за маркетингови или търговски цели без Вашето изрично съгласие.
        </p>

        <h2 className="font-serif text-xl font-bold text-brand-dark pt-4">
          3. Права на субекта на данните (GDPR)
        </h2>
        <p>
          Имате право по всяко време да поискате достъп, коригиране или изтриване на Вашите лични данни, като се свържете с нас на <a href="mailto:hello@poshtichka.bg" className="text-brand-accent underline">hello@poshtichka.bg</a>.
        </p>
      </div>
    </div>
  );
}
