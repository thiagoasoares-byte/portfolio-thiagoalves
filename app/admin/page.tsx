"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProjectsAdmin from "@/components/admin/ProjectsAdmin";
import CertificatesAdmin from "@/components/admin/CertificatesAdmin";

type Tab = "projetos" | "certificados";

const tabs: { id: Tab; label: string }[] = [
  { id: "projetos", label: "Projetos" },
  { id: "certificados", label: "Certificados" },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("projetos");

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-content px-6 py-16 sm:px-10">
      <div className="flex items-center justify-between border-b border-ink pb-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
            Painel de administração
          </p>
          <h1 className="font-display mt-2 text-3xl italic text-ink">
            Projetos e certificados
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="focus-ring font-mono text-xs uppercase tracking-[0.15em] text-ink hover:underline"
        >
          Sair
        </button>
      </div>

      <div className="mt-8 flex gap-6 border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`focus-ring pb-3 font-mono text-xs uppercase tracking-[0.15em] ${
              tab === t.id
                ? "border-b-2 border-ink text-ink"
                : "text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "projetos" && <ProjectsAdmin />}
        {tab === "certificados" && <CertificatesAdmin />}
      </div>
    </main>
  );
}
