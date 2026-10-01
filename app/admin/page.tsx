"use client";

import { useRouter } from "next/navigation";
import ProjectsAdmin from "@/components/admin/ProjectsAdmin";
import CertificatesAdmin from "@/components/admin/CertificatesAdmin";

export default function AdminPage() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-content space-y-16 px-6 py-16 sm:px-10">
      <header className="flex items-end justify-between border-b border-line pb-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
            Painel
          </p>
          <h1 className="font-display mt-3 text-3xl italic text-ink">
            Administração
          </h1>
        </div>
        <button
          type="button"
          onClick={logout}
          className="focus-ring font-mono text-xs uppercase tracking-[0.15em] text-ink"
        >
          Sair
        </button>
      </header>

      <ProjectsAdmin />
      <CertificatesAdmin />
    </main>
  );
}
