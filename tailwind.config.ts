import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f0f0e", // near-black, primary text
        paper: "#ffffff", // pure white, page background
        stone: "#f4f2ee", // warm off-white for alternating panels
        line: "#e1ded7", // hairline dividers
        muted: "#82796c", // warm taupe, secondary text/labels
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
