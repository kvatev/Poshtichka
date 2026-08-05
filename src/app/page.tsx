"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Gift,
  Coins,
  Smile,
  ArrowRight,
  Star,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { CalculatorWidget } from "@/components/calculator";
import { GalleryGrid } from "@/components/gallery-lightbox";

export default function HomePage() {
  const faqItems = [
    {
      id: "cost",
      question: "Колко струва наемът на Пощичка за събитие?",
      answer:
        "Типичният наем варира между 350€ и 500€ в зависимост от броя гости, времетраенето и избраните продукти (картички, временни татуировки, книгоразделители). Всяко събитие получава индивидуална и прозрачна оферта.",
    },
    {
      id: "design-cost",
      question: "Колко струва изработката на индивидуален дизайн?",
      answer:
        "Графичният дизайн се таксува отделно между 25€ и 50€ според сложността на проекта. Цената включва до 3 кръга от корекции до пълно одобрение от ваша страна.",
    },
    {
      id: "transport",
      question: "Как се изчисляват транспортните разходи?",
      answer:
        "Пощичка е базирана в гр. Бургас. Първите 50 километра са напълно безплатни! След 50-ия километър транспортът се изчислява по 0.23€ на километър.",
    },
    {
      id: "guest-pay",
      question: "Заплащат ли гостите по време на събитието?",
      answer:
        "Не! Гостите получават специални жетони и се наслаждават на преживяването напълно безплатно. Цялото изживяване е подарък от домакина на събитието.",
    },
    {
      id: "customization",
      question: "Могат ли продуктите да съдържат нашите имена или лого?",
      answer:
        "Абсолютно! Всички картички, татуировки и сувенири се изработват с авторска визия, създадена специално за Вашето събитие — с вашите имена, дата, лого или тематични илюстрации.",
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 sm:px-8 pt-8">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80"
            alt="Сватбено тържество с Пощичка"
            fill
            priority
            className="object-cover object-center scale-105 filter brightness-[0.45]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-brand-dark/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs sm:text-sm font-sans tracking-widest uppercase text-brand-primary"
          >
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span>Интерактивно преживяване за събития в България</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight drop-shadow-md"
          >
            Всеки гост си тръгва <br className="hidden sm:inline" />
            <span className="text-brand-primary italic font-normal">със спомен</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-lg sm:text-2xl text-white/90 font-sans max-w-3xl mx-auto leading-relaxed font-light"
          >
            Персонализирани подаръци, създадени на живо по време на Вашето събитие чрез специално проектирана бутикова машина.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/booking">
              <Button variant="primary" size="lg" className="w-full sm:w-auto text-base">
                Запазете дата за събитие
              </Button>
            </Link>
            <Link href="/gallery">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base border-white text-white hover:bg-white hover:text-brand-dark">
                Разгледайте галерията
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs text-white/70 font-sans"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-brand-primary" />
              <span>Базирани в Бургас (Пътуваме из цялата страна)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-brand-primary" />
              <span>100% Авторски персонализиран дизайн</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-accent font-semibold">
            Магията на живо
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-dark">
            Как функционира Пощичка?
          </h2>
          <p className="text-brand-dark/70 text-base sm:text-lg font-sans">
            Подарете на своите гости преживяване, което ще помнят дълго след края на събитието.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              icon: Coins,
              title: "Пускане на жетон",
              desc: "Всеки гост получава специална монета-жетон, с която активира бутиковата машина.",
            },
            {
              step: "02",
              icon: Gift,
              title: "Избор & Печат на живо",
              desc: "Гостът избира желания подарък — картичка, временна татуировка или книгоразделител.",
            },
            {
              step: "03",
              icon: Heart,
              title: "Спомен за цял живот",
              desc: "Всеки си тръгва с усмивка и личен предмет, изработен специално за Вашето събитие.",
            },
          ].map((item, index) => (
            <Card key={index} className="relative overflow-hidden group">
              <span className="absolute top-4 right-6 text-5xl font-serif font-bold text-brand-secondary group-hover:text-brand-primary/40 transition-colors">
                {item.step}
              </span>
              <div className="w-14 h-14 rounded-2xl bg-brand-secondary flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-dark mb-3">
                {item.title}
              </h3>
              <p className="text-brand-dark/75 font-sans leading-relaxed text-sm sm:text-base">
                {item.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="bg-brand-secondary/40 py-20 border-y border-brand-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-accent font-semibold">
                За всеки специален повод
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-dark mt-2">
                Услуги & Събития
              </h2>
            </div>
            <Link href="/services">
              <Button variant="outline" size="md" className="flex items-center space-x-2">
                <span>Вижте всички услуги</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Сватбено изживяване",
                desc: "Най-вълнуващата алтернатива на традиционната фото кабина. Картички с акварелни рисунки и визии с вашите имена.",
                img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Корпоративно брандиране",
                desc: "Уникална бранд активация за бизнес събития, презентации и фирмани партита с логото на компанията.",
                img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Рождени дни & Юбилеи",
                desc: "Персонализирани подаръци за гостите, съобразени с тематиката и атмосферата на личния Ви празник.",
                img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
              },
            ].map((srv, idx) => (
              <Card key={idx} className="p-0 overflow-hidden group">
                <div className="relative h-56 w-full">
                  <Image
                    src={srv.img}
                    alt={srv.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/10 transition-colors" />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-2xl font-bold text-brand-dark">
                    {srv.title}
                  </h3>
                  <p className="text-brand-dark/75 text-sm font-sans leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs uppercase tracking-widest text-brand-accent font-semibold">
            Прозрачност & Ясни условия
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-dark">
            Изчислете цена за Вашето събитие
          </h2>
          <p className="text-brand-dark/70 text-base font-sans">
            Използвайте нашия интерактивен калкулатор за бърза ориентировъчна цена.
          </p>
        </div>
        <CalculatorWidget />
      </section>

      {/* MASONRY GALLERY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-brand-accent font-semibold">
            Галерия с преживявания
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-dark">
            Моменти, записани в картички
          </h2>
          <p className="text-brand-dark/70 text-base font-sans">
            Разгледайте част от персонализираните подаръци, създадени за наши клиенти.
          </p>
        </div>
        <GalleryGrid />
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-brand-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-brand-accent font-semibold">
              Отзиви от събития
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-dark">
              Какво споделят нашите младоженци & клиенти
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Пощичка беше истинският хит на нашата сватба! Гостите не спираха да се събират около машината. Всеки си тръгна с любима картичка и татуировка.",
                name: "Елена & Виктор",
                role: "Сватбено тържество в Созопол",
              },
              {
                quote:
                  "Търсехме нещо различно за годишното ни корпоративно събитие. Брандираните картички бяха страхотни, а комуникацията с екипа — безупречна!",
                name: "Мария Иванова",
                role: "Event Manager, Tech Corp",
              },
              {
                quote:
                  "Като сватбен агент винаги търся иновативни и стилни концепции. Пощичка внася една незаменима топлота и елегантност.",
                name: "Христина Радева",
                role: "Сватбен организатор",
              },
            ].map((t, idx) => (
              <Card key={idx} className="flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex text-brand-accent space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-brand-dark/80 italic font-serif text-base leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="border-t border-brand-primary/20 pt-4">
                  <h4 className="font-serif font-bold text-brand-dark text-lg">
                    {t.name}
                  </h4>
                  <p className="text-xs text-brand-muted font-sans">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-brand-accent font-semibold">
            Въпроси & Отговори
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-dark">
            Често задавани въпроси
          </h2>
        </div>
        <Accordion items={faqItems} />
      </section>

      {/* FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-brand-dark via-[#383838] to-brand-dark text-white rounded-3xl p-8 sm:p-16 text-center space-y-8 relative overflow-hidden shadow-2xl border border-brand-accent/30">
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
              Готови ли сте да създадем незабравим спомен?
            </h2>
            <p className="text-white/80 font-sans text-base sm:text-lg font-light leading-relaxed">
              Датите за сватбения сезон се запълват бързо. Свържете се с нас, за да проверим наличността за Вашето събитие.
            </p>
            <div className="pt-4">
              <Link href="/booking">
                <Button variant="primary" size="lg" className="text-base px-10 py-4">
                  Изпратете запитване за дата
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
