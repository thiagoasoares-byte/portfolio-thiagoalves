type TechBadgeProps = {
  name: string;
};

/**
 * Chip tipográfico com um fundo pastel bem leve, só para destacar
 * a badge do fundo branco sem introduzir cor forte na paleta.
 */
export default function TechBadge({ name }: TechBadgeProps) {
  return (
    <span className="border border-ink/10 bg-badge px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/75">
      {name}
    </span>
  );
}
