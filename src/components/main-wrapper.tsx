"use client";

import React from "react";
import { usePathname } from "next/navigation";

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <main className={`flex-grow ${isAdmin ? "" : "min-h-[calc(100vh-200px)]"}`}>
      {children}
    </main>
  );
}
