"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PromoPopup, defaultPopups } from "@/lib/content-store";

export const PopupModal = () => {
  const [popup, setPopup] = useState<PromoPopup | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check session storage to avoid showing popup on every single page click
    const dismissedKey = "poshtichka_popup_dismissed";
    const isDismissed = sessionStorage.getItem(dismissedKey);

    if (isDismissed) return;

    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.popups && Array.isArray(data.popups)) {
          const activePopup = data.popups.find((p: PromoPopup) => p.enabled);
          if (activePopup) {
            setPopup(activePopup);
            // Delay 1.5s for smooth impression
            const timer = setTimeout(() => setOpen(true), 1500);
            return () => clearTimeout(timer);
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem("poshtichka_popup_dismissed", "true");
  };

  if (!popup || !open) return null;

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
            {popup.badgeText && (
              <span className="inline-flex items-center space-x-1.5 bg-brand-secondary px-3 py-1 rounded-full text-xs font-semibold text-brand-accent uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{popup.badgeText}</span>
              </span>
            )}

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
              {popup.title}
            </h3>

            <p className="text-brand-dark/80 text-sm sm:text-base leading-relaxed font-light">
              {popup.subtitle}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={popup.buttonLink} onClick={handleClose}>
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  {popup.buttonText}
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
