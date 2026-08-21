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

## Onde colocar as imagens

**Foto de perfil (hero):** `public/profile.jpg` — proporção 3:4, pelo menos
900×1200px.

**Screenshots dos projetos:** `public/projects/`, com estes nomes exatos:
- `rota-aberta.jpg`
- `blog-nextjs.jpg`
- `myggdrasil.jpg`

1600×1200px (4:3), `.jpg` ou `.webp`. Pokedex API e EduTrack AI ficam sem
imagem de propósito (projetos de backend sem tela pra mostrar) — aparecem
com uma capa tipográfica no lugar.

**Certificados:** `public/certificates/`, com estes nomes:
- `ia-ii.jpg`
- `spas-react-ifrs.jpg`
- `pearson-esol.jpg`

1200×900px (4:3).

## Painel de administração (`/admin`)

Você pode adicionar/remover projetos e certificados sem tocar em código,
por um painel protegido por senha. Como o site é hospedado na Vercel (sem
disco persistente), os dados ficam no **mockapi.io** — a mesma ferramenta
que você já usa no projeto do Blog — em vez de um arquivo local.

### Configuração

1. Defina `ADMIN_PASSWORD` no `.env.local` (e nas variáveis de ambiente da
   Vercel, em produção). É a senha de entrada em `/admin`.
2. Crie um projeto em [mockapi.io](https://mockapi.io) com duas
   collections: `projects` e `certificates`. Os campos podem ser criados
   livremente pelo próprio formulário do painel na primeira vez que você
   adicionar um item — o mockapi aceita schema flexível.
3. Copie as duas URLs base (algo como `https://xxxxx.mockapi.io/projects`)
   para `NEXT_PUBLIC_MOCKAPI_PROJECTS_URL` e
   `NEXT_PUBLIC_MOCKAPI_CERTIFICATES_URL` no `.env.local`.
4. Acesse `/admin`, entre com a senha, e use os formulários de "Projetos"
   e "Certificados" para adicionar ou remover itens.

**Sem essas variáveis configuradas**, o site continua funcionando
normalmente — ele cai de volta nos dados fixos em `lib/data.ts` (mesmo
padrão de fallback silencioso do projeto do Blog). Só o painel `/admin`
fica com um aviso pedindo a configuração.

### Sobre segurança

Isso é uma proteção leve, adequada para um portfólio pessoal — não um
sistema de nível corporativo:

- O login usa cookie `HttpOnly` verificado por um middleware antes de
  qualquer acesso a `/admin`.
- Como o mockapi não tem autenticação própria, a URL da collection fica
  visível no bundle JS público (é assim que o mockapi funciona). Isso
  significa que, tecnicamente, alguém que descubra a URL poderia enviar
  dados diretamente pra lá, sem passar pelo login. Para os dados aqui
  (projetos e certificados, informação já pública no seu GitHub/LinkedIn),
  esse risco é aceitável — não use esse mesmo padrão para dados sensíveis.

## A fórmula Google XYZ no código

Cada projeto tem três campos — `x`, `y` e `z` — que o `ProjectBlock`
renderiza como três blocos rotulados:

- **O que fez** (`x`) — o resultado de engenharia entregue
- **Por que importa** (`y`) — a métrica ou evidência que comprova o impacto
- **Como fez** (`z`) — a stack/decisão técnica que produziu o resultado

## Animações

- `RevealOnScroll` — fade + leve translação ao entrar na viewport
  (IntersectionObserver, sem dependências externas)
- Hover nas imagens (projetos e certificados) — zoom sutil
- Links — sublinhado que "cresce" da esquerda ao passar o mouse
- Header fixo — ganha fundo com blur ao rolar a página
- Linha sob o nome no hero — cresce de 0 a 100% ao carregar
- Tudo respeita `prefers-reduced-motion`

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
