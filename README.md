# Portfólio — Thiago Alves Soares

Portfólio pessoal editorial (inspirado no Zara.com: preto/branco, tipografia
grande, muito respiro), construído com Next.js 15 (App Router), TypeScript
e Tailwind CSS.

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # opcional — veja "Painel de administração" abaixo
npm run dev
```

Acesse http://localhost:3000

## Stack

- Next.js 15 App Router, Server Components, Route Handlers, Middleware
- TypeScript
- Tailwind CSS (paleta preto/branco/taupe + um pastel bem leve só nas
  badges de tecnologia)
- Fontes: Fraunces (display/serifada) + IBM Plex Sans (corpo) +
  IBM Plex Mono (rótulos) — o mesmo sistema tipográfico já usado no
  projeto Rota Aberta
- mockapi.io como fonte de dados opcional para projetos/certificados

## Estrutura

```
app/
  layout.tsx              # fontes, metadata
  page.tsx                 # página única (Server Component, busca dados)
  globals.css
  admin/
    page.tsx                # painel (protegido pelo middleware)
    login/page.tsx
  api/admin/
    login/route.ts
    logout/route.ts
components/
  StickyHeader.tsx           # header fixo com blur ao rolar (client)
  RevealOnScroll.tsx          # animação de entrada por scroll (client)
  ProjectBlock.tsx              # bloco de projeto: imagem + XYZ + badges
  CertificateCard.tsx            # card de certificado
  TechBadge.tsx                   # chip de tecnologia (pastel leve)
  admin/
    ProjectsAdmin.tsx              # formulário + lista (client)
    CertificatesAdmin.tsx           # formulário + lista (client)
lib/
  data.ts               # dados semente: projetos, certificados, skills,
                          # idiomas, formação
  mockapi.ts              # busca com fallback silencioso para os semente
  adminAuth.ts              # geração do token de sessão (Web Crypto)
middleware.ts            # protege as rotas /admin/*
public/
  profile.jpg             # sua foto (adicionar)
  projects/                 # screenshots dos projetos (adicionar)
  certificates/               # imagens dos certificados (adicionar)
```
