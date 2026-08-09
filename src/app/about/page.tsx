import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Heart, Award, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageWrapper } from "@/components/layout/page-wrapper";

export const metadata = {
  title: "За нас & Философия | Пощичка",
  description:
    "Научете историята и философията на Пощичка — бутикова вендинг машина от Бургас, създаваща емоции и спомени за сватби и корпоративни събития.",
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="space-y-24 sm:space-y-32 pb-24">
        {/* Header */}
        <section className="bg-brand-secondary/40 py-16 sm:py-24 border-b border-brand-primary/20">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#00b4b6] font-semibold">
              За нас & Нашата Философия
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-brand-dark">
              Ние не печатаме картички. <br />
              <span className="text-[#00b4b6] italic font-normal">
                Ние създаваме спомени.
              </span>
            </h1>
            <p className="text-brand-dark/80 text-lg sm:text-xl font-sans max-w-2xl mx-auto font-light leading-relaxed">
              Пощичка се роди с една ясна мисия: да превърне традиционния подарък за гости в интерактивно преживяване, което носи истинска радост.
            </p>
          </div>
        </section>

        {/* Main Story Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-brand-primary/30">
            <Image
              src="/media/gallery/Tezza_2025_07_07_170901960_1.webp"
              alt="Автентичният мобилен кът на Пощичка"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 text-[#00b4b6] text-sm font-sans font-medium">
              <Sparkles className="w-5 h-5" />
              <span>Базирани в Бургас | Обслужваме цяла България</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-dark">
              По-различно от стандартната фото кабина
            </h2>

            <p className="text-brand-dark/80 font-sans leading-relaxed text-base sm:text-lg">
              Често ни питат: &quot;Какво точно е Пощичка?&quot;. Ние отговаряме, че това е мястото, където Вашите гости се събират, усмихват се и общуват помежду си.
            </p>

            <p className="text-brand-dark/80 font-sans leading-relaxed text-base sm:text-lg">
              Всеки гост получава специален жетон. Когато го пусне в машината, той не просто получава предмет — той участва в създаването на своя персонализиран спомен (акварелна картичка, временна татуировка или луксозен книгоразделител).
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-brand-primary/20 shadow-sm">
                <span className="font-display text-3xl font-bold text-[#00b4b6]">100%</span>
                <p className="text-xs text-brand-dark/70 font-sans mt-1">
                  Авторски индивидуален дизайн
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-brand-primary/20 shadow-sm">
                <span className="font-display text-3xl font-bold text-[#00b4b6]">50 км</span>
                <p className="text-xs text-brand-dark/70 font-sans mt-1">
                  Безплатен транспорт от Бургас
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Values */}
        <section className="bg-brand-cream py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-dark">
                Нашите Ценности
              </h2>
              <p className="text-brand-dark/70 font-sans">
                Принципите, които правят изживяването с Пощичка незабравимо.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Емоционална стойност",
                  desc: "Физическият подарък има смисъл само когато носи чувство. Ние превръщаме Вашето събитие в емоция.",
                },
                {
                  icon: Award,
                  title: "Безпромисен дизайн",
                  desc: "Нищо при нас не е генерично. Всеки проект се изработва с прецизност от професионален графичен дизайнер.",
                },
                {
                  icon: MapPin,
                  title: "Гъвкавост & Логистика",
                  desc: "Базирани сме в Бургас, но машината ни пътува с удоволствие до всяка точка на България.",
                },
              ].map((v, i) => (
                <Card key={i} className="text-center space-y-4 p-8">
                  <div className="w-14 h-14 rounded-full bg-[#00b4b6]/10 mx-auto flex items-center justify-center text-[#00b4b6]">
                    <v.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-brand-dark">
                    {v.title}
                  </h3>
                  <p className="text-brand-dark/75 font-sans text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto text-center px-4 space-y-6">
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-brand-dark">
            Искате ли да направим Вашето събитие специално?
          </h2>
          <p className="text-brand-dark/80 font-sans text-lg">
            Свържете се с нас за свободна дата и концепция.
          </p>
          <Link href="/booking">
            <Button variant="primary" size="lg">
              Резервирайте дата сега
            </Button>
          </Link>
        </section>
      </div>
    </PageWrapper>
  );
}

