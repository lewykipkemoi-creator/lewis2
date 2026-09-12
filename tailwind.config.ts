import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Fraunces", "ui-serif", "serif"],
        sans: ["Inter", "ui-sans-serif", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        ink: "#14150F",
        paper: "#F2EEE3",
        loss: "#B23A2E",
        gain: "#1F6F4A",
        seal: "#C9A227",
      },
    },
  },
  plugins: [],
};

export default config;
