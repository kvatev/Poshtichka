"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Mail, Instagram, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/page-wrapper";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [servicesList, setServicesList] = useState<Array<{ id: string; title: string }>>([]);
  const [message, setMessage] = useState("");

  const [contactAddress, setContactAddress] = useState("Бургас, България");
  const [contactEmail, setContactEmail] = useState("poshtichka@draskanitsi.com");
  const [contactInstagram, setContactInstagram] = useState("@poshtichka");

  React.useEffect(() => {
    // Fetch contact general info
    fetch("/api/content")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.general) {
          if (data.general.address) setContactAddress(data.general.address);
          if (data.general.email) setContactEmail(data.general.email);
          if (data.general.instagram) setContactInstagram(data.general.instagram);
        }
      })
      .catch(() => {});

    // Fetch dynamic services added in Admin
    fetch("/api/services", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServicesList(data);
          setService(data[0].title);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const selectedServiceLabel = service || (servicesList.length > 0 ? servicesList[0].title : "Общо запитване");

    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone: "От контактна форма",
          email,
          eventDate: new Date().toISOString().split("T")[0],
          eventType: `Запитване за: ${selectedServiceLabel}`,
          venueLocation: contactAddress || "Бургас",
          guestCount: 0,
          preferredContact: "email",
          message: `Избрана услуга: ${selectedServiceLabel}\n\nСъобщение: ${message}`,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="space-y-12 pb-24 font-sans select-none">
        {/* Top Banner */}
        <section className="bg-[#00b4b6] text-white py-10 sm:py-16 px-4 relative overflow-hidden border-b border-white/20">
          <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4">
            <h1 className="font-salongbeach text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider text-white leading-snug sm:leading-tight px-2">
              СВЪРЖЕТЕ СЕ С ЕКИПА НА ПОЩИЧКА
            </h1>
            <p className="font-sans text-sm sm:text-base lg:text-lg font-light text-white/95 max-w-2xl mx-auto italic">
              Имате въпрос или друг тип запитване? Свържете се с нас, за да Ви помогнем!
            </p>

            {/* Curly Arrow pointing down */}
            <div className="pt-2 flex items-center justify-center pointer-events-none">
              <Image
                src="/media/Main Page/curly-arrow-left.png"
                alt="Стрелка"
                width={50}
                height={50}
                className="w-7 sm:w-10 h-auto object-contain opacity-90 -rotate-90"
              />
            </div>
          </div>
        </section>

        {/* Main 2-Column Responsive Layout */}
        <section className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: 3 Separate Live Card Elements */}
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
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#00b4b6]/10 text-[#00b4b6] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-[#00b4b6]" />
                </div>
                <h3 className="font-salongbeach text-3xl font-bold uppercase text-[#00b4b6]">
                  Благодарим Ви!
                </h3>
                <p className="text-[#182b2c] font-sans text-base max-w-sm mx-auto leading-relaxed">
                  Вашето съобщение беше изпратено успешно. Ще се свържем с Вас в рамките на 24 часа!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Име и фамилия */}
                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-sans font-medium text-[#182b2c]">
                    Име и фамилия *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Иван Иванов"
                    className="w-full px-6 py-3.5 rounded-full border-2 border-[#00b4b6] bg-white text-[#182b2c] font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00b4b6] shadow-sm"
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ivanivanov@gmail.com"
                    className="w-full px-6 py-3.5 rounded-full border-2 border-[#00b4b6] bg-white text-[#182b2c] font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00b4b6] shadow-sm"
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
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-6 py-3.5 rounded-full border-2 border-[#00b4b6] bg-white text-[#182b2c] font-sans text-sm sm:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-[#00b4b6] cursor-pointer shadow-sm text-center pr-10"
                    >
                      {servicesList.length > 0 ? (
                        <>
                          {servicesList.map((srv) => (
                            <option key={srv.id} value={srv.title}>
                              {srv.title}
                            </option>
                          ))}
                          <option value="Друга услуга / Общо запитване">
                            Друга услуга / Общо запитване
                          </option>
                        </>
                      ) : (
                        <>
                          <option value="ВЕНДИНГ МАШИНА">ВЕНДИНГ МАШИНА</option>
                          <option value="ТАБЛО С МАРКИ И КАРТИЧКИ">ТАБЛО С МАРКИ И КАРТИЧКИ</option>
                          <option value="ВРЕМЕННИ ТАТУИРОВКИ">ВРЕМЕННИ ТАТУИРОВКИ</option>
                          <option value="КАРТИЧКИ С ПРЕДИЗВИКАТЕЛСТВА">КАРТИЧКИ С ПРЕДИЗВИКАТЕЛСТВА</option>
                          <option value="АУДИО КНИГА ЗА ПОЖЕЛАНИЯ">АУДИО КНИГА ЗА ПОЖЕЛАНИЯ</option>
                          <option value="Друга услуга / Общо запитване">Друга услуга / Общо запитване</option>
                        </>
                      )}
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
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Разкажете ни повече за Вашето събитие или идеята Ви..."
                    className="w-full px-6 py-4 rounded-[28px] border-2 border-[#00b4b6] bg-white text-[#182b2c] font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00b4b6] shadow-sm resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#00b4b6] hover:bg-[#008b8d] text-white font-salongbeach text-2xl font-bold uppercase tracking-wider py-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <span>{loading ? "ИЗПРАЩАНЕ..." : "ИЗПРАТИ"}</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </section>
      </div>
    </PageWrapper>
  );
}
