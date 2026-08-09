"use client";

import React, { useEffect, useState } from "react";
import { Accordion } from "@/components/ui/accordion";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const defaultFaqs: FAQItem[] = [
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
];

export const FAQContent = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>(defaultFaqs);

  useEffect(() => {
    // 1. Try local storage fallback
    try {
      const stored = localStorage.getItem("poshtichka_content_faq_items");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setFaqs(parsed);
        }
      }
    } catch {}

    // 2. Fetch live data from /api/content
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.faq && Array.isArray(data.faq) && data.faq.length > 0) {
          setFaqs(data.faq);
        }
      })
      .catch(() => {});
  }, []);

  return <Accordion items={faqs} />;
};
