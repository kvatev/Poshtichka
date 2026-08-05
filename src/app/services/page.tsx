import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Palette, Truck, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Услуги & Видове събития | Пощичка",
  description:
    "Открийте услугите на Пощичка: сватбено изживяване, корпоративен брандинг, рождени дни и маркетинг активации. Автоматизирано печатане на живо с авторски дизайн.",
};

const servicesList = [
  {
    title: "Сватбено изживяване",
    subtitle: "Най-емоционалният подарък за Вашите гости",
    desc: "Подарете на гостите си момент на радост и изненада. Машината се декорира съобразно сватбената цветова тема, а картичките съдържат вашите имена, дата и акварелни илюстрации.",
    features: [
      "Персонализирани сватбени картички",
      "Временни татуировки с инициали",
      "Луксозни книгоразделители",
      "Специални метални жетони за гостите",
    ],
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Корпоративно брандиране & Активации",
    subtitle: "Иновативен бранд ангажимент за Вашите партньори",
    desc: "Превърнете корпоративното събитие, изложение или конференцитя в тема за разговор. Всеки участник си тръгва с брандиран сувенир с Вашето лого и послание.",
    features: [
      "Пълно брандиране на картичките с корпоративно лого",
      "Маркетинг послания & QR кодове за кампании",
      "Подходящо за над 300+ участници",
      "Професионално обслужване на място",
    ],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Рождени дни, Юбилеи & Бейби Шауър",
    subtitle: "Уникален акцент за Вашите лични празници",
    desc: "Направете личния си празник още по-топъл. Гостите избират своя любим дизайн като спомен от Вашия специален ден.",
    features: [
      "Тематични илюстрации и снимки",
      "Персонализирани благодарствени картички",
      "Забавни и интерактивни татуировки за деца и възрастни",
      "Компактно и стилно оборудване",
    ],
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80",
  },
];

export default function ServicesPage() {
  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* Header */}
      <section className="bg-brand-secondary/40 py-16 sm:py-24 border-b border-brand-primary/20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs uppercase tracking-widest text-brand-accent font-semibold">
            Нашите Услуги
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-brand-dark">
            Преживяване, съобразено с <br />
            <span className="text-brand-accent italic font-normal">Вашия специален повод</span>
          </h1>
          <p className="text-brand-dark/80 text-lg sm:text-xl font-sans max-w-2xl mx-auto font-light leading-relaxed">
            Всяко събитие получава напълно индивидуален подход — от графичния дизайн до избора на продуктите в машината.
          </p>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-20">
        {servicesList.map((service, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
              <span className="text-xs uppercase tracking-widest text-brand-accent font-semibold">
                {service.subtitle}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
                {service.title}
              </h2>
              <p className="text-brand-dark/80 font-sans text-base sm:text-lg leading-relaxed">
                {service.desc}
              </p>

              <ul className="space-y-3 pt-2">
                {service.features.map((f, i) => (
                  <li key={i} className="flex items-center space-x-3 text-sm font-sans text-brand-dark">
                    <div className="w-5 h-5 rounded-full bg-brand-primary/30 flex items-center justify-center text-brand-accent flex-shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Link href="/booking">
                  <Button variant="primary" size="md">
                    Запазете за това събитие
                  </Button>
                </Link>
              </div>
            </div>

            <div className={`relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border border-brand-primary/30 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </section>

      {/* Pricing Breakdown */}
      <section className="bg-brand-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-brand-accent font-semibold">
              Прозрачно формиране на цената
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-dark">
              Какво включва пакетът?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="space-y-4 p-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-secondary flex items-center justify-center text-brand-accent">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-dark">
                Наем на машината
              </h3>
              <p className="text-brand-accent font-serif font-bold text-2xl">
                350€ – 500€
              </p>
              <p className="text-sm text-brand-dark/75 font-sans leading-relaxed">
                Включва бутиковата машина за целия времетраене на събитието, монети-жетони за гостите и пълен комплект от избрани печатни продукти.
              </p>
            </Card>

            <Card className="space-y-4 p-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-secondary flex items-center justify-center text-brand-accent">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-dark">
                Графичен дизайн
              </h3>
              <p className="text-brand-accent font-serif font-bold text-2xl">
                25€ – 50€
              </p>
              <p className="text-sm text-brand-dark/75 font-sans leading-relaxed">
                Индивидуално авторско оформление от графичен дизайнер с вашите имена, дати или лого. Включва до 3 кръга от корекции.
              </p>
            </Card>

            <Card className="space-y-4 p-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-secondary flex items-center justify-center text-brand-accent">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-dark">
                Транспорт
              </h3>
              <p className="text-brand-accent font-serif font-bold text-2xl">
                0€ (първите 50 км)
              </p>
              <p className="text-sm text-brand-dark/75 font-sans leading-relaxed">
                Базирани сме в Бургас. Първите 50 км са напълно безплатни, след което се таксува 0.23 €/км до Вашето локация.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto text-center px-4 space-y-6">
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-dark">
          Имате специфично виждане за събитието?
        </h2>
        <p className="text-brand-dark/80 font-sans text-lg">
          Ще се радваме да обсъдим Вашите идеи и да ги превърнем в реалност.
        </p>
        <Link href="/booking">
          <Button variant="accent" size="lg" className="flex items-center space-x-2 mx-auto">
            <span>Изпратете запитване</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
