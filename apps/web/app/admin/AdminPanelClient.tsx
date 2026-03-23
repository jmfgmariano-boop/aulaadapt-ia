"use client";

import { useState } from "react";
import { AppShell } from "../../components/AppShell";
import { MetricCard, SectionCard, Tag } from "../../components/Ui";

type TeacherDirectoryItem = {
  id: string;
  displayName: string;
  area: string;
  institution: string;
  comment: string;
  roleLabel: string;
  priorityOutput: string;
};

type StudentRegistryItem = {
  id: string;
  name: string;
  semester: string;
  group: string;
  age: string;
  sex: string;
  support: string;
  barrier: string;
  note: string;
};

type AccessibilityContextItem = {
  category: string;
  count: string;
  observedNeed: string;
  suggestedSupport: string;
};

type ReportCardItem = {
  title: string;
  value: string;
  copy: string;
};

type AdminPanelClientProps = {
  teacherDirectory: readonly TeacherDirectoryItem[];
  studentRegistry: readonly StudentRegistryItem[];
  teacherSubjects: readonly { id: string; name: string; area: string }[];
  teacherGroups: readonly { id: string; name: string; grade: string; shift: string }[];
  accessibilityProfiles: readonly string[];
  accessibilityContext: readonly AccessibilityContextItem[];
  importSources: readonly string[];
  reportCards: readonly ReportCardItem[];
};

