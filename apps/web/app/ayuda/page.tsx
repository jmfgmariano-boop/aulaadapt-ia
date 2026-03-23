import Link from "next/link";
import { FlowSteps, SectionCard, Tag } from "../../components/Ui";
import { demoConfig, demoHelp } from "../../lib/demo";

export default function HelpPage() {
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
        <SectionCard title="Preguntas frecuentes" description="Respuestas rápidas para docentes, estudiantes e institución">
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
    </main>
  );
}
