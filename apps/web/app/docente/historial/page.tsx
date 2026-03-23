import { AppShell } from "../../../components/AppShell";
import { InfoList, SectionCard, Tag } from "../../../components/Ui";
import { recentSessions, teacherGroups, teacherSubjects } from "../../../lib/data";
import { demoTeacher } from "../../../lib/demo";

export default function TeacherHistoryPage() {
  return (
    <AppShell
      role="teacher"
      title="Historial y trazabilidad"
      subtitle="Consulta sesiones anteriores, materiales generados, envíos y acciones de edición con una vista ordenada."
    >
      <div className="dashboard-grid">
        <SectionCard title="Filtros disponibles" description="Explora por materia, grupo, fecha o estado">
          <InfoList items={demoTeacher.historySummary} />
        </SectionCard>
        <SectionCard title="Estados" description="Seguimiento del ciclo de publicación" accent="sky">
          <div className="inline-tags">
            <Tag>Borrador</Tag>
            <Tag>Generado</Tag>
            <Tag>Aprobado</Tag>
            <Tag>Programado</Tag>
            <Tag>Enviado</Tag>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Sesiones registradas" description="Trazabilidad por docente, grupo y materia">
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
    </AppShell>
  );
}
