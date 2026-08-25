import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sem NEXT_PUBLIC_: ficam só no servidor, diferente das URLs de
// projects/certificates (que precisam ser públicas para o painel /admin
// escrever direto do navegador). Aqui não há motivo para expor nada.
const MESSAGES_URL = process.env.MOCKAPI_MESSAGES_URL;

async function saveToMockapi(payload: {
  name: string;
  email: string;
  message: string;
}): Promise<boolean> {
  if (!MESSAGES_URL) return false;
  try {
    const res = await fetch(MESSAGES_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, createdAt: new Date().toISOString() }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corpo da requisição inválido." },
      { status: 400 }
    );
  }

  const data = body as Record<string, unknown>;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";
  // Honeypot: campo escondido no formulário que humanos nunca preenchem.
  const company = typeof data.company === "string" ? data.company.trim() : "";

  if (company) {
    // Finge sucesso para não ensinar o bot a driblar o filtro.
    return NextResponse.json({ ok: true });
  }

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Informe seu nome.";
  if (!EMAIL_REGEX.test(email)) errors.email = "Informe um e-mail válido.";
  if (message.length < 10) {
    errors.message = "A mensagem precisa ter pelo menos 10 caracteres.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const payload = { name, email, message };

  // E-mail é o canal principal (chega na hora); o mockapi é um backup
  // opcional que também alimenta a aba "Mensagens" do painel /admin.
  // Um dos dois já é suficiente para considerar a mensagem entregue.
  const [emailSent, saved] = await Promise.all([
    sendContactEmail(payload),
    saveToMockapi(payload),
  ]);

  if (!emailSent && !saved) {
    return NextResponse.json(
      {
        error:
          "O formulário ainda não está configurado no servidor. Escreva direto para thiagobrsoares3011@gmail.com.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
