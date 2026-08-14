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
    question: "Какво е включено в наема на машината?",
    answer:
      "В цената влиза изготвяне на дизайн, печат, стандартни картончета, използване на жетони, различна часова заетост на място, 2-ма служители които монтират машината и съдействат на гостите, масичка, рамка с постер, а като бонус от нас получавате и кратък клип, как е преминало изживяването на гостите с Пощичка, докато сме били на място.",
  },
  {
    id: "2",
    question: "За колко часа може да ви наемем?",
    answer:
      "Всяко събитие е различно и часовете варират спрямо това колко гости ще бъдат на даденото събитие. Примерно за 100 бр. гости 2 часа са напълно достатъчни, за да минат всички и да вземат подаръка си. Когато се свържете с нас може подробно да обсъдим за колко часа е подходящо да бъдем на вашия повод.",
  },
  {
    id: "3",
    question: "До кои локации пътувате?",
    answer:
      "Ако кола може да стигне до локацията, значи и ние може да присъстваме. Пътуваме из цяла България.",
  },
  {
    id: "4",
    question: "Включени ли са корекции при изготвянето на дизайна?",
    answer:
      "Да, преди да започнем работа обсъждаме стила, който си представяте, а след започване на работа са включени до 3 корекции на дизайн, които са напълно достатъчни, за да стигнем до финален вариант.",
  },
  {
    id: "5",
    question: "Колко по-рано трябва да се наеме Пощичка?",
    answer:
      "2-3 месеца по-рано е най-оптимално, за да имаме време да подготвим дизайна и печатните материали. Но не чакайте последния момент!",
  },
  {
    id: "6",
    question: "Ако гостите не знаят как да се справят с машината?",
    answer:
      "Ние сме там през цялото време и съдействаме на гостите, за да вземат своя подарък.",
  },
];

export const FAQContent = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>(defaultFaqs);

  useEffect(() => {
    // 1. Clear any old cached items in localStorage to immediately show updated questions
    try {
      localStorage.removeItem("poshtichka_content_faq_items");
    } catch {}

    // 2. Fetch live data from /api/content
    fetch("/api/content")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        if (data.faq && Array.isArray(data.faq) && data.faq.length > 0) {
          setFaqs(data.faq);
        }
      })
      .catch(() => {});
  }, []);

  return <Accordion items={faqs} />;
};
