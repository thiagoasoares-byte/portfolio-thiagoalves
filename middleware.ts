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

  if (!expected || cookie !== expected) {
    const loginUrl = new URL("/admin/login", request.url);
    return withNoStore(NextResponse.redirect(loginUrl));
  }

  return withNoStore(NextResponse.next());
}

export const config = {
  matcher: ["/admin/:path*"],
};
