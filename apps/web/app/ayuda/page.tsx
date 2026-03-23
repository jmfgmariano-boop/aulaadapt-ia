import Link from "next/link";
import Image from "next/image";
import { FlowSteps, InfoList, SectionCard, Tag } from "../../components/Ui";
import { demoConfig, demoHelp } from "../../lib/demo";

export default function HelpPage() {
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
          <Tag>Centro de ayuda</Tag>
          <Link className="ghost-button" href="/acceso">
            Ir a acceso
          </Link>
        </div>
      </section>

      <section className="role-section">
        <div className="section-title">
          <span>Onboarding inicial</span>
          <h2>La plataforma se explica sola con un recorrido breve, claro y orientado a la tarea.</h2>
        </div>
        <FlowSteps items={demoHelp.onboardingSteps} />
      </section>

      <section className="dashboard-grid">
        <SectionCard title="Recorridos por rol" description="Guías iniciales para docente y coordinación">
          <div className="stack-list">
            <article className="list-card">
              <strong>Docente</strong>
              <InfoList items={demoHelp.onboardingByRole.teacher} />
            </article>
            <article className="list-card">
              <strong>Coordinación académica</strong>
              <InfoList items={demoHelp.onboardingByRole.admin} />
            </article>
          </div>
        </SectionCard>

        <SectionCard title="Preguntas frecuentes" description="Respuestas rápidas para docentes e institución">
          <div className="stack-list">
            {demoHelp.faqs.map((item) => (
              <article key={item.question} className="list-card">
                <strong>{item.question}</strong>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Soporte institucional" description="Canales de acompañamiento y uso responsable" accent="sky">
          <div className="stack-list">
            <article className="list-card compact">
              <strong>Correo de soporte</strong>
              <p>{demoConfig.supportEmail}</p>
            </article>
            <article className="list-card compact">
              <strong>Privacidad y ética</strong>
              <p>La plataforma no diagnostica, no clasifica clínicamente y trabaja solo con información previamente autorizada.</p>
            </article>
          </div>
        </SectionCard>
      </section>

      <section className="dashboard-grid">
        <SectionCard title="Mapa de módulos" description="Vista general de la operación institucional">
          <div className="institutional-grid">
            {demoHelp.moduleMap.map((module) => (
              <article key={module.title} className="role-card">
                <div className="role-card-head">
                  <h3>{module.title}</h3>
                </div>
                <p>{module.copy}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Wireflow del sistema" description="Secuencia principal de uso" accent="sky">
          <InfoList items={demoHelp.wireflow} />
        </SectionCard>
      </section>

      <section className="dashboard-grid">
        <SectionCard title="Arquitectura funcional" description="Capas visibles del producto">
          <div className="stack-list">
            {demoHelp.architectureLayers.map((layer) => (
              <article key={layer.title} className="list-card compact">
                <strong>{layer.title}</strong>
                <p>{layer.copy}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Ejemplo de salida" description="Cómo se traduce una clase en materiales postclase" accent="mint">
          <div className="stack-list">
            {demoHelp.examples.map((example) => (
              <article key={example.topic} className="list-card">
                <strong>{example.topic}</strong>
                <p>Entrada: {example.input}</p>
                <p>Salida base: {example.baseOutput}</p>
                <p>Salida adaptada: {example.adaptedOutput}</p>
              </article>
            ))}
          </div>
        </SectionCard>
      </section>
    </main>
  );
}
