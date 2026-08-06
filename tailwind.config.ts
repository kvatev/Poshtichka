import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#00b4b6",
          tealDark: "#008b8d",
          tealLight: "#e5f7f7",
          dark: "#182b2c",
          cream: "#f9f6f0",
          creamLight: "#fdfbf7",
          primary: "#E8B4B8",
          secondary: "#F7E7E3",
          accent: "#00b4b6",
          bg: "#f9f6f0",
          white: "#FFFFFF",
          muted: "#71717A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "var(--font-playfair)", "serif"],
        sans: ["var(--font-sans)", "var(--font-inter)", "sans-serif"],
        serif: ["var(--font-display)", "serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 180, 182, 0.08)",
        card: "0 10px 30px -5px rgba(0, 180, 182, 0.15)",
        glow: "0 0 25px rgba(0, 180, 182, 0.25)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
