import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const alt = "Thiago Alves Soares — Desenvolvedor FullStack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const regular = fs.readFileSync(
    path.join(process.cwd(), "assets/fonts/DejaVuSerif.ttf")
  );
  const italic = fs.readFileSync(
    path.join(process.cwd(), "assets/fonts/DejaVuSerif-Italic.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          padding: "90px",
        }}
      >
        <div
          style={{
            fontFamily: "Serif",
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#82796c",
          }}
        >
          Desenvolvedor FullStack
        </div>
        <div
          style={{
            fontFamily: "Serif",
            fontStyle: "italic",
            fontSize: 104,
            color: "#0f0f0e",
            marginTop: 28,
            lineHeight: 1.05,
          }}
        >
          Thiago Alves Soares
        </div>
        <div
          style={{
            width: 180,
            height: 3,
            background: "#0f0f0e",
            marginTop: 48,
          }}
        />
        <div
          style={{
            fontFamily: "Serif",
            fontSize: 24,
            color: "#82796c",
            marginTop: 44,
            maxWidth: 760,
          }}
        >
          Python · Node.js · React · AWS — experiência em produção no setor
          financeiro
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Serif", data: regular, style: "normal", weight: 400 },
        { name: "Serif", data: italic, style: "italic", weight: 400 },
      ],
    }
  );
}
