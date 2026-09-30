import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        green: { deep: "#0E6B2F", dark: "#0B5D2A", light: "#E8F3EC", forest: "#062617" },
        gold: { DEFAULT: "#C9A227", light: "#E8C968", dark: "#9C7E1E" },
        campaignred: "#C8102E",
        ivory: "#F7F4ED",
        ink: "#111418",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px -8px rgba(11, 93, 42, 0.15)",
        "card-hover": "0 12px 40px -8px rgba(11, 93, 42, 0.28)",
        gold: "0 8px 32px -8px rgba(201, 162, 39, 0.45)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #062617 0%, #0B5D2A 50%, #0E6B2F 100%)",
        "gold-gradient": "linear-gradient(135deg, #C9A227 0%, #E8C968 50%, #C9A227 100%)",
        "flag-ribbon": "linear-gradient(90deg, #0F47AF 0%, #FCDD09 25%, #078930 50%, #DA121A 75%, #111418 100%)",
      },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: { "fade-up": "fade-up 0.6s ease-out forwards" },
    },
  },
  plugins: [],
};

export default config;
