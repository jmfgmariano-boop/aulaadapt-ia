import Link from "next/link";
import { demoConfig } from "../lib/demo";

export function DemoBanner() {
  if (!demoConfig.showDemoBanner) {
    return null;
  }

  return (
    <div className="demo-banner">
      <div>
        <strong>Modo demostración pública</strong>
        <p>
          Datos simulados, navegación libre por rol y experiencia optimizada para mostrar la propuesta del producto en internet.
        </p>
      </div>
      <Link className="ghost-button demo-banner-link" href="/#como-funciona">
        Cómo funciona
      </Link>
    </div>
  );
}
