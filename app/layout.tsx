import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
  weight: "variable",
  style: ["normal", "italic"],
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfoliothiagoalvesoares.vercel.app"),
  title: "Thiago Alves Soares — Desenvolvedor FullStack",
  description:
    "Portfólio de Thiago Alves Soares, Desenvolvedor FullStack com experiência em Python, Node.js, React e infraestrutura AWS.",
  openGraph: {
    title: "Thiago Alves Soares — Desenvolvedor FullStack",
    description:
      "Portfólio de Thiago Alves Soares, Desenvolvedor FullStack com experiência em Python, Node.js, React e infraestrutura AWS.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thiago Alves Soares — Desenvolvedor FullStack",
    description:
      "Portfólio de Thiago Alves Soares, Desenvolvedor FullStack com experiência em Python, Node.js, React e infraestrutura AWS.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="font-body bg-paper text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
