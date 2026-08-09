"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Instagram, Send, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/layout/page-wrapper";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageWrapper>
      <div className="space-y-16 pb-24">
        {/* Header */}
        <section className="bg-brand-cream py-16 sm:py-24 border-b border-[#00b4b6]/20">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#00b4b6] font-semibold">
              Свържете се с нас
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-brand-dark">
              Очакваме Вашето запитване
            </h1>
            <p className="text-brand-dark/80 text-lg sm:text-xl font-sans max-w-2xl mx-auto font-light leading-relaxed">
              Имате въпрос или искате да проверите наличност за Вашата дата? Свържете се с нас по удобен за Вас начин.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#00b4b6]/10 flex items-center justify-center text-[#00b4b6]">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-brand-dark">
                  Локация
                </h3>
                <p className="text-sm font-sans text-brand-dark/80">
                  гр. Бургас, България <br />
                  <span className="text-xs text-brand-dark/70">
                    (Пътуваме из цялата страна)
                  </span>
                </p>
              </Card>

              <Card className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#00b4b6]/10 flex items-center justify-center text-[#00b4b6]">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-brand-dark">
                  Телефон
                </h3>
                <a
                  href="tel:+359888000000"
                  className="text-sm font-sans text-[#00b4b6] hover:underline font-semibold"
                >
                  +359 888 000 000
                </a>
              </Card>

              <Card className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#00b4b6]/10 flex items-center justify-center text-[#00b4b6]">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-brand-dark">
                  Имейл
                </h3>
                <a
                  href="mailto:hello@poshtichka.bg"
                  className="text-sm font-sans text-[#00b4b6] hover:underline font-semibold"
                >
                  hello@poshtichka.bg
                </a>
              </Card>

              <Card className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#00b4b6]/10 flex items-center justify-center text-[#00b4b6]">
                  <Instagram className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-brand-dark">
                  Instagram
                </h3>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-sans text-[#00b4b6] hover:underline font-semibold"
                >
                  @poshtichka.bg
                </a>
              </Card>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-3xl overflow-hidden shadow-glass border border-[#00b4b6]/30 h-72 relative">
              <iframe
                title="Карта Бургас"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93967.58550130985!2d27.4046182!3d42.5047805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a6926514757c91%3A0x400a01269af5e70!2sBurgas!5e0!3m2!1sen!2sbg!4v1700000000000!5m2!1sen!2sbg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 sm:p-10 space-y-6">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#00b4b6]/10 text-[#00b4b6] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-brand-dark">
                  Благодарим Ви!
                </h3>
                <p className="text-sm font-sans text-brand-dark/80">
                  Вашето съобщение беше изпратено успешно. Ще се свържем с Вас в рамките на 24 часа.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-bold text-brand-dark">
                    Изпратете съобщение
                  </h3>
                  <p className="text-sm font-sans text-brand-dark/70">
                    Попълнете формата и ние ще Ви отговорим в рамките на 24 часа.
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-1">
                    <label className="text-xs font-sans font-medium text-brand-dark">
                      Вашето име *
                    </label>
                    <input
                      type="text"
                      placeholder="Име и фамилия"
                      className="w-full px-4 py-3 rounded-xl border border-[#00b4b6]/30 bg-brand-cream text-brand-dark font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-sans font-medium text-brand-dark">
                        Телефон *
                      </label>
                      <input
                        type="tel"
                        placeholder="+359 888 123 456"
                        className="w-full px-4 py-3 rounded-xl border border-[#00b4b6]/30 bg-brand-cream text-brand-dark font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6]"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-sans font-medium text-brand-dark">
                        Имейл *
                      </label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#00b4b6]/30 bg-brand-cream text-brand-dark font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-sans font-medium text-brand-dark">
                      Съобщение *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Разкажете ни за Вашето събитие (дата, град, брой гости)..."
                      className="w-full px-4 py-3 rounded-xl border border-[#00b4b6]/30 bg-brand-cream text-brand-dark font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4b6]"
                      required
                    />
                  </div>

                  <Button variant="primary" size="lg" className="w-full flex items-center justify-center space-x-2">
                    <span>Изпрати съобщение</span>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </>
            )}
          </Card>
        </section>
      </div>
    </PageWrapper>
  );
}

