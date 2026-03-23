import { AppShell } from "../../components/AppShell";
import { MetricCard, SectionCard, Tag } from "../../components/Ui";
import { teacherGroups, teacherSubjects } from "../../lib/data";
import { demoAdmin, demoUsage, demoUsers } from "../../lib/demo";

const teachers = [demoUsers.teacher];

export default function AdminPage() {
  return (
    <AppShell
      role="admin"
      title="Coordinación académica"
      subtitle="Gestiona el uso institucional de AulaAdapt IA con reportes agregados, roles protegidos y visibilidad operativa."
    >
      <div className="metric-grid">
        <MetricCard label="Docentes activos" value={String(teachers.length)} helper="Con actividad reciente en la plataforma" />
        <MetricCard label="Grupos gestionados" value={String(teacherGroups.length)} helper="Configurados para entrega postclase" />
        <MetricCard label="Materias registradas" value={String(teacherSubjects.length)} helper="Listas para generar materiales" />
        <MetricCard label="Aprobación promedio" value={`${demoUsage.approvedRate}%`} helper="Sin acceder a datos individuales sensibles" />
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

        <SectionCard title="Grupos y materias" description="Configuración académica disponible">
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

      <div className="dashboard-grid">
        <SectionCard title="Base de datos de alumnos" description="Consulta y registra información escolar clave" accent="mint">
          <div className="stack-list" id="alumnos">
            {demoAdmin.studentRegistry.map((student) => (
              <article key={student.id} className="list-card">
                <div>
                  <strong>{student.name}</strong>
                  <p>
                    Matrícula: {student.id} · Grupo: {student.group}
                  </p>
                </div>
                <div className="inline-tags">
                  <Tag>{student.support}</Tag>
                  <Tag>{student.tutor}</Tag>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Alta rápida de docentes" description="Formulario para registrar información docente">
          <form className="form-grid">
            {demoAdmin.teacherIntakeFields.map((field) => (
              <label key={field}>
                {field}
                <input type="text" placeholder={`Captura ${field.toLowerCase()}`} />
              </label>
            ))}
            <label className="full-span">
              Observaciones
              <textarea defaultValue="Docente con experiencia en materiales accesibles y seguimiento postclase." />
            </label>
          </form>
          <div className="cta-row">
            <button className="primary-button" type="button">
              Guardar registro docente
            </button>
            <button className="ghost-button" type="button">
              Importar base
            </button>
          </div>
        </SectionCard>
      </div>

      <div className="dashboard-grid">
        <SectionCard title="Carga institucional de base escolar" description="Importa información desde distintos formatos y organiza la escuela por grupos, materias y salones">
          <div className="inline-tags">
            {demoAdmin.importSources.map((source) => (
              <Tag key={source}>{source}</Tag>
            ))}
          </div>
          <div className="stack-list">
            <article className="list-card compact">
              <strong>Campos sugeridos</strong>
              <p>Matrícula, nombre completo, grado, grupo, turno, materias inscritas, correo institucional y estatus activo.</p>
            </article>
            <article className="list-card compact">
              <strong>Observaciones autorizadas</strong>
              <p>La institución puede registrar apoyos pedagógicos, materiales recomendados y notas internas con control de acceso.</p>
            </article>
          </div>
        </SectionCard>

        <SectionCard title="Perfiles de accesibilidad autorizados" description="Apoyos pedagógicos neutrales para personalización postclase" accent="sky">
          <div className="inline-tags" id="perfiles">
            {demoAdmin.accessibilityProfiles.map((profile) => (
              <Tag key={profile}>{profile}</Tag>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Reportes de uso" description="Analítica agregada sin invadir datos sensibles" accent="mint">
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
