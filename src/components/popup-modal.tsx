"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PopupLiveConfig {
  id?: number;
  title: string;
  badge?: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  imageUrl?: string;
  isActive: boolean;
}

export const PopupModal = () => {
  const [popup, setPopup] = useState<PopupLiveConfig | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check session storage so modal doesn't re-open on every page navigation within same session
    const dismissedKey = "poshtichka_popup_dismissed";
    const isDismissed = sessionStorage.getItem(dismissedKey);

    if (isDismissed) return;

    fetch("/api/popup")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === "object") {
          const config: PopupLiveConfig = {
            id: data.id || 1,
            title: data.title || "Специална Сватбена Оферта",
            badge: data.badge || "Промоция",
            description: data.description || "Запазете вашата дата за сватба или събитие с отстъпка за ранни запитвания.",
            ctaText: data.ctaText || data.cta_text || "Проверете наличност",
            ctaUrl: data.ctaUrl || data.cta_url || "/booking",
            imageUrl: data.imageUrl || data.image_url || "",
            isActive: typeof data.isActive === "boolean" ? data.isActive : (data.is_active ?? true),
          };

          // If isActive is false, do not show popup
          if (config.isActive) {
            setPopup(config);
            const timer = setTimeout(() => setOpen(true), 1500);
            return () => clearTimeout(timer);
          }
        }
      })
      .catch((err) => console.warn("PopupModal fetch warning:", err));
  }, []);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem("poshtichka_popup_dismissed", "true");
  };

  // If popup is inactive or open state is false, return null
  if (!popup || !popup.isActive || !open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-brand-dark/80 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border-2 border-brand-primary/40 relative font-sans"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
            aria-label="Затвори"
          >
            <X className="w-5 h-5" />
          </button>

          {popup.imageUrl ? (
            <div className="relative h-48 w-full">
              <Image
                src={popup.imageUrl}
                alt={popup.title}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
            </div>
          ) : (
            <div className="bg-brand-dark p-6 text-center text-white space-y-2 relative overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-brand-accent/20 border border-brand-accent/40 flex items-center justify-center text-brand-primary mx-auto">
                <Gift className="w-6 h-6" />
              </div>
            </div>
          )}

          <div className="p-6 sm:p-8 text-center space-y-4">
            {popup.badge && (
              <span className="inline-flex items-center space-x-1.5 bg-brand-secondary px-3 py-1 rounded-full text-xs font-semibold text-brand-accent uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{popup.badge}</span>
              </span>
            )}

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
              {popup.title}
            </h3>

            <p className="text-brand-dark/80 text-sm sm:text-base leading-relaxed font-light">
              {popup.description}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={popup.ctaUrl || "/booking"} onClick={handleClose}>
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  {popup.ctaText || "Проверете наличност"}
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                onClick={handleClose}
                className="w-full sm:w-auto text-brand-dark"
              >
                Може би по-късно
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
