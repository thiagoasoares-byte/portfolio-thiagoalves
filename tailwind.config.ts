import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Tokens apontam para variáveis CSS (definidas em globals.css),
        // que trocam de valor conforme a classe "dark" no <html>. O
        // padrão rgb(var(...) / <alpha-value>) preserva os modificadores
        // de opacidade do Tailwind (ex.: text-ink/50) em ambos os temas.
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        stone: "rgb(var(--color-stone) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        badge: "rgb(var(--color-badge) / <alpha-value>)",
      },
      fontFamily: {
        // Same type system as Rota Aberta: Fraunces for display,
        // IBM Plex Sans for body, IBM Plex Mono for labels/stamps.
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "72rem",
        prose: "40rem",
      },
    },
  },
  plugins: [],
};

export default config;
