import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { PwaInstaller } from "@/components/pwa-installer";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

export const viewport: Viewport = {
  themeColor: "#00b4b6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.poshtichka.eu"),
  title: "Пощичка | Вендинг машина за събития",
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
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Пощичка",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: encodeURI("/icons/Asset 101@2x.png?v=poshtichka_101"), type: "image/png" },
      { url: "/icons/icon-192x192.png?v=poshtichka_101", type: "image/png" },
      { url: "/icons/favicon.ico?v=poshtichka_101", sizes: "any" },
    ],
    shortcut: encodeURI("/icons/Asset 101@2x.png?v=poshtichka_101"),
    apple: [
      { url: encodeURI("/icons/Asset 101@2x.png?v=poshtichka_101"), sizes: "180x180", type: "image/png" },
      { url: "/icons/apple-touch-icon.png?v=poshtichka_101", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Пощичка | Вендинг машина за събития",
    description: "Персонализирани спомени, създадени на живо по време на Вашето събитие.",
    url: "https://www.poshtichka.eu",
    siteName: "Пощичка",
    locale: "bg_BG",
    type: "website",
    images: [
      {
        url: "https://www.poshtichka.eu/media/Main Page/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "Пощичка - Вендинг машина за събития",
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
    "image": "https://www.poshtichka.eu/icons/Asset 101@2x.png",
    "description": "Интерактивно преживяване и персонализирани спомени за сватби и корпоративни събития.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Бургас",
      "addressCountry": "BG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 42.5048,
      "longitude": 27.4626
    },
    "url": "https://www.poshtichka.eu",
    "email": "info@poshtichka.eu",
    "priceRange": "300€ - 500€"
  };

  return (
    <html lang="bg" className={`${displayFont.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href={encodeURI("/icons/Asset 101@2x.png?v=poshtichka_101")} type="image/png" sizes="any" />
        <link rel="shortcut icon" href={encodeURI("/icons/Asset 101@2x.png?v=poshtichka_101")} type="image/png" />
        <link rel="apple-touch-icon" href={encodeURI("/icons/Asset 101@2x.png?v=poshtichka_101")} />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Пощичка" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen bg-brand-cream text-brand-dark selection:bg-brand-[#00b4b6] selection:text-white">
        {children}
        <PwaInstaller />
        <SpeedInsights />
      </body>
    </html>
  );
}
