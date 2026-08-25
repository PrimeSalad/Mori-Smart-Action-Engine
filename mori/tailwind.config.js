/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#ffffff",
        "paper-deep": "#fafafa",
        ink: "#262626",
        body: "#5f5f5f",
        muted: "#8e8e8e",
        line: "#dbdbdb",
        signal: "#e33131",
        "signal-dark": "#c51f2a",
        night: "#101010",
        canvas: "#181818",
        "canvas-elevated": "#303030",
        primary: "#c83428",
        "primary-active": "#94231b",
        hairline: "#303030",
        "muted-soft": "#8f8f8f",
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["Inter", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["SFMono-Regular", "Consolas", "Liberation Mono", "monospace"],
      },
      boxShadow: {
        product: "0 12px 40px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
