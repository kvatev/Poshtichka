"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Users,
  MessageSquare,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BookingRecord {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  eventDate: string;
  eventType: string;
  venueLocation: string;
  guestCount: number;
  preferredContact: string;
  message?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

const mockBookingsList: BookingRecord[] = [
  {
    id: "BK-2027-06-17",
    fullName: "Резервация 17.06.2027",
    phone: "+359 888 000 000",
    email: "info@poshtichka.bg",
    eventDate: "2027-06-17",
    eventType: "Сватбено тържество",
    venueLocation: "София, Локация на събитието",
    guestCount: 100,
    preferredContact: "телефон",
    message: "Потвърдена резервация за 17 юни 2027 г.",
    status: "confirmed",
    createdAt: "2026-08-15",
  },
  {
    id: "BK-2027-06-26",
    fullName: "Резервация 26.06.2027",
    phone: "+359 888 000 000",
    email: "info@poshtichka.bg",
    eventDate: "2027-06-26",
    eventType: "Сватбено тържество",
    venueLocation: "Варна, Локация на събитието",
    guestCount: 100,
    preferredContact: "телефон",
    message: "Потвърдена резервация за 26 юни 2027 г.",
    status: "confirmed",
    createdAt: "2026-08-15",
  },
];

export const BookingsManager = () => {
  const [bookings, setBookings] = useState<BookingRecord[]>(mockBookingsList);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBookings(data);
        }
      })
      .catch(() => {});
  }, []);

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.fullName.toLowerCase().includes(search.toLowerCase()) ||
      b.venueLocation.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search);
    const matchesStatus =
      statusFilter === "all" ? true : b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = async (id: string, newStatus: BookingRecord["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }

    try {
      await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
    } catch (err) {
      console.error("Update status error:", err);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Управление на Запитванията ({bookings.length})
          </h2>
          <p className="text-xs text-brand-dark/70 mt-1">
            Всички онлайн резервации за Пощичка
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
              placeholder="Търсене по име, град..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-brand-primary/30 text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent bg-brand-bg/50"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center space-x-1 border border-brand-primary/20 rounded-xl p-1 bg-brand-bg text-xs">
            {[
              { id: "all", label: "Всички" },
              { id: "pending", label: "Чакащи" },
              { id: "confirmed", label: "Потвърдени" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer ${
                  statusFilter === tab.id
                    ? "bg-brand-accent text-white shadow-sm"
                    : "text-brand-dark/70 hover:bg-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <Card className="p-0 overflow-hidden shadow-sm border border-brand-primary/20 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-brand-secondary/40 border-b border-brand-primary/20 text-brand-dark uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Клиент / Събитие</th>
                <th className="p-4">Дата & Локация</th>
                <th className="p-4">Контакт</th>
                <th className="p-4">Гости</th>
                <th className="p-4">Статус</th>
                <th className="p-4 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-primary/10">
              {filteredBookings.map((bk) => (
                <tr key={bk.id} className="hover:bg-brand-bg/60 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-brand-dark text-sm">
                      {bk.fullName}
                    </div>
                    <span className="text-[11px] text-brand-accent font-medium">
                      {bk.eventType}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-brand-dark">
                      📅 {bk.eventDate}
                    </div>
                    <div className="text-[11px] text-brand-muted truncate max-w-[200px]">
                      📍 {bk.venueLocation}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-brand-dark font-medium">{bk.phone}</div>
                    <div className="text-[11px] text-brand-muted">{bk.email}</div>
                  </td>
                  <td className="p-4 font-semibold text-brand-dark">
                    {bk.guestCount} души
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${
                        bk.status === "confirmed"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : "bg-amber-100 text-amber-800 border-amber-300"
                      }`}
                    >
                      {bk.status === "confirmed" ? "Потвърдена" : "В изчакване"}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedBooking(bk)}
                      className="p-1.5 rounded-lg bg-brand-secondary text-brand-accent hover:bg-brand-accent hover:text-white transition-colors"
                      title="Преглед на детайли"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {bk.status === "pending" ? (
                      <button
                        onClick={() => handleUpdateStatus(bk.id, "confirmed")}
                        className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
                        title="Потвърди"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateStatus(bk.id, "pending")}
                        className="p-1.5 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-600 hover:text-white transition-colors"
                        title="Маркирай като чакаща"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div
          onClick={() => setSelectedBooking(null)}
          className="fixed inset-0 z-50 bg-brand-dark/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-brand-primary/30 space-y-6"
          >
            <div className="flex justify-between items-start border-b border-brand-secondary pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-brand-accent font-semibold">
                  {selectedBooking.id}
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-dark mt-1">
                  {selectedBooking.fullName}
                </h3>
              </div>
              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                  selectedBooking.status === "confirmed"
                    ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                    : "bg-amber-100 text-amber-800 border-amber-300"
                }`}
              >
                {selectedBooking.status === "confirmed" ? "Потвърдена" : "В изчакване"}
              </span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-brand-dark/80 bg-brand-bg p-4 rounded-2xl border border-brand-primary/20">
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-brand-accent" />
                <span>
                  <strong>Дата:</strong> {selectedBooking.eventDate} ({selectedBooking.eventType})
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-brand-accent" />
                <span>
                  <strong>Локация:</strong> {selectedBooking.venueLocation}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-4 h-4 text-brand-accent" />
                <span>
                  <strong>Очакван брой гости:</strong> {selectedBooking.guestCount}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-accent" />
                <span>
                  <strong>Телефон:</strong> {selectedBooking.phone}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-accent" />
                <span>
                  <strong>Имейл:</strong> {selectedBooking.email}
                </span>
              </div>
            </div>

            {selectedBooking.message && (
              <div className="space-y-1">
                <span className="text-xs font-semibold text-brand-dark flex items-center space-x-1">
                  <MessageSquare className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Допълнително съобщение от клиента:</span>
                </span>
                <p className="text-xs italic bg-brand-secondary/30 p-3 rounded-xl text-brand-dark/80">
                  &ldquo;{selectedBooking.message}&rdquo;
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedBooking(null)}
              >
                Затвори
              </Button>
              {selectedBooking.status === "pending" && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleUpdateStatus(selectedBooking.id, "confirmed")}
                >
                  Потвърди резервацията
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
