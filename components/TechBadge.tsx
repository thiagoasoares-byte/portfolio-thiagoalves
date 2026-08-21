type TechBadgeProps = {
  name: string;
};

/**
 * Chip tipográfico puro, sem ícone — mantém a paleta estritamente
 * preto/branco/taupe em vez de introduzir cor via ícones de terceiros.
 */
export default function TechBadge({ name }: TechBadgeProps) {
  return (
    <span className="border border-ink/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/75">
      {name}
    </span>
  );
}
