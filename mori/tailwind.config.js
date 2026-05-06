/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#181818",
        "canvas-elevated": "#303030",
        "canvas-light": "#ffffff",
        primary: "#da291c",
        "primary-active": "#b01e0a",
        ink: "#ffffff",
        body: "#969696",
        muted: "#666666",
        "muted-soft": "#8f8f8f",
        hairline: "#303030",
        "hairline-on-light": "#d2d2d2",
        "surface-soft-light": "#f7f7f7",
        "surface-strong-light": "#ebebeb",
      },
      fontFamily: {
        poppins: ["Poppins", "-apple-system", "system-ui", "sans-serif"],
        questrial: ["Questrial", "-apple-system", "system-ui", "sans-serif"],
      },
      spacing: {
        xxxs: "4px",
        xxs: "8px",
        xs: "16px",
        sm: "24px",
        md: "32px",
        lg: "48px",
        xl: "64px",
        xxl: "96px",
        super: "128px",
      },
    },
  },
  plugins: [],
};
