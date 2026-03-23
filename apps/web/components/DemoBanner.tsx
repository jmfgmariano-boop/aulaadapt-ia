import Link from "next/link";
import { demoConfig } from "../lib/demo";

export function DemoBanner() {
  if (!demoConfig.showDemoBanner) {
    return null;
  }

  return (
    <div className="demo-banner">
      <div>
        <strong>Vista institucional guiada</strong>
        <p>
          Recorrido funcional de la plataforma con escenarios preparados para presentar su operación escolar con claridad.
        </p>
      </div>
      <Link className="ghost-button demo-banner-link" href="/#como-funciona">
        Cómo funciona
      </Link>
    </div>
  );
}
