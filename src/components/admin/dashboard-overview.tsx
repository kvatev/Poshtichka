"use client";

import React from "react";
import {
  ClipboardList,
  CalendarCheck,
  TrendingUp,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Plus,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DashboardOverviewProps {
  onNavigateToTab: (tab: string) => void;
}

export const DashboardOverview = ({ onNavigateToTab }: DashboardOverviewProps) => {
  const stats = [
    {
      title: "Общо запитвания",
      value: "24",
      change: "+12% спрямо миналия месец",
      icon: ClipboardList,
      color: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      title: "Потвърдени събития",
      value: "18",
      change: "Предстоящи за сезона",
      icon: CalendarCheck,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      title: "Очакван приход",
      value: "8,450 €",
      change: "Средно 470 €/събитие",
      icon: TrendingUp,
      color: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
      title: "Чакащи оферти",
      value: "6",
      change: "Изискват отговор в 24ч",
      icon: Clock,
      color: "text-purple-600 bg-purple-50 border-purple-200",
    },
  ];

  const recentBookings = [
    {
      id: "BK-1001",
      client: "Светлана & Димитър",
      type: "Сватбено тържество",
      date: "14 Август 2026",
      location: "Созопол, Ресторант Вятърна Мелница",
      status: "Потвърдена",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      amount: "480 €",
    },
    {
      id: "BK-1002",
      client: "Мартин Тодоров (DevTech Ltd)",
      type: "Корпоративно събитие",
      date: "22 Септември 2026",
      location: "Бургас, Гранд Хотел Приморец",
      status: "В изчакване",
      statusColor: "bg-amber-100 text-amber-800 border-amber-300",
      amount: "520 €",
    },
    {
      id: "BK-1003",
      client: "Елена Василева",
      type: "Юбилей (50г)",
      date: "05 Октомври 2026",
      location: "Поморие, Комплекс Wave Resort",
      status: "Потвърдена",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      amount: "410 €",
    },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Здравейте, Администратор! 👋
          </h2>
          <p className="text-sm text-brand-dark/70 mt-1">
            Ето как вървят резервациите и запитванията за Пощичка днес.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigateToTab("calendar")}
            className="flex items-center space-x-2"
          >
            <span>Виж календар</span>
            <ArrowUpRight className="w-4 h-4" />
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigateToTab("bookings")}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Преглед на запитвания</span>
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <Card key={i} className="p-6 space-y-4 shadow-sm border border-brand-primary/20 bg-white">
              <div className="flex justify-between items-start">
                <span className="text-xs uppercase tracking-wider font-semibold text-brand-muted">
                  {st.title}
                </span>
                <div className={`p-2.5 rounded-xl border ${st.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-brand-dark">
                  {st.value}
                </span>
                <p className="text-xs text-brand-dark/60 mt-1 font-light">
                  {st.change}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Bookings & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inquiries */}
        <Card className="lg:col-span-2 p-6 space-y-6 shadow-sm border border-brand-primary/20 bg-white">
          <div className="flex justify-between items-center pb-4 border-b border-brand-secondary">
            <div>
              <h3 className="font-serif text-lg font-bold text-brand-dark">
                Последно постъпили запитвания
              </h3>
              <p className="text-xs text-brand-muted">
                Автоматично синхронизирани от формата за резервации
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab("bookings")}
              className="text-xs text-brand-accent hover:underline font-medium"
            >
              Виж всички
            </button>
          </div>

          <div className="space-y-4">
            {recentBookings.map((bk) => (
              <div
                key={bk.id}
                className="p-4 rounded-2xl bg-brand-bg/50 border border-brand-primary/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-brand-primary/30 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-brand-dark text-sm">
                      {bk.client}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-secondary text-brand-dark font-medium">
                      {bk.type}
                    </span>
                  </div>
                  <p className="text-xs text-brand-dark/70">
                    📍 {bk.location} | 📅 {bk.date}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium border ${bk.statusColor}`}
                  >
                    {bk.status}
                  </span>
                  <span className="font-serif font-bold text-brand-accent text-sm">
                    {bk.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* System & Inventory Health */}
        <Card className="p-6 space-y-6 shadow-sm border border-brand-primary/20 bg-white flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-brand-dark">
              Статус на оборудването & Консумативи
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-emerald-900">Вендинг Машина №1</span>
                  <p className="text-emerald-700">Готова за работа и транспортиране.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-emerald-900">Метални Жетони</span>
                  <p className="text-emerald-700">Наличност: 850 броя в Бургас.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-amber-900">Памучна Хартия за Картички</span>
                  <p className="text-amber-700">Остават 320 бройки. Препоръчва се презареждане.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-brand-secondary text-xs text-center text-brand-muted">
            База данни: <span className="text-emerald-600 font-semibold">Supabase Active</span>
          </div>
        </Card>
      </div>
    </div>
  );
};
