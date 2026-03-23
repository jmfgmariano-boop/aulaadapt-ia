import Link from "next/link";
import Image from "next/image";
import { AppIcon, FlowSteps, Tag } from "../components/Ui";
import { RoleSwitcher } from "../components/RoleSwitcher";
import { demoConfig, demoLanding, demoRoleLabels, demoRoutes } from "../lib/demo";

export default function HomePage() {
  return (
    <main className="landing-page">
      <section className="landing-topbar">
        <Link className="brand brand-inline" href="/">
          <Image
            className="brand-logo"
            src="/prepauag-logo.svg"
            alt="Logo de la Preparatoria de la Universidad Autónoma de Guadalajara"
            width={220}
            height={64}
            priority
          />
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
          <div className="showcase-card showcase-card-feature">
            <span>Operación escolar</span>
            <strong className="showcase-title">Del aula al repaso en un flujo claro.</strong>
            <p>Captura la clase, genera materiales y entrega apoyos postclase sin perder control docente.</p>
            <div className="showcase-flow">
              <div className="showcase-flow-item">
                <AppIcon name="microphone" size={18} />
                <span>Captura</span>
              </div>
              <div className="showcase-flow-item">
                <AppIcon name="spark" size={18} />
                <span>IA</span>
              </div>
              <div className="showcase-flow-item">
                <AppIcon name="book" size={18} />
                <span>Entrega</span>
              </div>
            </div>
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
              <div className="role-card-head">
                <span className="icon-badge">
                  <AppIcon
                    name={
                      role === "teacher" ? "teacher" : role === "student" ? "student" : "admin"
                    }
                  />
                </span>
                <h3>{demoRoleLabels[role as keyof typeof demoRoleLabels]}</h3>
              </div>
              <p>
                {role === "teacher"
                  ? "Genera, revisa y programa materiales postclase."
                  : role === "student"
                    ? "Encuentra resúmenes, pasos, glosario y tarea con una navegación simple."
                    : "Gestiona alumnos, docentes, grupos y reportes desde una vista institucional."}
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
          <h2>Diseñada para operar como una plataforma escolar profesional, clara y escalable.</h2>
        </div>
        <div className="institutional-grid">
          <article className="role-card">
            <div className="role-card-head">
              <span className="icon-badge">
                <AppIcon name="layers" />
              </span>
              <h3>Operación escolar clara</h3>
            </div>
            <p>Integra captura docente, revisión, entrega y seguimiento con una experiencia comprensible para toda la institución.</p>
          </article>
          <article className="role-card">
            <div className="role-card-head">
              <span className="icon-badge">
                <AppIcon name="shield" />
              </span>
              <h3>Imagen institucional sólida</h3>
            </div>
            <p>La interfaz integra identidad institucional, jerarquía clara, accesibilidad visual y una navegación lista para crecer con la escuela.</p>
          </article>
          <article className="role-card">
            <div className="role-card-head">
              <span className="icon-badge">
                <AppIcon name="report" />
              </span>
              <h3>Escalabilidad real</h3>
            </div>
            <p>La base funcional ya contempla operación por grupos, materias, perfiles, materiales y futuras integraciones académicas.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
