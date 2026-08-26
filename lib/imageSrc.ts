/**
 * next/image exige que `src` seja uma URL absoluta (http/https) ou um
 * caminho relativo começando com "/". Como imageUrl vem de um campo de
 * texto livre no painel /admin, um valor qualquer (ex.: "teste") quebra
 * a página inteira em runtime. Esta função filtra isso antes de renderizar
 * <Image>, caindo no fallback tipográfico quando o valor é inválido.
 */
export function isValidImageSrc(src?: string): src is string {
  if (!src) return false;
  return src.startsWith("/") || /^https?:\/\//.test(src);
}
