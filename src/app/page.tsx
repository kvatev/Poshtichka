import React from "react";
import { TopBar } from "@/components/home/top-bar";
import { Header } from "@/components/home/header";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { WhatIsPoshtichka } from "@/components/home/what-is-poshtichka";
import { WhatsIncluded } from "@/components/home/whats-included";
import { HowItWorks } from "@/components/home/how-it-works";
import { CalculatorWidget } from "@/components/home/calculator-widget";
import { CheckDateCTA } from "@/components/home/check-date-cta";
import { GalleryCategories } from "@/components/home/gallery-categories";
import { FinalCTA } from "@/components/home/final-cta";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { Footer } from "@/components/home/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-cream text-brand-dark flex flex-col justify-between selection:bg-[#00b4b6] selection:text-white">
      {/* 1. Top Bar */}
      <TopBar />

      {/* 2. Header */}
      <Header />

      {/* 3. Hero Section */}
      <HeroSection />

      {/* 4. Features Section (Marka, Kartichka, Stiker, Tatuirovka) */}
      <FeaturesSection />

      {/* 5. What is Poshtichka (Vending Machine + 4 Text Blocks) */}
      <WhatIsPoshtichka />

      {/* 6. What's Included (Teal Background, 5 Items) */}
      <WhatsIncluded />

      {/* 7. How it Works (3 Cards with Photo Overlays) */}
      <HowItWorks />

      {/* 8. Working Interactive Calculator Widget */}
      <CalculatorWidget />

      {/* 9. Check Date CTA */}
      <CheckDateCTA />

      {/* 10. Gallery Categories (СВАТБА, КРЪЩЕНЕ, ФИРМЕНО ПАРТИ) */}
      <GalleryCategories />

      {/* 11. Final CTA */}
      <FinalCTA />

      {/* 12. Testimonials Section */}
      <TestimonialsSection />

      {/* 13. Footer */}
      <Footer />
    </main>
  );
}
