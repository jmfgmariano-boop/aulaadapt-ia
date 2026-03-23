import type { Metadata } from "next";
import "./globals.css";
import { demoConfig } from "../lib/demo";

export const metadata: Metadata = {
  metadataBase: new URL("https://aulaadapt-ia-demo.vercel.app"),
  title: "AulaAdapt IA | Demo pública para educación media superior",
  description: "Demo pública de AulaAdapt IA, una plataforma web para transformar explicaciones de clase en materiales postclase accesibles y revisables.",
  openGraph: {
    title: "AulaAdapt IA",
    description:
      "Explicación docente, IA, revisión humana y entrega postclase en una demo pública lista para compartir.",
    url: "https://aulaadapt-ia-demo.vercel.app",
    siteName: "AulaAdapt IA",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AulaAdapt IA"
      }
    ],
    locale: "es_MX",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AulaAdapt IA",
    description:
      "Demo pública para presentar una plataforma de apoyo docente postclase con enfoque inclusivo.",
    images: ["/opengraph-image"]
  },
  icons: {
    icon: "/icon.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body data-app-mode={demoConfig.appMode}>{children}</body>
    </html>
  );
}
