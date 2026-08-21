const SESSION_LABEL = "thiago-portfolio-admin-session";

/**
 * Deriva um token de sessão a partir da senha de admin via HMAC-SHA256.
 * Usa Web Crypto (crypto.subtle) em vez do módulo "crypto" do Node porque
 * este código também roda no middleware, que executa no Edge Runtime.
 */
export async function computeSessionToken(secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(SESSION_LABEL));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const ADMIN_COOKIE_NAME = "admin_session";
