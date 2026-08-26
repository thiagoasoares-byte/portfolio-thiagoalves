"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Project } from "@/lib/data";

const PROJECTS_URL = process.env.NEXT_PUBLIC_MOCKAPI_PROJECTS_URL;

const emptyForm = {
  slug: "",
  index: "",
  category: "",
  title: "",
  context: "",
  x: "",
  y: "",
  z: "",
  stack: "",
  repoUrl: "",
  deployUrl: "",
  deployLabel: "",
  imageUrl: "",
  imageAlt: "",
};

export default function ProjectsAdmin() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function load() {
    if (!PROJECTS_URL) {
      setError(
        "NEXT_PUBLIC_MOCKAPI_PROJECTS_URL não configurada — veja .env.example."
      );
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(PROJECTS_URL);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
      setError("");
    } catch {
      setError("Não foi possível carregar os projetos do mockapi.");
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
    if (!PROJECTS_URL) return;
    setSaving(true);
    setError("");

    const payload = {
      slug: form.slug.trim(),
      index: Number(form.index) || items.length + 1,
      category: form.category.trim(),
      title: form.title.trim(),
      context: form.context.trim(),
      x: form.x.trim(),
      y: form.y.trim(),
      z: form.z.trim(),
      stack: form.stack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      repoUrl: form.repoUrl.trim() || undefined,
      deployUrl: form.deployUrl.trim() || undefined,
      deployLabel: form.deployLabel.trim() || undefined,
      imageUrl: form.imageUrl.trim() || undefined,
      imageAlt: form.imageAlt.trim() || undefined,
    };

    try {
      const res = await fetch(PROJECTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("falha ao salvar");
      setForm(emptyForm);
      await load();
    } catch {
      setError("Não foi possível salvar o projeto.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id?: string) {
    if (!PROJECTS_URL || !id) return;
    if (!confirm("Remover este projeto?")) return;
    try {
      await fetch(`${PROJECTS_URL}/${id}`, { method: "DELETE" });
      await load();
    } catch {
      setError("Não foi possível remover o projeto.");
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
        <Input label="Slug" value={form.slug} onChange={(v) => updateField("slug", v)} required />
        <Input label="Índice (nº)" value={form.index} onChange={(v) => updateField("index", v)} type="number" required />
        <Input label="Categoria" value={form.category} onChange={(v) => updateField("category", v)} className="sm:col-span-2" required />
        <Input label="Título" value={form.title} onChange={(v) => updateField("title", v)} className="sm:col-span-2" required />
        <Textarea label="Contexto" value={form.context} onChange={(v) => updateField("context", v)} className="sm:col-span-2" required />
        <Textarea label="O que fez (X)" value={form.x} onChange={(v) => updateField("x", v)} className="sm:col-span-2" required />
        <Textarea label="Por que importa (Y)" value={form.y} onChange={(v) => updateField("y", v)} className="sm:col-span-2" required />
        <Textarea label="Como fez (Z)" value={form.z} onChange={(v) => updateField("z", v)} className="sm:col-span-2" required />
        <Input label="Stack (separada por vírgula)" value={form.stack} onChange={(v) => updateField("stack", v)} className="sm:col-span-2" required />
        <Input label="URL do repositório" value={form.repoUrl} onChange={(v) => updateField("repoUrl", v)} />
        <Input label="URL do deploy" value={form.deployUrl} onChange={(v) => updateField("deployUrl", v)} />
        <Input label="Rótulo do deploy (ex.: Ver deploy)" value={form.deployLabel} onChange={(v) => updateField("deployLabel", v)} />
        <Input label="Caminho da imagem (ex.: /projects/novo.jpg)" value={form.imageUrl} onChange={(v) => updateField("imageUrl", v)} />
        <Input label="Texto alternativo da imagem" value={form.imageAlt} onChange={(v) => updateField("imageAlt", v)} className="sm:col-span-2" />

        <button
          type="submit"
          disabled={saving || !PROJECTS_URL}
          className="focus-ring mt-2 w-fit border border-ink bg-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-opacity hover:opacity-90 disabled:opacity-50 sm:col-span-2"
        >
          {saving ? "Salvando…" : "Adicionar projeto"}
        </button>
      </form>

      <div className="mt-10 space-y-3">
        {loading ? (
          <p className="text-sm text-muted">Carregando…</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted">Nenhum projeto na API ainda.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id ?? item.slug}
              className="flex items-center justify-between border border-line px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-ink">
                  {String(item.index).padStart(2, "0")} — {item.title}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
                  {item.category}
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
  type = "text",
  required = false,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
        {label}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="focus-ring mt-1 w-full border border-line bg-paper px-3 py-2 text-sm text-ink"
      />
    </label>
  );
}

function Textarea({
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
      <textarea
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        className="focus-ring mt-1 w-full border border-line bg-paper px-3 py-2 text-sm text-ink"
      />
    </label>
  );
}
