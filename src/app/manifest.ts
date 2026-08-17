import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Пощичка - Интерактивно преживяване & Спомени",
    short_name: "Пощичка",
    description:
      "Персонализирани спомени и интерактивни преживявания, създадени на живо по време на Вашето специално събитие.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f9f6f0",
    theme_color: "#00b4b6",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["lifestyle", "events", "entertainment"],
    lang: "bg",
  };
}
