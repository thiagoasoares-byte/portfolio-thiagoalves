const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO || "thiagobrsoares3011@gmail.com";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

/**
 * Envia o e-mail de notificação via Resend (https://resend.com). Usa
 * fetch puro em vez do SDK deles para não adicionar uma dependência só
 * por uma chamada HTTP simples.
 *
 * Sem domínio verificado no Resend, o remetente precisa ser
 * "onboarding@resend.dev" e o destinatário precisa ser o e-mail da própria
 * conta Resend — o que funciona perfeitamente aqui, já que o destino é o
 * seu próprio e-mail.
 */
export async function sendContactEmail({
  name,
  email,
  message,
}: ContactPayload): Promise<boolean> {
  if (!RESEND_API_KEY) return false;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfólio <onboarding@resend.dev>",
        to: CONTACT_EMAIL_TO,
        reply_to: email,
        subject: `Novo contato pelo portfólio — ${name}`,
        text: `${name} (${email}) escreveu pelo formulário do portfólio:\n\n${message}`,
      }),
    });

    if (!res.ok) {
      // Loga o motivo no servidor (visível nos logs da Vercel) sem
      // expor detalhes internos na resposta ao visitante.
      console.error("Resend respondeu", res.status, await res.text().catch(() => ""));
    }

    return res.ok;
  } catch (err) {
    console.error("Falha ao chamar a API do Resend", err);
    return false;
  }
}
