"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, HelpCircle, Save, X, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const initialFaqs: FAQItem[] = [
  {
    id: "cost",
    question: "Колко струва наемът на Пощичка за събитие?",
    answer:
      "Типичният наем варира между 350€ и 500€ в зависимост от броя гости, времетраенето и избраните продукти (картички, временни татуировки, книгоразделители). Всяко събитие получава индивидуална и прозрачна оферта.",
  },
  {
    id: "design-cost",
    question: "Колко струва изработката на индивидуален дизайн?",
    answer:
      "Графичният дизайн се таксува отделно между 25€ и 50€ според сложността на проекта. Цената включва до 3 кръга от корекции до пълно одобрение от ваша страна.",
  },
  {
    id: "transport",
    question: "Как се изчисляват транспортните разходи?",
    answer:
      "Пощичка е базирана в гр. Бургас. Първите 50 километра са напълно безплатни! След 50-ия километър транспортът се изчислява по 0.23€ на километър.",
  },
  {
    id: "guest-pay",
    question: "Заплащат ли гостите по време на събитието?",
    answer:
      "Не! Гостите получават специални жетони и се наслаждават на преживяването напълно безплатно. Цялото изживяване е подарък от домакина на събитието.",
  },
  {
    id: "customization",
    question: "Могат ли продуктите да съдържат нашите имена или лого?",
    answer:
      "Абсолютно! Всички картички, татуировки и сувенири се изработват с авторска визия, създадена специално за Вашето събитие — с вашите имена, дата, лого или тематични илюстрации.",
  },
];

export const FAQManager = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFaqs);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formQuestion, setFormQuestion] = useState("");
  const [formAnswer, setFormAnswer] = useState("");

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.faq && Array.isArray(data.faq) && data.faq.length > 0) {
          setFaqs(data.faq);
        }
      })
      .catch(() => {});
  }, []);

  const [saveError, setSaveError] = useState<string | null>(null);

  const persistFaqs = async (faqList: FAQItem[]) => {
    setSaving(true);
    setSaved(false);
    setSaveError(null);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("poshtichka_content_faq_items", JSON.stringify(faqList));
      }
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "faq_items", value: faqList }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Грешка при запис.");
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    } catch (err: any) {
      console.error("Save FAQs error:", err);
      setSaveError(err?.message || "Грешка при запис.");
      setTimeout(() => setSaveError(null), 5000);
    } finally {
      setSaving(false);
    }
  };

  const handleGlobalSave = async () => {
    persistFaqs(faqs);
  };

  const handleOpenAdd = () => {
    setFormQuestion("");
    setFormAnswer("");
    setIsAddingNew(true);
    setEditingItem(null);
  };

  const handleOpenEdit = (item: FAQItem) => {
    setEditingItem(item);
    setFormQuestion(item.question);
    setFormAnswer(item.answer);
    setIsAddingNew(false);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestion.trim() || !formAnswer.trim()) return;

    let updatedList = [...faqs];

    if (isAddingNew) {
      const newItem: FAQItem = {
        id: `faq-${Date.now()}`,
        question: formQuestion,
        answer: formAnswer,
      };
      updatedList = [...updatedList, newItem];
    } else if (editingItem) {
      updatedList = updatedList.map((f) =>
        f.id === editingItem.id
          ? { ...f, question: formQuestion, answer: formAnswer }
          : f
      );
    }

    setFaqs(updatedList);
    setIsAddingNew(false);
    setEditingItem(null);

    // Auto-save to API
    persistFaqs(updatedList);
  };

  const handleDelete = (id: string) => {
    if (confirm("Сигурни ли сте, че искате да изтриете този въпрос?")) {
      const updatedList = faqs.filter((f) => f.id !== id);
      setFaqs(updatedList);
      // Auto-save to API
      persistFaqs(updatedList);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Управление на ЧЗВ ({faqs.length})
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            Добавяне, редактиране и премахване на въпроси и отговори
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {saveError && (
            <span className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-xl">
              {saveError}
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenAdd}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4 text-brand-accent" />
            <span>Добави нов въпрос</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleGlobalSave}
            disabled={saving}
            className="flex items-center space-x-2 shrink-0 cursor-pointer shadow-md hover:shadow-lg transition-all"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Запазено в Supabase!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{saving ? "Запазване..." : "Запази ЧЗВ"}</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* FAQ Form (Add or Edit) */}
      {(isAddingNew || editingItem) && (
        <Card className="p-6 sm:p-8 bg-brand-bg/40 border-2 border-brand-accent/40 rounded-3xl space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-brand-primary/20">
            <h3 className="font-serif text-lg font-bold text-brand-dark">
              {isAddingNew ? "Нов въпрос" : "Редактиране на въпрос"}
            </h3>
            <button
              onClick={() => {
                setIsAddingNew(false);
                setEditingItem(null);
              }}
              className="text-brand-muted hover:text-brand-dark"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSaveItem} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-brand-dark">
                Въпрос *
              </label>
              <input
                type="text"
                value={formQuestion}
                onChange={(e) => setFormQuestion(e.target.value)}
                placeholder="напр. Колко време предварително трябва да резервираме?"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-brand-dark">
                Отговор *
              </label>
              <textarea
                rows={3}
                value={formAnswer}
                onChange={(e) => setFormAnswer(e.target.value)}
                placeholder="Въведете подробен и ясен отговор..."
                required
                className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/30 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent bg-white"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsAddingNew(false);
                  setEditingItem(null);
                }}
              >
                Отказ
              </Button>
              <Button type="submit" variant="accent" size="sm" className="flex items-center space-x-1.5">
                <Save className="w-4 h-4" />
                <span>Запази въпроса</span>
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* FAQ Items List */}
      <div className="space-y-4">
        {faqs.map((item, idx) => (
          <Card key={item.id} className="p-6 bg-white border border-brand-primary/20 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-grow">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-accent bg-brand-secondary/50 px-2.5 py-1 rounded-full">
                  Въпрос #{idx + 1}
                </span>
                <h3 className="font-serif text-lg font-bold text-brand-dark">
                  {item.question}
                </h3>
                <p className="text-sm font-sans text-brand-dark/80 leading-relaxed">
                  {item.answer}
                </p>
              </div>

              <div className="flex items-center space-x-2 flex-shrink-0">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-xl bg-brand-secondary text-brand-accent hover:bg-brand-accent hover:text-white transition-colors"
                  title="Редактирай"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                  title="Изтрий"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
