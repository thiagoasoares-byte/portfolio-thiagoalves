"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#projetos", label: "Projetos" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#contato", label: "Contato" },
];

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-line bg-paper/90 py-3 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-6 sm:px-10">
        <a
          href="#topo"
          className="focus-ring font-mono text-xs tracking-[0.3em] text-ink"
          aria-label="Voltar ao topo"
        >
          T. A. SOARES
        </a>
        <div className="flex items-center gap-6 sm:gap-8">
          <nav
            aria-label="Navegação principal"
            className="hidden gap-8 sm:flex"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-underline focus-ring font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
