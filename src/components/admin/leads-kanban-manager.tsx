"use client";

import React, { useState } from "react";
import {
  Search,
  Kanban,
  Table as TableIcon,
  Plus,
  Eye,
  Calendar,
  MapPin,
  Users,
  Phone,
  Mail,
  DollarSign,
  ChevronDown,
  Filter,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CrmLead,
  LeadStatus,
  leadStatusConfigs,
  calculateTotalPrice,
} from "@/lib/crm-store";
import { BookingDetailModal } from "./booking-detail-modal";

interface LeadsKanbanManagerProps {
  leads: CrmLead[];
  onUpdateLead: (updated: CrmLead) => void;
  onOpenNewLeadModal: () => void;
}

const statusOrder: LeadStatus[] = [
  "new",
  "contacted",
  "proposal_sent",
  "deposit_pending",
  "confirmed",
  "completed",
  "cancelled",
];

export const LeadsKanbanManager = ({
  leads,
  onUpdateLead,
  onOpenNewLeadModal,
}: LeadsKanbanManagerProps) => {
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<CrmLead | null>(null);
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);

  // Extract cities list for filtering
  const citiesList = Array.from(new Set(leads.map((l) => l.city)));

  // Filter leads
  const filteredLeads = leads.filter((l) => {
    const q = search.toLowerCase();
    const matchesSearch =
      l.fullName.toLowerCase().includes(q) ||
      l.phone.includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.city.toLowerCase().includes(q) ||
      l.eventDate.includes(q) ||
      l.id.toLowerCase().includes(q);

    const matchesStatus = statusFilter === "all" ? true : l.status === statusFilter;
    const matchesCity = cityFilter === "all" ? true : l.city === cityFilter;

    return matchesSearch && matchesStatus && matchesCity;
  });

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, leadId: string) => {
    e.dataTransfer.setData("text/plain", leadId);
    setDraggedLeadId(leadId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetStatus: LeadStatus) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData("text/plain") || draggedLeadId;
    if (!leadId) return;

    const targetLead = leads.find((l) => l.id === leadId);
    if (targetLead && targetLead.status !== targetStatus) {
      onUpdateLead({ ...targetLead, status: targetStatus });
    }
    setDraggedLeadId(null);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header controls & filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-xs">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Запитвания & Резервационен Канбан ({filteredLeads.length})
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            Управление на клиенти и сделки през целия процес от запитване до приключено събитие
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Търсене по име, дата, град..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-brand-primary/30 text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent bg-brand-bg/50"
            />
          </div>

          {/* City Filter */}
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-brand-primary/30 text-xs font-medium text-brand-dark bg-brand-bg/50"
          >
            <option value="all">Всички градове</option>
            {citiesList.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* View Switcher: Kanban vs Table */}
          <div className="flex items-center space-x-1 border border-brand-primary/20 rounded-xl p-1 bg-brand-bg text-xs">
            <button
              onClick={() => setViewMode("kanban")}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer ${
                viewMode === "kanban"
                  ? "bg-brand-accent text-white shadow-sm"
                  : "text-brand-dark/70 hover:bg-white"
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Канбан</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer ${
                viewMode === "table"
                  ? "bg-brand-accent text-white shadow-sm"
                  : "text-brand-dark/70 hover:bg-white"
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Таблица</span>
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenNewLeadModal}
            className="flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Ново запитване</span>
          </Button>
        </div>
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 overflow-x-auto pb-4">
          {statusOrder.map((statusKey) => {
            const statusConfig = leadStatusConfigs[statusKey];
            const columnLeads = filteredLeads.filter((l) => l.status === statusKey);

            return (
              <div
                key={statusKey}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, statusKey)}
                className={`rounded-3xl p-3 border space-y-3 min-h-[500px] flex flex-col justify-between transition-colors ${statusConfig.columnColor}`}
              >
                {/* Column Header */}
                <div className="flex justify-between items-center pb-2 border-b border-brand-primary/10 px-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-sm">{statusConfig.icon}</span>
                    <span className="font-serif font-bold text-xs text-brand-dark truncate max-w-[110px]" title={statusConfig.label}>
                      {statusConfig.label}
                    </span>
                  </div>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-full font-mono font-bold text-brand-dark border border-brand-primary/20">
                    {columnLeads.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[70vh] pr-1">
                  {columnLeads.map((lead) => {
                    const priceTotal = calculateTotalPrice(lead.pricing);
                    return (
                      <div
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        onClick={() => setSelectedLead(lead)}
                        className="p-3.5 bg-white border border-brand-primary/20 hover:border-brand-accent hover:shadow-md transition-all space-y-2.5 cursor-pointer group rounded-2xl relative"
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono text-brand-accent font-semibold">
                            {lead.id}
                          </span>
                          <span className="text-[10px] text-brand-muted">
                            {lead.eventDate}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-serif font-bold text-sm text-brand-dark group-hover:text-brand-accent transition-colors leading-tight">
                            {lead.fullName}
                          </h4>
                          <span className="text-[10px] font-medium bg-brand-secondary/60 text-brand-dark px-2 py-0.5 rounded-full inline-block">
                            {lead.eventType}
                          </span>
                        </div>

                        <div className="text-[11px] text-brand-dark/70 space-y-1 font-sans">
                          <div className="flex items-center space-x-1 truncate">
                            <MapPin className="w-3 h-3 text-brand-accent flex-shrink-0" />
                            <span className="truncate">{lead.city}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3 text-brand-accent flex-shrink-0" />
                            <span>{lead.guestCount} гости</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-brand-primary/10 flex justify-between items-center">
                          <span className="font-serif font-bold text-brand-accent text-xs sm:text-sm">
                            {priceTotal} €
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLead(lead);
                            }}
                            className="text-[10px] text-brand-dark/60 hover:text-brand-accent font-semibold flex items-center space-x-1 bg-brand-bg px-2 py-1 rounded-lg"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Детайли</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === "table" && (
        <Card className="p-0 overflow-hidden shadow-xs border border-brand-primary/20 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-brand-secondary/40 border-b border-brand-primary/20 text-brand-dark uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4">Клиент / Запитване</th>
                  <th className="p-4">Дата & Час</th>
                  <th className="p-4">Град & Локация</th>
                  <th className="p-4">Контакт</th>
                  <th className="p-4">Сума</th>
                  <th className="p-4">Статус</th>
                  <th className="p-4 text-right">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-primary/10">
                {filteredLeads.map((lead) => {
                  const statusConfig = leadStatusConfigs[lead.status];
                  const priceTotal = calculateTotalPrice(lead.pricing);

                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-brand-bg/60 transition-colors cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="p-4">
                        <div className="font-bold text-brand-dark text-sm">
                          {lead.fullName}
                        </div>
                        <span className="text-[10px] text-brand-accent font-mono font-semibold">
                          {lead.id} • {lead.eventType}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-brand-dark">📅 {lead.eventDate}</div>
                        <div className="text-[10px] text-brand-muted">
                          🕒 {lead.startTime} - {lead.endTime}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-brand-dark">📍 {lead.city}</div>
                        <div className="text-[10px] text-brand-muted truncate max-w-[180px]">
                          {lead.venueLocation}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-brand-dark">{lead.phone}</div>
                        <div className="text-[10px] text-brand-muted">{lead.email}</div>
                      </td>
                      <td className="p-4 font-serif font-bold text-brand-accent text-sm">
                        {priceTotal} €
                      </td>
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            onUpdateLead({ ...lead, status: e.target.value as LeadStatus })
                          }
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border cursor-pointer ${statusConfig.badgeClass}`}
                        >
                          {statusOrder.map((st) => (
                            <option key={st} value={st}>
                              {leadStatusConfigs[st].label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="p-2 rounded-xl bg-brand-secondary text-brand-accent hover:bg-brand-accent hover:text-white transition-colors"
                          title="Преглед на детайли"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Booking Details Modal */}
      {selectedLead && (
        <BookingDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdateLead={(updated) => {
            onUpdateLead(updated);
            setSelectedLead(updated);
          }}
        />
      )}
    </div>
  );
};
