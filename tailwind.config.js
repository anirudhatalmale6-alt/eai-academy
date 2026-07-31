/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F5F4FB",
        panel: "#ffffff",
        ink: "#1E1D29",
        ink2: "#6b6a78",
        line: "rgba(24,26,31,0.09)",
        // Rich deep-violet for dark sections — branded, premium (not flat black).
        plum: "#191233",
        // Empathetic AI brand accent — the finance-blue from the logo (the
        // logo's gradient runs blue -> violet -> pink; blue is the trust anchor
        // used for links, labels and small UI, gradients carry the full range).
        accent: { DEFAULT: "#3B82F6", ink: "#2563EB" },
        brand: {
          blue: "#3B82F6",
          violet: "#7C5CFF",
          pink: "#E24BE0",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
