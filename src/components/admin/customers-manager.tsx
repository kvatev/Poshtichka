"use client";

import React from "react";
import { Users, Mail, Phone, Calendar, Search } from "lucide-react";
import { Card } from "@/components/ui/card";

export const CustomersManager = () => {
  const customers = [
    {
      name: "Светлана & Димитър Василеви",
      email: "svetlana@example.com",
      phone: "+359 888 123 456",
      city: "Созопол",
      eventsCount: 1,
      totalSpent: "480 €",
    },
    {
      name: "Мартин Тодоров (DevTech Ltd)",
      email: "martin@devtech.bg",
      phone: "+359 889 987 654",
      city: "Бургас",
      eventsCount: 2,
      totalSpent: "970 €",
    },
    {
      name: "Елена Стоянова",
      email: "elena@example.com",
      phone: "+359 887 555 444",
      city: "Поморие",
      eventsCount: 1,
      totalSpent: "410 €",
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            База Данни Клиенти ({customers.length})
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            История на събитията и контакти на младоженци и корпоративни партньори
          </p>
        </div>
      </div>

      <Card className="p-0 overflow-hidden shadow-sm border border-brand-primary/20 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-brand-secondary/40 border-b border-brand-primary/20 text-brand-dark uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Име на клиент</th>
                <th className="p-4">Имейл</th>
                <th className="p-4">Телефон</th>
                <th className="p-4">Град</th>
                <th className="p-4">Събития</th>
                <th className="p-4 text-right">Обща сума</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-primary/10">
              {customers.map((c, idx) => (
                <tr key={idx} className="hover:bg-brand-bg/60 transition-colors">
                  <td className="p-4 font-bold text-brand-dark">{c.name}</td>
                  <td className="p-4 text-brand-muted">{c.email}</td>
                  <td className="p-4 font-medium text-brand-dark">{c.phone}</td>
                  <td className="p-4 text-brand-muted">{c.city}</td>
                  <td className="p-4 font-semibold text-brand-dark">{c.eventsCount}</td>
                  <td className="p-4 text-right font-serif font-bold text-brand-accent">
                    {c.totalSpent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
