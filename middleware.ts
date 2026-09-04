import { NextRequest, NextResponse } from "next/server";
import { computeSessionToken, ADMIN_COOKIE_NAME } from "./lib/adminAuth";

// Garante que nenhuma resposta de /admin/* fique em cache — nem no CDN da
// Vercel, nem no navegador. Sem isso, uma resposta cacheada de antes do
// login (ex.: a própria tela de login) pode ser servida via 304 mesmo
// depois de uma sessão válida existir, já que o cache padrão não varia
// por cookie.
function withNoStore(response: NextResponse) {
  response.headers.set("Cache-Control", "no-store, must-revalidate");
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // A própria página de login precisa ficar acessível sem sessão.
  if (pathname === "/admin/login") {
    return withNoStore(NextResponse.next());
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value ?? "";
  const expected = adminPassword ? await computeSessionToken(adminPassword) : null;
  const match = Boolean(expected) && cookie === expected;

  // DEBUG TEMPORÁRIO — remover depois de identificar o problema. Não
  // loga a senha nem o token completo, só o suficiente pra saber qual
  // das duas pontas está errada. Veja em Vercel → seu projeto →
  // Deployments → (deployment atual) → aba "Logs", em tempo real,
  // enquanto tenta logar de novo.
  console.log("[admin-middleware]", {
    pathname,
    hasAdminPasswordEnv: Boolean(adminPassword),
    cookiePresent: Boolean(request.cookies.get(ADMIN_COOKIE_NAME)),
    cookieLength: cookie.length,
    expectedLength: expected?.length ?? 0,
    cookiePrefix: cookie.slice(0, 6),
    expectedPrefix: expected?.slice(0, 6) ?? null,
    match,
  });

  if (!match) {
    const loginUrl = new URL("/admin/login", request.url);
    return withNoStore(NextResponse.redirect(loginUrl));
  }

  return withNoStore(NextResponse.next());
}

export const config = {
  matcher: ["/admin/:path*"],
};
