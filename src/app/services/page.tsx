import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { readCloudOrFileData } from "@/lib/server-storage";
import { ServiceItem } from "@/components/admin/services-manager";

export const metadata = {
  title: "Услуги | Пощичка",
  description:
    "Разгледайте нашите първокласни услуги за събития - персонализирани спомени, ретро вендинг машина, автентични печати и интерактивни изживявания.",
};

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await readCloudOrFileData<ServiceItem[]>("services", []);

  return (
    <PageWrapper>
      <div className="pb-24 space-y-12 sm:space-y-16 bg-[#f9f6f0] text-[#182b2c] min-h-screen">
        {/* Top Header Banner with Asset 88@2x.png Background: Edge-to-Edge Full Width */}
        <section className="relative w-full overflow-hidden flex items-center justify-center py-14 sm:py-20 md:py-24 px-4 sm:px-8 text-center border-b border-black/10">
          {/* Background Image: Asset 88@2x.png */}
          <Image
            src={encodeURI("/media/Услуги/Asset 88@2x.png")}
            alt="Всички услуги"
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />

          {/* Banner Text Content */}
          <div className="relative z-10 space-y-3 sm:space-y-4 max-w-4xl mx-auto px-2">
            <h1 className="font-salongbeach text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider text-white leading-tight drop-shadow-sm">
              ВСИЧКИ УСЛУГИ
            </h1>
            <p className="font-stampatello text-sm sm:text-base md:text-lg lg:text-xl text-[#182b2c] font-normal max-w-3xl mx-auto leading-relaxed">
              Предлагаме широка гама от услуги, подходящи за вашето събитие – от поканата, до подарък за самия повод!
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12">
          {services.map((service, index) => {
            return (
              <div
                key={service.id || index}
                className="relative bg-white border-2 border-[#182b2c] shadow-xl rounded-[36px] sm:rounded-[44px] overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col lg:flex-row items-stretch"
              >
                {/* Left Side: Edge-to-Edge Image with No Inner Frame/Padding */}
                <div className="relative w-full lg:w-1/2 min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] flex-shrink-0 bg-gray-100 overflow-hidden">
                  <Image
                    src={service.image || "/media/services/service_SRV-01.webp"}
                    alt={service.title}
                    fill
                    className="object-cover"
                    style={{ objectPosition: service.imagePosition || "center" }}
                    unoptimized
                  />
                </div>

                {/* Right Side: Content */}
                <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6 text-left">
                  <div className="space-y-2">
                    <h2 className="font-salongbeach text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-[#182b2c] tracking-wider leading-tight">
                      {service.title}
                    </h2>
                    {service.subtitle && (
                      <p className="font-stampatello text-base sm:text-lg text-[#00b4b6] font-normal leading-relaxed">
                        {service.subtitle}
                      </p>
                    )}
                  </div>

                  {service.description && (
                    <p className="font-stampatello text-base sm:text-lg text-[#182b2c]/85 leading-relaxed font-normal">
                      {service.description}
                    </p>
                  )}

                  {/* Bullet List with Official Teal Hand-Drawn Checkmark Asset 86@2x.png */}
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-4 pt-2">
                      {service.features.map((feat, i) => (
                        <li key={i} className="flex items-center space-x-3.5 sm:space-x-4">
                          {/* Official Hand-Drawn Teal Checkmark Asset 86@2x.png */}
                          <div className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 relative flex items-center justify-center">
                            <Image
                              src={encodeURI("/media/Услуги/Asset 86@2x.png")}
                              alt="Отметка"
                              width={32}
                              height={32}
                              className="w-full h-full object-contain pointer-events-none"
                              unoptimized
                            />
                          </div>

                          <span className="font-salongbeach font-bold uppercase text-base sm:text-lg lg:text-xl text-[#182b2c] tracking-wider leading-snug">
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA Booking Button */}
                  <div className="pt-4">
                    <Link href="/contact">
                      <Button
                        variant="primary"
                        className="bg-[#00b4b6] hover:bg-[#008b8d] text-white font-salongbeach text-lg font-bold uppercase tracking-wider px-9 py-4 rounded-full shadow-lg flex items-center space-x-2 cursor-pointer"
                      >
                        <span>Резервирай тази услуга</span>
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </PageWrapper>
  );
}
