import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        legal: {
          navy: {
            50: "#f0f4f8",
            100: "#d9e2ec",
            200: "#bcccdc",
            300: "#9fb3c8",
            400: "#829ab1",
            500: "#627d98",
            600: "#486581",
            700: "#334e68",
            800: "#1e3a5f",
            900: "#0b192c",
            950: "#060d17",
          },
          gold: {
            50: "#fbf8f2",
            100: "#f5eee0",
            200: "#eadbc0",
            300: "#dec69d",
            400: "#d0af77",
            500: "#c5a880",
            600: "#b38f56",
            700: "#94723c",
            800: "#785b30",
            900: "#5a4324",
          },
          cream: {
            50: "#fcfbf9",
            100: "#faf7f2",
            200: "#f5f0e6",
            300: "#eee6d4",
          },
          charcoal: {
            900: "#121820",
            950: "#090d12",
          },
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        card: "0 4px 20px -2px rgba(11, 25, 44, 0.06), 0 2px 6px -1px rgba(11, 25, 44, 0.04)",
        elevated: "0 20px 40px -15px rgba(11, 25, 44, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
