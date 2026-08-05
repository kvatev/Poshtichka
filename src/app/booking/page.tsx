"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Send,
  Calendar as CalendarIcon,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const bookingSchema = z.object({
  fullName: z.string().min(2, { message: "Моля, въведете Вашето име" }),
  phone: z.string().min(6, { message: "Моля, въведете валиден телефонен номер" }),
  email: z.string().email({ message: "Моля, въведете валиден имейл адрес" }),
  eventDate: z.string().min(1, { message: "Моля, изберете дата на събитието" }),
  eventType: z.string().min(1, { message: "Моля, изберете вид събитие" }),
  venueLocation: z.string().min(2, { message: "Моля, въведете град или наименование на мястото" }),
  guestCount: z.coerce.number().min(10, { message: "Моля, въведете реален брой гости (мин. 10)" }),
  preferredContact: z.enum(["phone", "email", "viber", "instagram"]),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const initialBookedDates = new Set([
  "2026-08-14",
  "2026-08-22",
  "2026-08-28",
  "2026-09-05",
  "2026-09-12",
  "2026-09-19",
]);

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-primary border-t-transparent" />
        </div>
      }
    >
      <BookingFormContent />
    </Suspense>
  );
}

function BookingFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryDate = searchParams?.get("date") || "";

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookedDates, setBookedDates] = useState<Set<string>>(initialBookedDates);
  const [availabilityWarning, setAvailabilityWarning] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      eventDate: queryDate,
      eventType: "сватба",
      preferredContact: "phone",
      guestCount: 100,
    },
  });

  const selectedDate = watch("eventDate");

  // Fetch confirmed booked dates for validation
  useEffect(() => {
    fetch("/api/calendar")
      .then((res) => res.json())
      .then((data) => {
        if (data.bookedDates && Array.isArray(data.bookedDates)) {
          setBookedDates(new Set(data.bookedDates));
        }
      })
      .catch(() => {});
  }, []);

  // Pre-fill query date if provided
  useEffect(() => {
    if (queryDate) {
      setValue("eventDate", queryDate);
    }
  }, [queryDate, setValue]);

  // Real-time validation when user picks a date
  useEffect(() => {
    if (selectedDate && bookedDates.has(selectedDate)) {
      setAvailabilityWarning(
        `За съжаление, датата ${selectedDate} вече е резервирана. Моля, изберете друга дата.`
      );
    } else {
      setAvailabilityWarning(null);
    }
  }, [selectedDate, bookedDates]);

  const onSubmit = async (data: BookingFormData) => {
    if (bookedDates.has(data.eventDate)) {
      setErrorMessage(
        `Датата ${data.eventDate} е вече заета. Моля, проверете свободните дати в нашия календар.`
      );
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(
          resData.error || "Възникна грешка при изпращането. Моля, опитайте отново."
        );
      }

      setSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Възникна непредвидена грешка.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-24 font-sans">
      {/* Header */}
      <section className="bg-brand-secondary/40 py-16 sm:py-24 border-b border-brand-primary/20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs uppercase tracking-widest text-brand-accent font-semibold">
            Резервация & Наличност
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-brand-dark">
            Запазете дата за Вашето събитие
          </h1>
          <p className="text-brand-dark/80 text-lg sm:text-xl font-sans max-w-2xl mx-auto font-light leading-relaxed">
            Попълнете кратката форма по-долу и ние ще съставим индивидуална оферта и ще потвърдим наличността в рамките на няколко часа.
          </p>

          <div className="pt-2">
            <button
              onClick={() => router.push("/calendar")}
              className="inline-flex items-center space-x-2 text-xs font-semibold bg-white px-4 py-2 rounded-full border border-brand-primary/30 text-brand-accent hover:bg-brand-secondary transition-colors"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Вижте публичния календар със свободни дати →</span>
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-10 sm:p-16 border border-brand-primary/30 text-center space-y-6 shadow-2xl"
          >
            <div className="w-20 h-20 rounded-full bg-brand-secondary text-brand-accent mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-brand-dark">
              Благодарим Ви за запитването!
            </h2>
            <p className="text-brand-dark/80 font-sans text-base max-w-lg mx-auto leading-relaxed">
              Получихме Вашата резервация. Нашият екип ще се свърже с Вас по предпочитания от Вас начин в най-кратки срокове.
            </p>
          </motion.div>
        ) : (
          <Card className="p-8 sm:p-12 shadow-2xl border-2 border-brand-primary/30 bg-white">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-red-50 text-red-800 text-sm font-sans border border-red-200 flex items-start space-x-3">
                  <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p>{errorMessage}</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => router.push("/calendar")}
                      className="border-red-300 text-red-800 hover:bg-red-100 text-xs"
                    >
                      Към Календара
                    </Button>
                  </div>
                </div>
              )}

              {availabilityWarning && (
                <div className="p-4 rounded-2xl bg-amber-50 text-amber-900 text-sm font-sans border border-amber-300 flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="font-medium">{availabilityWarning}</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => router.push("/calendar")}
                      className="border-amber-400 text-amber-900 hover:bg-amber-100 text-xs flex items-center space-x-1"
                    >
                      <span>Разгледайте свободните дати</span>
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-sans font-medium text-brand-dark">
                    Име и фамилия *
                  </label>
                  <input
                    type="text"
                    {...register("fullName")}
                    placeholder="Мария Иванова"
                    className="w-full px-4 py-3 rounded-xl border border-brand-primary/30 bg-brand-bg text-brand-dark font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-500 font-sans mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-sans font-medium text-brand-dark">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    {...register("phone")}
                    placeholder="+359 888 123 456"
                    className="w-full px-4 py-3 rounded-xl border border-brand-primary/30 bg-brand-bg text-brand-dark font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 font-sans mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-sans font-medium text-brand-dark">
                    Имейл адрес *
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="maria@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-brand-primary/30 bg-brand-bg text-brand-dark font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 font-sans mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Event Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-sans font-medium text-brand-dark">
                    Дата на събитието *
                  </label>
                  <input
                    type="date"
                    {...register("eventDate")}
                    className="w-full px-4 py-3 rounded-xl border border-brand-primary/30 bg-brand-bg text-brand-dark font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  />
                  {errors.eventDate && (
                    <p className="text-xs text-red-500 font-sans mt-1">
                      {errors.eventDate.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-sans font-medium text-brand-dark">
                    Вид събитие *
                  </label>
                  <select
                    {...register("eventType")}
                    className="w-full px-4 py-3 rounded-xl border border-brand-primary/30 bg-brand-bg text-brand-dark font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  >
                    <option value="сватба">Сватбено тържество</option>
                    <option value="корпоративно">Корпоративно събитие / Брандинг</option>
                    <option value="рожден-ден">Рожден ден / Юбилей</option>
                    <option value="бейби-шауър">Бейби шауър / Кръщене</option>
                    <option value="фестивал">Фестивал / Маркетинг активация</option>
                    <option value="друго">Друго събитие</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-sans font-medium text-brand-dark">
                    Град / Локация / Веню *
                  </label>
                  <input
                    type="text"
                    {...register("venueLocation")}
                    placeholder="напр. Созопол, Комплекс Морски Бриз"
                    className="w-full px-4 py-3 rounded-xl border border-brand-primary/30 bg-brand-bg text-brand-dark font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  />
                  {errors.venueLocation && (
                    <p className="text-xs text-red-500 font-sans mt-1">
                      {errors.venueLocation.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Guests & Preferred Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-sans font-medium text-brand-dark">
                    Очакван брой гости *
                  </label>
                  <input
                    type="number"
                    {...register("guestCount")}
                    placeholder="100"
                    className="w-full px-4 py-3 rounded-xl border border-brand-primary/30 bg-brand-bg text-brand-dark font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  />
                  {errors.guestCount && (
                    <p className="text-xs text-red-500 font-sans mt-1">
                      {errors.guestCount.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-sans font-medium text-brand-dark">
                    Предпочитан начин за контакт *
                  </label>
                  <select
                    {...register("preferredContact")}
                    className="w-full px-4 py-3 rounded-xl border border-brand-primary/30 bg-brand-bg text-brand-dark font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  >
                    <option value="phone">Телефонно обаждане</option>
                    <option value="email">Имейл</option>
                    <option value="viber">Viber / WhatsApp</option>
                    <option value="instagram">Instagram</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-xs font-sans font-medium text-brand-dark">
                  Допълнително съобщение или специални изисквания
                </label>
                <textarea
                  rows={4}
                  {...register("message")}
                  placeholder="Споделете подробности за тема, стил или въпроси..."
                  className="w-full px-4 py-3 rounded-xl border border-brand-primary/30 bg-brand-bg text-brand-dark font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </div>

              <Button
                variant="accent"
                size="lg"
                type="submit"
                disabled={loading || Boolean(availabilityWarning)}
                className="w-full flex items-center justify-center space-x-2 text-base py-4 disabled:opacity-50"
              >
                <span>{loading ? "Изпращане..." : "Изпрати запитване за дата"}</span>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </Card>
        )}
      </section>
    </div>
  );
}
