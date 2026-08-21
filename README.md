# Portfólio — Thiago Alves Soares

Portfólio pessoal editorial (inspirado no Zara.com: preto/branco, tipografia
grande, muito respiro), construído com Next.js 15 (App Router), TypeScript
e Tailwind CSS.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

## Onde colocar as imagens dos projetos

Coloque as capturas de tela em `public/projects/`, com estes nomes exatos:

- `public/projects/rota-aberta.jpg`
- `public/projects/blog-nextjs.jpg`
- `public/projects/myggdrasil.jpg`

Tamanho recomendado: 1600×1200px (proporção 4:3), `.jpg` ou `.webp`.

A Pokedex API e o EduTrack AI foram deixados sem imagem de propósito (são
projetos de backend/API sem tela para mostrar) — eles aparecem com uma capa
tipográfica minimalista no lugar da screenshot. Veja
`public/projects/README.txt` para instruções de como adicionar uma imagem
a eles também, se quiser.

## A fórmula Google XYZ no código

Cada projeto em `lib/data.ts` tem três campos — `x`, `y` e `z` — que o
`ProjectBlock` renderiza como três blocos rotulados:

- **O que fez** (`x`) — o resultado de engenharia entregue
- **Por que importa** (`y`) — a métrica ou evidência que comprova o impacto
- **Como fez** (`z`) — a stack/decisão técnica que produziu o resultado

Isso segue a fórmula "Realizou [X], medido por [Y], através de [Z]", só que
com os três elementos explícitos em vez de uma frase só — fica mais fácil
de escanear visualmente.

## Animações

- `RevealOnScroll` — fade + leve translação ao entrar na viewport
  (IntersectionObserver, sem dependências externas)
- Hover nas imagens dos projetos — zoom sutil (`scale-[1.04]`)
- Links — sublinhado que "cresce" da esquerda ao passar o mouse
- Header fixo — ganha fundo com blur ao rolar a página
- Linha sob o nome no hero — cresce de 0 a 100% ao carregar
- Tudo respeita `prefers-reduced-motion`

## Stack

- Next.js 15 App Router, Server Components
- TypeScript
- Tailwind CSS (paleta preto/branco/taupe, sem cor de destaque — no
  espírito editorial do Zara.com)
- Fontes: Fraunces (display/serifada) + IBM Plex Sans (corpo) +
  IBM Plex Mono (rótulos) — o mesmo sistema tipográfico já usado no
  projeto Rota Aberta

## Estrutura

```
app/
  layout.tsx        # fontes, metadata
  page.tsx           # página única
  globals.css
components/
  StickyHeader.tsx    # header fixo com blur ao rolar (client)
  RevealOnScroll.tsx  # animação de entrada por scroll (client)
  ProjectBlock.tsx     # bloco de projeto: imagem + XYZ + badges + links
  TechBadge.tsx         # chip tipográfico de tecnologia
lib/
  data.ts             # conteúdo real dos projetos (extraído do GitHub)
public/
  projects/            # onde colocar as screenshots dos projetos
```
