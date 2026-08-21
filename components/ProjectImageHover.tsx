"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";

type ProjectImageHoverProps = {
  title: string;
  imageUrl?: string;
  imageAlt?: string;
  href?: string;
};

export default function ProjectImageHover({
  title,
  imageUrl,
  imageAlt,
  href,
}: ProjectImageHoverProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setPos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  }

  const frame = (
    <div
      className="group relative aspect-[4/3] overflow-hidden bg-stone sm:[@media(hover:hover)]:cursor-none"
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={imageAlt ?? `Captura de tela do projeto ${title}`}
          fill
          sizes="(min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
          <span className="font-display text-4xl italic text-ink/25">
            {title.charAt(0)}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Projeto de backend — sem preview visual
          </span>
        </div>
      )}

      {href && (
        <span
          aria-hidden
          className={`pointer-events-none absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 whitespace-nowrap border border-ink bg-paper px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink transition-opacity duration-200 sm:flex ${
            hovering ? "opacity-100" : "opacity-0"
          }`}
          style={{ left: pos.x, top: pos.y }}
        >
          Ver ↗
        </span>
      )}
    </div>
  );

  if (!href) return frame;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir projeto ${title}`}
      className="focus-ring block"
    >
      {frame}
    </a>
  );
}
