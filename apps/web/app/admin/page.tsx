import { AppShell } from "../../components/AppShell";
import { MetricCard, SectionCard, Tag } from "../../components/Ui";
import { teacherGroups, teacherSubjects } from "../../lib/data";
import { demoAdmin, demoUsage, demoUsers } from "../../lib/demo";

const teachers = [demoUsers.teacher];

export default function AdminPage() {
  return (
    <AppShell
      role="admin"
      title="Coordinacion academica"
      subtitle="Gestiona el uso institucional de AulaAdapt IA con reportes agregados, roles protegidos y visibilidad operativa."
    >
      <div className="metric-grid">
        <MetricCard label="Docentes activos" value={String(teachers.length)} helper="Con actividad reciente en la plataforma" />
        <MetricCard label="Grupos gestionados" value={String(teacherGroups.length)} helper="Configurados para entrega postclase" />
        <MetricCard label="Materias registradas" value={String(teacherSubjects.length)} helper="Listas para generar materiales" />
        <MetricCard label="Aprobacion promedio" value={`${demoUsage.approvedRate}%`} helper="Sin acceder a datos individuales sensibles" />
      </div>

      <div className="dashboard-grid">
        <SectionCard title="Docentes registrados" description="Vista operativa por rol" accent="sky">
          <div className="stack-list" id="docentes">
            {teachers.map((teacher) => (
              <article key={teacher.id} className="list-card">
                <div>
                  <strong>{teacher.name}</strong>
                  <p>{teacher.school}</p>
                </div>
                <Tag>Docente</Tag>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Grupos y materias" description="Configuracion academica disponible">
          <div className="stack-list">
            <div id="grupos" />
            {teacherGroups.map((group) => (
              <article key={group.id} className="list-card compact">
                <strong>{group.name}</strong>
                <p>
                  {group.grade} - {group.shift}
                </p>
              </article>
            ))}
            <div id="materias" />
            {teacherSubjects.map((subject) => (
              <article key={subject.id} className="list-card compact">
                <strong>{subject.name}</strong>
                <p>{subject.area}</p>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Reportes de uso" description="Analitica agregada sin invadir datos sensibles" accent="mint">
        <div className="report-grid" id="reportes">
          {demoAdmin.reportCards.map((card) => (
            <article key={card.title} className="report-card">
              <span>{card.title}</span>
              <strong>{card.value}</strong>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>
      </SectionCard>
    </AppShell>
  );
}
