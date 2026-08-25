"use client";

import { useRef } from "react";
import CertificateCard from "./CertificateCard";
import type { Certificate } from "@/lib/data";

export default function CertificatesCarousel({
  certificates,
}: {
  certificates: Certificate[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByAmount(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.85 * direction, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {certificates.map((cert) => (
          <div
            key={cert.id ?? cert.title}
            className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[30%]"
          >
            <CertificateCard {...cert} />
          </div>
        ))}
      </div>

      {certificates.length > 1 && (
        <div className="mt-5 flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
            Use as setas
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollByAmount(-1)}
              aria-label="Certificado anterior"
              className="focus-ring border border-ink/20 px-3 py-1.5 font-mono text-xs text-ink transition-colors hover:border-ink"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(1)}
              aria-label="Próximo certificado"
              className="focus-ring border border-ink/20 px-3 py-1.5 font-mono text-xs text-ink transition-colors hover:border-ink"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
