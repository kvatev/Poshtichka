"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Upload, Plus, Trash2, Edit2, Image as ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const GalleryManager = () => {
  const images = [
    {
      id: "1",
      filename: "Tezza_2025_07_07_152559638_1.webp",
      url: "/media/gallery/Tezza_2025_07_07_152559638_1.webp",
      title: "Детайл от бутиковата машина Пощичка",
      category: "Картички & Жетони",
    },
    {
      id: "2",
      filename: "Tezza_2025_07_07_170901960_1.webp",
      url: "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
      title: "Мобилният кът на Пощичка сред природата",
      category: "Сватби & Кът",
    },
    {
      id: "3",
      filename: "Tezza_2025_07_13_155324686.webp",
      url: "/media/gallery/Tezza_2025_07_13_155324686.webp",
      title: "Колекция от марки и монети-жетони",
      category: "Картички & Жетони",
    },
    {
      id: "4",
      filename: "Tezza_2025_07_13_155326413.webp",
      url: "/media/gallery/Tezza_2025_07_13_155326413.webp",
      title: "Пликове за персонализирани спомени",
      category: "Сватби & Детайли",
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Управление на Галерията ({images.length})
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            Качване, подредба и метаданни за снимките от събития
          </p>
        </div>
        <Button variant="primary" size="sm" className="flex items-center space-x-2">
          <Upload className="w-4 h-4" />
          <span>Качи нов кадър</span>
        </Button>
      </div>

      {/* Upload Drag & Drop Dropzone */}
      <Card className="p-8 border-2 border-dashed border-brand-accent/40 bg-brand-bg/30 text-center space-y-3 rounded-3xl hover:bg-brand-bg/60 transition-colors cursor-pointer">
        <div className="w-12 h-12 rounded-full bg-brand-secondary text-brand-accent mx-auto flex items-center justify-center">
          <Upload className="w-6 h-6" />
        </div>
        <div>
          <p className="font-serif font-bold text-brand-dark text-base">
            Плъзнете снимка тук или кликнете за избор
          </p>
          <p className="text-xs text-brand-muted mt-1">
            Поддържани формати: .webp, .jpg, .png (Автоматично оразмеряване & SEO оптимизация)
          </p>
        </div>
      </Card>

      {/* Grid of Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <Card key={img.id} className="p-0 overflow-hidden bg-white border border-brand-primary/20 shadow-sm group">
            <div className="relative h-48 w-full overflow-hidden bg-brand-secondary/30">
              <Image
                src={img.url}
                alt={img.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 text-[10px] uppercase font-bold bg-brand-dark/80 text-white px-2 py-0.5 rounded-full backdrop-blur-md">
                {img.category}
              </span>
            </div>
            <div className="p-4 space-y-2">
              <h4 className="font-bold text-brand-dark text-sm truncate">
                {img.title}
              </h4>
              <p className="text-[11px] text-brand-muted truncate">
                {img.filename}
              </p>
              <div className="flex justify-end space-x-2 pt-2 border-t border-brand-secondary">
                <button
                  className="p-1.5 rounded-lg text-brand-accent hover:bg-brand-secondary transition-colors"
                  title="Редактирай заглавие"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                  title="Премахни снимка"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
