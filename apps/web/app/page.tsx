import Link from "next/link";
import { DemoBanner } from "../components/DemoBanner";
import { FlowSteps, Tag } from "../components/Ui";
import { RoleSwitcher } from "../components/RoleSwitcher";
import { demoConfig, demoLanding, demoRoleLabels, demoRoutes } from "../lib/demo";

export default function HomePage() {
  return (
    <main className="landing-page">
      <section className="landing-topbar">
        <Link className="brand brand-inline" href="/">
          <span className="brand-mark">A</span>
          <div>
            <strong>AulaAdapt IA</strong>
            <p>Demo publica para compartir por internet</p>
          </div>
        </Link>
        <div className="landing-topbar-actions">
          <Tag>{demoConfig.appMode}</Tag>
          <Link className="ghost-button" href={`mailto:${demoConfig.supportEmail}`}>
            Contacto demo
          </Link>
        </div>
      </section>

      <DemoBanner />

      <section className="hero-panel">
        <div className="hero-copy">
          <span className="hero-kicker">{demoLanding.kicker}</span>
          <h1>{demoLanding.title}</h1>
          <p>{demoLanding.description}</p>
          <div className="hero-actions">
            <Link className="primary-button" href={demoLanding.primaryCta.href}>
              {demoLanding.primaryCta.label}
            </Link>
            <Link className="ghost-button" href={demoLanding.secondaryCta.href}>
              {demoLanding.secondaryCta.label}
            </Link>
          </div>
          <RoleSwitcher />
        </div>
        <div className="hero-showcase">
          <div className="showcase-card">
            <span>Promesa del producto</span>
            <strong>La IA apoya. El docente decide.</strong>
            <p>Sin diagnosticos, con datos simulados y con control editorial antes del envio en esta demo publica.</p>
          </div>
          <div className="showcase-grid">
            {demoLanding.highlights.map((highlight) => (
              <div key={highlight.title}>
                <strong>{highlight.title}</strong>
                <p>{highlight.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="role-section">
        <div className="section-title">
          <span>Accesos por rol</span>
          <h2>Una sola plataforma, experiencias distintas segun quien la usa.</h2>
        </div>
        <div className="role-grid">
          {Object.entries(demoRoutes).map(([role, href]) => (
            <article key={role} className="role-card">
              <h3>{demoRoleLabels[role as keyof typeof demoRoleLabels]}</h3>
              <p>
                {role === "teacher"
                  ? "Genera, revisa y programa materiales postclase con apoyos pedagogicos claros."
                  : role === "student"
                    ? "Encuentra resumenes, pasos, glosario y tarea sin friccion visual."
                    : "Observa reportes agregados, grupos y materias desde una vista institucional."}
              </p>
              <Link href={href}>Entrar al recorrido</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="how-it-works-section" id="como-funciona">
        <div className="section-title">
          <span>Como funciona</span>
          <h2>Un flujo simple para convertir una clase en apoyo postclase entendible y util.</h2>
        </div>
        <FlowSteps items={demoLanding.howItWorks} />
      </section>

      <section className="trust-strip">
        {demoLanding.valuePillars.map((pillar) => (
          <div key={pillar.title}>
            <strong>{pillar.title}</strong>
            <p>{pillar.copy}</p>
          </div>
        ))}
      </section>

      <section className="institutional-panel">
        <div className="section-title">
          <span>Presentacion institucional</span>
          <h2>Lista para compartirse como demo web publica en Vercel.</h2>
        </div>
        <div className="institutional-grid">
          <article className="role-card">
            <h3>Datos simulados</h3>
            <p>La demo no requiere credenciales y usa contenido de ejemplo coherente entre pantallas y APIs.</p>
          </article>
          <article className="role-card">
            <h3>Publicable</h3>
            <p>Metadatos, Open Graph, favicon y configuracion de modo demo listos para compartirse por URL.</p>
          </article>
          <article className="role-card">
            <h3>Siguiente iteracion</h3>
            <p>La base queda preparada para pasar despues a backend real y, en una fase posterior, IA real.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
