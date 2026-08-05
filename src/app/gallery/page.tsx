import React from "react";
import { GalleryGrid } from "@/components/gallery-lightbox";

export const metadata = {
  title: "Галерия със спомени | Пощичка",
  description:
    "Разгледайте галерията от персонализирани картички, временни татуировки и сувенири, създадени за сватби и събития в цяла България.",
};

export default function GalleryPage() {
  return (
    <div className="space-y-16 pb-24">
      {/* Header */}
      <section className="bg-brand-secondary/40 py-16 sm:py-24 border-b border-brand-primary/20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs uppercase tracking-widest text-brand-accent font-semibold">
            Галерия
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-brand-dark">
            Спомени, създадени на живо
          </h1>
          <p className="text-brand-dark/80 text-lg sm:text-xl font-sans max-w-2xl mx-auto font-light leading-relaxed">
            Всяка картичка разказва история. Разгледайте уникалните дизайни, създадени за нашите специални клиенти.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <GalleryGrid />
      </section>
    </div>
  );
}
