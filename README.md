# Portfólio — Thiago Alves Soares

Site em produção: **https://portfolio-thiagoalves.vercel.app/**

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

**Currículo em PDF:** `public/cv/`, com estes nomes (referenciados no botão
"Baixar CV" do hero):
- `thiago-alves-soares-pt.pdf`
- `thiago-alves-soares-en.pdf`

## Favicon e imagem de compartilhamento (Open Graph)

Já estão prontos, sem nada a fazer:

- `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico` — gerados com um
  monograma "T" (mesma serifada itálica do resto do site) sobre fundo
  preto. O Next.js os detecta automaticamente pela convenção de nome de
  arquivo, sem precisar declarar nada no `layout.tsx`.
- `app/opengraph-image.tsx` — gera dinamicamente a imagem 1200×630 que
  aparece ao compartilhar o link no LinkedIn/WhatsApp/Twitter, com o nome
  e a mesma tipografia serifada do hero. Usa as fontes em
  `assets/fonts/DejaVuSerif*.ttf` (incluídas no repo) para não depender de
  acesso à internet em produção.

Se quiser trocar o monograma do favicon por outra coisa, edite/regenere
`app/icon.png` e `app/apple-icon.png` (qualquer imagem quadrada resolve).

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

## Projetos

| Projeto | Finalidade | Tecnologias | Repositório | Demonstração |
|---|---|---|---|---|
| **Rota Aberta — Portal de Viagens** | Portal de viagens de estudo, com listagem de destinos e páginas de detalhe geradas por rota dinâmica (SSG), simulando um produto real de reservas. | Next.js, React, TypeScript, CSS Modules, Vitest, GitHub Actions | [GitHub](https://github.com/thiagoasoares-byte/portal-viagens) | [Ver deploy](https://portal-viagens-indol.vercel.app/) |
| **Blog — Next.js 15 App Router** | Blog consumindo uma API externa (mockapi.io), com SEO dinâmico por artigo apesar de a API não fornecer slugs confiáveis. | Next.js 15, React, TypeScript, mockapi.io | [GitHub](https://github.com/thiagoasoares-byte/Blog-Next.js-15-App-Router) | [Ver deploy](https://lista-de-tarefas-next-js-15-testes.vercel.app) |
| **Myggdrasil** | Diário de decisões full stack, com visualização em árvore e uma camada de IA que analisa o próprio histórico do usuário. | NestJS, TypeORM, React, Vite, MySQL, Groq API, JWT | [GitHub](https://github.com/thiagoasoares-byte/myggdrasil) | [Ver deploy](https://myggdrasilmuseumofdecisions.vercel.app) |
| **Pokedex API** | API RESTful em Python que consome e agrega dados paginados da PokéAPI, com cache e alta cobertura de testes. | Python, FastAPI, Redis, PostgreSQL, Pytest, Docker | [GitHub](https://github.com/thiagoasoares-byte/Pokedex-API-projeto-EBAC-final) | [Documentação (Swagger)](https://pokedex-api-3r9f.onrender.com/docs) |
| **EduTrack AI** | Planejador acadêmico para organizar matérias e tarefas e acompanhar progresso de estudos, com backend construído por agentes de IA. | Python, Streamlit, Xano, Agentes de IA | [GitHub](https://github.com/thiagoasoares-byte/edutrack-ai) | — |

Esta tabela é só documentação do repositório — o conteúdo que aparece no
site vem de `lib/data.ts` (ou do mockapi, se configurado) e pode ser
editado por lá ou pelo painel `/admin` sem precisar tocar neste README.

## Formulário de contato

O formulário na seção "Contato" (`components/ContactForm.tsx`) valida nome,
e-mail e mensagem no navegador (feedback imediato) e de novo no servidor
(`app/api/contact/route.ts`, pois validação só no cliente não é confiável).
Em caso de sucesso ou erro, uma mensagem visível aparece abaixo do botão de
envio (`role="status"`/`role="alert"`, então leitores de tela também
anunciam).

Tem também um campo honeypot invisível: se ele vier preenchido, a
requisição é silenciosamente descartada (resposta de sucesso, sem gravar
nada) — um jeito simples de barrar bots sem precisar de captcha.

### Configuração — e-mail (canal principal)

Cada mensagem enviada chega direto no seu e-mail, via
[Resend](https://resend.com):

1. Crie uma conta gratuita no Resend usando o mesmo e-mail que você quer
   receber as mensagens (`thiagobrsoares3011@gmail.com`).
2. Gere uma API key no painel do Resend.
3. Defina `RESEND_API_KEY` no `.env.local` (e nas variáveis de ambiente da
   Vercel).

Sem verificar um domínio próprio no Resend (o que exigiria configurar
DNS), o remetente fica fixo em `onboarding@resend.dev` e só é possível
enviar para o e-mail da própria conta Resend — o que é exatamente o caso
aqui, já que o destino é você mesmo. Se um dia quiser um remetente com seu
domínio, dá pra verificar um domínio no Resend e trocar o `from` em
`lib/email.ts`.

O e-mail chega com o campo "responder" (`reply_to`) já preenchido com o
e-mail de quem escreveu — é só apertar "Responder" no seu cliente de
e-mail.

### Configuração — mockapi (backup opcional)

Além do e-mail, cada mensagem também pode ser salva numa terceira
collection do mockapi.io (mesmo projeto de projetos/certificados), o que
alimenta a aba "Mensagens" do painel `/admin` como histórico. Isso é
opcional — sem configurar, o formulário funciona normalmente só com o
e-mail.

Defina `MOCKAPI_MESSAGES_URL` no `.env.local` (e na Vercel) com a URL da
collection (ex.: `https://xxxxx.mockapi.io/messages`).

Diferente de `NEXT_PUBLIC_MOCKAPI_PROJECTS_URL`/`..._CERTIFICATES_URL`,
esta variável **não** leva o prefixo `NEXT_PUBLIC_` — ela só é usada dentro
da rota de API (`app/api/contact/route.ts`), então nunca fica exposta no
bundle enviado ao navegador.

**Resumo:** o formulário funciona com `RESEND_API_KEY`, com
`MOCKAPI_MESSAGES_URL`, ou com os dois — só precisa de pelo menos um
configurado. Sem nenhum dos dois, mostra um erro amigável pedindo para
escrever direto por e-mail, em vez de quebrar.

### Lendo as mensagens recebidas

Se `MOCKAPI_MESSAGES_URL` estiver configurada, as mensagens também
aparecem na aba "Mensagens" do painel `/admin`, mais recentes primeiro,
com opção de remover cada uma. Sem essa variável, a aba mostra um aviso
pedindo a configuração — mas isso não afeta o recebimento por e-mail.

## Configuração do ESLint

```bash
npm run lint
```

Roda direto (`eslint .`, via `eslint.config.mjs`), sem o assistente
interativo que o `next lint` mostra na primeira execução quando não há
configuração — por isso o script usa o CLI do ESLint diretamente em vez de
`next lint`. Usa o preset oficial (`next/core-web-vitals` +
`next/typescript`) através do `@eslint/eslintrc` (`FlatCompat`), que é como
o próprio `create-next-app` configura projetos novos com ESLint flat
config.

## A fórmula Google XYZ no código

Cada projeto tem três campos — `x`, `y` e `z` — que o `ProjectBlock`
renderiza como três blocos rotulados:

- **O que fez** (`x`) — o resultado de engenharia entregue
- **Por que importa** (`y`) — a métrica ou evidência que comprova o impacto
- **Como fez** (`z`) — a stack/decisão técnica que produziu o resultado

O numeral decorativo atrás da imagem de cada projeto (01, 02, 03…) reflete
a posição do projeto na lista renderizada — não o campo `index` usado para
ordenar. Isso significa que você pode usar qualquer número no campo
"Índice" do painel `/admin` (mesmo fora de sequência, tipo 10, 20, 30, pra
deixar espaço de reordenar depois) que o numeral exibido sempre sai
sequencial (01, 02, 03…).

## Animações

- `RevealOnScroll` — fade + leve translação ao entrar na viewport
  (IntersectionObserver, sem dependências externas)
- Hover nas imagens (projetos e certificados) — zoom sutil
- Cursor customizado nas imagens de projeto — um rótulo "Ver ↗" segue o
  mouse ao passar por cima (só em telas com mouse; a imagem toda vira um
  link pro deploy/repositório)
- Carrossel de certificados — arraste horizontalmente ou use as setas,
  com scroll-snap
- Links — sublinhado que "cresce" da esquerda ao passar o mouse
- Header fixo — ganha fundo com blur ao rolar a página
- Linha sob o nome no hero — cresce de 0 a 100% ao carregar
- Indicador de "role" no rodapé do hero — pequena animação de
  vaivém, sugerindo continuar a rolagem
- Formulário de contato — feedback de sucesso/erro aparece sem recarregar
  a página
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
  icon.png, apple-icon.png, favicon.ico   # favicon (monograma gerado)
  opengraph-image.tsx                       # imagem 1200x630 de compartilhamento
  admin/
    page.tsx                # painel (protegido pelo middleware)
    login/page.tsx
  api/
    contact/route.ts          # recebe o formulário público
    admin/
      login/route.ts
      logout/route.ts
      messages/route.ts         # lista mensagens (GET, protegida)
      messages/[id]/route.ts      # remove mensagem (DELETE, protegida)
components/
  StickyHeader.tsx           # header fixo com blur ao rolar (client)
  RevealOnScroll.tsx          # animação de entrada por scroll (client)
  ProjectBlock.tsx              # bloco de projeto: imagem + XYZ + badges
  ProjectImageHover.tsx           # zoom + cursor "Ver ↗" (client)
  CertificateCard.tsx               # card de certificado
  CertificatesCarousel.tsx            # carrossel horizontal (client)
  ContactForm.tsx                       # formulário com validação (client)
  TechBadge.tsx                           # chip de tecnologia (pastel leve)
  admin/
    ProjectsAdmin.tsx              # formulário + lista (client)
    CertificatesAdmin.tsx           # formulário + lista (client)
    MessagesAdmin.tsx                 # lista + remoção (client)
lib/
  data.ts               # dados semente: projetos, certificados, skills,
                          # idiomas, formação
  mockapi.ts              # busca com fallback silencioso para os semente
  adminAuth.ts              # geração do token de sessão (Web Crypto)
  imageSrc.ts                # valida src antes de passar pro next/image
assets/fonts/            # fontes embutidas para a imagem Open Graph
middleware.ts            # protege as rotas /admin/* e /api/admin/messages/*
eslint.config.mjs        # config não-interativa (next/core-web-vitals)
public/
  profile.jpg             # sua foto (adicionar)
  projects/                 # screenshots dos projetos (adicionar)
  certificates/               # imagens dos certificados (adicionar)
  cv/                            # PDFs do currículo (adicionar)
```
