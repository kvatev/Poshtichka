"use client";

import React, { useState } from "react";
import { MessageSquareQuote, Star, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const TestimonialsManager = () => {
  const testimonials = [
    {
      id: "1",
      name: "Елена & Виктор",
      role: "Сватбено тържество в Созопол",
      quote: "Пощичка беше истинският хит на нашата сватба! Гостите не спираха да се събират около машината.",
      rating: 5,
      approved: true,
    },
    {
      id: "2",
      name: "Мария Иванова",
      role: "Event Manager, Tech Corp",
      quote: "Търсехме нещо различно за годишното ни корпоративно събитие. Брандираните картички бяха страхотни!",
      rating: 5,
      approved: true,
    },
    {
      id: "3",
      name: "Христина Радева",
      role: "Сватбен организатор",
      quote: "Като сватбен агент винаги търся иновативни и стилни концепции. Пощичка внася незаменима топлота.",
      rating: 5,
      approved: true,
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Отзиви & Мнения ({testimonials.length})
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            Одобрение и редактиране на ревюта от клиенти
          </p>
        </div>
        <Button variant="primary" size="sm" className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Добави отзив</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <Card key={t.id} className="p-6 bg-white border border-brand-primary/20 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs italic text-brand-dark/80 font-serif leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-brand-secondary flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-brand-dark text-sm">{t.name}</h4>
                <p className="text-[11px] text-brand-muted">{t.role}</p>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-300">
                Одобрен
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
