import Link from "next/link";
import { AppShell } from "../../components/AppShell";
import { AppIcon, MetricCard, SectionCard, Tag } from "../../components/Ui";
import { deliveryQueue, generatedMaterials, recentSessions, teacher, teacherGroups, teacherSubjects } from "../../lib/data";
import { demoTeacher } from "../../lib/demo";

export default function TeacherDashboardPage() {
  return (
    <AppShell
      role="teacher"
      title={`Hola, ${teacher.name}`}
      subtitle="Genera materiales postclase en pocos pasos, revísalos y entrégalos con una experiencia clara para tu grupo."
    >
      <section className="hero-banner">
        <div className="hero-banner-copy">
          <span className="hero-kicker">Recorrido docente</span>
          <h2>Nueva clase en menos de 5 minutos</h2>
          <p>{demoTeacher.focusCards[0].copy}</p>
          <div className="hero-actions">
            <Link className="primary-button" href="/docente/nueva-clase">
              <AppIcon name="spark" size={16} />
              Nueva clase
            </Link>
            <Link className="ghost-button" href="/docente/materiales">
              <AppIcon name="book" size={16} />
              Revisar materiales
            </Link>
          </div>
        </div>
        <div className="hero-banner-panel">
          <div className="hero-panel-header">
            <span className="status-pill">
              <AppIcon name="microphone" size={16} />
              Flujo del día
            </span>
            <strong>Captura, genera y entrega</strong>
          </div>
          <div className="hero-mini-flow">
            {demoTeacher.recorderSteps.map((step) => (
              <article key={step} className="mini-flow-card">
                <span className="mini-flow-index">{step.slice(0, 1)}</span>
                <p>{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="utility-grid">
        <Link className="utility-card" href="/docente/nueva-clase">
          <span className="icon-badge">
            <AppIcon name="microphone" />
          </span>
          <div>
            <strong>Grabar clase</strong>
            <p>Captura explicación, audio o archivos base.</p>
          </div>
        </Link>
        <Link className="utility-card" href="/docente/materiales">
          <span className="icon-badge">
            <AppIcon name="book" />
          </span>
          <div>
            <strong>Revisar borradores</strong>
            <p>Edita y aprueba antes de publicar.</p>
          </div>
        </Link>
        <Link className="utility-card" href="/docente/notificaciones">
          <span className="icon-badge">
            <AppIcon name="bell" />
          </span>
          <div>
            <strong>Ver alertas</strong>
            <p>Consulta pendientes y entregas del día.</p>
          </div>
        </Link>
        <Link className="utility-card" href="/docente/plantillas">
          <span className="icon-badge">
            <AppIcon name="template" />
          </span>
          <div>
            <strong>Usar plantillas</strong>
            <p>Reutiliza formatos para ahorrar tiempo.</p>
          </div>
        </Link>
      </section>

      <div className="metric-grid">
        {demoTeacher.quickStats.map((item) => (
          <MetricCard key={item.label} label={item.label} value={item.value} helper={item.helper} />
        ))}
      </div>

      <div className="dashboard-grid">
        <SectionCard title="Historial reciente" description="Sesiones y materiales más recientes">
          <div id="historial" />
          <div className="stack-list">
            {recentSessions.map((session) => (
              <article key={session.id} className="list-card">
                <div>
                  <strong>{session.topic}</strong>
                  <p>{session.date}</p>
                </div>
                <div className="inline-tags">
                  <Tag>{teacherSubjects.find((subject) => subject.id === session.subjectId)?.name}</Tag>
                  <Tag>{teacherGroups.find((group) => group.id === session.groupId)?.name}</Tag>
                  <Tag>{session.status}</Tag>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Materias activas" description="Organiza tu carga académica" accent="sky">
          <div id="materias" />
          <div className="stack-list">
            {teacherSubjects.map((subject) => (
              <article key={subject.id} className="list-card compact">
                <strong>{subject.name}</strong>
                <p>{subject.area}</p>
              </article>
            ))}
            <article className="list-card compact emphasis-card">
              <strong>{demoTeacher.focusCards[1].title}</strong>
              <p>{demoTeacher.focusCards[1].copy}</p>
            </article>
          </div>
        </SectionCard>
      </div>

      <div className="dashboard-grid">
        <SectionCard title="Materiales generados" description="Últimos borradores y versiones finales">
          <div className="stack-list">
            {generatedMaterials.map((material) => (
              <article key={material.id} className="material-card">
                <div>
                  <strong>{material.title}</strong>
                  <p>{material.summary}</p>
                </div>
                <div className="inline-tags">
                  {material.selectedAdaptations.map((adaptation) => (
                    <Tag key={adaptation}>{adaptation.replaceAll("_", " ")}</Tag>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Entregas programadas" description="Cola de distribución postclase" accent="mint">
          <div id="grupos" />
          <div className="stack-list">
            {deliveryQueue.map((delivery) => (
              <article key={delivery.id} className="list-card compact">
                <strong>{delivery.channel === "platform" ? "Plataforma interna" : "Correo"}</strong>
                <p>{new Date(delivery.scheduledFor).toLocaleString("es-MX")}</p>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="dashboard-grid">
        <SectionCard title="Notificaciones" description="Seguimiento rápido de tareas docentes">
          <div className="stack-list">
            {demoTeacher.notifications.map((item) => (
              <article key={item.title} className="list-card">
                <strong>{item.title}</strong>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Biblioteca de plantillas" description="Formatos reutilizables para ahorrar tiempo" accent="sky">
          <div className="stack-list">
            {demoTeacher.templates.map((template) => (
              <article key={template.title} className="list-card compact">
                <strong>{template.title}</strong>
                <p>{template.copy}</p>
              </article>
            ))}
            <Link className="ghost-button" href="/docente/plantillas">
              Ver biblioteca completa
            </Link>
          </div>
        </SectionCard>
      </div>

      <div className="dashboard-grid">
        <SectionCard
          title="Apoyos pedagógicos autorizados"
          description="Traducción docente de información institucional protegida"
          accent="mint"
        >
          <div className="stack-list">
            {demoTeacher.authorizedSupportGuides.map((guide) => (
              <article key={guide.title} className="list-card">
                <strong>{guide.title}</strong>
                <p>{guide.copy}</p>
                <p>Salida sugerida: {guide.suggestedMaterial}</p>
                <div className="inline-tags">
                  {guide.supports.map((support) => (
                    <Tag key={support}>{support}</Tag>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Comparativa y trazabilidad"
          description="Demuestra cómo la IA apoya y el docente decide"
          accent="sky"
        >
          <div className="stack-list">
            <article className="list-card compact">
              <strong>Comparativa de generación</strong>
              <p>Visualiza entrada original, borrador IA, revisión docente y salida final antes del envío.</p>
            </article>
            <article className="list-card compact">
              <strong>Privacidad y permisos</strong>
              <p>Los apoyos llegan al docente como recomendaciones pedagógicas, no como etiquetas sensibles para el grupo.</p>
            </article>
            <div className="cta-row">
              <Link className="ghost-button" href="/docente/comparativa">
                Abrir comparativa
              </Link>
            </div>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
