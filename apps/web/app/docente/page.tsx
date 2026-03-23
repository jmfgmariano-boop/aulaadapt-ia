import Link from "next/link";
import { AppShell } from "../../components/AppShell";
import { MetricCard, SectionCard, Tag } from "../../components/Ui";
import { deliveryQueue, generatedMaterials, recentSessions, teacher, teacherGroups, teacherSubjects } from "../../lib/data";
import { demoTeacher } from "../../lib/demo";

export default function TeacherDashboardPage() {
  return (
    <AppShell
      role="teacher"
      title={`Hola, ${teacher.name}`}
      subtitle="Genera materiales postclase en pocos pasos, revisalos y entregalos con una experiencia clara para tu grupo."
    >
      <section className="hero-banner">
        <div>
          <span className="hero-kicker">Recorrido docente</span>
          <h2>Nueva clase en menos de 5 minutos</h2>
          <p>{demoTeacher.focusCards[0].copy}</p>
        </div>
        <div className="hero-actions">
          <Link className="primary-button" href="/docente/nueva-clase">
            Nueva clase
          </Link>
          <Link className="ghost-button" href="/docente/materiales">
            Revisar materiales
          </Link>
        </div>
      </section>

      <div className="metric-grid">
        {demoTeacher.quickStats.map((item) => (
          <MetricCard key={item.label} label={item.label} value={item.value} helper={item.helper} />
        ))}
      </div>

      <div className="dashboard-grid">
        <SectionCard title="Historial reciente" description="Sesiones y materiales mas recientes">
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

        <SectionCard title="Materias activas" description="Organiza tu carga academica" accent="sky">
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
        <SectionCard title="Materiales generados" description="Ultimos borradores y versiones finales">
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

        <SectionCard title="Entregas programadas" description="Cola de distribucion postclase" accent="mint">
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
    </AppShell>
  );
}
