import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";
import StickyHeader from "@/components/StickyHeader";
import ProjectBlock from "@/components/ProjectBlock";
import CertificatesCarousel from "@/components/CertificatesCarousel";
import { skillCategories, languages, education } from "@/lib/data";
import { getProjects, getCertificates } from "@/lib/mockapi";

const contacts = [
  {
    label: "E-mail",
    value: "thiagobrsoares3011@gmail.com",
    href: "mailto:thiagobrsoares3011@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/thiago-alves-soares-453700303",
    href: "https://linkedin.com/in/thiago-alves-soares-453700303",
  },
  {
    label: "GitHub",
    value: "github.com/thiagoasoares-byte",
    href: "https://github.com/thiagoasoares-byte",
  },
];

export default async function Home() {
  const [projects, certificates] = await Promise.all([
    getProjects(),
    getCertificates(),
  ]);

  return (
    <>
      <StickyHeader />

      <main id="topo">
        {/* Hero — tipografia grande + retrato, no espírito editorial do Zara.com */}
        <section className="relative mx-auto grid max-w-content items-center gap-10 px-6 pb-20 pt-28 sm:grid-cols-[1.3fr_1fr] sm:gap-16 sm:px-10 sm:pb-28 sm:pt-32">
          <div>
            <p className="font-mono fade-in text-[11px] uppercase tracking-[0.3em] text-muted">
              Desenvolvedor FullStack
            </p>
            <h1 className="font-display fade-in-delay-1 mt-5 text-6xl italic leading-[0.95] text-ink sm:text-7xl">
              Thiago Alves
              <br />
              Soares
            </h1>
            <div className="hero-line mt-9 h-px bg-ink" />
            <p className="fade-in-delay-2 mt-9 max-w-md text-sm leading-relaxed text-muted">
              Desenvolvedor Full stack com experiencia na prática: back-end, front-end e
              CI/CD que sustentam sistemas.
              Testes automatizados, revisão estruturada de código e
              comunicação bilíngue (Inglês C2).
            </p>
            <nav
              aria-label="Contatos"
              className="fade-in-delay-2 mt-9 flex flex-wrap gap-x-8 gap-y-3"
            >
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    c.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={`${c.label}: ${c.value}`}
                  className="link-underline focus-ring font-mono text-xs uppercase tracking-[0.15em] text-ink"
                >
                  {c.value}
                </a>
              ))}
            </nav>
            <div className="fade-in-delay-2 mt-6 flex flex-wrap gap-x-8 gap-y-2">
              <a
                href="/cv/thiago-alves-soares-pt.pdf"
                download
                className="link-underline focus-ring font-mono text-xs uppercase tracking-[0.15em] text-muted hover:text-ink"
              >
                Baixar CV ↓
              </a>
              <a
                href="/cv/thiago-alves-soares-en.pdf"
                download
                className="link-underline focus-ring font-mono text-xs uppercase tracking-[0.15em] text-muted hover:text-ink"
              >
                Resume (EN) ↓
              </a>
            </div>
          </div>

          <div className="fade-in-delay-1 relative order-first aspect-[3/4] w-full max-w-xs justify-self-center overflow-hidden border border-line bg-stone sm:order-none sm:max-w-none sm:justify-self-end">
            <Image
              src="/profile.jpg"
              alt="Retrato de Thiago Alves Soares"
              fill
              sizes="(min-width: 640px) 30vw, 60vw"
              className="object-cover"
              priority
            />
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center sm:flex"
          >
          </div>
        </section>

        {/* Projetos */}
        <section
          id="projetos"
          aria-labelledby="projetos-titulo"
          className="mx-auto max-w-content px-6 py-2 sm:px-10"
        >
          <RevealOnScroll>
            <div className="mt-16 flex items-baseline justify-between border-t border-ink pt-6 sm:mt-24">
              <h2
                id="projetos-titulo"
                className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted"
              >
                Projetos selecionados
              </h2>
              <span className="font-mono text-[11px] text-muted">
                0{projects.length}
              </span>
            </div>
          </RevealOnScroll>

          {projects.map((project, i) => (
            <RevealOnScroll key={project.slug}>
              <ProjectBlock
                {...project}
                position={i + 1}
                reverse={i % 2 === 1}
              />
            </RevealOnScroll>
          ))}
        </section>

        {/* Certificados */}
        <section
          aria-labelledby="certificados-titulo"
          className="mx-auto max-w-content px-6 py-4 sm:px-10"
        >
          <RevealOnScroll>
            <h2
              id="certificados-titulo"
              className="font-mono border-t border-ink pt-6 text-[11px] uppercase tracking-[0.3em] text-muted"
            >
              Certificados
            </h2>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-10 sm:mt-14">
              <CertificatesCarousel certificates={certificates} />
            </div>
          </RevealOnScroll>
        </section>

        {/* Competências técnicas */}
        <section
          aria-labelledby="competencias-titulo"
          className="mx-auto max-w-content px-6 py-4 sm:px-10"
        >
          <RevealOnScroll>
            <h2
              id="competencias-titulo"
              className="font-mono border-t border-ink pt-6 text-[11px] uppercase tracking-[0.3em] text-muted"
            >
              Competências técnicas
            </h2>
          </RevealOnScroll>

          <div className="mt-10 grid gap-x-10 gap-y-8 sm:mt-14 sm:grid-cols-2">
            {skillCategories.map((group) => (
              <RevealOnScroll key={group.category}>
                <h3 className="font-display text-lg italic text-ink">
                  {group.category}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {group.items.join(" · ")}
                </p>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll>
            <div className="mt-12 border-t border-line pt-8">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
                Idiomas
              </h3>
              <p className="mt-3 text-sm text-ink">
                {languages
                  .map((l) => `${l.language} (${l.level})`)
                  .join(" · ")}
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* Experiência */}
        <section
          id="experiencia"
          aria-labelledby="experiencia-titulo"
          className="mx-auto max-w-content px-6 py-4 sm:px-10"
        >
          <RevealOnScroll>
            <h2
              id="experiencia-titulo"
              className="font-mono border-t border-ink pt-6 text-[11px] uppercase tracking-[0.3em] text-muted"
            >
              Experiência profissional
            </h2>
          </RevealOnScroll>

          <div className="mt-10 space-y-10 sm:mt-14">
            <RevealOnScroll>
              <div className="grid gap-2 border-t border-line pt-8 sm:grid-cols-[1fr_2fr] sm:gap-10">
                <div>
                  <h3 className="font-display text-xl italic text-ink">
                    EntrePay
                  </h3>
                  <p className="font-mono mt-1 text-[10px] uppercase tracking-[0.15em] text-muted">
                    Desenvolvedor Full Stack Estagiário · Fintech
                  </p>
                </div>
                <p className="max-w-lg text-sm leading-relaxed text-muted">
                  Manutenção da integridade de dados financeiros sensíveis a
                  falhas. Desenvolvimento e estabilização de microsserviços em
                  Node.js e Python, orquestração de fluxos operacionais com
                  n8n, e revisão de código estruturada via Pull Requests antes
                  de cada deploy em produção.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="grid gap-2 border-t border-line pt-8 sm:grid-cols-[1fr_2fr] sm:gap-10">
                <div>
                  <h3 className="font-display text-xl italic text-ink">
                    Professor de Inglês
                  </h3>
                  <p className="font-mono mt-1 text-[10px] uppercase tracking-[0.15em] text-muted">
                    Nível C2
                  </p>
                </div>
                <p className="max-w-lg text-sm leading-relaxed text-muted">
                  Tradução didática de conceitos complexos para públicos não
                  técnicos — a mesma habilidade aplicada hoje na comunicação
                  de decisões arquiteturais para times de negócio.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Formação */}
        <section
          aria-labelledby="educacao-titulo"
          className="mx-auto max-w-content px-6 py-4 sm:px-10"
        >
          <RevealOnScroll>
            <h2
              id="educacao-titulo"
              className="font-mono border-t border-ink pt-6 text-[11px] uppercase tracking-[0.3em] text-muted"
            >
              Formação
            </h2>
          </RevealOnScroll>

          <div className="mt-10 space-y-6 sm:mt-14">
            {education.map((item) => (
              <RevealOnScroll key={item.title}>
                <div className="grid gap-1 border-t border-line pt-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-10">
                  <div>
                    <p className="font-display text-lg italic text-ink">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {item.institution}
                    </p>
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                    {item.start} — {item.end}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* Contato / rodapé */}
        <footer
          id="contato"
          className="mx-auto mt-20 max-w-content border-t border-ink px-6 py-10 sm:px-10"
        >
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-display text-2xl italic text-ink">
                Vamos conversar.
              </p>
              <p className="mt-2 text-sm text-muted">São Paulo, Brasil</p>
            </div>
            <nav
              aria-label="Contatos no rodapé"
              className="flex flex-wrap gap-x-8 gap-y-2"
            >
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    c.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={`${c.label}: ${c.value}`}
                  className="link-underline focus-ring font-mono text-xs uppercase tracking-[0.15em] text-ink"
                >
                  {c.value}
                </a>
              ))}
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}
