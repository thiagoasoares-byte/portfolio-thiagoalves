"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Certificate } from "@/lib/data";

const CERTIFICATES_URL = process.env.NEXT_PUBLIC_MOCKAPI_CERTIFICATES_URL;

const emptyForm = {
  title: "",
  issuer: "",
  date: "",
  imageUrl: "",
  credentialUrl: "",
};

export default function CertificatesAdmin() {
  const [items, setItems] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function load() {
    if (!CERTIFICATES_URL) {
      setError(
        "NEXT_PUBLIC_MOCKAPI_CERTIFICATES_URL não configurada — veja .env.example."
      );
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(CERTIFICATES_URL);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
      setError("");
    } catch {
      setError("Não foi possível carregar os certificados do mockapi.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function updateField(field: keyof typeof emptyForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!CERTIFICATES_URL) return;
    setSaving(true);
    setError("");

    const payload = {
      title: form.title.trim(),
      issuer: form.issuer.trim(),
      date: form.date.trim() || undefined,
      imageUrl: form.imageUrl.trim() || undefined,
      credentialUrl: form.credentialUrl.trim() || undefined,
    };

    try {
      const res = await fetch(CERTIFICATES_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("falha ao salvar");
      setForm(emptyForm);
      await load();
    } catch {
      setError("Não foi possível salvar o certificado.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id?: string) {
    if (!CERTIFICATES_URL || !id) return;
    if (!confirm("Remover este certificado?")) return;
    try {
      await fetch(`${CERTIFICATES_URL}/${id}`, { method: "DELETE" });
      await load();
    } catch {
      setError("Não foi possível remover o certificado.");
    }
  }

  return (
    <div>
      {error && (
        <p className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 grid gap-3 sm:grid-cols-2">
        <Input label="Título" value={form.title} onChange={(v) => updateField("title", v)} className="sm:col-span-2" required />
        <Input label="Instituição / emissor" value={form.issuer} onChange={(v) => updateField("issuer", v)} required />
        <Input label="Data (ex.: 2025 ou fev/2026)" value={form.date} onChange={(v) => updateField("date", v)} />
        <Input label="Caminho da imagem (ex.: /certificates/novo.jpg)" value={form.imageUrl} onChange={(v) => updateField("imageUrl", v)} className="sm:col-span-2" />
        <Input label="URL de verificação (opcional)" value={form.credentialUrl} onChange={(v) => updateField("credentialUrl", v)} className="sm:col-span-2" />

        <button
          type="submit"
          disabled={saving || !CERTIFICATES_URL}
          className="focus-ring mt-2 w-fit border border-ink bg-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-opacity hover:opacity-90 disabled:opacity-50 sm:col-span-2"
        >
          {saving ? "Salvando…" : "Adicionar certificado"}
        </button>
      </form>

      <div className="mt-10 space-y-3">
        {loading ? (
          <p className="text-sm text-muted">Carregando…</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted">Nenhum certificado na API ainda.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id ?? item.title}
              className="flex items-center justify-between border border-line px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-ink">{item.title}</p>
                <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
                  {item.issuer}
                </p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="focus-ring font-mono text-[11px] uppercase tracking-[0.1em] text-red-700 hover:underline dark:text-red-400"
              >
                Remover
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  required = false,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
        {label}
      </span>
      <input
        type="text"
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="focus-ring mt-1 w-full border border-line bg-paper px-3 py-2 text-sm text-ink"
      />
    </label>
  );
}
