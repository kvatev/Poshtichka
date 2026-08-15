"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  XCircle,
  X,
  Phone,
  Mail,
  Euro,
  Calendar as CalendarIcon,
  Trash2,
  Edit2,
  Save,
  Check,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CrmLead, calculateTotalPrice } from "@/lib/crm-store";

export interface CalendarViewProps {
  leads?: CrmLead[];
  onUpdateLeads?: (updatedLeads: CrmLead[]) => void;
  onSelectLead?: (lead: CrmLead) => void;
}

const MONTH_NAMES = [
  "Януари",
  "Февруари",
  "Март",
  "Април",
  "Май",
  "Юни",
  "Юли",
  "Август",
  "Септември",
  "Октомври",
  "Ноември",
  "Декември",
];

const DAYS_OF_WEEK = ["Пон", "Втор", "Сря", "Четв", "Пет", "Съб", "Нед"];

export const CalendarView = ({
  leads: propsLeads,
  onUpdateLeads,
  onSelectLead,
}: CalendarViewProps) => {
  // Current view date (default June 2027 so the user immediately sees the requested 17.06.27 and 26.06.27 events!)
  const [viewYear, setViewYear] = useState<number>(2027);
  const [viewMonth, setViewMonth] = useState<number>(5); // 0-indexed, 5 = June
  const [internalLeads, setInternalLeads] = useState<CrmLead[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  // Active leads list (use props if provided, otherwise internal state)
  const activeLeads = propsLeads || internalLeads;

  // Modal State
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingLead, setEditingLead] = useState<CrmLead | null>(null);

  // Form fields
  const [formName, setFormName] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formStartTime, setFormStartTime] = useState("16:00");
  const [formEndTime, setFormEndTime] = useState("23:00");
  const [formCity, setFormCity] = useState("София");
  const [formVenue, setFormVenue] = useState("");
  const [formEventType, setFormEventType] = useState("Сватбено тържество");
  const [formGuestCount, setFormGuestCount] = useState<number>(100);
  const [formPrice, setFormPrice] = useState<number>(0);
  const [formDeposit, setFormDeposit] = useState<number>(0);
  const [formStatus, setFormStatus] = useState<"confirmed" | "pending" | "deposit_pending" | "completed" | "cancelled">("confirmed");
  const [formPhone, setFormPhone] = useState("+359 888 000 000");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const fetchBookings = () => {
    if (propsLeads && propsLeads.length > 0) return;
    setLoading(true);
    fetch("/api/bookings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.bookings)) {
          const mapped: CrmLead[] = data.bookings.map((b: any) => ({
            id: b.id,
            fullName: b.fullName || "Резервация",
            phone: b.phone || "",
            email: b.email || "",
            eventType: b.eventType || "Сватбено тържество",
            eventDate: b.eventDate || "",
            startTime: b.startTime || "16:00",
            endTime: b.endTime || "23:00",
            city: b.city || b.venueLocation?.split(",")[0] || "София",
            venueLocation: b.venueLocation || "",
            guestCount: Number(b.guestCount) || 100,
            requestedProducts: b.requestedProducts || ["Персонализирани картички"],
            message: b.message || "",
            createdAt: b.createdAt || new Date().toISOString(),
            status: b.status || "confirmed",
            pricing: b.pricing || {
              rentalPrice: Number(b.price) || 0,
              designPrice: 0,
              distanceKm: 0,
              transportPrice: 0,
              additionalServicesPrice: 0,
              discountAmount: 0,
              depositPaid: Number(b.depositPaid) || 0,
              paymentStatus: "unpaid",
            },
            internalNotes: b.internalNotes || [],
            attachedFiles: b.attachedFiles || [],
            communicationHistory: b.communicationHistory || [],
          }));
          setInternalLeads(mapped);
          if (onUpdateLeads) {
            onUpdateLeads(mapped);
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Navigation handlers
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  const handleGoToDate = (year: number, month: number) => {
    setViewYear(year);
    setViewMonth(month);
  };

  // Calendar cells calculation for the active month & year
  const { calendarCells, monthlyEvents, monthlyRevenue, monthlyDeposit } = useMemo(() => {
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
    // Monday start: Sun = 0 -> 6, Mon = 1 -> 0, etc.
    const emptyDaysBefore = (firstDayIndex + 6) % 7;
    const totalDaysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const cells: (number | null)[] = [];
    for (let i = 0; i < emptyDaysBefore; i++) {
      cells.push(null);
    }
    for (let d = 1; d <= totalDaysInMonth; d++) {
      cells.push(d);
    }

    const monthPrefix = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}`;
    const mEvents = activeLeads.filter((e) => e.eventDate.startsWith(monthPrefix));
    const mRevenue = mEvents.reduce((sum, e) => sum + (calculateTotalPrice(e.pricing) || 0), 0);
    const mDeposit = mEvents.reduce((sum, e) => sum + (Number(e.pricing?.depositPaid) || 0), 0);

    return {
      calendarCells: cells,
      monthlyEvents: mEvents,
      monthlyRevenue: mRevenue,
      monthlyDeposit: mDeposit,
    };
  }, [viewYear, viewMonth, activeLeads]);

  const getEventsForDay = (dayNum: number) => {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
    return activeLeads.filter((e) => e.eventDate === dateStr);
  };

  // Modal open handlers
  const handleOpenAddModal = (dateStr?: string) => {
    setEditingLead(null);
    setFormName("");
    setFormDate(dateStr || `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-01`);
    setFormStartTime("16:00");
    setFormEndTime("23:00");
    setFormCity("София");
    setFormVenue("");
    setFormEventType("Сватбено тържество");
    setFormGuestCount(100);
    setFormPrice(0);
    setFormDeposit(0);
    setFormStatus("confirmed");
    setFormPhone("+359 888 000 000");
    setFormEmail("");
    setFormMessage("");
    setShowModal(true);
  };

  const handleOpenEditModal = (lead: CrmLead) => {
    setEditingLead(lead);
    setFormName(lead.fullName || "");
    setFormDate(lead.eventDate || "");
    setFormStartTime(lead.startTime || "16:00");
    setFormEndTime(lead.endTime || "23:00");
    setFormCity(lead.city || "София");
    setFormVenue(lead.venueLocation || "");
    setFormEventType(lead.eventType || "Сватбено тържество");
    setFormGuestCount(lead.guestCount || 100);
    setFormPrice(calculateTotalPrice(lead.pricing) || 0);
    setFormDeposit(lead.pricing?.depositPaid || 0);
    setFormStatus(lead.status as any || "confirmed");
    setFormPhone(lead.phone || "");
    setFormEmail(lead.email || "");
    setFormMessage(lead.message || "");
    setShowModal(true);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDate.trim()) {
      alert("Моля, изберете дата на събитието.");
      return;
    }

    setSaving(true);

    const priceNum = Number(formPrice) || 0;
    const depositNum = Number(formDeposit) || 0;

    const payload: CrmLead = {
      id: editingLead?.id || `BK-${Date.now()}`,
      fullName: formName.trim() || `Резервация ${formDate}`,
      phone: formPhone.trim(),
      email: formEmail.trim(),
      eventType: formEventType.trim(),
      eventDate: formDate.trim(),
      startTime: formStartTime.trim(),
      endTime: formEndTime.trim(),
      city: formCity.trim(),
      venueLocation: formVenue.trim() || `${formCity.trim()}, Локация на събитието`,
      guestCount: Number(formGuestCount) || 100,
      requestedProducts: editingLead?.requestedProducts || ["Персонализирани картички"],
      message: formMessage.trim(),
      status: formStatus as any,
      pricing: {
        rentalPrice: priceNum,
        designPrice: 0,
        distanceKm: 0,
        transportPrice: 0,
        additionalServicesPrice: 0,
        discountAmount: 0,
        depositPaid: depositNum,
        paymentStatus: depositNum > 0 ? (depositNum >= priceNum && priceNum > 0 ? "fully_paid" : "deposit_paid") : "unpaid",
      },
      createdAt: editingLead?.createdAt || new Date().toISOString(),
      internalNotes: editingLead?.internalNotes || [],
      attachedFiles: editingLead?.attachedFiles || [],
      communicationHistory: editingLead?.communicationHistory || [],
    };

    const updatedLeads = editingLead
      ? activeLeads.map((ev) => (ev.id === editingLead.id ? payload : ev))
      : [payload, ...activeLeads];

    // Optimistically update
    if (onUpdateLeads) {
      onUpdateLeads(updatedLeads);
    } else {
      setInternalLeads(updatedLeads);
    }

    try {
      localStorage.setItem("poshtichka_cached_bookings", JSON.stringify(updatedLeads));
    } catch {}

    try {
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "bookings", value: updatedLeads }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
      setShowModal(false);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Сигурни ли сте, че искате да изтриете тази резервация от календара?")) return;

    const updatedLeads = activeLeads.filter((ev) => ev.id !== id);
    if (onUpdateLeads) {
      onUpdateLeads(updatedLeads);
    } else {
      setInternalLeads(updatedLeads);
    }
    setShowModal(false);

    try {
      localStorage.setItem("poshtichka_cached_bookings", JSON.stringify(updatedLeads));
    } catch {}

    try {
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "bookings", value: updatedLeads }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 font-sans text-[#182b2c]">
      {/* Top Header Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#00b4b6]/20 shadow-sm">
        {/* Month Navigation */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-1 border border-[#00b4b6]/30 rounded-2xl p-1 bg-[#f9f6f0]">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-xl hover:bg-white text-[#182b2c] transition-colors cursor-pointer"
              title="Предишен месец"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Month & Year Display */}
            <div className="px-3 py-1 font-salongbeach text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#00b4b6] flex items-center space-x-2">
              <span>{MONTH_NAMES[viewMonth]}</span>
              <span className="text-[#182b2c]">{viewYear}</span>
            </div>

            <button
              onClick={handleNextMonth}
              className="p-2 rounded-xl hover:bg-white text-[#182b2c] transition-colors cursor-pointer"
              title="Следващ месец"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Jump Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleGoToDate(2027, 5)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                viewYear === 2027 && viewMonth === 5
                  ? "bg-[#00b4b6] text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              ✨ Юни 2027 (Нови събития)
            </button>
            <button
              onClick={() => {
                const now = new Date();
                handleGoToDate(now.getFullYear(), now.getMonth());
              }}
              className="px-3 py-2 rounded-2xl text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
            >
              Днес
            </button>
          </div>
        </div>

        {/* Financial Summary & Add Event CTA */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="bg-[#f9f6f0] px-4 py-2 rounded-2xl border border-[#00b4b6]/20 flex items-center space-x-3">
            <div>
              <div className="text-[10px] uppercase font-bold text-gray-500">Приход за {MONTH_NAMES[viewMonth]}</div>
              <div className="font-salongbeach text-lg font-bold text-emerald-600 tracking-wider">
                {monthlyRevenue.toLocaleString()} € <span className="text-xs text-gray-500 font-sans font-normal">({monthlyEvents.length} събития)</span>
              </div>
            </div>
            {monthlyDeposit > 0 && (
              <div className="border-l border-gray-200 pl-3">
                <div className="text-[10px] uppercase font-bold text-gray-500">Капаро</div>
                <div className="font-salongbeach text-base font-bold text-[#00b4b6] tracking-wider">
                  {monthlyDeposit.toLocaleString()} €
                </div>
              </div>
            )}
          </div>

          <Button
            onClick={() => handleOpenAddModal()}
            className="bg-[#00b4b6] hover:bg-[#008b8d] text-white font-salongbeach text-base font-bold uppercase tracking-wider px-5 py-2.5 rounded-full flex items-center space-x-2 shadow-md cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span>Добави дата</span>
          </Button>
        </div>
      </div>

      {/* Monthly Grid */}
      <Card className="p-4 sm:p-6 shadow-sm border border-[#00b4b6]/20 bg-white rounded-3xl overflow-hidden">
        {/* Days Header */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3 text-center text-xs sm:text-sm font-bold text-[#182b2c] py-2.5 bg-[#f9f6f0] rounded-2xl border border-[#00b4b6]/10">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className={day === "Съб" || day === "Нед" ? "text-[#00b4b6]" : ""}>
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid Cells */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {calendarCells.map((dayNum, idx) => {
            if (dayNum === null) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="min-h-[110px] sm:min-h-[130px] rounded-2xl bg-gray-50/50 p-2 border border-transparent opacity-30"
                />
              );
            }

            const dayEvents = getEventsForDay(dayNum);
            const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
            const hasEvents = dayEvents.length > 0;

            return (
              <div
                key={`day-${dayNum}`}
                onClick={() => {
                  if (hasEvents) {
                    handleOpenEditModal(dayEvents[0]);
                  } else {
                    handleOpenAddModal(dateStr);
                  }
                }}
                className={`min-h-[110px] sm:min-h-[130px] rounded-2xl p-2 sm:p-2.5 border transition-all flex flex-col justify-between cursor-pointer group hover:shadow-md ${
                  hasEvents
                    ? "bg-[#00b4b6]/5 border-[#00b4b6] shadow-xs"
                    : "bg-white border-gray-100 hover:border-[#00b4b6]/40 hover:bg-[#f9f6f0]/50"
                }`}
              >
                {/* Day Header */}
                <div className="flex justify-between items-center mb-1">
                  <span
                    className={`text-xs sm:text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                      hasEvents
                        ? "bg-[#00b4b6] text-white"
                        : "text-[#182b2c] group-hover:bg-[#00b4b6]/10"
                    }`}
                  >
                    {dayNum}
                  </span>

                  {hasEvents && (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                      Заета дата
                    </span>
                  )}
                </div>

                {/* Day Events list */}
                <div className="space-y-1.5 my-auto">
                  {dayEvents.map((ev) => {
                    const price = calculateTotalPrice(ev.pricing);
                    return (
                      <div
                        key={ev.id}
                        className="p-1.5 rounded-xl bg-white border border-[#00b4b6]/30 shadow-xs text-left"
                      >
                        <div className="font-salongbeach text-xs sm:text-sm font-bold text-[#182b2c] truncate">
                          {ev.fullName}
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-gray-500 mt-0.5">
                          <span className="truncate">{ev.city}</span>
                          {price > 0 ? (
                            <span className="font-bold text-emerald-600 font-salongbeach text-xs shrink-0">
                              +{price} €
                            </span>
                          ) : (
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md font-semibold shrink-0">
                              Заета дата
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {!hasEvents && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center py-2 text-[11px] text-[#00b4b6] font-semibold">
                      + Добави
                    </div>
                  )}
                </div>

                {/* Bottom hint */}
                <div className="text-[9px] text-gray-400 text-right">
                  {hasEvents ? `${dayEvents.length} събитие` : ""}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Add / Edit Event Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 font-sans">
          <div className="bg-white rounded-3xl border-2 border-[#00b4b6] max-w-2xl w-full flex flex-col max-h-[92vh] shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#00b4b6]/20 flex items-center justify-between flex-shrink-0 bg-white z-10">
              <h3 className="font-salongbeach text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#00b4b6] flex items-center space-x-2">
                <CalendarIcon className="w-6 h-6 text-[#00b4b6]" />
                <span>{editingLead ? "Редактиране на събитие & сума" : "Добавяне на ново събитие"}</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6 overflow-y-auto custom-modal-scroll flex-1">
              <form id="calendar-event-form" onSubmit={handleSaveModal} className="space-y-4 font-sans text-left">
                {/* Title / Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#182b2c] uppercase tracking-wider">
                    Заглавие на събитието / Клиент / Младоженци *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="напр. Сватба: Марина и Иван"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6] font-semibold"
                  />
                </div>

                {/* Date & Financials Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#182b2c] uppercase tracking-wider">
                      Дата на събитието *
                    </label>
                    <input
                      type="date"
                      required
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#182b2c] uppercase tracking-wider">
                      Сума / Приход (€)
                    </label>
                    <input
                      type="number"
                      min={0}
                      step={10}
                      value={formPrice}
                      onChange={(e) => setFormPrice(Number(e.target.value))}
                      placeholder="0 €"
                      className="w-full px-3 py-2.5 rounded-xl border border-emerald-400 bg-emerald-50/40 text-emerald-800 font-salongbeach text-base font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#182b2c] uppercase tracking-wider">
                      Платено капаро (€)
                    </label>
                    <input
                      type="number"
                      min={0}
                      step={10}
                      value={formDeposit}
                      onChange={(e) => setFormDeposit(Number(e.target.value))}
                      placeholder="0 €"
                      className="w-full px-3 py-2.5 rounded-xl border border-[#00b4b6]/40 bg-[#00b4b6]/5 text-[#00b4b6] font-salongbeach text-base font-bold focus:outline-none focus:ring-2 focus:ring-[#00b4b6]"
                    />
                  </div>
                </div>

                {/* City & Venue */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#182b2c] uppercase tracking-wider">Град / Населено място</label>
                    <input
                      type="text"
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      placeholder="напр. София, Варна, Бургас"
                      className="w-full px-3 py-2.5 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#182b2c] uppercase tracking-wider">Ресторант / Локация</label>
                    <input
                      type="text"
                      value={formVenue}
                      onChange={(e) => setFormVenue(e.target.value)}
                      placeholder="напр. Голф клуб Св. София"
                      className="w-full px-3 py-2.5 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6]"
                    />
                  </div>
                </div>

                {/* Event Type & Status & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#182b2c] uppercase tracking-wider">Вид събитие</label>
                    <select
                      value={formEventType}
                      onChange={(e) => setFormEventType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6] bg-white"
                    >
                      <option value="Сватбено тържество">Сватбено тържество</option>
                      <option value="Корпоративно събитие">Корпоративно събитие</option>
                      <option value="Рожден ден">Рожден ден</option>
                      <option value="Фестивал">Фестивал</option>
                      <option value="Частно парти">Частно парти</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#182b2c] uppercase tracking-wider">Статус</label>
                    <select
                      value={formStatus}
                      onChange={(e: any) => setFormStatus(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6] bg-white font-bold"
                    >
                      <option value="confirmed">🟢 Потвърдена дата</option>
                      <option value="deposit_pending">🟡 Очаква капаро</option>
                      <option value="pending">🔵 Ново запитване</option>
                      <option value="completed">⚫ Приключено</option>
                      <option value="cancelled">🔴 Отказано</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#182b2c] uppercase tracking-wider">Брой гости</label>
                    <input
                      type="number"
                      min={10}
                      value={formGuestCount}
                      onChange={(e) => setFormGuestCount(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6]"
                    />
                  </div>
                </div>

                {/* Contacts & Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#182b2c] uppercase tracking-wider">Телефон за връзка</label>
                    <input
                      type="text"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="+359 888 ..."
                      className="w-full px-3 py-2.5 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#182b2c] uppercase tracking-wider">Имейл</label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="client@example.com"
                      className="w-full px-3 py-2.5 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6]"
                    />
                  </div>
                </div>

                {/* Message / Internal Notes */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#182b2c] uppercase tracking-wider">Бележки & Детайли</label>
                  <textarea
                    rows={3}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Допълнителни изисквания, часове за монтаж, дизайн на марките..."
                    className="w-full px-3 py-2 rounded-xl border border-[#00b4b6]/30 text-[#182b2c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6] resize-none"
                  />
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#f9f6f0]/80 border-t border-[#00b4b6]/20 flex items-center justify-between flex-shrink-0">
              {editingLead ? (
                <button
                  type="button"
                  onClick={() => handleDeleteLead(editingLead.id)}
                  className="px-4 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Изтрий събитието</span>
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  className="rounded-full cursor-pointer px-5"
                >
                  Отказ
                </Button>
                <Button
                  type="submit"
                  form="calendar-event-form"
                  disabled={saving}
                  className="bg-[#00b4b6] hover:bg-[#008b8d] text-white font-salongbeach text-base font-bold uppercase tracking-wider px-6 py-2.5 rounded-full shadow-md cursor-pointer flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "Запазване..." : "Запази събитието"}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
