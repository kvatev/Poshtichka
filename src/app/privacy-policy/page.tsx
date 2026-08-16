import React from "react";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { PageHeaderBanner } from "@/components/layout/page-header-banner";

export const metadata = {
  title: "Политика за поверителност | Пощичка",
  description:
    "Политика за защита на личните данни съгласно Общия регламент за защита на данните (GDPR) на Пощичка.",
};

export default function PrivacyPolicyPage() {
  return (
    <PageWrapper>
      <div className="space-y-12 pb-24 font-sans select-none bg-[#f9f6f0]">
        {/* Top Header Banner */}
        <PageHeaderBanner
          title="ПОЛИТИКА ЗА ПОВЕРИТЕЛНОСТ"
          subtitle="Защита на личните данни съгласно европейския регламент (GDPR) на Пощичка"
          showCurlyArrow={false}
        />

        {/* Content Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="bg-white rounded-[32px] sm:rounded-[40px] border-2 border-[#2d3a37]/80 p-8 sm:p-14 shadow-xl space-y-8 text-[#182b2c] leading-relaxed">
            <div className="border-b border-[#e2ded7] pb-4">
              <p className="text-xs sm:text-sm text-[#5b6968] font-sans uppercase tracking-wider font-semibold">
                Последна актуализация: Август 2026 г. • В съответствие с Регламент (ЕС) 2016/679 (GDPR)
              </p>
            </div>

            {/* 1. Администратор */}
            <section className="space-y-3">
              <h2 className="font-salongbeach text-2xl sm:text-3xl font-bold uppercase text-[#00b4b6] tracking-wide">
                1. Администратор на лични данни
              </h2>
              <p className="text-sm sm:text-base text-[#2d3a37]">
                Администратор на личните данни, събирани чрез уебсайта{" "}
                <strong className="text-[#182b2c]">poshtichka.eu</strong>, е екипът на{" "}
                <strong className="text-[#00b4b6]">„Пощичка“</strong>, със седалище в гр. Бургас, България.
                За всякакви въпроси относно обработката и защитата на Вашите данни можете да се свържете с нас
                на официалния ни имейл:{" "}
                <a
                  href="mailto:info@poshtichka.eu"
                  className="text-[#00b4b6] font-semibold underline hover:text-[#008b8d]"
                >
                  info@poshtichka.eu
                </a>
                .
              </p>
            </section>

            {/* 2. Какви лични данни събираме */}
            <section className="space-y-3">
              <h2 className="font-salongbeach text-2xl sm:text-3xl font-bold uppercase text-[#00b4b6] tracking-wide">
                2. Какви лични данни събираме
              </h2>
              <p className="text-sm sm:text-base text-[#2d3a37]">
                При попълване на контактните форми, анкети за резервация или ценови калкулатори на сайта,
                ние събираме само доброволно предоставена от Вас информация:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-[#2d3a37] pl-2">
                <li>
                  <strong>Имена</strong> (на клиента или младоженците);
                </li>
                <li>
                  <strong>Телефонен номер</strong> (за директна връзка и потвърждение);
                </li>
                <li>
                  <strong>Имейл адрес</strong> (за изпращане на оферти и детайли);
                </li>
                <li>
                  <strong>Instagram потребителско име</strong> (при избор на Instagram като предпочитан канал за контакт);
                </li>
                <li>
                  <strong>Детайли за събитието:</strong> дата, град/локация, вид събитие, брой гости и избрани видове хартиени носители.
                </li>
              </ul>
            </section>

            {/* 3. За какви цели обработваме данните */}
            <section className="space-y-3">
              <h2 className="font-salongbeach text-2xl sm:text-3xl font-bold uppercase text-[#00b4b6] tracking-wide">
                3. Цел на обработката (За какво се използват)
              </h2>
              <p className="text-sm sm:text-base text-[#2d3a37]">
                Предоставените от Вас данни се използват <strong>изключително и само</strong> за:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-[#2d3a37] pl-2">
                <li>Отговор на Вашето клиентско запитване;</li>
                <li>Изготвяне на индивидуална ценова оферта и проверка за наличност на датата;</li>
                <li>Организация, координация и провеждане на интерактивното преживяване на Вашето събитие;</li>
                <li>Обратна връзка и издаване на необходимите счетоводни документи при потвърдена резервация.</li>
              </ul>
              <p className="text-sm sm:text-base text-[#2d3a37] pt-1">
                Ние <strong>НЕ</strong> продаваме, <strong>НЕ</strong> отдаваме под наем и{" "}
                <strong>НЕ</strong> предоставяме Вашите данни на трети страни за търговски или рекламни цели.
              </p>
            </section>

            {/* 4. Правно основание и съхранение */}
            <section className="space-y-3">
              <h2 className="font-salongbeach text-2xl sm:text-3xl font-bold uppercase text-[#00b4b6] tracking-wide">
                4. Правно основание и сигурност
              </h2>
              <p className="text-sm sm:text-base text-[#2d3a37]">
                Обработката на личните данни се извършва на основание чл. 6, ал. 1, б. „б“ от GDPR
                (предприемане на стъпки по искане на субекта на данните преди сключването на договор) и б. „а“
                (изрично доброволно съгласие при изпращане на формата).
              </p>
              <p className="text-sm sm:text-base text-[#2d3a37]">
                Всички съобщения и данни се предават чрез криптирана SSL/TLS връзка и се обработват
                чрез сигурни облачни сървъри и защитени имейл протоколи.
              </p>
            </section>

            {/* 5. Вашите права съгласно GDPR */}
            <section className="space-y-3">
              <h2 className="font-salongbeach text-2xl sm:text-3xl font-bold uppercase text-[#00b4b6] tracking-wide">
                5. Вашите права съгласно GDPR
              </h2>
              <p className="text-sm sm:text-base text-[#2d3a37]">
                Вие разполагате със следните неотменими права по всяко време:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-[#2d3a37] pl-2">
                <li>
                  <strong>Право на достъп:</strong> да получите информация какви данни съхраняваме за Вас;
                </li>
                <li>
                  <strong>Право на коригиране:</strong> да поискате актуализиране или коригиране на неточни данни;
                </li>
                <li>
                  <strong>Право на изтриване („Право да бъдеш забравен“):</strong> да поискате пълно заличаване на личните Ви данни от нашата база;
                </li>
                <li>
                  <strong>Право на ограничаване:</strong> да поискате временно спиране на обработката;
                </li>
                <li>
                  <strong>Право на възражение:</strong> да възразите срещу обработването на Вашите лични данни.
                </li>
              </ul>
              <p className="text-sm sm:text-base text-[#2d3a37] pt-2">
                За да упражните което и да е от правата си, е достатъчно да ни изпратите кратко съобщение на{" "}
                <a
                  href="mailto:info@poshtichka.eu"
                  className="text-[#00b4b6] font-semibold underline hover:text-[#008b8d]"
                >
                  info@poshtichka.eu
                </a>
                .
              </p>
            </section>

            {/* Back Button */}
            <div className="pt-6 border-t border-[#e2ded7] flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 text-sm font-semibold text-[#00b4b6] hover:text-[#182b2c] transition-colors"
              >
                <span>← Към началната страница</span>
              </Link>
              <Link
                href="/booking"
                className="inline-flex items-center space-x-2 bg-[#00b4b6] hover:bg-[#008b8d] text-white font-salongbeach text-base font-bold uppercase tracking-wider px-6 py-2.5 rounded-full transition-all shadow-md"
              >
                <span>РЕЗЕРВИРАЙ ПОЩИЧКА</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
