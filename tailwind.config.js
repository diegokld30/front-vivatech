import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      /* —— Tipografías base —— */
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },

      /* —— Colores corporativos —— */
      colors: {
        /* Verde principal (botones, enlaces, focos) */
        primary: {
          DEFAULT: "#2e7d32",
          50:  "#e3f2e5",
          100: "#c7e4cb",
          200: "#9bd0a3",
          300: "#6fbd7b",
          400: "#49ab59",
          500: "#2e7d32",
          600: "#25642b",
          700: "#1c4b21",
          800: "#133316",
          900: "#0a1a0b",
        },
        /* Naranja de acento para destacar precios u ofertas */
        accent: {
          DEFAULT: "#ff9800",
          600:    "#fb8c00",
          700:    "#ef6c00",
        },
      },
    },
  },
  plugins: [heroui()],
};

module.exports = config;
