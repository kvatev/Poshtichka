"use client";

import React, { useState, useEffect } from "react";
import { X, Share, PlusSquare, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export const PwaInstaller = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    // 1. Check if running as installed standalone app
    const isStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandaloneMode) return;

    // 2. Register Service Worker silently in the background
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch((err) => {
        console.warn("ServiceWorker registration notice:", err);
      });
    }

    // 3. Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // 4. Capture beforeinstallprompt silently without showing automatic popup
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 5. Only open modal if user explicitly clicks install from menu/footer
    const handleCustomTrigger = () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
      } else {
        setShowIOSModal(true);
      }
    };

    window.addEventListener("open-pwa-install-modal", handleCustomTrigger);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("open-pwa-install-modal", handleCustomTrigger);
    };
  }, [deferredPrompt]);

  return (
    <>
      {/* Only shown if user explicitly clicks "Изтегли приложението" */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 font-sans animate-in fade-in duration-300">
          <div className="bg-[#f9f6f0] text-[#182b2c] rounded-3xl border-2 border-[#00b4b6] max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl relative animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-black/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center space-x-3.5 border-b border-[#182b2c]/10 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#00b4b6]/15 border border-[#00b4b6]/40 p-2 flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-6 h-6 text-[#00b4b6]" />
              </div>
              <div>
                <h3 className="font-salongbeach text-xl font-bold uppercase tracking-wider text-[#00b4b6]">
                  Инсталиране на телефон
                </h3>
                <p className="text-xs text-[#182b2c]/70 font-sans">
                  Добавете Пощичка на началния екран
                </p>
              </div>
            </div>

            {/* Step by step guide */}
            <div className="space-y-3.5 text-xs sm:text-sm font-sans">
              <div className="flex items-start space-x-3 p-3 bg-white rounded-2xl border border-[#00b4b6]/20 shadow-xs">
                <span className="w-6 h-6 rounded-full bg-[#00b4b6] text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
                  1
                </span>
                <p className="text-[#182b2c]/90">
                  Натиснете бутона за споделяне{" "}
                  <strong className="text-[#00b4b6] inline-flex items-center gap-1 font-semibold">
                    „Сподели“ (Share) <Share className="w-3.5 h-3.5 inline" />
                  </strong>{" "}
                  в браузъра (или трите точки в Chrome).
                </p>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-white rounded-2xl border border-[#00b4b6]/20 shadow-xs">
                <span className="w-6 h-6 rounded-full bg-[#00b4b6] text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
                  2
                </span>
                <p className="text-[#182b2c]/90">
                  Изберете опцията{" "}
                  <strong className="text-[#00b4b6] inline-flex items-center gap-1 font-semibold">
                    „Към началния екран“ (Add to Home Screen){" "}
                    <PlusSquare className="w-3.5 h-3.5 inline" />
                  </strong>
                  .
                </p>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-white rounded-2xl border border-[#00b4b6]/20 shadow-xs">
                <span className="w-6 h-6 rounded-full bg-[#00b4b6] text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
                  3
                </span>
                <p className="text-[#182b2c]/90">
                  Натиснете <strong className="text-[#00b4b6] font-semibold">„Добави“ (Add)</strong>.
                </p>
              </div>
            </div>

            {/* Close action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowIOSModal(false)}
                className="w-full bg-[#00b4b6] hover:bg-[#008b8d] text-white font-salongbeach text-sm font-bold uppercase tracking-wider py-3 rounded-2xl shadow-md cursor-pointer transition-colors"
              >
                Разбрах
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
