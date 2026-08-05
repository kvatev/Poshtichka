"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  id: string;
  title: string;
  category: "weddings" | "corporate" | "tattoos" | "postcards" | "private";
  categoryLabel: string;
  imageUrl: string;
  description: string;
}

const sampleGalleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Романтична сватба в морска градина",
    category: "weddings",
    categoryLabel: "Сватби",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    description: "Персонализирани картички с дигитални акварелни илюстрации и специален жетон за гостите.",
  },
  {
    id: "2",
    title: "Временни татуировки за гости",
    category: "tattoos",
    categoryLabel: "Татуировки",
    imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1000&q=80",
    description: "Забавни дизайнерски временни татуировки с инициaлите на младоженците.",
  },
  {
    id: "3",
    title: "Бранд активация за технологична компания",
    category: "corporate",
    categoryLabel: "Корпоративни",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
    description: "Брандирани сувенирни картички за участници в годишна конференцитя.",
  },
  {
    id: "4",
    title: "Книгоразделители от рециклирана хартия",
    category: "postcards",
    categoryLabel: "Картички & Книгоразделители",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80",
    description: "Луксозен печат върху релефна памучна хартия със златни елементи.",
  },
  {
    id: "5",
    title: "Юбилеен рожден ден в иззискан ресторант",
    category: "private",
    categoryLabel: "Лични празници",
    imageUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80",
    description: "Елегантни персонализирани подаръци за 50-годишен юбилей.",
  },
  {
    id: "6",
    title: "Сватбено изживяване на брега на морето",
    category: "weddings",
    categoryLabel: "Сватби",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
    description: "Машината Пощичка посреща гостите с усмивка и специално послание.",
  },
];

export const GalleryGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = selectedCategory === "all"
    ? sampleGalleryItems
    : sampleGalleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
        {[
          { id: "all", label: "Всички" },
          { id: "weddings", label: "Сватби" },
          { id: "corporate", label: "Корпоративни" },
          { id: "tattoos", label: "Татуировки" },
          { id: "postcards", label: "Картички" },
          { id: "private", label: "Лични празници" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={cn(
              "px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-medium transition-all duration-300 cursor-pointer",
              selectedCategory === tab.id
                ? "bg-brand-accent text-white shadow-glow"
                : "bg-white text-brand-dark/80 hover:bg-brand-secondary border border-brand-primary/20"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={() => setActiveItem(item)}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-glass border border-brand-primary/20 bg-white"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                <div className="flex justify-between items-start">
                  <span className="text-xs uppercase tracking-widest bg-brand-primary/90 text-brand-dark px-3 py-1 rounded-full font-medium">
                    {item.categoryLabel}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div>
                  <h4 className="font-serif text-xl font-semibold mb-1 group-hover:translate-x-1 transition-transform">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/80 line-clamp-2 font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItem(null)}
            className="fixed inset-0 z-50 bg-brand-dark/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative border border-brand-primary/30"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-brand-dark/70 text-white flex items-center justify-center hover:bg-brand-dark transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-72 md:h-96 w-full">
                  <Image
                    src={activeItem.imageUrl}
                    alt={activeItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-brand-accent font-semibold">
                      {activeItem.categoryLabel}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark mt-2 mb-4">
                      {activeItem.title}
                    </h3>
                    <p className="text-brand-dark/80 font-sans leading-relaxed text-sm sm:text-base">
                      {activeItem.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-secondary">
                    <div className="flex items-center space-x-2 text-brand-accent text-sm font-sans font-medium">
                      <Heart className="w-4 h-4 fill-current" />
                      <span>Персонализирано изживяване от Пощичка</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
