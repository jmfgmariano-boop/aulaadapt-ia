import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AulaAdapt IA";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: 56,
          background:
            "linear-gradient(135deg, rgba(20,53,74,1) 0%, rgba(56,118,135,1) 55%, rgba(169,229,213,1) 100%)",
          color: "white",
          fontFamily: "Arial"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(255,255,255,0.22)",
            borderRadius: 32,
            padding: 42,
            background: "rgba(255,255,255,0.08)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 78,
                height: 78,
                borderRadius: 22,
                background: "rgba(255,255,255,0.18)",
                fontSize: 38,
                fontWeight: 800
              }}
            >
              A
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 24, opacity: 0.9 }}>Plataforma institucional para educación media superior</div>
              <div style={{ fontSize: 44, fontWeight: 800 }}>AulaAdapt IA</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 860 }}>
            <div style={{ fontSize: 64, lineHeight: 1.02, fontWeight: 800 }}>
              Materiales postclase accesibles para preparatoria.
            </div>
            <div style={{ fontSize: 28, opacity: 0.88 }}>
              Explicación docente, IA, revisión humana y entrega institucional al alumnado.
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
