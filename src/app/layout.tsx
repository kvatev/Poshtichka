import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PwaInstaller } from "@/components/pwa-installer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

// Native Next.js font optimization for instant loading with zero FOUT/flicker
const saLongBeach = localFont({
  src: "../../public/fonts/SALongBeach.woff",
  variable: "--font-salongbeach",
  display: "swap",
  preload: true,
});

const stampatelloFaceto = localFont({
  src: "../../public/fonts/stampatello-faceto.regular.woff",
  variable: "--font-stampatello",
  display: "swap",
  preload: true,
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
    "Интерактивна вендинг машина под наем за сватби и специални събития, която превръща традиционните подаръци за гости в незабравимо забавление. Услугата включва цялостна персонализация и изработка на уникални хартиени материали по идея на клиента - авторски марки, картички, стикери, временни татуировки, карти с предизвикателства, благодарствени картички. По време на тържеството гостите сами изтеглят своя подарък от машината, което създава вълнуваща атмосфера, момент на изненада и различен спомен, който всеки отнася у дома. Концепцията е модерен и нестандартен заместител на класическите сватбени подаръчета, адаптиран изцяло спрямо темата и визията на събитието.",
  keywords: [
    // Brand & Core Products
    "Пощичка",
    "пощичка за сватба",
    "драсканици",
    "илюстрации",
    "вендинг машина",
    "временни татуировки",
    "временни татуировки за сватба",
    "персонализирани картички",
    "авторски марки",
    "сватбени стикери",

    // Generic Services & Event Search Queries
    "вендинг машина за събития",
    "вендинг машина за сватби",
    "вендинг машина под наем",
    "подаръци за гости на сватба",
    "подаръчета за гости",
    "интерактивно преживяване за събития",
    "сватбени подаръци Бургас",
    "изнесени събития България",
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
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" }],
    shortcut: ["/icons/icon-192x192.png"],
  },
  openGraph: {
    title: "Пощичка | Вендинг машина за събития",
    description:
      "Интерактивна вендинг машина под наем за сватби и специални събития, която превръща традиционните подаръци за гости в незабравимо забавление. Услугата включва цялостна персонализация и изработка на уникални хартиени материали по идея на клиента - авторски марки, картички, стикери, временни татуировки, карти с предизвикателства, благодарствени картички. По време на тържеството гостите сами изтеглят своя подарък от машината, което създава вълнуваща атмосфера, момент на изненада и различен спомен, който всеки отнася у дома. Концепцията е модерен и нестандартен заместител на класическите сватбени подаръчета, адаптиран изцяло спрямо темата и визията на събитието.",
    url: "https://www.poshtichka.eu",
    siteName: "Пощичка",
    locale: "bg_BG",
    type: "website",
    images: [
      {
        url: "https://www.poshtichka.eu/media/5.webp",
        width: 1200,
        height: 630,
        alt: "Пощичка - Вендинг машина за сватби и събития",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Пощичка | Вендинг машина за събития",
    description:
      "Интерактивна вендинг машина под наем за сватби и специални събития, която превръща традиционните подаръци за гости в незабравимо забавление. Услугата включва цялостна персонализация и изработка на уникални хартиени материали по идея на клиента - авторски марки, картички, стикери, временни татуировки, карти с предизвикателства, благодарствени картички. По време на тържеството гостите сами изтеглят своя подарък от машината, което създава вълнуваща атмосфера, момент на изненада и различен спомен, който всеки отнася у дома. Концепцията е модерен и нестандартен заместител на класическите сватбени подаръчета, адаптиран изцяло спрямо темата и визията на събитието.",
    images: ["https://www.poshtichka.eu/media/5.webp"],
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
    "image": "https://www.poshtichka.eu/media/5.webp",
    "description":
      "Интерактивна вендинг машина под наем за сватби и специални събития, която превръща традиционните подаръци за гости в незабравимо забавление. Услугата включва цялостна персонализация и изработка на уникални хартиени материали по идея на клиента - авторски марки, картички, стикери, временни татуировки, карти с предизвикателства, благодарствени картички. По време на тържеството гостите сами изтеглят своя подарък от машината, което създава вълнуваща атмосфера, момент на изненада и различен спомен, който всеки отнася у дома. Концепцията е модерен и нестандартен заместител на класическите сватбени подаръчета, адаптиран изцяло спрямо темата и визията на събитието.",
    "serviceType": [
      "Вендинг машина за сватби и събития",
      "Вендинг машина под наем",
      "Подаръци за гости на сватба",
      "Персонализирани картички и авторски марки",
      "Временни татуировки за сватба",
      "Интерактивно преживяване за събития"
    ],
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
    <html lang="bg" className={`${saLongBeach.variable} ${stampatelloFaceto.variable}`}>
      <head>
        <link rel="icon" href="/icons/icon-192x192.png" type="image/png" sizes="192x192" />
        <link rel="shortcut icon" href="/icons/icon-192x192.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" sizes="192x192" />
        <link
          rel="preload"
          as="image"
          href={encodeURI("/media/Main Page/Main Banner.webp")}
          fetchPriority="high"
        />
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
        <Analytics />
      </body>
    </html>
  );
}
