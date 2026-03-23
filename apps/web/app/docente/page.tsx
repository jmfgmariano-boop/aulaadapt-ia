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
      subtitle="Genera, revisa y entrega materiales postclase claros y accesibles desde una vista compacta y operativa."
    >
      <div className="workspace-strip">
        <a className="workspace-chip" href="#hoy">
          Hoy
        </a>
        <a className="workspace-chip" href="#reciente">
          Trabajo reciente
        </a>
        <a className="workspace-chip" href="#recursos">
          Recursos
        </a>
        <Link className="workspace-chip" href="/docente/comparativa">
          Comparativa
        </Link>
        <Link className="workspace-chip" href="/docente/plantillas">
          Plantillas
        </Link>
      </div>

      <section className="hero-banner">
        <div className="hero-banner-copy">
          <span className="hero-kicker">Recorrido docente</span>
          <h2>Nueva clase en menos de 5 minutos</h2>
          <p>Captura la sesión, genera un borrador con IA y decide la entrega institucional desde un solo flujo.</p>
          <p className="helper-copy">
            La IA organiza el contenido. El docente revisa, aprueba y define la entrega institucional al alumnado.
          </p>
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

      <section className="utility-grid" id="hoy">
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

      <div className="dashboard-main-grid" id="reciente">
        <SectionCard title="Trabajo reciente" description="Sesiones y borradores activos">
          <div className="section-stack">
            <section className="section-block">
              <div className="section-block-header">
                <strong>Sesiones recientes</strong>
                <Link className="ghost-button" href="/docente/historial">
                  Ver historial
                </Link>
              </div>
              <div className="stack-list compact-stack">
                {recentSessions.slice(0, 3).map((session) => (
                  <article key={session.id} className="list-card compact">
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
            </section>

            <section className="section-block">
              <div className="section-block-header">
                <strong>Materiales generados</strong>
                <Link className="ghost-button" href="/docente/materiales">
                  Abrir materiales
                </Link>
              </div>
              <div className="stack-list compact-stack">
                {generatedMaterials.slice(0, 3).map((material) => (
                  <article key={material.id} className="material-card compact">
                    <div>
                      <strong>{material.title}</strong>
                      <p>{material.summary}</p>
                    </div>
                    <div className="inline-tags">
                      {material.selectedAdaptations.slice(0, 3).map((adaptation) => (
                        <Tag key={adaptation}>{adaptation.replaceAll("_", " ")}</Tag>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </SectionCard>

        <div className="dashboard-aside-stack">
          <SectionCard title="Estado del día" description="Pendientes, entregas y alertas" accent="mint">
            <div className="stack-list compact-stack">
              {demoTeacher.deliveryQueueSummary.map((item) => (
                <article key={item.title} className="list-card compact">
                  <strong>{item.title}</strong>
                  <p>{item.copy}</p>
                </article>
              ))}
              {deliveryQueue.slice(0, 2).map((delivery) => (
                <article key={delivery.id} className="list-card compact">
                  <strong>{delivery.channel === "platform" ? "Entrega por LMS" : "Entrega por correo"}</strong>
                  <p>{new Date(delivery.scheduledFor).toLocaleString("es-MX")}</p>
                </article>
              ))}
              {demoTeacher.notifications.slice(0, 2).map((item) => (
                <article key={item.title} className="list-card compact">
                  <strong>{item.title}</strong>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Recursos clave" description="Plantillas, comparativa y apoyos" accent="sky">
            <div className="stack-list compact-stack">
              <article className="list-card compact">
                <strong>{demoTeacher.templates[0].title}</strong>
                <p>{demoTeacher.templates[0].focus}</p>
              </article>
              <article className="list-card compact">
                <strong>{demoTeacher.authorizedSupportGuides[0].title}</strong>
                <p>Salida sugerida: {demoTeacher.authorizedSupportGuides[0].suggestedMaterial}</p>
              </article>
            </div>
            <div className="cta-row">
              <Link className="ghost-button" href="/docente/plantillas">
                Abrir plantillas
              </Link>
              <Link className="ghost-button" href="/docente/comparativa">
                Abrir comparativa
              </Link>
            </div>
          </SectionCard>
        </div>
      </div>

      <div className="dashboard-grid">
        <SectionCard
          title="Entrega institucional"
          description="Canales activos para compartir materiales con el alumnado"
          accent="sky"
        >
          <div className="inline-tags">
            {demoTeacher.deliveryChannels.map((channel) => (
              <Tag key={channel}>{channel}</Tag>
            ))}
          </div>
          <div className="stack-list compact-stack">
            <article className="list-card compact">
              <strong>Materiales listos para enviar</strong>
              <p>Los borradores aprobados pueden salir por correo institucional o exportación controlada.</p>
            </article>
            <article className="list-card compact">
              <strong>Historial de entregas</strong>
              <p>La plataforma mantiene registro de canal, horario y destinatarios antes de cada publicación.</p>
            </article>
          </div>
        </SectionCard>

        <SectionCard
          title="Acciones rápidas de envío"
          description="Accede al punto exacto donde se aprueba, exporta o programa cada material"
          accent="mint"
        >
          <div className="cta-row">
            <Link className="primary-button" href="/docente/materiales">
              Abrir revisión y entrega
            </Link>
            <Link className="ghost-button" href="/integraciones">
              Ver integraciones
            </Link>
          </div>
        </SectionCard>
      </div>

      <div className="dashboard-grid" id="recursos">
        <SectionCard title="Materias y grupos" description="Carga académica activa">
          <div className="section-stack">
            <section className="section-block">
              <div className="section-block-header">
                <strong>Materias</strong>
                <span className="status-pill">
                  <AppIcon name="book" size={14} />
                  {teacherSubjects.length} activas
                </span>
              </div>
              <div className="stack-list compact-stack">
                {teacherSubjects.map((subject) => (
                  <article key={subject.id} className="list-card compact">
                    <strong>{subject.name}</strong>
                    <p>{subject.area}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="section-block">
              <div className="section-block-header">
                <strong>Grupos</strong>
                <span className="status-pill">
                  <AppIcon name="users" size={14} />
                  {teacherGroups.length} asignados
                </span>
              </div>
              <div className="stack-list compact-stack">
                {teacherGroups.map((group) => (
                  <article key={group.id} className="list-card compact">
                    <strong>{group.name}</strong>
                    <p>
                      {group.grade} · {group.shift}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </SectionCard>

        <SectionCard
          title="Apoyos autorizados"
          description="Apoyos pedagógicos autorizados para personalizar el material postclase"
          accent="mint"
        >
          <div className="stack-list compact-stack">
            {demoTeacher.authorizedSupportGuides.slice(0, 2).map((guide) => (
              <article key={guide.title} className="list-card compact">
                <strong>{guide.title}</strong>
                <p>{guide.copy}</p>
                <div className="inline-tags">
                  {guide.supports.slice(0, 3).map((support) => (
                    <Tag key={support}>{support}</Tag>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
