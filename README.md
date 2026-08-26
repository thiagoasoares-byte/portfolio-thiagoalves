# Portfólio — Thiago Alves Soares

**Site em produção:** [https://portfolio-thiagoalves.vercel.app/](https://portfolio-thiagoalves.vercel.app)

Portfólio pessoal de Thiago Alves Soares, Desenvolvedor FullStack, construído
como um produto editorial — estética preto/branco e tipografia grande
inspirada no Zara.com — em vez de um template genérico. Cada projeto é
apresentado pela metodologia Google XYZ (o que foi feito, por que importa,
como foi feito), com conteúdo administrável sem precisar editar código.

## Destaques

- Design editorial preto/branco com tipografia serifada (Fraunces) e
  monoespaçada (IBM Plex Mono), inspirado no Zara.com
- Projetos apresentados pela fórmula Google XYZ, com imagem, badges de
  tecnologia e links de repositório/deploy
- Carrossel de certificados com sliding horizontal
- Painel de administração protegido por senha para gerenciar projetos e
  certificados sem tocar em código
- Formulário de contato com validação client- e server-side, feedback
  visual de sucesso/erro e envio direto por e-mail
- Favicon e imagem Open Graph gerados a partir da própria identidade
  visual do site, em vez de assets genéricos
- Animações discretas — scroll reveal, cursor customizado nos projetos,
  hover com zoom — respeitando `prefers-reduced-motion`

## Projetos

| Projeto | Finalidade | Tecnologias | Repositório | Demonstração |
|---|---|---|---|---|
| **Rota Aberta — Portal de Viagens** | Portal de viagens de estudo, com listagem de destinos e páginas de detalhe geradas por rota dinâmica (SSG), simulando um produto real de reservas. | Next.js, React, TypeScript, CSS Modules, Vitest, GitHub Actions | [GitHub](https://github.com/thiagoasoares-byte/portal-viagens) | [Ver deploy](https://portal-viagens-indol.vercel.app/) |
| **Blog — Next.js 15 App Router** | Blog consumindo uma API externa, com SEO dinâmico por artigo apesar de a API não fornecer slugs confiáveis. | Next.js 15, React, TypeScript, mockapi.io | [GitHub](https://github.com/thiagoasoares-byte/Blog-Next.js-15-App-Router) | [Ver deploy](https://lista-de-tarefas-next-js-15-testes.vercel.app) |
| **Myggdrasil** | Diário de decisões full stack, com visualização em árvore e uma camada de IA que analisa o próprio histórico do usuário. | NestJS, TypeORM, React, Vite, MySQL, Groq API, JWT | [GitHub](https://github.com/thiagoasoares-byte/myggdrasil) | [Ver deploy](https://myggdrasilmuseumofdecisions.vercel.app) |
| **Pokedex API** | API RESTful em Python que consome e agrega dados paginados da PokéAPI, com cache e alta cobertura de testes. | Python, FastAPI, Redis, PostgreSQL, Pytest, Docker | [GitHub](https://github.com/thiagoasoares-byte/Pokedex-API-projeto-EBAC-final) | [Documentação (Swagger)](https://pokedex-api-3r9f.onrender.com/docs) |
| **EduTrack AI** | Planejador acadêmico para organizar matérias e tarefas e acompanhar progresso de estudos, com backend construído por agentes de IA. | Python, Streamlit, Xano, Agentes de IA | [GitHub](https://github.com/thiagoasoares-byte/edutrack-ai) | — |

## Stack

| Camada | Tecnologias |
|---|---|
| Frontend | Next.js 15 (App Router), React, TypeScript, Tailwind CSS |
| Tipografia | Fraunces, IBM Plex Sans, IBM Plex Mono |
| Dados | mockapi.io (projetos, certificados), com fallback local |
| E-mail | Resend |
| Autenticação | Cookie HttpOnly assinado via Web Crypto, validado em middleware |
| Qualidade | ESLint (`next/core-web-vitals`, `next/typescript`) |
| Deploy | Vercel |

## Arquitetura

A página principal é um Server Component assíncrono que busca projetos e
certificados no mockapi.io, com fallback silencioso para dados fixos em
`lib/data.ts` sempre que a API está indisponível ou não configurada — o
site nunca depende de uma infraestrutura externa para funcionar.

O painel `/admin` é protegido por um middleware que valida um cookie
HttpOnly assinado via HMAC (Web Crypto, compatível com Edge Runtime).
Formulários de projetos e certificados escrevem diretamente no mockapi a
partir do navegador.

O formulário de contato combina validação no navegador (feedback
imediato) com validação no servidor (fonte da verdade), um honeypot
contra bots, e envio direto por e-mail via Resend.

Todo campo de imagem administrável é validado antes de ser passado ao
`next/image`, evitando que um valor inválido vindo do painel derrube a
renderização da página. Favicon e imagem Open Graph são gerados
programaticamente a partir da mesma tipografia usada no restante do
site, em vez de assets estáticos avulsos.

## Estrutura

```
app/
  layout.tsx                        # fontes, metadata
  page.tsx                           # página única (Server Component)
  globals.css
  icon.png, apple-icon.png, favicon.ico
  opengraph-image.tsx                  # imagem de compartilhamento
  admin/                                  # painel (protegido por middleware)
  api/
    contact/route.ts                       # formulário de contato
    admin/                                   # login, logout
components/
  StickyHeader.tsx, RevealOnScroll.tsx         # header e animações (client)
  ProjectBlock.tsx, ProjectImageHover.tsx        # apresentação dos projetos
  CertificateCard.tsx, CertificatesCarousel.tsx    # certificados
  ContactForm.tsx                                    # formulário de contato
  TechBadge.tsx                                        # badges de tecnologia
  admin/                                                 # forms do painel
lib/
  data.ts        # dados semente: projetos, certificados, skills, formação
  mockapi.ts       # busca com fallback silencioso
  email.ts           # envio via Resend
  adminAuth.ts          # geração do token de sessão
  imageSrc.ts              # validação de src para next/image
assets/fonts/     # fontes embutidas para a imagem Open Graph
middleware.ts     # proteção das rotas administrativas
eslint.config.mjs
```

## Autor

**Thiago Alves Soares** — Desenvolvedor FullStack
[GitHub](https://github.com/thiagoasoares-byte) ·
[LinkedIn](https://linkedin.com/in/thiago-alves-soares-453700303) ·
thiagobrsoares3011@gmail.com
