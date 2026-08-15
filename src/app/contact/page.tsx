import React, { Suspense } from "react";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { PageHeaderBanner } from "@/components/layout/page-header-banner";
import { ContactForm } from "@/components/contact-form";
import { readCloudOrFileData } from "@/lib/server-storage";
import { ServiceItem } from "@/components/admin/services-manager";

export const metadata = {
  title: "Контакти | Пощичка",
  description:
    "Свържете се с екипа на Пощичка за въпроси, резервации или персонални оферти за Вашето събитие.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const rawServices = await readCloudOrFileData<ServiceItem[]>("services", []);
  const rawContent = await readCloudOrFileData<any>("website-content", {});

  // Exclude "ВЕНДИНГ МАШИНА" as it is connected directly to /booking ("Резервирай сега")
  const nonVendingServices = (rawServices || []).filter(
    (s) => s.id !== "SRV-01" && !String(s.title || "").toLowerCase().includes("вендинг")
  );

  const initialGeneral = {
    address: rawContent?.general?.address || "Бургас, България",
    email: rawContent?.general?.email || "poshtichka@draskanitsi.com",
    instagram: rawContent?.general?.instagram || "@poshtichka",
  };

  return (
    <PageWrapper>
      <div className="space-y-12 pb-24 font-sans select-none bg-[#f9f6f0]">
        {/* Top Banner */}
        <PageHeaderBanner
          title="СВЪРЖЕТЕ СЕ С ЕКИПА НА ПОЩИЧКА"
          subtitle="Имате въпрос или друг тип запитване? Свържете се с нас, за да Ви помогнем!"
          showCurlyArrow={true}
        />

        <Suspense fallback={<div className="text-center py-12">Зареждане...</div>}>
          <ContactForm initialServices={nonVendingServices} initialGeneral={initialGeneral} />
        </Suspense>
      </div>
    </PageWrapper>
  );
}


