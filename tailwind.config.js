/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F7F7F7",
        panel: "#ffffff",
        ink: "#1E1D29",
        ink2: "#6b6a78",
        line: "rgba(24,26,31,0.09)",
        cyan: { DEFAULT: "#00B1E2", ink: "#0090ba" },
        brand: "#3C83F6",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
