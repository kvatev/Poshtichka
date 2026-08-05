"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, X, ArrowRight } from "lucide-react";
import { PromoBanner, defaultBanners } from "@/lib/content-store";

export const TopBanner = () => {
  const [banner, setBanner] = useState<PromoBanner | null>(defaultBanners[0]);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.banners && Array.isArray(data.banners)) {
          const topActive = data.banners.find(
            (b: PromoBanner) => b.type === "top" && b.enabled
          );
          if (topActive) {
            setBanner(topActive);
          } else {
            setBanner(null);
          }
        }
      })
      .catch(() => {});
  }, []);

  if (!banner || !banner.enabled || dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-brand-dark via-stone-800 to-brand-dark text-white border-b border-brand-accent/30 py-2.5 px-4 text-xs font-sans relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 mx-auto text-center font-medium">
          <Sparkles className="w-4 h-4 text-brand-primary flex-shrink-0 hidden sm:inline" />
          <span>{banner.message}</span>
          {banner.buttonText && banner.buttonLink && (
            <Link
              href={banner.buttonLink}
              className="inline-flex items-center space-x-1 font-bold text-brand-primary underline hover:text-white ml-2"
            >
              <span>{banner.buttonText}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          title="Затвори"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
