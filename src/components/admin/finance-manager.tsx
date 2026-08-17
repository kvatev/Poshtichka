"use client";

import React, { useState } from "react";
import {
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Clock,
  RefreshCw,
  Search,
  Filter,
  ArrowUpRight,
  Receipt,
  CreditCard,
  Trash2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CrmLead,
  PaymentStatus,
  calculateTotalPrice,
  calculateRemainingBalance,
} from "@/lib/crm-store";

interface FinanceManagerProps {
  leads: CrmLead[];
  onUpdateLead: (updated: CrmLead) => void;
  onDeleteLead?: (id: string) => void;
}

export const FinanceManager = ({ leads, onUpdateLead, onDeleteLead }: FinanceManagerProps) => {
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");

  // Calculate Financial Aggregates
  let totalGrossRevenue = 0;
  let totalTransportCosts = 0;
  let totalDepositsPaid = 0;
  let totalRemainingBalance = 0;

  leads.forEach((l) => {
    const tot = calculateTotalPrice(l.pricing);
    const transport = Number(l.pricing?.transportPrice) || 0;
    const rem = calculateRemainingBalance(l.pricing);
    
    totalGrossRevenue += tot;
    totalTransportCosts += transport;
    totalDepositsPaid += Number(l.pricing?.depositPaid) || 0;
    totalRemainingBalance += rem;
  });

  const totalNetRevenue = Math.max(0, totalGrossRevenue - totalTransportCosts);

  const handlePaymentStatusChange = (lead: CrmLead, newStatus: PaymentStatus) => {
    const updated = {
      ...lead,
      pricing: { ...lead.pricing, paymentStatus: newStatus },
    };
    onUpdateLead(updated);
  };

  const filteredLeads = leads.filter((l) => {
    const q = search.toLowerCase();
    const matchesSearch =
      l.fullName.toLowerCase().includes(q) ||
      l.id.toLowerCase().includes(q) ||
      l.phone.includes(q) ||
      l.city.toLowerCase().includes(q);

    const matchesPayment =
      paymentFilter === "all" ? true : l.pricing.paymentStatus === paymentFilter;

    return matchesSearch && matchesPayment;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-xs">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Финанси & Плащания (Finance Management)
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            Проследяване на чист приход (без гориво), общ приход, разходи и капарота
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Търсене на плащане..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-brand-primary/30 text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent bg-brand-bg/50"
            />
          </div>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-brand-primary/30 text-xs font-semibold text-brand-dark bg-brand-bg/50"
          >
            <option value="all">Всички плащания</option>
            <option value="unpaid">🔴 Неплатени</option>
            <option value="deposit_paid">🟠 С Капаро</option>
            <option value="fully_paid">🟢 Напълно Платени</option>
            <option value="refunded">⚪ Възстановени</option>
          </select>
        </div>
      </div>

      {/* Metric Cards Grid: Net Revenue, Gross Revenue, Fuel Costs, Remaining */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Чист Приход (Без гориво) */}
        <Card className="p-5 bg-emerald-50/80 border-2 border-emerald-300 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-950 uppercase tracking-wider">Чист Приход (Без Гориво)</span>
            <span className="text-xs">✨</span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-700">{totalNetRevenue.toFixed(2)} €</div>
          <p className="text-[10px] text-emerald-800 font-medium">Реален приход след приспадане на горивото</p>
        </Card>

        {/* Card 2: Общ Брутен Приход (С гориво) */}
        <Card className="p-5 bg-white border border-brand-primary/20 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-brand-muted uppercase tracking-wider">Общ Приход (С Гориво)</span>
            <span className="text-xs">🏷️</span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">{totalGrossRevenue.toFixed(2)} €</div>
          <p className="text-[10px] text-brand-muted font-medium">Обща фактурирана стойност от всички {leads.length} резервации</p>
        </Card>

        {/* Card 3: Разход за Транспорт / Гориво */}
        <Card className="p-5 bg-blue-50/70 border border-blue-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-blue-950 uppercase tracking-wider">Разход за Гориво & Път</span>
            <span className="text-xs">⛽</span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-blue-700">{totalTransportCosts.toFixed(2)} €</div>
          <p className="text-[10px] text-blue-800 font-medium">Фирмен разход за транспорт и гориво</p>
        </Card>

        {/* Card 4: Оставащи Плащания */}
        <Card className="p-5 bg-amber-50 border border-amber-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-950 uppercase tracking-wider">Оставащи Плащания</span>
            <span className="text-xs">⏳</span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-700">{totalRemainingBalance.toFixed(2)} €</div>
          <p className="text-[10px] text-amber-800 font-medium">Дължими суми преди събитията</p>
        </Card>
      </div>

      {/* Finance Table */}
      <Card className="p-0 overflow-hidden shadow-xs border border-brand-primary/20 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-brand-secondary/40 border-b border-brand-primary/20 text-brand-dark uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Клиент / Резервация</th>
                <th className="p-4">Дата & Град</th>
                <th className="p-4">Наем & Транспорт</th>
                <th className="p-4">Обща Сума</th>
                <th className="p-4">Капаро</th>
                <th className="p-4">Остатък</th>
                <th className="p-4">Статус на Плащането</th>
                <th className="p-4 text-center">Действие</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-primary/10">
              {filteredLeads.map((l) => {
                const total = calculateTotalPrice(l.pricing);
                const remaining = calculateRemainingBalance(l.pricing);

                return (
                  <tr key={l.id} className="hover:bg-brand-bg/50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-brand-dark text-sm">{l.fullName}</div>
                      <span className="text-[10px] text-brand-accent font-mono font-semibold">
                        {l.id} • {l.eventType}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-brand-dark">📅 {l.eventDate}</div>
                      <div className="text-[10px] text-brand-muted">📍 {l.city}</div>
                    </td>
                    <td className="p-4 text-brand-dark/80">
                      <div>Наем: {l.pricing.rentalPrice} €</div>
                      <div className="text-[10px] text-brand-muted">
                        Транспорт ({l.pricing.distanceKm} км): {l.pricing.transportPrice} €
                      </div>
                    </td>
                    <td className="p-4 font-serif font-bold text-brand-dark text-sm">
                      {total} €
                    </td>
                    <td className="p-4 font-semibold text-emerald-700">
                      {l.pricing.depositPaid} €
                    </td>
                    <td className="p-4 font-bold text-amber-700">
                      {remaining} €
                    </td>
                    <td className="p-4">
                      <select
                        value={l.pricing.paymentStatus}
                        onChange={(e) =>
                          handlePaymentStatusChange(l, e.target.value as PaymentStatus)
                        }
                        className={`px-3 py-1 rounded-full text-xs font-semibold border cursor-pointer ${
                          l.pricing.paymentStatus === "fully_paid"
                            ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                            : l.pricing.paymentStatus === "deposit_paid"
                            ? "bg-amber-100 text-amber-900 border-amber-300"
                            : l.pricing.paymentStatus === "refunded"
                            ? "bg-gray-100 text-gray-800 border-gray-300"
                            : "bg-red-100 text-red-900 border-red-300"
                        }`}
                      >
                        <option value="unpaid">🔴 Неплатено</option>
                        <option value="deposit_paid">🟠 Платено Капаро</option>
                        <option value="fully_paid">🟢 Напълно Платено</option>
                        <option value="refunded">⚪ Възстановено</option>
                      </select>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Сигурни ли сте, че искате да изтриете резервацията за ${l.fullName} (${l.eventDate})?`)) {
                            if (onDeleteLead) {
                              onDeleteLead(l.id);
                            }
                          }
                        }}
                        className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer inline-flex items-center justify-center shadow-xs"
                        title="Изтрий резервацията"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
