import { NextRequest, NextResponse } from "next/server";
import { computeSessionToken, ADMIN_COOKIE_NAME } from "./lib/adminAuth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // A própria página de login precisa ficar acessível sem sessão.
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value ?? "";
  const expected = adminPassword ? await computeSessionToken(adminPassword) : null;

  if (!expected || cookie !== expected) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