export function AdminPanelClient({
  teacherDirectory,
  studentRegistry,
  teacherSubjects,
  teacherGroups,
  accessibilityProfiles,
  accessibilityContext,
  importSources,
  reportCards
}: AdminPanelClientProps) {
  const [teachers, setTeachers] = useState(teacherDirectory);
  const [statusMessage, setStatusMessage] = useState(
    "La base institucional está disponible para consulta, importación y alta operativa."
  );
  const [form, setForm] = useState({
    nombreCompleto: "",
    correoInstitucional: "",
    materiaPrincipal: "",
    gruposAsignados: "",
    observaciones:
      "Docente con experiencia en materiales accesibles y seguimiento postclase."
  });

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleSaveTeacher() {
    if (
      !form.nombreCompleto.trim() ||
      !form.correoInstitucional.trim() ||
      !form.materiaPrincipal.trim()
    ) {
      setStatusMessage("Completa nombre, correo institucional y materia principal antes de guardar.");
      return;
    }

    const nextTeacher = {
      id: `D${String(teachers.length + 1).padStart(2, "0")}`,
      displayName: form.nombreCompleto,
      area: form.materiaPrincipal,
      institution: "Preparatoria de la Universidad Autónoma de Guadalajara",
      comment: form.observaciones,
      roleLabel: "Docente",
      priorityOutput: "Resumen + pasos"
    };

    setTeachers((current) => [nextTeacher, ...current]);
    setStatusMessage(
      `Registro docente guardado correctamente para ${form.nombreCompleto}. Ya aparece en la base institucional.`
    );
    setForm({
      nombreCompleto: "",
      correoInstitucional: "",
      materiaPrincipal: "",
      gruposAsignados: "",
      observaciones:
        "Docente con experiencia en materiales accesibles y seguimiento postclase."
    });
  }

  function handleImportBase() {
    document.getElementById("alumnos")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setStatusMessage(
      `Base escolar cargada correctamente con ${studentRegistry.length} alumnos y ${teachers.length} docentes o perfiles institucionales disponibles.`
    );
  }

  return (
    <AppShell
      role="admin"
      title="Coordinación académica"
      subtitle="Gestiona el uso institucional de AulaAdapt IA con reportes agregados, roles protegidos y visibilidad operativa."
    >
      <div className="metric-grid">
        <MetricCard
          label="Docentes y personal"
          value={String(teachers.length)}
          helper="Integrados desde la base aplicada del proyecto"
        />
        <MetricCard
          label="Grupos gestionados"
          value={String(new Set(studentRegistry.map((student) => student.group)).size)}
          helper="Detectados en la base de estudiantes"
        />
        <MetricCard
          label="Materias registradas"
          value={String(teacherSubjects.length)}
          helper="Listas para generar materiales"
        />
        <MetricCard
          label="Alumnos registrados"
          value={String(studentRegistry.length)}
          helper="Sin inventar datos personales no presentes en la base"
        />
      </div>

      <div className="dashboard-grid">
        <SectionCard title="Docentes registrados" description="Vista operativa por rol" accent="sky">
          <div className="stack-list" id="docentes">
            {teachers.map((teacher) => (
              <article key={teacher.id} className="list-card">
                <div>
                  <strong>{teacher.displayName}</strong>
                  <p>
                    {teacher.area} · {teacher.institution}
                  </p>
                  <p>{teacher.comment}</p>
                </div>
                <div className="inline-tags">
                  <Tag>{teacher.roleLabel}</Tag>
                  <Tag>{teacher.priorityOutput}</Tag>
                </div>
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
                  {group.grade} · {group.shift}
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
        <SectionCard
          title="Base de datos de alumnos"
          description="Consulta y registra información escolar clave"
          accent="mint"
        >
          <div className="stack-list" id="alumnos">
            {studentRegistry.map((student) => (
              <article key={student.id} className="list-card">
                <div>
                  <strong>{student.name}</strong>
                  <p>
                    Matrícula: {student.id} · {student.semester} · Grupo: {student.group}
                  </p>
                  <p>{student.barrier}</p>
                  <p>{student.note}</p>
                </div>
                <div className="inline-tags">
                  <Tag>{student.support}</Tag>
                  <Tag>{student.sex}</Tag>
                  <Tag>{student.age} años</Tag>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Alta rápida de docentes"
          description="Formulario para registrar información docente"
        >
          <form className="form-grid">
            <label>
              Nombre completo
              <input
                type="text"
                placeholder="Captura nombre completo"
                value={form.nombreCompleto}
                onChange={(event) => updateField("nombreCompleto", event.target.value)}
              />
            </label>
            <label>
              Correo institucional
              <input
                type="email"
                placeholder="Captura correo institucional"
                value={form.correoInstitucional}
                onChange={(event) => updateField("correoInstitucional", event.target.value)}
              />
            </label>
            <label>
              Materia principal
              <input
                type="text"
                placeholder="Captura materia principal"
                value={form.materiaPrincipal}
                onChange={(event) => updateField("materiaPrincipal", event.target.value)}
              />
            </label>
            <label>
              Grupos asignados
              <input
                type="text"
                placeholder="Captura grupos asignados"
                value={form.gruposAsignados}
                onChange={(event) => updateField("gruposAsignados", event.target.value)}
              />
            </label>
            <label className="full-span">
              Observaciones
              <textarea
                value={form.observaciones}
                onChange={(event) => updateField("observaciones", event.target.value)}
              />
            </label>
          </form>
          <div className="cta-row">
            <button className="primary-button" type="button" onClick={handleSaveTeacher}>
              Guardar registro docente
            </button>
            <button className="ghost-button" type="button" onClick={handleImportBase}>
              Importar base
            </button>
          </div>
          <p className="action-feedback">{statusMessage}</p>
        </SectionCard>
      </div>

      <div className="dashboard-grid">
        <SectionCard
          title="Carga institucional de base escolar"
          description="Importa información desde distintos formatos y organiza la escuela por grupos, materias y salones"
        >
          <div className="inline-tags">
            {importSources.map((source) => (
              <Tag key={source}>{source}</Tag>
            ))}
          </div>
          <div className="stack-list">
            <article className="list-card compact">
              <strong>Campos sugeridos</strong>
              <p>
                Matrícula, nombre completo, grado, grupo, turno, materias inscritas, correo institucional y estatus activo.
              </p>
            </article>
            <article className="list-card compact">
              <strong>Observaciones autorizadas</strong>
              <p>
                La institución puede registrar apoyos pedagógicos, materiales recomendados y notas internas con control de acceso.
              </p>
            </article>
          </div>
        </SectionCard>

        <SectionCard
          title="Perfiles de accesibilidad autorizados"
          description="Apoyos pedagógicos neutrales para personalización postclase"
          accent="sky"
        >
          <div className="inline-tags">
            {accessibilityProfiles.map((profile) => (
              <Tag key={profile}>{profile}</Tag>
            ))}
          </div>
          <div className="stack-list" id="perfiles">
            {accessibilityContext.map((item) => (
              <article key={item.category} className="list-card compact">
                <strong>{item.category}</strong>
                <p>{item.observedNeed}</p>
                <p>Apoyo sugerido: {item.suggestedSupport}</p>
                <div className="inline-tags">
                  <Tag>{item.count} registros agregados</Tag>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Reportes de uso"
        description="Analítica agregada sin invadir datos sensibles"
        accent="mint"
      >
        <div className="report-grid" id="reportes">
          {reportCards.map((card) => (
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
