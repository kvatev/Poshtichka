import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

// Google fonts used for production build stability; can be swapped with localFont SALongBeach.otf
const displayFont = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Пощичка | Всеки гост си тръгва със спомен",
  description:
    "Пощичка е бутикова вендинг машина за събития в България. Всеки гост си тръгва с персонализиран спомен, създаден на живо по време на Вашата сватба, корпоративно събитие или празник.",
  keywords: [
    "сватбено изживяване България",
    "подаръци за гости сватба",
    "персонализирани картички",
    "временни татуировки сватба",
    "бутиково събитие Бургас",
    "алтернатива на фото кабина",
    "интерактивно преживяване",
    "Пощичка",
  ],
  authors: [{ name: "Пощичка" }],
  icons: {
    icon: "/media/logos/Logo.png",
    shortcut: "/media/logos/Logo.png",
    apple: "/media/logos/Logo.png",
  },
  openGraph: {
    title: "Пощичка | Всеки гост си тръгва със спомен",
    description: "Персонализирани спомени, създадени на живо по време на Вашето събитие.",
    url: "https://poshtichka.bg",
    siteName: "Пощичка",
    locale: "bg_BG",
    type: "website",
    images: [
      {
        url: "https://poshtichka.bg/media/Main Page/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "Пощичка - Интерактивно преживяване",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Пощичка",
    "image": "https://poshtichka.bg/media/logos/Logo.png",
    "description": "Интерактивно преживяване и персонализирани спомени за сватби и корпоративни събития.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Burgas",
      "addressCountry": "BG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 42.5048,
      "longitude": 27.4626
    },
    "url": "https://poshtichka.bg",
    "telephone": "+359888000000",
    "priceRange": "300€ - 500€"
  };

  return (
    <html lang="bg" className={`${displayFont.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/media/logos/Logo.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/media/logos/Logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/media/logos/Logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen bg-brand-cream text-brand-dark selection:bg-brand-[#00b4b6] selection:text-white">
        {children}
      </body>
    </html>
  );
}
