"use client";

import React from "react";
import { TopBar } from "@/components/home/top-bar";
import { Header } from "@/components/home/header";
import { Footer } from "@/components/home/footer";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark flex flex-col justify-between selection:bg-[#00b4b6] selection:text-white">
      <div>
        <TopBar />
        <Header />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
