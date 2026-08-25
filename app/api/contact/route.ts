import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const emailSent = await sendContactEmail({ name, email, message });

  if (!emailSent) {
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
