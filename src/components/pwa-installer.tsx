"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Download, X, Share, PlusSquare, Smartphone, Check } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export const PwaInstaller = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [installedSuccessfully, setInstalledSuccessfully] = useState(false);

  useEffect(() => {
    // 1. Check if running as installed standalone app
    const isStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    setIsStandalone(isStandaloneMode);
    if (isStandaloneMode) return;

    // 2. Register Service Worker for PWA
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch((err) => {
        console.warn("ServiceWorker registration notice:", err);
      });
    }

    // 3. Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // 4. Check if user recently dismissed banner
    const dismissedAt = localStorage.getItem("poshtichka_pwa_dismissed");
    const isDismissedRecently =
      dismissedAt && Date.now() - parseInt(dismissedAt, 10) < 1000 * 60 * 60 * 24 * 3; // 3 days

    // 5. Android / Chrome beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (!isDismissedRecently) {
        setShowBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // If on iOS and not standalone and not dismissed, show gentle banner after short delay
    if (isIosDevice && !isStandaloneMode && !isDismissedRecently) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 4000);
      return () => clearTimeout(timer);
    }

    // 6. Custom Trigger from Header / Footer buttons
    const handleCustomTrigger = () => {
      setShowBanner(false);
      if (deferredPrompt) {
        deferredPrompt.prompt();
      } else {
        setShowIOSModal(true);
      }
    };

    window.addEventListener("open-pwa-install-modal", handleCustomTrigger);

    // Track app installed
    window.addEventListener("appinstalled", () => {
      setShowBanner(false);
      setInstalledSuccessfully(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("open-pwa-install-modal", handleCustomTrigger);
    };
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setShowBanner(false);
        setInstalledSuccessfully(true);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback for browsers that don't emit prompt
      setShowIOSModal(true);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    try {
      localStorage.setItem("poshtichka_pwa_dismissed", Date.now().toString());
    } catch {}
  };

  if (isStandalone) return null;

  return (
    <>
      {/* Floating PWA Install Notification Banner for Mobile Devices */}
      {showBanner && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-500 font-sans">
          <div className="bg-[#182b2c] text-white p-4 sm:p-4.5 rounded-3xl shadow-2xl border-2 border-[#00b4b6] flex items-center justify-between gap-3.5 backdrop-blur-md">
            {/* App Icon & Details */}
            <div className="flex items-center space-x-3 min-w-0">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white/10 p-1 flex-shrink-0 border border-[#00b4b6]/40 shadow-inner">
                <Image
                  src="/media/logos/Logo.png"
                  alt="Пощичка Приложение"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <h4 className="font-salongbeach text-sm sm:text-base font-bold uppercase tracking-wider text-[#00b4b6] truncate">
                  Инсталирай Пощичка
                </h4>
                <p className="text-[11px] text-white/80 leading-tight truncate">
                  Изтегли на телефона за бърз достъп
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-1.5 flex-shrink-0">
              <button
                type="button"
                onClick={handleInstallClick}
                className="bg-[#00b4b6] hover:bg-[#008b8d] text-white text-xs font-bold font-salongbeach uppercase tracking-wider px-3.5 py-2 rounded-xl flex items-center space-x-1.5 shadow-md cursor-pointer transition-all active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Инсталирай</span>
              </button>
              <button
                type="button"
                onClick={handleDismiss}
                className="p-1.5 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                title="Затвори"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {installedSuccessfully && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-700 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-2 text-xs font-bold animate-in fade-in duration-300 font-sans">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>Приложението Пощичка бе инсталирано успешно!</span>
        </div>
      )}

      {/* iOS Safari / Manual Installation Instructions Modal */}
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
                  Инсталиране на iPhone & Android
                </h3>
                <p className="text-xs text-[#182b2c]/70 font-sans">
                  Добавете Пощичка директно на началния екран
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
                  в долната лента на Safari браузъра.
                </p>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-white rounded-2xl border border-[#00b4b6]/20 shadow-xs">
                <span className="w-6 h-6 rounded-full bg-[#00b4b6] text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
                  2
                </span>
                <p className="text-[#182b2c]/90">
                  Превъртете менюто надолу и изберете опцията{" "}
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
                  Натиснете <strong className="text-[#00b4b6] font-semibold">„Добави“ (Add)</strong> в
                  горния десен ъгъл. Готово!
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
