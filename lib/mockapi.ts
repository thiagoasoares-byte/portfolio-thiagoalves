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
 * Busca os projetos no mockapi.io. Se a variável de ambiente não estiver
 * configurada, se a requisição falhar ou a coleção estiver vazia, cai de
 * volta para os dados semente em lib/data.ts — mesmo padrão de fallback
 * silencioso já usado no projeto do Blog.
 */
export async function getProjects(): Promise<Project[]> {
  if (!PROJECTS_URL) return seedProjects;

  try {
    const res = await fetch(PROJECTS_URL, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`mockapi respondeu ${res.status}`);
    const data = (await res.json()) as Project[];
    if (!Array.isArray(data) || data.length === 0) return seedProjects;
    return data.sort((a, b) => a.index - b.index);
  } catch {
    return seedProjects;
  }
}

/**
 * Mesma lógica de fallback aplicada aos certificados.
 */
export async function getCertificates(): Promise<Certificate[]> {
  if (!CERTIFICATES_URL) return seedCertificates;

  try {
    const res = await fetch(CERTIFICATES_URL, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`mockapi respondeu ${res.status}`);
    const data = (await res.json()) as Certificate[];
    if (!Array.isArray(data) || data.length === 0) return seedCertificates;
    return data;
  } catch {
    return seedCertificates;
  }
}

export const mockapi = {
  projectsUrl: PROJECTS_URL,
  certificatesUrl: CERTIFICATES_URL,
};
