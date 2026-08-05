"use client";

import React, { useState } from "react";
import { Search, User, Phone, Mail, MapPin, Calendar, FileText, Paperclip, Eye, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CrmLead, calculateTotalPrice } from "@/lib/crm-store";

interface CustomersManagerProps {
  leads: CrmLead[];
  onSelectLead: (lead: CrmLead) => void;
}

export const CustomersManager = ({ leads, onSelectLead }: CustomersManagerProps) => {
  const [search, setSearch] = useState("");
  const [selectedCustomerEmail, setSelectedCustomerEmail] = useState<string | null>(null);

  // Group leads by customer email/phone
  const customerMap = new Map<
    string,
    {
      fullName: string;
      email: string;
      phone: string;
      city: string;
      leads: CrmLead[];
      totalSpent: number;
    }
  >();

  leads.forEach((l) => {
    const key = l.email.toLowerCase() || l.phone;
    const price = calculateTotalPrice(l.pricing);

    if (!customerMap.has(key)) {
      customerMap.set(key, {
        fullName: l.fullName,
        email: l.email,
        phone: l.phone,
        city: l.city,
        leads: [l],
        totalSpent: price,
      });
    } else {
      const existing = customerMap.get(key)!;
      existing.leads.push(l);
      existing.totalSpent += price;
    }
  });

  const customersList = Array.from(customerMap.values());

  const filteredCustomers = customersList.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.fullName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.city.toLowerCase().includes(q)
    );
  });

  const activeCustomer = selectedCustomerEmail
    ? customerMap.get(selectedCustomerEmail)
    : null;

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-xs">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Клиентски Профили & История (Customer Directory)
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            База данни с всички клиенти, техните резервации, плащания и файлове
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Търсене по клиент, град, телефон..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-brand-primary/30 text-xs text-brand-dark bg-brand-bg/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customers Table / List */}
        <Card className="lg:col-span-2 p-0 overflow-hidden shadow-xs border border-brand-primary/20 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-brand-secondary/40 border-b border-brand-primary/20 text-brand-dark uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4">Клиент</th>
                  <th className="p-4">Град</th>
                  <th className="p-4">Брой Резервации</th>
                  <th className="p-4">Обща Стойност</th>
                  <th className="p-4 text-right">Действие</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-primary/10">
                {filteredCustomers.map((c) => (
                  <tr
                    key={c.email}
                    className="hover:bg-brand-bg/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedCustomerEmail(c.email.toLowerCase())}
                  >
                    <td className="p-4">
                      <div className="font-bold text-brand-dark text-sm">{c.fullName}</div>
                      <div className="text-[10px] text-brand-muted">{c.email} • {c.phone}</div>
                    </td>
                    <td className="p-4 font-semibold text-brand-dark">📍 {c.city}</td>
                    <td className="p-4 font-bold text-brand-dark">{c.leads.length} събития</td>
                    <td className="p-4 font-serif font-bold text-brand-accent text-sm">
                      {c.totalSpent.toFixed(2)} €
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCustomerEmail(c.email.toLowerCase())}
                        className="text-xs"
                      >
                        Виж профила
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Selected Customer Profile Card */}
        <Card className="p-6 bg-white border border-brand-primary/20 space-y-6 shadow-xs h-fit">
          {activeCustomer ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 border-b border-brand-primary/10 pb-4">
                <div className="w-12 h-12 rounded-full bg-brand-primary/30 border border-brand-accent flex items-center justify-center text-brand-dark font-serif font-bold text-lg">
                  {activeCustomer.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-brand-dark">
                    {activeCustomer.fullName}
                  </h3>
                  <p className="text-xs text-brand-muted">{activeCustomer.city}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-brand-accent" />
                  <span>{activeCustomer.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-brand-accent" />
                  <span>{activeCustomer.email}</span>
                </div>
              </div>

              <div className="p-4 bg-brand-bg rounded-2xl border border-brand-primary/20 space-y-1">
                <span className="text-[10px] uppercase font-bold text-brand-muted">Общ Приход от Клиента</span>
                <div className="font-serif text-2xl font-bold text-brand-accent">{activeCustomer.totalSpent.toFixed(2)} €</div>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif font-bold text-sm text-brand-dark border-b border-brand-primary/10 pb-1">
                  История на Резервациите ({activeCustomer.leads.length})
                </h4>

                {activeCustomer.leads.map((l) => (
                  <div
                    key={l.id}
                    onClick={() => onSelectLead(l)}
                    className="p-3 rounded-2xl bg-brand-bg/50 border border-brand-primary/20 hover:border-brand-accent transition-all cursor-pointer text-xs space-y-1"
                  >
                    <div className="flex justify-between items-center font-bold text-brand-dark">
                      <span>{l.id} • {l.eventType}</span>
                      <span className="text-brand-accent">{calculateTotalPrice(l.pricing)} €</span>
                    </div>
                    <div className="text-[10px] text-brand-muted">
                      📅 {l.eventDate} | 📍 {l.venueLocation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-brand-muted font-sans space-y-2">
              <User className="w-8 h-8 text-brand-muted/50 mx-auto" />
              <p>Изберете клиент от списъка вляво, за да разгледате пълната му история.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
