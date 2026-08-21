import RevealOnScroll from "@/components/RevealOnScroll";
import StickyHeader from "@/components/StickyHeader";
import ProjectBlock from "@/components/ProjectBlock";
import { projects } from "@/lib/data";

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

export default function Home() {
  return (
    <>
      <StickyHeader />

      <main id="topo">
        {/* Hero — tipografia grande, sem foto, no espírito editorial do Zara.com */}
        <section className="mx-auto flex min-h-[88vh] max-w-content flex-col justify-center px-6 pt-28 sm:px-10">
          <p className="font-mono fade-in text-[11px] uppercase tracking-[0.3em] text-muted">
            Desenvolvedor FullStack
          </p>
          <h1 className="font-display fade-in-delay-1 mt-5 text-6xl italic leading-[0.95] text-ink sm:text-7xl md:text-8xl">
            Thiago Alves
            <br />
            Soares
          </h1>
          <div className="hero-line mt-9 h-px bg-ink" />
          <p className="fade-in-delay-2 mt-9 max-w-md text-sm leading-relaxed text-muted">
            Experiência prática de produção no setor financeiro (Fintech),
            atuando em pipelines de CI/CD, testes automatizados e revisão
            estruturada de código. Comunicador bilíngue avançado (Inglês C2),
            construindo produtos documentados de ponta a ponta.
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
        </section>

        {/* Projetos */}
        <section
          id="projetos"
          aria-labelledby="projetos-titulo"
          className="mx-auto max-w-content px-6 py-4 sm:px-10"
        >
          <RevealOnScroll>
            <div className="flex items-baseline justify-between border-t border-ink pt-6">
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

          {projects.map((project) => (
            <RevealOnScroll key={project.slug}>
              <ProjectBlock {...project} reverse={project.index % 2 === 0} />
            </RevealOnScroll>
          ))}
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

        {/* Educação e certificações */}
        <section
          aria-labelledby="educacao-titulo"
          className="mx-auto max-w-content px-6 py-4 sm:px-10"
        >
          <RevealOnScroll>
            <h2
              id="educacao-titulo"
              className="font-mono border-t border-ink pt-6 text-[11px] uppercase tracking-[0.3em] text-muted"
            >
              Educação e certificações
            </h2>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-10 grid gap-8 border-t border-line pt-8 text-sm sm:mt-14 sm:grid-cols-2">
              <div>
                <p className="font-display text-lg italic text-ink">
                  Análise e Desenvolvimento de Sistemas
                </p>
                <p className="mt-1 text-muted">
                  Faculdade Impacta · previsão de conclusão em 2027
                </p>
              </div>
              <div>
                <p className="font-display text-lg italic text-ink">
                  Programação Back-End com Python
                </p>
                <p className="mt-1 text-muted">EBAC</p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <ul className="mt-8 flex flex-wrap gap-2">
              {[
                "Inteligência Artificial II",
                "SPAs com React (IFRS)",
                "Pearson Edexcel ESOL — Inglês Profissional",
              ].map((cert) => (
                <li
                  key={cert}
                  className="border border-ink/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/75"
                >
                  {cert}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
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
