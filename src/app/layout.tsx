import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Пощичка | Интерактивно преживяване и персонализирани спомени за Вашето събитие",
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
  openGraph: {
    title: "Пощичка | Всеки гост си тръгва със спомен",
    description: "Персонализирани спомени, създадени на живо по време на Вашето събитие.",
    url: "https://poshtichka.bg",
    siteName: "Пощичка",
    locale: "bg_BG",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
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
  // Schema.org structured data for LocalBusiness / Event Supplier
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Пощичка",
    "image": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
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
    "priceRange": "350€ - 500€"
  };

  return (
    <html lang="bg" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col justify-between selection:bg-brand-primary selection:text-brand-dark">
        <Navbar />
        <main className="flex-grow pt-20 sm:pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
