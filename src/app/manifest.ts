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
        src: encodeURI("/media/icons/Asset 95@2x.png"),
        sizes: "192x192 512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: encodeURI("/media/icons/Asset 95@2x.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon.png",
        sizes: "192x192 512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["lifestyle", "events", "entertainment"],
    lang: "bg",
  };
}
