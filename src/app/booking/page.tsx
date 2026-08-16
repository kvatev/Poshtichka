"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Check,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { PageHeaderBanner } from "@/components/layout/page-header-banner";

const paperKeepsakeOptions = [
  { id: "МАРКА", label: "МАРКА" },
  { id: "КАРТИЧКА", label: "КАРТИЧКА" },
  { id: "СТИКЕР", label: "СТИКЕР" },
  { id: "ТАТУИРОВКА", label: "ТАТУИРОВКА" },
  { id: "ПРЕДИЗВИКАТЕЛСТВА", label: "ПРЕДИЗВИКАТЕЛСТВА" },
  { id: "БЛАГОДАРСТВЕНИ КАРТИЧКИ", label: "БЛАГОДАРСТВЕНИ КАРТИЧКИ" },
  { id: "ДРУГО", label: "ДРУГО" },
];

const bookingSchema = z
  .object({
    eventType: z.enum(["сватба", "кръщене", "юбилей", "друго"]),
    customEventType: z.string().optional(),
    eventDate: z.string().min(1, { message: "Моля, изберете дата на събитието" }),
    fullName: z.string().min(2, { message: "Моля, въведете имена" }),
    phone: z.string().min(6, { message: "Моля, въведете валиден телефонен номер" }),
    email: z.string().email({ message: "Моля, въведете валиден имейл адрес" }),
    paperKeepsakes: z
      .array(z.string())
      .min(1, { message: "Моля, изберете поне един вид хартиен носител" }),
    guestCount: z.coerce.number().min(1, { message: "Моля, въведете брой гости" }),
    venueLocation: z.string().min(2, { message: "Моля, въведете точна локация на събитието" }),
    preferredContact: z.enum(["viber", "instagram", "email"]),
    instagramHandle: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.preferredContact === "instagram") {
        return Boolean(data.instagramHandle && data.instagramHandle.trim().length > 0);
      }
      return true;
    },
    {
      message: "Моля, въведете Вашето Instagram потребителско име",
      path: ["instagramHandle"],
    }
  );

type BookingFormData = z.infer<typeof bookingSchema>;

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

