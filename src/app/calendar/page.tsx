"use client";

import React, { useState, useEffect, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
} from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";

const monthNamesBg = [
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

const dayNamesBg = ["Пон", "Втор", "Сря", "Четв", "Пет", "Съб", "Нед"];

const initialBookedDates = new Set([
  "2026-08-23",
  "2026-08-30",
  "2026-09-07",
  "2026-09-12",
  "2026-10-03",
  "2026-10-10",
  "2027-06-17",
  "2027-06-26",
]);

export default function PublicCalendarPage() {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const today = useMemo(() => new Date(), []);
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth()); // 0-indexed
  const [bookedDates, setBookedDates] = useState<Set<string>>(initialBookedDates);

  useEffect(() => {
    // Prefetch booking page for instant navigation on date click
    router.prefetch("/booking");

    fetch("/api/calendar")
      .then((res) => res.json())
      .then((data) => {
        if (data.bookedDates && Array.isArray(data.bookedDates)) {
          setBookedDates(new Set(data.bookedDates));
        }
      })
      .catch(() => {});
  }, [router]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentYear(parseInt(e.target.value, 10));
  };

  const formatDateString = (year: number, month: number, day: number) => {
    const mStr = String(month + 1).padStart(2, "0");
    const dStr = String(day).padStart(2, "0");
    return `${year}-${mStr}-${dStr}`;
  };

  const calendarGrid = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    let firstDayIndex = firstDayOfMonth.getDay() - 1;
    if (firstDayIndex === -1) firstDayIndex = 6;

    const grid = [];
    for (let i = 0; i < firstDayIndex; i++) {
      grid.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      grid.push(day);
    }
    return grid;
  }, [currentYear, currentMonth]);

  const handleSelectDate = (dateStr: string, isAvailable: boolean) => {
    if (!isAvailable) return;
    startTransition(() => {
      router.push(`/booking?date=${dateStr}`);
    });
  };

  const todayStr = formatDateString(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <PageWrapper>
      <div className="space-y-12 pb-24 font-sans select-none">
        {/* Top Banner */}
        <section className="bg-[#00b4b6] text-white py-12 sm:py-16 px-4 relative overflow-hidden border-b border-white/20">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <h1 className="font-salongbeach text-3xl sm:text-5xl font-bold uppercase tracking-wider text-white leading-tight">
              КАЛЕНДАР СЪС ЗАЕТОСТ
            </h1>
            <p className="font-sans text-sm sm:text-base lg:text-lg font-light text-white/95 max-w-2xl mx-auto italic">
              Изберете желаната от Вас дата, за да проверите наличността. Кликнете върху свободна дата, за да продължите директно към резервацията.
            </p>
            <p className="text-xs text-white/80 font-sans italic">
              * Пълна конфиденциалност: Показват се единствено свободни и заети дати.
            </p>

            {/* Curly Arrow pointing down */}
            <div className="pt-2 flex items-center justify-center pointer-events-none">
              <Image
                src="/media/Main Page/curly-arrow-left.png"
                alt="Стрелка"
                width={50}
                height={50}
                className="w-8 sm:w-10 h-auto object-contain opacity-90 -rotate-90"
              />
            </div>
          </div>
        </section>

        {/* Main Calendar Section (Inside rounded frame like calculator/booking form) */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="bg-[#f9f6f0] rounded-[40px] border-2 border-[#2d3a37]/80 p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#00b4b6]/20">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrevMonth}
                    className="p-2.5 rounded-2xl bg-white hover:bg-[#00b4b6]/10 border-2 border-[#00b4b6] text-[#182b2c] transition-colors cursor-pointer"
                    aria-label="Предишен месец"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#00b4b6]" />
                  </button>
                  <h2 className="font-salongbeach text-2xl sm:text-3xl font-bold text-[#182b2c] min-w-[180px] text-center uppercase tracking-wider">
                    {monthNamesBg[currentMonth]} {currentYear}
                  </h2>
                  <button
                    onClick={handleNextMonth}
                    className="p-2.5 rounded-2xl bg-white hover:bg-[#00b4b6]/10 border-2 border-[#00b4b6] text-[#182b2c] transition-colors cursor-pointer"
                    aria-label="Следващ месец"
                  >
                    <ChevronRight className="w-5 h-5 text-[#00b4b6]" />
                  </button>
                </div>

                <select
                  value={currentYear}
                  onChange={handleYearChange}
                  className="px-4 py-2.5 rounded-2xl border-2 border-[#00b4b6] bg-white text-[#182b2c] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00b4b6] cursor-pointer"
                >
                  {[2025, 2026, 2027, 2028].map((y) => (
                    <option key={y} value={y}>
                      {y} г.
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    setCurrentYear(today.getFullYear());
                    setCurrentMonth(today.getMonth());
                  }}
                  className="text-xs font-semibold text-[#00b4b6] hover:underline px-3 py-2 bg-white rounded-xl border border-[#00b4b6]/30 cursor-pointer"
                >
                  Текущ месец
                </button>
              </div>

              {/* Legend with clean indicators and NO duplicate emojis */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
                <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 text-emerald-800">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Свободна дата</span>
                </div>
                <div className="flex items-center space-x-2 bg-red-50 px-3 py-1.5 rounded-full border border-red-200 text-red-800">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span>Заета дата</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 text-gray-500">
                  <span className="w-3 h-3 rounded-full bg-gray-300" />
                  <span>Изминала дата</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-[#182b2c] uppercase tracking-wider py-2 bg-[#00b4b6]/15 rounded-2xl">
                {dayNamesBg.map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {calendarGrid.map((dayNum, idx) => {
                  if (dayNum === null) {
                    return (
                      <div
                        key={`empty-${idx}`}
                        className="h-24 sm:h-28 rounded-2xl bg-white/40 border border-transparent opacity-30"
                      />
                    );
                  }

                  const dateStr = formatDateString(currentYear, currentMonth, dayNum);
                  const isPast = dateStr < todayStr;
                  const isBooked = bookedDates.has(dateStr);
                  const isAvailable = !isPast && !isBooked;
                  const isToday = dateStr === todayStr;

                  return (
                    <motion.button
                      key={`day-${dayNum}`}
                      whileHover={isAvailable ? { scale: 1.03 } : {}}
                      whileTap={isAvailable ? { scale: 0.97 } : {}}
                      onClick={() => handleSelectDate(dateStr, isAvailable)}
                      disabled={!isAvailable}
                      className={`h-24 sm:h-28 rounded-2xl p-2 sm:p-3 border text-left flex flex-col justify-between transition-all relative ${
                        isBooked
                          ? "bg-red-50/80 border-red-300 text-red-900 cursor-not-allowed"
                          : isPast
                          ? "bg-gray-100/70 border-gray-200 text-gray-400 cursor-not-allowed opacity-60"
                          : isToday
                          ? "bg-white border-2 border-[#00b4b6] text-emerald-950 shadow-md ring-2 ring-[#00b4b6]/40 cursor-pointer"
                          : "bg-white hover:bg-emerald-50/80 border-2 border-[#00b4b6]/40 text-emerald-950 shadow-xs cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-sm sm:text-base font-bold rounded-full w-7 h-7 flex items-center justify-center ${
                            isToday
                              ? "bg-[#00b4b6] text-white"
                              : isBooked
                              ? "text-red-700 font-bold"
                              : "text-[#182b2c]"
                          }`}
                        >
                          {dayNum}
                        </span>

                        {isBooked ? (
                          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                        ) : isPast ? (
                          <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        )}
                      </div>

                      <div className="text-[10px] sm:text-xs font-semibold truncate">
                        {isBooked ? (
                          <span className="text-red-700 bg-red-100 px-2 py-0.5 rounded-full inline-block">
                            Заета
                          </span>
                        ) : isPast ? (
                          <span className="text-gray-400">Изминала</span>
                        ) : (
                          <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full inline-block group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            Свободна →
                          </span>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div className="bg-[#2d3a37] text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="font-salongbeach text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-wider text-white">
                ОТКРИХТЕ ЛИ ВАШАТА ПЕРФЕКТНА ДАТА?
              </h3>
              <p className="text-white/80 text-sm sm:text-base font-sans font-light">
                Натиснете върху дата или попълнете формата за резервация директно.
              </p>
            </div>
            <button
              onClick={() => router.push("/booking")}
              className="inline-flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-full bg-[#00b4b6] hover:bg-[#008b8d] text-white font-salongbeach text-lg sm:text-xl font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <span>РЕЗЕРВИРАЙ СЕГА</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
