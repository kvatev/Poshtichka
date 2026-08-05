"use client";

import React from "react";
import { usePathname } from "next/navigation";

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <main className={`flex-grow ${isAdmin ? "" : "pt-20 sm:pt-24"}`}>
      {children}
    </main>
  );
}
