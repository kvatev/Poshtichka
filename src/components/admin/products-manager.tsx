"use client";

import React from "react";
import { Package, Plus, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ProductsManager = () => {
  const products = [
    {
      id: "P1",
      name: "Персонализирани Акварелни Картички",
      category: "Картички",
      stock: "1,200 бр.",
      status: "В наличност",
    },
    {
      id: "P2",
      name: "Временни Татуировки с Инициали",
      category: "Татуировки",
      stock: "850 бр.",
      status: "В наличност",
    },
    {
      id: "P3",
      name: "Луксозни Книгоразделители",
      category: "Книгоразделители",
      stock: "600 бр.",
      status: "В наличност",
    },
    {
      id: "P4",
      name: "Специални Метални Жетони Poshtichka",
      category: "Аксесоари",
      stock: "850 бр.",
      status: "В наличност",
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Каталог на Продуктите & Сувенирите ({products.length})
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            Наличности на консумативи и артикули за вендинг машината
          </p>
        </div>
        <Button variant="primary" size="sm" className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Добави нов продукт</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <Card key={p.id} className="p-6 bg-white border border-brand-primary/20 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-secondary flex items-center justify-center text-brand-accent">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-brand-accent tracking-wider">
                {p.category}
              </span>
              <h4 className="font-serif font-bold text-brand-dark text-base mt-0.5">
                {p.name}
              </h4>
            </div>
            <div className="pt-2 border-t border-brand-secondary flex items-center justify-between text-xs">
              <span className="text-brand-muted">Наличност:</span>
              <span className="font-bold text-brand-dark">{p.stock}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
