"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { TopBanner } from "./banner";
import { Navbar } from "./navbar";

export const Header = () => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <div className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-xs border-b border-brand-primary/20 transition-all duration-300">
      <TopBanner />
      <Navbar />
    </div>
  );
};
