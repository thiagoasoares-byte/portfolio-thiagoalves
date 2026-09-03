// Força todo o subtree de /admin (login + painel) a renderizar de forma
// dinâmica em toda requisição, nunca cacheado pelo CDN da Vercel. Sem
// isso, uma resposta anterior (ex.: a tela de login, antes de autenticar)
// pode ficar em cache compartilhado e ser servida via 304 mesmo depois de
// um login bem-sucedido, já que o cache não varia por cookie de sessão.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
