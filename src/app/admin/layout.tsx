import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Административен Панел | Пощичка",
  description: "Централна система за управление на Пощичка",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
