import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#05050A",
        surface: "#0D0D13",
        elevated: "#14141C",
        chrome: {
          100: "#F5F6F8",
          300: "#C9CDD4",
          600: "#6B7280",
        },
        bolt: {
          orange: "#FF8A00",
          gold: "#FFC400",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)"],
        body: ["var(--font-dmsans)"],
        mono: ["var(--font-jbmono)"],
      },
      backgroundImage: {
        "bolt-gradient": "linear-gradient(135deg, #FF8A00 0%, #FFC400 100%)",
        "chrome-gradient": "linear-gradient(180deg, #FFFFFF 0%, #B7BCC4 60%, #8A8F99 100%)",
      },
      boxShadow: {
        "bolt-glow": "0 0 40px rgba(255, 138, 0, 0.35)",
      },
      clipPath: {
        bolt: "polygon(60% 0, 100% 0, 45% 100%, 25% 100%, 45% 55%, 0 55%)",
      },
    },
  },
  plugins: [],
};
export default config;
