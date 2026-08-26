import type { Metadata } from "next";
import Link from "next/link";
import StickyHeader from "@/components/StickyHeader";

export const metadata: Metadata = {
  title: "Página não encontrada — Thiago Alves Soares",
};

export default function NotFound() {
  return (
    <>
      <StickyHeader />
      <main className="mx-auto flex min-h-screen max-w-content flex-col items-center justify-center px-6 text-center sm:px-10">
        <p className="font-mono fade-in text-[11px] uppercase tracking-[0.3em] text-muted">
          Erro 404
        </p>
        <h1 className="font-display fade-in-delay-1 mt-5 text-8xl italic leading-none text-ink sm:text-9xl">
          404
        </h1>
        <div className="fade-in-delay-2 mt-8 h-px w-24 bg-ink" />
        <p className="fade-in-delay-2 mt-8 max-w-sm text-sm leading-relaxed text-muted">
          A página que você procura não existe ou foi movida.
        </p>
        <Link
          href="/"
          className="link-underline focus-ring fade-in-delay-2 mt-8 font-mono text-xs uppercase tracking-[0.15em] text-ink"
        >
          Voltar para o início ↗
        </Link>
      </main>
    </>
  );
}
