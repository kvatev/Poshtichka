import React from "react";
import { MapGallery } from "@/components/map-gallery";
import { PageWrapper } from "@/components/layout/page-wrapper";

export const metadata = {
  title: "Галерия от изминали събития | Пощичка",
  description:
    "Разгледайте автентичната галерия от събития с Пощичка - интерактивна карта с вендинг машина и кадри от наши събития из цяла България.",
};

export default function GalleryPage() {
  return (
    <PageWrapper>
      <div className="pb-24 font-sans select-none bg-[#f9f6f0]">
        <MapGallery />
      </div>
    </PageWrapper>
  );
}
