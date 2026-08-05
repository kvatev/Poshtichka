"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { GalleryMediaItem } from "@/lib/gallery";

interface GalleryGridProps {
  initialItems?: GalleryMediaItem[];
}

export const GalleryGrid = ({ initialItems = [] }: GalleryGridProps) => {
  const [items, setItems] = useState<GalleryMediaItem[]>(initialItems);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeItem, setActiveItem] = useState<GalleryMediaItem | null>(null);

  useEffect(() => {
    // Dynamically fetch items on client to ensure newly added images are reflected instantly
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch((err) => console.error("Error fetching gallery images:", err));
  }, []);

  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
        {[
          { id: "all", label: "Всички" },
          { id: "weddings", label: "Сватби" },
          { id: "postcards", label: "Картички & Жетони" },
          { id: "private", label: "Интеракция & Празници" },
          { id: "corporate", label: "Корпоративни" },
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
      <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence>
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setActiveItem(item)}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer shadow-glass border border-brand-primary/20 bg-white"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.alt || item.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              </div>

              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10 pointer-events-none">
                <div className="flex justify-between items-start">
                  <span className="text-xs uppercase tracking-widest bg-brand-primary/90 text-brand-dark px-3 py-1 rounded-full font-medium shadow-sm">
                    {item.categoryLabel}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div>
                  <h4 className="font-serif text-xl font-semibold mb-1 group-hover:translate-x-1 transition-transform drop-shadow">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/90 line-clamp-2 font-sans drop-shadow-sm">
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
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-brand-dark/70 text-white flex items-center justify-center hover:bg-brand-dark transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-80 md:h-[480px] w-full bg-brand-secondary/20">
                  <Image
                    src={activeItem.imageUrl}
                    alt={activeItem.alt || activeItem.title}
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
                      <span>Автентичен спомен от Пощичка</span>
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
