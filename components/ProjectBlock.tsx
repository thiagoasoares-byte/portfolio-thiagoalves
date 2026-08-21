import Image from "next/image";
import TechBadge from "./TechBadge";

export type ProjectBlockProps = {
  index: number;
  slug: string;
  category: string;
  title: string;
  context: string;
  x: string;
  y: string;
  z: string;
  stack: string[];
  repoUrl?: string;
  deployUrl?: string;
  deployLabel?: string;
  imageUrl?: string;
  imageAlt?: string;
  reverse?: boolean;
};

export default function ProjectBlock({
  index,
  category,
  title,
  context,
  x,
  y,
  z,
  stack,
  repoUrl,
  deployUrl,
  deployLabel = "Ver projeto",
  imageUrl,
  imageAlt,
  reverse = false,
}: ProjectBlockProps) {
  const serial = String(index).padStart(2, "0");

  return (
    <article className="border-t border-line py-16 sm:py-24">
      <div className="grid items-center gap-10 sm:grid-cols-2 sm:gap-16">
        {/* Lado visual: screenshot do projeto, ou uma capa tipográfica quando não há imagem */}
        <div className={`group relative ${reverse ? "sm:order-2" : "sm:order-1"}`}>
          <span
            aria-hidden
            className="font-display pointer-events-none absolute -left-1 -top-12 select-none text-[6.5rem] font-light italic leading-none text-ink/[0.06] sm:-top-16 sm:text-[8.5rem]"
          >
            {serial}
          </span>

          <div className="relative aspect-[4/3] overflow-hidden bg-stone">
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
          </div>
        </div>

        {/* Lado narrativo: contexto + fórmula XYZ + stack + links */}
        <div className={reverse ? "sm:order-1" : "sm:order-2"}>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            {category}
          </p>
          <h3 className="font-display mt-2 text-3xl italic leading-tight text-ink sm:text-4xl">
            {title}
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            {context}
          </p>

          <dl className="mt-7 space-y-4 border-l border-line pl-5">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                O que fez
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-ink">{x}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                Por que importa
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-ink">{y}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                Como fez
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-ink">{z}</dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-6">
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Repositório de ${title} no GitHub`}
                className="link-underline focus-ring font-mono text-xs uppercase tracking-[0.15em] text-ink"
              >
                Repositório ↗
              </a>
            )}
            {deployUrl && (
              <a
                href={deployUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${deployLabel} — ${title}`}
                className="link-underline focus-ring font-mono text-xs uppercase tracking-[0.15em] text-ink"
              >
                {deployLabel} ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
