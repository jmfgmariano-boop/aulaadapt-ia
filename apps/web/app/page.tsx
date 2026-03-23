import Link from "next/link";
import Image from "next/image";
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
            <p>{demoConfig.schoolName}</p>
          </div>
        </Link>
        <div className="landing-topbar-actions">
          <Tag>IA educativa</Tag>
          <Link className="ghost-button" href="/acceso">
            Acceso institucional
          </Link>
          <Link className="ghost-button" href={`mailto:${demoConfig.supportEmail}`}>
            Contacto institucional
          </Link>
        </div>
      </section>

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
          <div className="hero-metrics">
            {demoLanding.metrics.map((metric) => (
              <article key={metric.label} className="hero-metric-card">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </article>
            ))}
          </div>
          <section className="profile-selector-card">
            <div className="profile-selector-copy">
              <span>Elegir perfil</span>
              <p>Selecciona el recorrido que deseas explorar dentro de la plataforma según tu perfil.</p>
            </div>
            <RoleSwitcher />
          </section>
        </div>
        <div className="hero-showcase">
          <div className="showcase-card">
            <span>Propuesta institucional</span>
            <strong className="showcase-title">La IA apoya. El docente decide.</strong>
            <p>Diseñada para reforzar la comprensión postclase, mejorar la accesibilidad educativa y mantener al docente en el centro de cada decisión.</p>
          </div>
          <div className="hero-illustration-card">
            <Image
              src="/hero-illustration.svg"
              alt="Ilustración del flujo docente con grabación de audio y materiales accesibles"
              width={720}
              height={540}
            />
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
          <h2>Una sola plataforma, experiencias distintas según quién la usa.</h2>
        </div>
        <div className="role-grid">
          {Object.entries(demoRoutes).map(([role, href]) => (
            <article key={role} className="role-card">
              <h3>{demoRoleLabels[role as keyof typeof demoRoleLabels]}</h3>
              <p>
                {role === "teacher"
                  ? "Genera, revisa y programa materiales postclase con apoyos pedagógicos claros."
                  : role === "student"
                    ? "Encuentra resúmenes, pasos, glosario y tarea sin fricción visual."
                    : "Observa reportes agregados, grupos, docentes y alumnos desde una vista institucional."}
              </p>
              <Link href={href}>Entrar al recorrido</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="how-it-works-section" id="como-funciona">
        <div className="section-title">
          <span>Cómo funciona</span>
          <h2>Un flujo simple para convertir una clase en apoyo postclase entendible y útil.</h2>
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
          <span>Presentación institucional</span>
          <h2>Diseñada para presentarse como una plataforma lista para pilotaje escolar.</h2>
        </div>
        <div className="institutional-grid">
          <article className="role-card">
            <h3>Operación escolar clara</h3>
            <p>Integra captura docente, revisión, entrega y seguimiento con una experiencia comprensible para toda la institución.</p>
          </article>
          <article className="role-card">
            <h3>Imagen institucional sólida</h3>
            <p>La experiencia ya cuenta con identidad visual, jerarquía clara y estructura para presentarse como un producto escolar listo para evolucionar.</p>
          </article>
          <article className="role-card">
            <h3>Siguiente iteración</h3>
            <p>La base queda preparada para avanzar a backend real, grabación funcional de audio e integraciones de IA.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
