import React from "react";
import { GalleryGrid } from "@/components/gallery-lightbox";
import { MapGallery } from "@/components/map-gallery";
import { getGalleryItems } from "@/lib/gallery";
import { PageWrapper } from "@/components/layout/page-wrapper";

export const metadata = {
  title: "Галерия със спомени | Пощичка",
  description:
    "Разгледайте автентичната галерия от събития с Пощичка - картички, табло с марки, пликове за спомени и интерактивна карта с вендинг машина на живо.",
};

export default function GalleryPage() {
  const items = getGalleryItems();

  return (
    <PageWrapper>
      <div className="space-y-16 pb-24">
        {/* Header */}
        <section className="bg-brand-cream py-16 sm:py-24 border-b border-[#00b4b6]/20">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#00b4b6] font-semibold">
              Автентична Галерия & Карта
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-brand-dark">
              Спомени, създадени на живо
            </h1>
            <p className="text-brand-dark/80 text-lg sm:text-xl font-sans max-w-2xl mx-auto font-light leading-relaxed">
              Разгледайте истински кадри от мобилния кът на Пощичка, авторските картички, монети-жетони и щастливи моменти от наши събития из цяла България.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <MapGallery />
          <GalleryGrid initialItems={items} />
        </section>
      </div>
    </PageWrapper>
  );
}