export default function BookingPage() {
  return (
    <PageWrapper>
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#00b4b6] border-t-transparent" />
          </div>
        }
      >
        <BookingFormContent />
      </Suspense>
    </PageWrapper>
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
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      eventDate: queryDate,
      eventType: "сватба",
      paperKeepsakes: ["КАРТИЧКА"],
      preferredContact: "viber",
      instagramHandle: "",
      guestCount: 100,
    },
  });

  const selectedDate = watch("eventDate");
  const selectedEventType = watch("eventType");
  const selectedKeepsakes = watch("paperKeepsakes") || [];
  const selectedContactChannel = watch("preferredContact");

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

  useEffect(() => {
    if (queryDate) {
      setValue("eventDate", queryDate);
    }
  }, [queryDate, setValue]);

  useEffect(() => {
    if (selectedDate && bookedDates.has(selectedDate)) {
      setAvailabilityWarning(
        `За съжаление, датата ${selectedDate} вече е резервирана. Моля, изберете друга дата.`
      );
    } else {
      setAvailabilityWarning(null);
    }
  }, [selectedDate, bookedDates]);

  const toggleKeepsake = (id: string) => {
    const current = new Set(selectedKeepsakes);
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    setValue("paperKeepsakes", Array.from(current), { shouldValidate: true });
  };

  const handleResetForm = () => {
    reset({
      eventDate: "",
      eventType: "сватба",
      paperKeepsakes: ["КАРТИЧКА"],
      preferredContact: "viber",
      instagramHandle: "",
      guestCount: 100,
      fullName: "",
      phone: "",
      email: "",
      venueLocation: "",
    });
    setSubmitted(false);
    setErrorMessage("");
  };

  const onSubmit = async (data: BookingFormData) => {
    if (bookedDates.has(data.eventDate)) {
      setErrorMessage(
        `Датата ${data.eventDate} е вече заета. Моля, проверете свободните дати в нашия календар.`
      );
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const finalEventType =
      data.eventType === "друго" && data.customEventType
        ? `Друго (${data.customEventType})`
        : data.eventType === "сватба"
        ? "Сватбено тържество"
        : data.eventType === "кръщене"
        ? "Кръщене"
        : data.eventType === "юбилей"
        ? "Юбилей / Рожден ден"
        : "Друго";

    const payload = {
      eventType: finalEventType,
      names: data.fullName,
      eventDate: data.eventDate,
      phone: data.phone,
      email: data.email,
      guestCount: data.guestCount,
      location: data.venueLocation,
      paperTypes: data.paperKeepsakes,
      preferredChannel: data.preferredContact,
      instagramHandle: data.instagramHandle,
    };

    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
        setErrorMessage("Възникна непредвидена грешка при изпращането.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isWedding = selectedEventType === "сватба";

  return (
    <div className="space-y-12 pb-24 font-sans select-none">
      {/* Top Banner */}
      <PageHeaderBanner
        title="ЗАПАЗЕТЕ ПОЩИЧКА ЗА ВАШИЯ ПОВОД"
        subtitle="Попълнете кратката форма по-долу и ние ще съставим индивидуална оферта и ще потвърдим наличността в рамките на 24 часа."
        showCurlyArrow={true}
      >
        <button
          type="button"
          onClick={() => router.push("/calendar")}
          className="inline-flex items-center justify-center px-7 py-3 rounded-full border-2 border-white bg-white/15 hover:bg-white hover:text-[#00b4b6] backdrop-blur-sm text-white font-salongbeach text-base sm:text-lg font-bold uppercase tracking-wider transition-all duration-300 shadow-xl group cursor-pointer"
        >
          <span>СВОБОДНИ ДАТИ</span>
        </button>
      </PageHeaderBanner>

      {/* Main Questionnaire Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[40px] p-10 sm:p-16 border-2 border-[#00b4b6] text-center space-y-6 shadow-2xl"
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto flex items-center justify-center">
              <Image
                src={encodeURI("/icons/Asset 101@2x.png")}
                alt="Пощичка"
                width={112}
                height={112}
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                unoptimized
              />
            </div>
            <h2 className="font-salongbeach text-3xl sm:text-4xl font-bold uppercase text-[#00b4b6]">
              Благодарим Ви за запитването!
            </h2>
            <p className="text-[#182b2c] font-sans text-base max-w-lg mx-auto leading-relaxed">
              Получихме Вашата анкета. Изпратихме потвърждение на посочения от Вас имейл и нашият екип ще се свърже с Вас по предпочитания от Вас начин в най-кратки срокове.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleResetForm}
                className="inline-flex items-center space-x-2 bg-[#182b2c] hover:bg-[#00b4b6] text-white font-sans text-sm font-semibold px-6 py-3 rounded-full transition-all duration-200 cursor-pointer shadow-md hover:scale-105 active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Попълни нова анкета</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="bg-[#f9f6f0] rounded-[40px] border-2 border-[#2d3a37]/80 p-6 sm:p-12 shadow-2xl space-y-8">
            {/* Title */}
            <div className="text-center">
              <h2 className="font-salongbeach text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-[#00b4b6]">
                АНКЕТА
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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

              {/* 1. Вид събитие */}
              <div className="space-y-2 text-center max-w-md mx-auto">
                <label className="flex items-end justify-center min-h-[32px] text-center text-sm sm:text-base font-sans font-medium text-[#182b2c]">
                  Вид събитие *
                </label>
                <div className="relative">
                  <select
                    {...register("eventType")}
                    className="w-full h-[52px] px-6 py-3 rounded-full border-2 border-[#00b4b6] bg-white text-[#182b2c] font-sans text-sm sm:text-base text-center appearance-none focus:outline-none focus:ring-2 focus:ring-[#00b4b6] cursor-pointer shadow-sm box-border"
                  >
                    <option value="сватба">Сватбено тържество</option>
                    <option value="кръщене">Кръщене</option>
                    <option value="юбилей">Юбилей / Рожден ден</option>
                    <option value="друго">Друго събитие</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-[#00b4b6]">
                    ▼
                  </div>
                </div>

                {/* If "Друго" selected -> Show custom event type input */}
                {selectedEventType === "друго" && (
                  <div className="pt-2">
                    <input
                      type="text"
                      {...register("customEventType")}
                      placeholder="Опишете вида на събитието..."
                      className="w-full h-[52px] px-6 py-3 rounded-full border-2 border-[#00b4b6] bg-white text-[#182b2c] font-sans text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#00b4b6] shadow-sm box-border"
                    />
                  </div>
                )}
              </div>

              {/* 2. Имена, Дата, Телефон (3-Column Grid with Perfect Baseline Alignment) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end text-center">
                {/* Имена */}
                <div className="flex flex-col justify-between h-full space-y-2">
                  <label className="flex items-end justify-center min-h-[44px] text-center text-sm sm:text-base font-sans font-medium text-[#182b2c] leading-snug">
                    {isWedding ? "Имена на двамата младоженци *" : "Име и фамилия *"}
                  </label>
                  <input
                    type="text"
                    {...register("fullName")}
                    placeholder={isWedding ? "Мария и Иван" : "Иван Иванов"}
                    className="w-full h-[52px] px-5 py-3 rounded-full border-2 border-[#00b4b6] bg-white text-[#182b2c] font-sans text-sm sm:text-base text-center focus:outline-none focus:ring-2 focus:ring-[#00b4b6] shadow-sm box-border"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-500 font-sans mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Дата */}
                <div className="flex flex-col justify-between h-full space-y-2">
                  <label className="flex items-end justify-center min-h-[44px] text-center text-sm sm:text-base font-sans font-medium text-[#182b2c] leading-snug">
                    Дата *
                  </label>
                  <input
                    type="date"
                    {...register("eventDate")}
                    className="w-full h-[52px] px-5 py-3 rounded-full border-2 border-[#00b4b6] bg-white text-[#182b2c] font-sans text-sm sm:text-base text-center focus:outline-none focus:ring-2 focus:ring-[#00b4b6] shadow-sm box-border cursor-pointer appearance-none"
                    style={{ minHeight: "52px" }}
                  />
                  {errors.eventDate && (
                    <p className="text-xs text-red-500 font-sans mt-1">
                      {errors.eventDate.message}
                    </p>
                  )}
                </div>

                {/* Телефон */}
                <div className="flex flex-col justify-between h-full space-y-2">
                  <label className="flex items-end justify-center min-h-[44px] text-center text-sm sm:text-base font-sans font-medium text-[#182b2c] leading-snug">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    {...register("phone")}
                    placeholder="+359 99 999 999"
                    className="w-full h-[52px] px-5 py-3 rounded-full border-2 border-[#00b4b6] bg-white text-[#182b2c] font-sans text-sm sm:text-base text-center focus:outline-none focus:ring-2 focus:ring-[#00b4b6] shadow-sm box-border"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 font-sans mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* 3. Имейл, Брой гости, Точна локация (3-Column Grid with Perfect Baseline Alignment) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end text-center">
                {/* Имейл */}
                <div className="flex flex-col justify-between h-full space-y-2">
                  <label className="flex items-end justify-center min-h-[44px] text-center text-sm sm:text-base font-sans font-medium text-[#182b2c] leading-snug">
                    Имейл *
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="ivanivanov@gmail.com"
                    className="w-full h-[52px] px-5 py-3 rounded-full border-2 border-[#00b4b6] bg-white text-[#182b2c] font-sans text-sm sm:text-base text-center focus:outline-none focus:ring-2 focus:ring-[#00b4b6] shadow-sm box-border"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 font-sans mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Брой гости */}
                <div className="flex flex-col justify-between h-full space-y-2">
                  <label className="flex items-end justify-center min-h-[44px] text-center text-sm sm:text-base font-sans font-medium text-[#182b2c] leading-snug">
                    Брой гости *
                  </label>
                  <input
                    type="number"
                    {...register("guestCount")}
                    placeholder="100"
                    className="w-full h-[52px] px-5 py-3 rounded-full border-2 border-[#00b4b6] bg-white text-[#182b2c] font-sans text-sm sm:text-base text-center focus:outline-none focus:ring-2 focus:ring-[#00b4b6] shadow-sm box-border"
                  />
                  {errors.guestCount && (
                    <p className="text-xs text-red-500 font-sans mt-1">
                      {errors.guestCount.message}
                    </p>
                  )}
                </div>

                {/* Точна локация */}
                <div className="flex flex-col justify-between h-full space-y-2">
                  <label className="flex items-end justify-center min-h-[44px] text-center text-sm sm:text-base font-sans font-medium text-[#182b2c] leading-snug">
                    Локация на събитието *
                  </label>
                  <input
                    type="text"
                    {...register("venueLocation")}
                    placeholder="напр. Бургас, Ресторант Морски Бриз"
                    className="w-full h-[52px] px-5 py-3 rounded-full border-2 border-[#00b4b6] bg-white text-[#182b2c] font-sans text-sm sm:text-base text-center focus:outline-none focus:ring-2 focus:ring-[#00b4b6] shadow-sm box-border"
                  />
                  {errors.venueLocation && (
                    <p className="text-xs text-red-500 font-sans mt-1">
                      {errors.venueLocation.message}
                    </p>
                  )}
                </div>
              </div>

              {/* 4. Какъв вид хартиен носител искате */}
              <div className="space-y-4 text-center pt-2">
                <label className="block text-sm sm:text-base font-sans font-medium text-[#182b2c]">
                  Вид хартиен носител *
                </label>

                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-1">
                  {paperKeepsakeOptions.map((opt) => {
                    const isChecked = selectedKeepsakes.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleKeepsake(opt.id)}
                        className="flex items-center space-x-2.5 cursor-pointer group focus:outline-none"
                      >
                        <div
                          className={`w-6 h-6 rounded-lg border-2 border-[#00b4b6] flex items-center justify-center transition-all duration-200 ${
                            isChecked
                              ? "bg-[#00b4b6] text-white shadow-sm"
                              : "bg-white group-hover:border-[#008b8d]"
                          }`}
                        >
                          {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                        <span className="font-salongbeach text-sm sm:text-base font-bold uppercase tracking-wider text-[#182b2c] group-hover:text-[#00b4b6] transition-colors">
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {errors.paperKeepsakes && (
                  <p className="text-xs text-red-500 font-sans mt-1">
                    {errors.paperKeepsakes.message}
                  </p>
                )}
              </div>

              {/* 5. Предпочитан начин за комуникация */}
              <div className="space-y-4 text-center max-w-md mx-auto pt-2">
                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-sans font-medium text-[#182b2c]">
                    Предпочитан начин за комуникация *
                  </label>
                  <div className="relative">
                    <select
                      {...register("preferredContact")}
                      className="w-full h-[52px] px-6 py-3 rounded-full border-2 border-[#00b4b6] bg-white text-[#182b2c] font-sans text-sm sm:text-base text-center appearance-none focus:outline-none focus:ring-2 focus:ring-[#00b4b6] cursor-pointer shadow-sm box-border"
                    >
                      <option value="viber">Viber</option>
                      <option value="instagram">Instagram</option>
                      <option value="email">Имейл</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-[#00b4b6]">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Conditional Instagram Handle Input */}
                <AnimatePresence>
                  {selectedContactChannel === "instagram" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -6 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-2 overflow-hidden text-center pt-1"
                    >
                      <label className="block text-sm sm:text-base font-sans font-medium text-[#182b2c]">
                        Instagram потребителско име *
                      </label>
                      <input
                        type="text"
                        {...register("instagramHandle")}
                        placeholder="напр. @poshtichka"
                        className="w-full h-[52px] px-5 py-3 rounded-full border-2 border-[#00b4b6] bg-white text-[#182b2c] font-sans text-sm sm:text-base text-center focus:outline-none focus:ring-2 focus:ring-[#00b4b6] shadow-sm box-border"
                      />
                      {errors.instagramHandle && (
                        <p className="text-xs text-red-500 font-sans mt-1">
                          {errors.instagramHandle.message}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button & GDPR Note */}
              <div className="pt-6 flex flex-col items-center justify-center space-y-3">
                <button
                  type="submit"
                  disabled={loading || Boolean(availabilityWarning)}
                  className="w-full max-w-md bg-[#00b4b6] hover:bg-[#008b8d] text-white font-salongbeach text-xl sm:text-2xl font-bold uppercase tracking-wider py-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>ИЗПРАЩАНЕ...</span>
                    </>
                  ) : (
                    <span>ИЗПРАТИ ЗАПИТВАНЕ</span>
                  )}
                </button>
                <p className="text-center text-xs text-[#5b6968] font-sans max-w-md">
                  С изпращането на формата се съгласявате с обработката на личните Ви данни съгласно нашата{" "}
                  <Link href="/privacy-policy" className="text-[#00b4b6] hover:underline font-medium">
                    Политика за поверителност
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}
