const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO || "thiagobrsoares3011@gmail.com";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

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
      console.error("Resend respondeu", res.status, await res.text().catch(() => ""));
    }

    return res.ok;
  } catch (err) {
    console.error("Falha ao chamar a API do Resend", err);
    return false;
  }
}
