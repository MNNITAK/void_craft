import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#0A0A0C",
          soft: "#121215",
          card: "#17171B",
          line: "#26262C",
        },
        bone: {
          DEFAULT: "#F2F0E8",
          dim: "#E7E5DB",
          ink: "#141414",
        },
        volt: {
          DEFAULT: "#0B4FFF",
          deep: "#0839BF",
          soft: "#5C86FF",
        },
        signal: "#FF4D2E",
        mint: "#3DDC97",
        mist: "#9C9CA6",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        micro: "0.14em",
      },
      maxWidth: {
        shell: "80rem",
      },
      animation: {
        marquee: "marquee 42s linear infinite",
        "pulse-soft": "pulseSoft 3.2s ease-in-out infinite",
        drift: "drift 14s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-18px,0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
