export type Project = {
  slug: string;
  index: number;
  category: string;
  title: string;
  context: string;
  /** Fórmula Google XYZ: "Realizou X, medido por Y, através de Z" */
  x: string;
  y: string;
  z: string;
  stack: string[];
  repoUrl?: string;
  deployUrl?: string;
  deployLabel?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export const projects: Project[] = [
  {
    slug: "rota-aberta",
    index: 1,
    category: "Frontend · Next.js App Router",
    title: "Rota Aberta — Portal de Viagens",
    context:
      "Projeto de estudo que simula um portal de viagens completo: listagem de destinos e páginas de detalhe geradas por rota dinâmica, com identidade visual inspirada em passaportes e cartões de embarque.",
    x: "Construiu um portal de viagens com listagem de destinos e páginas de detalhe geradas por rota dinâmica",
    y: "cobertura de testes com Vitest e Testing Library, e todas as páginas de destino pré-renderizadas de forma estática",
    z: "usando generateStaticParams para SSG, CSS Modules sem dependência de UI externa, e um pipeline de GitHub Actions com jobs de CI (lint, testes, build) e CD (deploy automático na Vercel)",
    stack: ["Next.js", "React", "TypeScript", "CSS Modules", "Vitest", "GitHub Actions"],
    repoUrl: "https://github.com/thiagoasoares-byte/portal-viagens",
    deployUrl: "https://portal-viagens-indol.vercel.app/",
    deployLabel: "Ver deploy",
    imageUrl: "/projects/rota-aberta.jpg",
    imageAlt: "Tela inicial do portal de viagens Rota Aberta, com listagem de destinos",
  },
  {
    slug: "blog-nextjs",
    index: 2,
    category: "Frontend · SSG & ISR",
    title: "Blog — Next.js 15 App Router",
    context:
      "Blog com artigos carregados dinamicamente via mockapi.io. O desafio central: a API gera slugs aleatórios que não refletem o título, então cada artigo precisa de um slug estável e amigável gerado em runtime.",
    x: "Desenvolveu um blog com listagem via ISR e páginas de artigo pré-renderizadas por SSG",
    y: "SEO dinâmico por artigo — title, description e OpenGraph únicos — mesmo com a API não fornecendo slugs confiáveis",
    z: "combinando generateStaticParams e generateMetadata do Next.js 15 com slugify(title) + id para gerar slugs estáveis",
    stack: ["Next.js 15", "React", "TypeScript", "mockapi.io"],
    repoUrl: "https://github.com/thiagoasoares-byte/Blog-Next.js-15-App-Router",
    deployUrl: "https://lista-de-tarefas-next-js-15-testes.vercel.app",
    deployLabel: "Ver deploy",
    imageUrl: "/projects/blog-nextjs.jpg",
    imageAlt: "Listagem de artigos do blog construído com Next.js 15 App Router",
  },
  {
    slug: "myggdrasil",
    index: 3,
    category: "Full Stack · IA & Grafos",
    title: "Myggdrasil",
    context:
      "Diário de decisões full stack: cada escolha vira um nó numa árvore navegável de contexto e consequência, com uma camada de IA que lê o próprio histórico do usuário de volta para ele.",
    x: "Desenvolveu um diário de decisões com visualização em árvore e vínculos pai/filho entre escolhas",
    y: "análises de IA em segunda pessoa sobre o histórico de decisões, cacheadas por usuário e com fallback local caso a IA falhe",
    z: "orquestrando um backend NestJS/TypeORM/MySQL com JWT (RS256) via cookie HttpOnly, e um frontend React/Vite com Framer Motion integrado à Groq API",
    stack: ["NestJS", "TypeORM", "React", "Vite", "MySQL", "Groq API", "JWT"],
    repoUrl: "https://github.com/thiagoasoares-byte/myggdrasil",
    deployUrl: "https://myggdrasilmuseumofdecisions.vercel.app",
    deployLabel: "Ver deploy",
    imageUrl: "/projects/myggdrasil.jpg",
    imageAlt: "Visualização em árvore de decisões no Myggdrasil",
  },
  {
    slug: "pokedex-api",
    index: 4,
    category: "Backend · API RESTful",
    title: "Pokedex API",
    context:
      "API RESTful em Python que consome a PokéAPI e a disponibiliza de forma paginada e cacheada — sem interface visual própria, focada em confiabilidade e documentação.",
    x: "Construiu uma API RESTful pública que agrega e pagina dados da PokéAPI",
    y: "~92% de cobertura em testes automatizados (pytest) e respostas em milissegundos graças ao cache",
    z: "usando FastAPI com validação via Pydantic, cache com Redis (fallback silencioso se indisponível) e CI/CD no GitHub Actions publicando no Render",
    stack: ["Python", "FastAPI", "Redis", "PostgreSQL", "Pytest", "Docker"],
    repoUrl: "https://github.com/thiagoasoares-byte/Pokedex-API-projeto-EBAC-final",
    deployUrl: "https://pokedex-api-3r9f.onrender.com/docs",
    deployLabel: "Ver documentação",
  },
  {
    slug: "edutrack-ai",
    index: 5,
    category: "Full Stack · Agentes de IA",
    title: "EduTrack AI",
    context:
      "Planejador acadêmico para organizar matérias e tarefas e acompanhar o progresso de estudos, com o backend construído por um framework próprio de agentes de IA.",
    x: "Construiu um planejador acadêmico com gestão de matérias, tarefas e relatórios de progresso",
    y: "exportação de dados para CSV/JSON e visualização de métricas de desempenho em gráficos",
    z: "usando Streamlit como frontend, Xano como backend, e um framework próprio de agentes de IA para acelerar a construção do backend",
    stack: ["Python", "Streamlit", "Xano", "Agentes de IA"],
    repoUrl: "https://github.com/thiagoasoares-byte/edutrack-ai",
  },
];
