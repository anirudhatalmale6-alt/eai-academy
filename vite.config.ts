import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the built app works both at a domain root (production,
// e.g. academy.empathetic-ai.com) and under a sub-path (GitHub Pages preview).
// The app uses HashRouter, so client-side routing works in both cases without
// server-side SPA fallback.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
