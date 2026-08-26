import Image from "next/image";
import type { Certificate } from "@/lib/data";
import { isValidImageSrc } from "@/lib/imageSrc";

export default function CertificateCard({
  title,
  issuer,
  date,
  imageUrl,
  credentialUrl,
}: Certificate) {
  const Wrapper = credentialUrl ? "a" : "div";
  const wrapperProps = credentialUrl
    ? {
        href: credentialUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `Verificar certificado: ${title}, emitido por ${issuer}`,
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="focus-ring group block border border-line transition-colors hover:border-ink/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone">
        {isValidImageSrc(imageUrl) ? (
          <Image
            src={imageUrl}
            alt={`Certificado: ${title}, emitido por ${issuer}`}
            fill
            sizes="(min-width: 640px) 30vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center">
            <span className="font-display text-3xl italic text-ink/25">
              {title.charAt(0)}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
              Sem imagem
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="font-display text-lg italic leading-snug text-ink">
          {title}
        </p>
        <p className="font-mono mt-1.5 text-[10px] uppercase tracking-[0.15em] text-muted">
          {issuer}
          {date ? ` · ${date}` : ""}
        </p>
      </div>
    </Wrapper>
  );
}
