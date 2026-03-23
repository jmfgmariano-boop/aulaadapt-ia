import type { Metadata } from "next";
import "./globals.css";
import { AppearanceHydrator } from "../components/AppearanceHydrator";
import { demoConfig } from "../lib/demo";

export const metadata: Metadata = {
  metadataBase: new URL("https://aulaadapt-ia.vercel.app"),
  title: "AulaAdapt IA | Plataforma para educación media superior",
  description:
    "AulaAdapt IA es una plataforma web para transformar explicaciones de clase en materiales postclase accesibles, claros y revisables.",
  openGraph: {
    title: "AulaAdapt IA",
    description:
      "Explicación docente, IA, revisión humana y entrega postclase en una plataforma lista para pilotaje escolar.",
    url: "https://aulaadapt-ia.vercel.app",
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
    description: "Plataforma de apoyo docente postclase con enfoque inclusivo para educación media superior.",
    images: ["/opengraph-image"]
  },
  icons: {
    icon: "/icon.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body data-app-mode={demoConfig.appMode}>
        <AppearanceHydrator />
        {children}
      </body>
    </html>
  );
}
