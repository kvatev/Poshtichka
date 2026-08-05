"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CalendarEvent {
  id: string;
  title: string;
  client: string;
  phone: string;
  email: string;
  eventType: "сватба" | "корпоративно" | "рожден-ден" | "друго";
  date: string; // YYYY-MM-DD
  dayNumber: number;
  time: string;
  venue: string;
  guestCount: number;
  status: "confirmed" | "pending" | "completed";
  price: string;
}

const sampleEvents: CalendarEvent[] = [
  {
    id: "EV-01",
    title: "Сватба: Светлана & Димитър",
    client: "Светлана Василева",
    phone: "+359 888 123 456",
    email: "svetlana@example.com",
    eventType: "сватба",
    date: "2026-08-14",
    dayNumber: 14,
    time: "16:00 - 22:00",
    venue: "Созопол, Ресторант Вятърна Мелница",
    guestCount: 120,
    status: "confirmed",
    price: "480 €",
  },
  {
    id: "EV-02",
    title: "Корпоративно: DevTech Annual",
    client: "Мартин Тодоров",
    phone: "+359 889 987 654",
    email: "martin@devtech.bg",
    eventType: "корпоративно",
    date: "2026-08-22",
    dayNumber: 22,
    time: "18:00 - 23:00",
    venue: "Бургас, Гранд Хотел Приморец",
    guestCount: 200,
    status: "pending",
    price: "520 €",
  },
  {
    id: "EV-03",
    title: "Юбилей 50г: Елена",
    client: "Елена Стоянова",
    phone: "+359 887 555 444",
    email: "elena@example.com",
    eventType: "рожден-ден",
    date: "2026-08-28",
    dayNumber: 28,
    time: "19:00 - 00:00",
    venue: "Поморие, Wave Resort",
    guestCount: 80,
    status: "confirmed",
    price: "410 €",
  },
];

const daysOfWeek = ["Пон", "Втор", "Сря", "Четв", "Пет", "Съб", "Нед"];

export const CalendarView = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [currentMonth, setCurrentMonth] = useState("Август 2026");

  // Grid dates for August 2026 (Starts on Saturday, 31 days)
  // Offset for Monday start: Sat = index 5
  const emptyDaysBefore = 5; 
  const totalDaysInMonth = 31;
  const calendarCells = [];

  for (let i = 0; i < emptyDaysBefore; i++) {
    calendarCells.push(null);
  }
  for (let day = 1; day <= totalDaysInMonth; day++) {
    calendarCells.push(day);
  }

  const getEventsForDay = (dayNum: number) => {
    return sampleEvents.filter((e) => e.dayNumber === dayNum);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Calendar Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-primary/20 shadow-sm">
        <div className="flex items-center space-x-4">
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            {currentMonth}
          </h2>
          <div className="flex items-center space-x-1 border border-brand-primary/20 rounded-xl p-1 bg-brand-bg">
            <button
              onClick={() => setCurrentMonth("Юли 2026")}
              className="p-1.5 rounded-lg hover:bg-white text-brand-dark transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentMonth("Август 2026")}
              className="px-2.5 py-1 text-xs font-semibold text-brand-accent hover:bg-white rounded-lg"
            >
              Днес
            </button>
            <button
              onClick={() => setCurrentMonth("Септември 2026")}
              className="p-1.5 rounded-lg hover:bg-white text-brand-dark transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Legend & Add button */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-brand-dark/80">Потвърдена</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-brand-dark/80">В изчакване</span>
          </div>
          <Button variant="primary" size="sm" className="flex items-center space-x-1.5">
            <Plus className="w-4 h-4" />
            <span>Добави събитие</span>
          </Button>
        </div>
      </div>

      {/* Google Calendar-Style Grid */}
      <Card className="p-4 shadow-sm border border-brand-primary/20 bg-white overflow-hidden">
        {/* Days Header */}
        <div className="grid grid-cols-7 gap-px bg-brand-primary/20 rounded-2xl overflow-hidden mb-2 text-center text-xs font-semibold text-brand-dark py-2.5 bg-brand-secondary/50">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {calendarCells.map((dayNum, idx) => {
            if (dayNum === null) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="min-h-[110px] rounded-2xl bg-brand-bg/30 p-2 border border-transparent opacity-30"
                />
              );
            }

            const dayEvents = getEventsForDay(dayNum);
            const isToday = dayNum === 5; // Highlight current day

            return (
              <div
                key={`day-${dayNum}`}
                className={`min-h-[110px] rounded-2xl p-2.5 border transition-all flex flex-col justify-between ${
                  isToday
                    ? "bg-brand-primary/10 border-brand-accent shadow-sm"
                    : "bg-white border-brand-primary/15 hover:border-brand-primary/40"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span
                    className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                      isToday
                        ? "bg-brand-accent text-white"
                        : "text-brand-dark/80"
                    }`}
                  >
                    {dayNum}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className="text-[10px] text-brand-muted font-medium">
                      {dayEvents.length} събитие
                    </span>
                  )}
                </div>

                {/* Event Chips */}
                <div className="space-y-1.5 flex-grow">
                  {dayEvents.map((ev) => (
                    <button
                      key={ev.id}
                      onClick={() => setSelectedEvent(ev)}
                      className={`w-full text-left p-1.5 rounded-xl text-xs font-medium border transition-transform hover:scale-[1.02] cursor-pointer truncate ${
                        ev.status === "confirmed"
                          ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                          : "bg-amber-50 text-amber-900 border-amber-300"
                      }`}
                    >
                      <div className="flex items-center space-x-1">
                        <span
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            ev.status === "confirmed" ? "bg-emerald-500" : "bg-amber-500"
                          }`}
                        />
                        <span className="truncate">{ev.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Event Details Drawer/Modal */}
      {selectedEvent && (
        <div
          onClick={() => setSelectedEvent(null)}
          className="fixed inset-0 z-50 bg-brand-dark/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-brand-primary/30 space-y-6 relative"
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-brand-muted hover:text-brand-dark"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium border inline-block ${
                  selectedEvent.status === "confirmed"
                    ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                    : "bg-amber-100 text-amber-800 border-amber-300"
                }`}
              >
                {selectedEvent.status === "confirmed" ? "Потвърдена Резервация" : "Запитване в изчакване"}
              </span>
              <h3 className="font-serif text-2xl font-bold text-brand-dark">
                {selectedEvent.title}
              </h3>
            </div>

            <div className="space-y-3 text-sm text-brand-dark/80 bg-brand-bg p-4 rounded-2xl border border-brand-primary/20">
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span>
                  <strong>Време:</strong> {selectedEvent.date} ({selectedEvent.time})
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span>
                  <strong>Локация:</strong> {selectedEvent.venue}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span>
                  <strong>Брой гости:</strong> {selectedEvent.guestCount} души
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span>
                  <strong>Телефон:</strong> {selectedEvent.phone}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span>
                  <strong>Имейл:</strong> {selectedEvent.email}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-serif text-2xl font-bold text-brand-accent">
                {selectedEvent.price}
              </span>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedEvent(null)}
                >
                  Затвори
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    alert(`Резервация ${selectedEvent.id} беше обновена.`);
                    setSelectedEvent(null);
                  }}
                >
                  Редактирай
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
