import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Sora", "Inter", "ui-sans-serif", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "sans-serif"],
      },
      colors: {
        ink: "#14150F",
        paper: "#F2EEE3",
        loss: "#B23A2E",
        gain: "#1F6F4A",
        seal: "#C9A227",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseBar: {
          "0%, 100%": { transform: "scaleX(0.93)" },
          "50%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        float: "float 7s ease-in-out infinite",
        floatSlow: "float 10s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        pulseBar: "pulseBar 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
