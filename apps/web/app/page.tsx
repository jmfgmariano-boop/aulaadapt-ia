import Link from "next/link";
import Image from "next/image";
import { AppIcon, FlowSteps, Tag } from "../components/Ui";
import { RoleSwitcher } from "../components/RoleSwitcher";
import { demoActiveRoles, demoConfig, demoLanding, demoRoleLabels, demoRoutes } from "../lib/demo";

export default function HomePage() {
  return (
    <main className="landing-page">
      <section className="landing-topbar">
        <Link className="brand brand-inline institution-brand" href="/">
          <Image
            className="brand-logo brand-logo-institution"
            src="/prepauag-lifevalue.svg"
            alt="Logo de la Preparatoria de la Universidad Autónoma de Guadalajara"
            width={182}
            height={104}
            priority
          />
          <div className="institution-brand-copy">
            <strong>Implementación institucional</strong>
            <p>{demoConfig.schoolName}</p>
          </div>
        </Link>
        <div className="landing-topbar-actions">
          <Tag>Prepa UAG</Tag>
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
          <div className="hero-brand-block">
            <span className="hero-kicker">{demoLanding.kicker}</span>
            <Image
              className="hero-product-logo"
              src="/logo-inicio-uag.svg"
              alt="Logo de AulaAdapt IA"
              width={620}
              height={220}
              priority
            />
          </div>
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
          <div className="hero-proof-list">
            <article className="hero-proof">
              <span className="icon-badge">
                <AppIcon name="book" />
              </span>
              <div>
                <strong>Material base para todo el grupo</strong>
                <p>Resumen, pasos, conceptos y glosario generados después de clase para fortalecer el repaso de todo el grupo.</p>
              </div>
            </article>
            <article className="hero-proof">
              <span className="icon-badge">
                <AppIcon name="send" />
              </span>
              <div>
                <strong>Entrega institucional al alumnado</strong>
                <p>Correo institucional, exportación y plataformas escolares integradas en un mismo flujo docente.</p>
              </div>
            </article>
          </div>
          <p className="helper-copy">
            La IA organiza el contenido. El docente revisa, aprueba y define la entrega institucional al alumnado.
          </p>
          <div className="hero-metrics">
            {demoLanding.metrics.map((metric) => (
              <article key={metric.label} className="hero-metric-card">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </article>
            ))}
          </div>
          <p className="helper-copy">Indicadores del entorno actual cargado para esta demostración institucional.</p>
          <section className="profile-selector-card">
            <div className="profile-selector-copy">
              <span>Elegir perfil</span>
              <p>Selecciona el recorrido docente o administrativo que deseas explorar dentro de la plataforma.</p>
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
          <div className="showcase-stage">
            <div className="showcase-stage-head">
              <span>Ejemplo de salida</span>
              <strong>{demoLanding.example.topic}</strong>
            </div>
            <div className="showcase-stage-grid">
              <article className="showcase-stage-item">
                <span>Entrada</span>
                <p>{demoLanding.example.input}</p>
              </article>
              <article className="showcase-stage-item">
                <span>Salida base</span>
                <p>{demoLanding.example.baseOutput}</p>
              </article>
              <article className="showcase-stage-item">
                <span>Salida adaptada</span>
                <p>{demoLanding.example.adaptedOutput}</p>
              </article>
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
        </div>
      </section>

      <section className="role-section">
        <div className="section-title">
          <span>Accesos por rol</span>
          <h2>Dos recorridos institucionales para operar la plataforma y entregar materiales al alumnado.</h2>
        </div>
        <div className="role-grid">
          {demoActiveRoles.map((role) => (
            <article key={role} className="role-card">
              <div className="role-card-head">
                <span className="icon-badge">
                  <AppIcon
                    name={role === "teacher" ? "teacher" : "admin"}
                  />
                </span>
                <h3>{demoRoleLabels[role as keyof typeof demoRoleLabels]}</h3>
              </div>
              <p>
                {role === "teacher"
                  ? "Captura clases, genera materiales postclase y decide cómo se entregan."
                  : "Gestiona base escolar, perfiles pedagógicos, permisos y reportes institucionales."}
              </p>
              <Link href={demoRoutes[role]}>Entrar al recorrido</Link>
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
    </main>
  );
}
