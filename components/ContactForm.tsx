"use client";

import { useState, type FormEvent } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = { name?: string; email?: string; message?: string };
type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot, deve ficar vazio
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  function validate(): Errors {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Informe seu nome.";
    if (!EMAIL_REGEX.test(email.trim())) next.email = "Informe um e-mail válido.";
    if (message.trim().length < 10) {
      next.message = "A mensagem precisa ter pelo menos 10 caracteres.";
    }
    return next;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
          setStatus("idle");
          return;
        }
        setStatus("error");
        setFeedback(data.error ?? "Não foi possível enviar sua mensagem.");
        return;
      }

      setStatus("success");
      setFeedback("Mensagem enviada. Retorno em breve.");
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
    } catch {
      setStatus("error");
      setFeedback(
        "Não foi possível enviar sua mensagem agora. Tente novamente em instantes."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8 max-w-md space-y-6">
      {/* Honeypot — invisível para pessoas, tentador para bots */}
      <input
        type="text"
        name="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <Field
        label="Nome"
        id="contact-name"
        value={name}
        onChange={setName}
        error={errors.name}
      />
      <Field
        label="E-mail"
        id="contact-email"
        type="email"
        value={email}
        onChange={setEmail}
        error={errors.email}
      />
      <Field
        label="Mensagem"
        id="contact-message"
        as="textarea"
        value={message}
        onChange={setMessage}
        error={errors.message}
      />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="focus-ring border border-ink bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "submitting" ? "Enviando…" : "Enviar mensagem"}
      </button>

      {status === "success" && (
        <p
          role="status"
          aria-live="polite"
          className="border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-300"
        >
          {feedback}
        </p>
      )}
      {status === "error" && (
        <p
          role="alert"
          aria-live="assertive"
          className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300"
        >
          {feedback}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  error,
  type = "text",
  as = "input",
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  as?: "input" | "textarea";
}) {
  const shared = {
    id,
    value,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => onChange(e.target.value),
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined,
    className:
      "focus-ring mt-2 w-full border-0 border-b border-line bg-transparent py-2 text-sm text-ink outline-none transition-colors focus:border-ink",
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted"
      >
        {label}
      </label>
      {as === "textarea" ? (
        <textarea {...shared} rows={4} />
      ) : (
        <input {...shared} type={type} />
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
