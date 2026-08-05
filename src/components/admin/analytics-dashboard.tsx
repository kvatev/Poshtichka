"use client";

import React from "react";
import {
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Award,
  BarChart2,
  CheckCircle2,
  Percent,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export const AnalyticsDashboard = () => {
  const stats = [
    { title: "Общо Запитвания", value: "38", change: "+14% този месец", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Потвърдени Сватби", value: "24", change: "63% процента конверсия", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Обслужени Гости", value: "3,850+", change: "Средно 120 / събитие", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Очакван Приход 2026", value: "15,800 €", change: "+22% спрямо 2025", icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  const categoryBreakdown = [
    { category: "Сватбени тържества", percentage: 65, count: "25 събития", barColor: "bg-brand-accent" },
    { category: "Корпоративни партита & Брандинг", percentage: 20, count: "8 събития", barColor: "bg-blue-500" },
    { category: "Рождени дни & Юбилеи", percentage: 10, count: "4 събития", barColor: "bg-purple-500" },
    { category: "Други лични празници", percentage: 5, count: "1 събитие", barColor: "bg-amber-500" },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-xs">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Аналитика & Резултати (Analytics & Insights)
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            Ключови показатели за запитванията, конверсията и популярността на събитията
          </p>
        </div>

        <div className="inline-flex items-center space-x-2 bg-brand-secondary px-3 py-1.5 rounded-full text-xs font-semibold text-brand-accent">
          <TrendingUp className="w-4 h-4" />
          <span>Активен сезон 2026</span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <Card key={i} className="p-6 bg-white border border-brand-primary/20 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  {st.title}
                </span>
                <div className={`w-10 h-10 rounded-2xl ${st.bg} ${st.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-brand-dark">
                  {st.value}
                </span>
                <p className="text-xs text-brand-accent font-medium mt-1">
                  {st.change}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts & Categorization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card className="p-6 sm:p-8 bg-white border border-brand-primary/20 shadow-xs space-y-6">
          <div className="flex items-center space-x-2 border-b border-brand-primary/10 pb-4">
            <BarChart2 className="w-5 h-5 text-brand-accent" />
            <h3 className="font-serif text-xl font-bold text-brand-dark">
              Разпределение по Видове Събития
            </h3>
          </div>

          <div className="space-y-4">
            {categoryBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-brand-dark">
                  <span>{item.category}</span>
                  <span className="text-brand-muted">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="h-3 w-full bg-brand-bg rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.barColor} rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Popular Months Distribution */}
        <Card className="p-6 sm:p-8 bg-white border border-brand-primary/20 shadow-xs space-y-6">
          <div className="flex items-center space-x-2 border-b border-brand-primary/10 pb-4">
            <Award className="w-5 h-5 text-brand-accent" />
            <h3 className="font-serif text-xl font-bold text-brand-dark">
              Пиков Сезон & Заетост
            </h3>
          </div>

          <div className="space-y-3 text-xs font-sans">
            {[
              { month: "Юни 2026", load: "85% Заетост", status: "Почти запълнен" },
              { month: "Юли 2026", load: "95% Заетост", status: "Пиков месец" },
              { month: "Август 2026", load: "90% Заетост", status: "Пиков месец" },
              { month: "Септември 2026", load: "70% Заетост", status: "Свободни слотове" },
            ].map((m, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-2xl bg-brand-bg/50 border border-brand-primary/10"
              >
                <span className="font-bold text-brand-dark">{m.month}</span>
                <div className="flex items-center space-x-3">
                  <span className="text-brand-accent font-semibold">{m.load}</span>
                  <span className="bg-brand-secondary text-brand-dark px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                    {m.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
