"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, AlertCircle, Loader2, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactServiceOption {
  id: string;
  title: string;
}

interface ContactFormProps {
  initialServices?: ContactServiceOption[];
  initialGeneral?: {
    address?: string;
    email?: string;
    instagram?: string;
  };
}

export function ContactForm({ initialServices = [], initialGeneral }: ContactFormProps) {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  
  // Filter out any "ВЕНДИНГ МАШИНА" service immediately
  const cleanInitial = initialServices.filter(
    (s) => s.id !== "SRV-01" && !String(s.title || "").toLowerCase().includes("вендинг")
  );

  const [servicesList, setServicesList] = useState<ContactServiceOption[]>(cleanInitial);
  const [service, setService] = useState<string>(() => {
    const urlService = searchParams?.get("service");
    if (urlService) return urlService;
    return cleanInitial.length > 0 ? cleanInitial[0].title : "ДЪРВЕН печат";
  });
  const [message, setMessage] = useState("");

  const [contactAddress, setContactAddress] = useState(initialGeneral?.address || "Бургас, България");
  const [contactEmail, setContactEmail] = useState(initialGeneral?.email || "info@poshtichka.eu");
  const [contactInstagram, setContactInstagram] = useState(initialGeneral?.instagram || "@poshtichka");

  useEffect(() => {
    // Dynamic refresh in background
    fetch("/api/services", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const rawList: ContactServiceOption[] = Array.isArray(data)
          ? data
          : data && Array.isArray(data.services)
          ? data.services
          : [];

        if (rawList.length > 0) {
          const nonVending = rawList.filter(
            (s) => s.id !== "SRV-01" && !String(s.title || "").toLowerCase().includes("вендинг")
          );
          setServicesList(nonVending);

          const urlService = searchParams?.get("service");
          if (urlService) {
            setService(urlService);
          } else if (!service && nonVending.length > 0) {
            setService(nonVending[0].title);
          }
        }
      })
      .catch(() => {});
  }, [searchParams, service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const selectedServiceLabel =
      service || (servicesList.length > 0 ? servicesList[0].title : "Общо запитване");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          service: selectedServiceLabel,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Възникна проблем при изпращането на запитването.");
      }

      setSubmitted(true);
      // Clear fields on success
      setFullName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      console.error("Form submit error:", err);
      setErrorMsg(
        err?.message ||
          "Не можахме да изпратим съобщението. Моля, проверете връзката си и опитайте отново."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setErrorMsg(null);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Left Column: 3 Contact Info Cards */}
      <div className="space-y-6">
        {/* Card 1: ЛОКАЦИЯ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#f9f6f0] border-2 border-[#2d3a37]/80 rounded-[32px] p-6 sm:p-8 text-center flex flex-col items-center justify-center space-y-3 shadow-md hover:scale-[1.02] transition-transform duration-300"
        >
          <div className="relative w-16 h-16 flex items-center justify-center">
            <Image
              src={encodeURI("/media/Контакти/Asset 50@2x.png")}
              alt="Локация"
              width={56}
              height={56}
              className="w-14 h-14 object-contain"
              unoptimized
            />
          </div>
          <h3 className="font-salongbeach text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#182b2c]">
            ЛОКАЦИЯ
          </h3>
          <p className="font-stampatello text-lg sm:text-xl font-semibold text-[#00b4b6]">
            {contactAddress}
          </p>
        </motion.div>

        {/* Card 2: ИМЕЙЛ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#f9f6f0] border-2 border-[#2d3a37]/80 rounded-[32px] p-6 sm:p-8 text-center flex flex-col items-center justify-center space-y-3 shadow-md hover:scale-[1.02] transition-transform duration-300"
        >
          <div className="relative w-16 h-16 flex items-center justify-center">
            <Image
              src={encodeURI("/media/Контакти/Asset 49@2x.png")}
              alt="Имейл"
              width={56}
              height={56}
              className="w-14 h-14 object-contain"
              unoptimized
            />
          </div>
          <h3 className="font-salongbeach text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#182b2c]">
            ИМЕЙЛ
          </h3>
          <a
            href={`mailto:${contactEmail}`}
            className="font-stampatello text-base sm:text-lg font-semibold text-[#00b4b6] hover:underline cursor-pointer break-all"
          >
            {contactEmail}
          </a>
        </motion.div>

        {/* Card 3: INSTAGRAM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#f9f6f0] border-2 border-[#2d3a37]/80 rounded-[32px] p-6 sm:p-8 text-center flex flex-col items-center justify-center space-y-3 shadow-md hover:scale-[1.02] transition-transform duration-300"
        >
          <div className="relative w-16 h-16 flex items-center justify-center">
            <Image
              src={encodeURI("/media/Контакти/Asset 48@2x.png")}
              alt="Instagram"
              width={56}
              height={56}
              className="w-14 h-14 object-contain"
              unoptimized
            />
          </div>
          <h3 className="font-salongbeach text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#182b2c]">
            INSTAGRAM
          </h3>
          <a
            href={`https://www.instagram.com/${contactInstagram.replace("@", "")}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-stampatello text-lg sm:text-xl font-semibold text-[#00b4b6] hover:underline cursor-pointer"
          >
            {contactInstagram.startsWith("@") ? contactInstagram : `@${contactInstagram}`}
          </a>
        </motion.div>
      </div>

      {/* Right Column: Contact Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#f9f6f0] border-2 border-[#2d3a37]/80 rounded-[40px] p-6 sm:p-10 shadow-xl space-y-6"
      >
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-10 space-y-6"
            >
              <div className="relative w-48 h-18 sm:w-60 sm:h-22 mx-auto flex items-center justify-center">
                <Image
                  src={encodeURI("/media/logos/Logo.png")}
                  alt="Пощичка"
                  width={240}
                  height={90}
                  className="w-auto h-14 sm:h-18 object-contain drop-shadow-xs"
                  unoptimized
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-salongbeach text-3xl sm:text-4xl font-bold uppercase text-[#00b4b6] tracking-wide">
                  Благодарим Ви!
                </h3>
                <p className="text-[#182b2c] font-sans text-base sm:text-lg max-w-md mx-auto leading-relaxed">
                  Вашето запитване беше изпратено успешно. Изпратихме потвърждение и ще се свържем с Вас в рамките на 24 часа!
                </p>
              </div>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="inline-flex items-center space-x-2 bg-[#182b2c] hover:bg-[#00b4b6] text-white font-sans text-sm font-semibold px-6 py-3 rounded-full transition-all duration-200 cursor-pointer shadow-md hover:scale-105 active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Изпрати ново запитване</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <form key="form" onSubmit={handleSubmit} className="space-y-6">
              {/* Error Alert Box */}
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-red-50 border-2 border-red-400 text-red-800 flex items-start space-x-3 text-sm font-sans"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold">Възникна грешка:</p>
                    <p>{errorMsg}</p>
                  </div>
                </motion.div>
              )}

              {/* Име и фамилия */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-sans font-medium text-[#182b2c]">
                  Име и фамилия *
                </label>
                <input
                  type="text"
                  required
                  disabled={loading}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Иван Иванов"
                  className="w-full px-6 py-3.5 rounded-full border-2 border-[#00b4b6] bg-white text-[#182b2c] font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00b4b6] shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              {/* Имейл */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-sans font-medium text-[#182b2c]">
                  Имейл *
                </label>
                <input
                  type="email"
                  required
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ivanivanov@gmail.com"
                  className="w-full px-6 py-3.5 rounded-full border-2 border-[#00b4b6] bg-white text-[#182b2c] font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00b4b6] shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              {/* За коя услуга искате да направите запитване? */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-sans font-medium text-[#182b2c]">
                  За коя услуга искате да направите запитване? *
                </label>
                <div className="relative">
                  <select
                    value={service}
                    disabled={loading}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-6 py-3.5 rounded-full border-2 border-[#00b4b6] bg-white text-[#182b2c] font-sans text-sm sm:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-[#00b4b6] cursor-pointer shadow-sm text-center pr-10 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {servicesList.map((srv) => (
                      <option key={srv.id} value={srv.title}>
                        {srv.title}
                      </option>
                    ))}
                    <option value="Друга услуга / Общо запитване">
                      Друга услуга / Общо запитване
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-[#00b4b6]">
                    ▼
                  </div>
                </div>
              </div>

              {/* Съобщение */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-sans font-medium text-[#182b2c]">
                  Съобщение *
                </label>
                <textarea
                  rows={5}
                  required
                  disabled={loading}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Разкажете ни повече за Вашето събитие или идеята Ви..."
                  className="w-full px-6 py-4 rounded-[28px] border-2 border-[#00b4b6] bg-white text-[#182b2c] font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00b4b6] shadow-sm resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#00b4b6] hover:bg-[#008b8d] text-white font-salongbeach text-2xl font-bold uppercase tracking-wider py-4 rounded-full shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-3 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>ИЗПРАЩАНЕ...</span>
                    </>
                  ) : (
                    <span>ИЗПРАТИ</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

