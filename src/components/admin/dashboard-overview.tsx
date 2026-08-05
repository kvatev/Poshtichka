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
  Calendar,
  Users,
  MapPin,
  DollarSign,
  Activity,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CrmLead, calculateTotalPrice } from "@/lib/crm-store";

interface DashboardOverviewProps {
  leads: CrmLead[];
  onNavigateToTab: (tab: string) => void;
  onSelectLead: (lead: CrmLead) => void;
  onOpenNewLeadModal: () => void;
}

export const DashboardOverview = ({
  leads,
  onNavigateToTab,
  onSelectLead,
  onOpenNewLeadModal,
}: DashboardOverviewProps) => {
  const pendingLeads = leads.filter((l) => l.status === "new" || l.status === "contacted");
  const confirmedLeads = leads.filter((l) => l.status === "confirmed");

  let totalEstRevenue = 0;
  leads.forEach((l) => {
    totalEstRevenue += calculateTotalPrice(l.pricing);
  });

  const stats = [
    {
      title: "Нови Запитвания",
      value: pendingLeads.length.toString(),
      change: "Изискват внимание в 24ч",
      icon: Clock,
      color: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
      title: "Потвърдени Събития",
      value: confirmedLeads.length.toString(),
      change: "Подготвени за изпълнение",
      icon: CalendarCheck,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      title: "Очакван Приход 2026",
      value: `${totalEstRevenue.toFixed(0)} €`,
      change: "Обща стойност на офертите",
      icon: TrendingUp,
      color: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      title: "Общ Брой Сделки",
      value: leads.length.toString(),
      change: "Всички записани в системата",
      icon: ClipboardList,
      color: "text-purple-600 bg-purple-50 border-purple-200",
    },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Welcome & Quick Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-xs">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Добре дошли в CRM таблото на Пощичка! 👋
          </h2>
          <p className="text-sm text-brand-dark/70 mt-1">
            Управлявайте запитванията, заетостта на машината и приходите от едно място
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigateToTab("calendar")}
            className="flex items-center space-x-2 border-brand-primary/30"
          >
            <Calendar className="w-4 h-4 text-brand-accent" />
            <span>Календар заетост</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenNewLeadModal}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Ново запитване</span>
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <Card key={i} className="p-6 space-y-4 shadow-xs border border-brand-primary/20 bg-white">
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

      {/* Main Grid: Latest Leads + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest Inquiries Table */}
        <Card className="lg:col-span-2 p-6 space-y-6 shadow-xs border border-brand-primary/20 bg-white">
          <div className="flex justify-between items-center pb-4 border-b border-brand-secondary">
            <div>
              <h3 className="font-serif text-lg font-bold text-brand-dark">
                Последно Постъпили Запитвания
              </h3>
              <p className="text-xs text-brand-muted">
                Автоматично получени от сайта или въведени от екипа
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab("leads")}
              className="text-xs text-brand-accent hover:underline font-bold"
            >
              Виж всички в Канбан →
            </button>
          </div>

          <div className="space-y-4">
            {leads.slice(0, 5).map((lead) => {
              const price = calculateTotalPrice(lead.pricing);
              return (
                <div
                  key={lead.id}
                  onClick={() => onSelectLead(lead)}
                  className="p-4 rounded-2xl bg-brand-bg/50 border border-brand-primary/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-brand-primary/40 transition-all cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-brand-dark text-sm">
                        {lead.fullName}
                      </span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-brand-secondary text-brand-dark font-semibold">
                        {lead.eventType}
                      </span>
                    </div>
                    <p className="text-xs text-brand-dark/70">
                      📍 {lead.city} • {lead.venueLocation} | 📅 {lead.eventDate} ({lead.startTime})
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="font-serif font-bold text-brand-accent text-sm">
                      {price} €
                    </span>
                    <Button variant="outline" size="sm" className="text-xs">
                      Детайли
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Activity & System Status */}
        <Card className="p-6 space-y-6 shadow-xs border border-brand-primary/20 bg-white flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-brand-primary/10 pb-3">
              <Activity className="w-5 h-5 text-brand-accent" />
              <h3 className="font-serif text-lg font-bold text-brand-dark">
                Последна Активност
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                <span className="font-bold">🟢 Потвърдена Сватба</span>
                <p className="text-[11px]">Светлана Василева потвърди 14.08.2026 в Созопол.</p>
              </div>
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1">
                <span className="font-bold">🟠 Оферта изпратена</span>
                <p className="text-[11px]">DevTech Corp очаква капаро за корпоративно събитие.</p>
              </div>
              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 space-y-1">
                <span className="font-bold">🔵 Транспортна Калкулация</span>
                <p className="text-[11px]">Автоматично изчислени 85 км от Бургас.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-brand-secondary text-[11px] text-center text-brand-muted">
            Пощичка CRM v2.0 • Свързан с <span className="text-emerald-700 font-semibold">Supabase PostgreSQL</span>
          </div>
        </Card>
      </div>
    </div>
  );
};
