import {
  seedProjects,
  seedCertificates,
  type Project,
  type Certificate,
} from "./data";

// URLs do mockapi.io — configure em .env.local (veja .env.example).
// Sem elas, o site funciona normalmente usando os dados semente abaixo.
const PROJECTS_URL = process.env.NEXT_PUBLIC_MOCKAPI_PROJECTS_URL;
const CERTIFICATES_URL = process.env.NEXT_PUBLIC_MOCKAPI_CERTIFICATES_URL;

/**
 * Busca os projetos no mockapi.io e junta com os dados semente de
 * lib/data.ts. Um registro da API com o mesmo slug substitui o da semente.
 * Se a variável de ambiente não estiver configurada ou a requisição falhar,
 * devolve só as sementes — mesmo padrão de fallback silencioso do Blog.
 */
export async function getProjects(): Promise<Project[]> {
  if (!PROJECTS_URL) return seedProjects;

  try {
    const res = await fetch(PROJECTS_URL, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`mockapi respondeu ${res.status}`);
    const data = (await res.json()) as Project[];
    if (!Array.isArray(data) || data.length === 0) return seedProjects;
    const fromSeed = seedProjects.filter(
      (seed) => !data.some((item) => item.slug === seed.slug)
    );
    return [...fromSeed, ...data].sort((a, b) => a.index - b.index);
  } catch {
    return seedProjects;
  }
}

/**
 * Mesma lógica aplicada aos certificados, deduplicando por título.
 */
export async function getCertificates(): Promise<Certificate[]> {
  if (!CERTIFICATES_URL) return seedCertificates;

  try {
    const res = await fetch(CERTIFICATES_URL, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`mockapi respondeu ${res.status}`);
    const data = (await res.json()) as Certificate[];
    if (!Array.isArray(data) || data.length === 0) return seedCertificates;
    const fromSeed = seedCertificates.filter(
      (seed) => !data.some((item) => item.title === seed.title)
    );
    return [...fromSeed, ...data];
  } catch {
    return seedCertificates;
  }
}

export const mockapi = {
  projectsUrl: PROJECTS_URL,
  certificatesUrl: CERTIFICATES_URL,
};