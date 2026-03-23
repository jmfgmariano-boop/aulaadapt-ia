"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { AppShell } from "../../components/AppShell";
import { AppIcon, InfoList, MetricCard, SectionCard, Tag } from "../../components/Ui";

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

type ImportPreviewRow = {
  matricula: string;
  nombre: string;
  grupo: string;
  estatus: string;
  perfil: string;
  condicionInterna: string;
  prioridad: string;
  permisos: string;
  validacion: string;
};

type ProfileRegistryItem = {
  studentId: string;
  studentName: string;
  currentProfile: string;
  activeSupports: string[];
  conditionRecord: string;
  diagnosisRecord: string;
  pedagogicalObservations: string;
  suggestedSupports: string[];
  recommendedAdaptations: string[];
  priorityLevel: string;
  visibility: string[];
  responsibleArea: string;
  teacherView: {
    recommendedSupports: string[];
    suggestedMaterial: string;
    practicalRecommendations: string[];
  };
  createdAt: string;
  updatedAt: string;
  registeredBy: string;
  history: string[];
};

type AuditLogItem = {
  timestamp: string;
  actor: string;
  action: string;
  module: string;
  detail: string;
};

type PermissionItem = {
  module: string;
  admin: string;
  teacher: string;
  student: string;
};

type AnalyticsItem = {
  label: string;
  value: number;
};

type IntegrationItem = {
  title: string;
  status: string;
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
  importTemplateHeaders: readonly string[];
  importPreviewRows: readonly ImportPreviewRow[];
  importSummary: {
    validRows: number;
    errorRows: number;
    newStudents: number;
    updatedStudents: number;
    inactiveStudents: number;
  };
  profileRegistry: readonly ProfileRegistryItem[];
  auditLog: readonly AuditLogItem[];
  permissions: readonly PermissionItem[];
  analytics: {
    filters: readonly string[];
    metrics: readonly { label: string; value: string; helper: string }[];
    usageBySubject: readonly AnalyticsItem[];
    usageByAdaptation: readonly AnalyticsItem[];
    trend: readonly { period: string; value: number }[];
  };
  integrations: readonly IntegrationItem[];
  sensitiveCategoryExamples: readonly string[];
};

type AdminSectionKey =
  | "summary"
  | "school"
  | "profiles"
  | "reports"
  | "privacy"
  | "integrations";

export function AdminPanelClient({
  teacherDirectory,
  studentRegistry,
  teacherSubjects,
  teacherGroups,
  accessibilityProfiles,
  accessibilityContext,
  importSources,
  reportCards,
  importTemplateHeaders,
  importPreviewRows,
  importSummary,
  profileRegistry,
  auditLog,
  permissions,
  analytics,
  integrations,
  sensitiveCategoryExamples
}: AdminPanelClientProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [teachers, setTeachers] = useState(teacherDirectory);
  const [students, setStudents] = useState(studentRegistry);
  const [profiles, setProfiles] = useState(profileRegistry);
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [searchStudent, setSearchStudent] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedImportSource, setSelectedImportSource] = useState(importSources[0] ?? "");
  const [activeSection, setActiveSection] = useState<AdminSectionKey>("summary");
  const [selectedProfileId, setSelectedProfileId] = useState(profileRegistry[0]?.studentId ?? "");
  const [selectedStudentId, setSelectedStudentId] = useState(
    profileRegistry[0]?.studentId ?? studentRegistry[0]?.id ?? ""
  );
  const [disabledProfiles, setDisabledProfiles] = useState<string[]>([]);
  const [selectedSupports, setSelectedSupports] = useState<string[]>(
    profileRegistry[0]?.activeSupports ?? []
  );
  const [statusMessage, setStatusMessage] = useState(
    "La base institucional está disponible para consulta, importación, validación y trazabilidad."
  );
  const [importStatus, setImportStatus] = useState(
    "Carga un archivo Excel o CSV, revisa el mapeo y valida antes de actualizar la base escolar."
  );
  const [profileStatus, setProfileStatus] = useState(
    "Selecciona un alumno para revisar apoyos activos, historial y permisos de edición."
  );
  const [form, setForm] = useState({
    nombreCompleto: "",
    correoInstitucional: "",
    materiaPrincipal: "",
    gruposAsignados: "",
    observaciones:
      "Docente con experiencia en materiales accesibles y seguimiento postclase."
  });
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>(
    Object.fromEntries(importTemplateHeaders.map((header) => [header, header]))
  );

  const groupOptions = useMemo(
    () => ["all", ...Array.from(new Set(students.map((student) => student.group)))],
    [students]
  );

  const filteredStudents = useMemo(() => {
    const normalizedQuery = searchStudent.trim().toLowerCase();

    return students.filter((student) => {
      const matchesGroup = selectedGroup === "all" || student.group === selectedGroup;
      const matchesSearch =
        !normalizedQuery ||
        student.name.toLowerCase().includes(normalizedQuery) ||
        student.id.toLowerCase().includes(normalizedQuery);

      return matchesGroup && matchesSearch;
    });
  }, [searchStudent, selectedGroup, students]);

  const selectedProfile =
    profiles.find((item) => item.studentId === selectedProfileId) ?? profiles[0];
  const selectedStudent =
    students.find((item) => item.id === selectedStudentId) ?? students[0];
  const selectedStudentProfile =
    profiles.find((item) => item.studentId === selectedStudentId) ?? null;
  const profileDisabled = disabledProfiles.includes(selectedProfile.studentId);

  function openSection(section: AdminSectionKey) {
    setActiveSection(section);
  }

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
      setStatusMessage(
        "Completa nombre, correo institucional y materia principal antes de guardar."
      );
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
      `Registro docente guardado correctamente para ${form.nombreCompleto}.`
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

  function handleDownloadTemplate() {
    const csvContent = `${importTemplateHeaders.join(",")}\n${[
      "E999",
      "Nombre del alumno",
      "5",
      "5A",
      "Matutino",
      "\"Biología;Historia\"",
      "Mariana Torres Villaseñor",
      "alumno@prepauag.edu.mx",
      "Activo",
      "Atención sostenida",
      "Registro previo institucional",
      "Observación pedagógica autorizada",
      "Lenguaje simplificado",
      "\"Pasos numerados;Recordatorios claros\"",
      "\"Repaso breve;Apoyo visual\"",
      "Media",
      "Coordinación académica",
      "2026-03-22"
    ].join(",")}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.download = "plantilla-base-escolar-aulaadapt.csv";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1200);
    setImportStatus("Plantilla modelo descargada correctamente para carga masiva.");
  }

  function handleFilePick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(file: File | null) {
    if (!file) {
      return;
    }

    const allowed = [".csv", ".xlsx", ".xls"];
    const normalized = file.name.toLowerCase();

    if (!allowed.some((extension) => normalized.endsWith(extension))) {
      setImportStatus(
        "Selecciona un archivo Excel o CSV válido antes de continuar con la validación."
      );
      return;
    }

    setSelectedFileName(file.name);
    setImportStatus(
      `Archivo ${file.name} recibido. Revisa mapeo, validación y resumen antes de actualizar la base.`
    );
  }

  function handleValidateImport() {
    if (!selectedFileName) {
      setImportStatus(
        "Selecciona primero un archivo Excel o CSV para ejecutar la validación de la base escolar."
      );
      return;
    }

    setImportStatus(
      `Validación completada: ${importSummary.validRows} filas válidas, ${importSummary.errorRows} con observaciones, ${importSummary.newStudents} altas nuevas y ${importSummary.updatedStudents} actualizaciones.`
    );
  }

  function handleImportBase() {
    if (!selectedFileName) {
      setImportStatus(
        "Selecciona primero un archivo antes de actualizar la base escolar."
      );
      return;
    }

    setStudents((current) =>
      current.map((student) => {
        const imported = importPreviewRows.find((row) => row.matricula === student.id);

        if (!imported) {
          return student;
        }

        return {
          ...student,
          support: imported.perfil,
          note:
            imported.validacion === "Actualizar estatus"
              ? `${student.note} · Registro listo para actualización de estatus.`
              : `${student.note} · Base escolar actualizada correctamente.`
        };
      })
    );

    setActiveSection("school");
    setStatusMessage(
      `Importación lista para aplicarse: ${importSummary.newStudents} altas, ${importSummary.updatedStudents} actualizaciones y ${importSummary.inactiveStudents} alumnos marcados como inactivos.`
    );
  }

  function handleProfileSelection(studentId: string) {
    const nextProfile =
      profiles.find((item) => item.studentId === studentId) ?? profiles[0];

    setSelectedProfileId(studentId);
    setSelectedSupports(nextProfile?.activeSupports ?? []);
    setProfileStatus(
      `Perfil pedagógico cargado para ${nextProfile.studentName}. Puedes actualizar apoyos o desactivarlos con permisos restringidos.`
    );
  }

  function handleSelectStudent(studentId: string) {
    setSelectedStudentId(studentId);

    const linkedProfile =
      profiles.find((item) => item.studentId === studentId) ?? null;

    if (linkedProfile) {
      setSelectedProfileId(linkedProfile.studentId);
      setSelectedSupports(linkedProfile.activeSupports);
      setProfileStatus(
        `Se abrió el perfil individual de ${linkedProfile.studentName} con apoyos, permisos y trazabilidad institucional.`
      );
    } else {
      setProfileStatus(
        `Se abrió el expediente académico de ${studentId}. No hay un perfil sensible activo en este momento.`
      );
    }
  }

  function handleToggleSupport(support: string) {
    setSelectedSupports((current) =>
      current.includes(support)
        ? current.filter((item) => item !== support)
        : [...current, support]
    );
    setProfileStatus(
      "Apoyos pedagógicos actualizados localmente. Confirma para registrar el cambio en bitácora."
    );
  }

  function handleSaveProfile() {
    setProfiles((current) =>
      current.map((profile) =>
        profile.studentId === selectedProfile.studentId
          ? {
              ...profile,
              activeSupports: selectedSupports,
              updatedAt: "23 mar 2026",
              history: [
                "23 mar 2026 · Ajuste guardado desde coordinación académica",
                ...profile.history
              ]
            }
          : profile
      )
    );
    setProfileStatus(
      `Perfil pedagógico guardado para ${selectedProfile.studentName}. Última modificación registrada por coordinación académica.`
    );
  }

  function handleToggleDeactivateProfile() {
    setDisabledProfiles((current) => {
      const next = current.includes(selectedProfile.studentId)
        ? current.filter((item) => item !== selectedProfile.studentId)
        : [...current, selectedProfile.studentId];

      setProfileStatus(
        next.includes(selectedProfile.studentId)
          ? `El perfil de ${selectedProfile.studentName} se marcó como inactivo para futuras entregas adaptadas.`
          : `El perfil de ${selectedProfile.studentName} volvió a estado activo.`
      );

      return next;
    });
  }

  return (
    <AppShell
      role="admin"
      title="Coordinación académica"
      subtitle="Gestiona base escolar, perfiles pedagógicos, permisos, reportes e integraciones con una vista institucional clara."
    >
      <div className="workspace-strip">
        <button
          className={`workspace-chip ${activeSection === "summary" ? "active" : ""}`}
          type="button"
          onClick={() => openSection("summary")}
        >
          Resumen
        </button>
        <button
          className={`workspace-chip ${activeSection === "school" ? "active" : ""}`}
          type="button"
          onClick={() => openSection("school")}
        >
          Base escolar
        </button>
        <button
          className={`workspace-chip ${activeSection === "profiles" ? "active" : ""}`}
          type="button"
          onClick={() => openSection("profiles")}
        >
          Perfiles
        </button>
        <button
          className={`workspace-chip ${activeSection === "reports" ? "active" : ""}`}
          type="button"
          onClick={() => openSection("reports")}
        >
          Reportes
        </button>
        <button
          className={`workspace-chip ${activeSection === "privacy" ? "active" : ""}`}
          type="button"
          onClick={() => openSection("privacy")}
        >
          Privacidad
        </button>
        <button
          className={`workspace-chip ${activeSection === "integrations" ? "active" : ""}`}
          type="button"
          onClick={() => openSection("integrations")}
        >
          Integraciones
        </button>
      </div>

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
          helper="Disponibles para operación institucional y consulta escolar"
        />
      </div>
      {activeSection === "summary" ? (
        <div className="dashboard-main-grid">
          <SectionCard title="Resumen institucional" description="Lo prioritario para operar hoy">
            <div className="section-stack">
              <section className="section-block">
                <div className="section-block-header">
                  <strong>Indicadores clave</strong>
                  <span className="status-pill">
                    <AppIcon name="report" size={14} />
                    Vista ejecutiva
                  </span>
                </div>
                <div className="report-grid">
                  {reportCards.slice(0, 3).map((card) => (
                    <article key={card.title} className="report-card compact">
                      <span>{card.title}</span>
                      <strong>{card.value}</strong>
                      <p>{card.copy}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="section-block">
                <div className="section-block-header">
                  <strong>Estado de la base</strong>
                </div>
                <div className="stack-list compact-stack">
                  <article className="list-card compact">
                    <strong>Importación más reciente</strong>
                    <p>
                      {importSummary.validRows} filas válidas · {importSummary.errorRows} con observaciones
                    </p>
                  </article>
                  <article className="list-card compact">
                    <strong>Perfiles activos</strong>
                    <p>{profiles.length - disabledProfiles.length} perfiles pedagógicos en operación.</p>
                  </article>
                  <article className="list-card compact">
                    <strong>Último movimiento sensible</strong>
                    <p>{auditLog[0]?.detail}</p>
                  </article>
                </div>
              </section>
            </div>
          </SectionCard>

          <div className="dashboard-aside-stack">
            <SectionCard title="Acciones rápidas" description="Abre cada módulo sin recorrer toda la página" accent="sky">
              <div className="stack-list compact-stack">
                <button className="utility-card" type="button" onClick={() => openSection("school")}>
                  <span className="icon-badge">
                    <AppIcon name="database" />
                  </span>
                  <div>
                    <strong>Base escolar</strong>
                    <p>Importación, alumnos y grupos.</p>
                  </div>
                </button>
                <button className="utility-card" type="button" onClick={() => openSection("profiles")}>
                  <span className="icon-badge">
                    <AppIcon name="users" />
                  </span>
                  <div>
                    <strong>Perfiles pedagógicos</strong>
                    <p>Apoyos, visibilidad e historial.</p>
                  </div>
                </button>
                <button className="utility-card" type="button" onClick={() => openSection("privacy")}>
                  <span className="icon-badge">
                    <AppIcon name="lock" />
                  </span>
                  <div>
                    <strong>Privacidad y bitácora</strong>
                    <p>Permisos y trazabilidad.</p>
                  </div>
                </button>
              </div>
            </SectionCard>

            <SectionCard title="Docentes recientes" description="Altas y directorio operativo" accent="mint">
              <div className="stack-list compact-stack">
                {teachers.slice(0, 4).map((teacher) => (
                  <article key={teacher.id} className="list-card compact">
                    <strong>{teacher.displayName}</strong>
                    <p>{teacher.area}</p>
                  </article>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      ) : null}

      {activeSection === "school" ? (
        <>
          <div className="dashboard-grid">
            <SectionCard
              title="Importar base escolar"
              description="Carga, mapeo y validación"
              accent="sky"
            >
              <div className="inline-tags">
                {importSources.map((source) => (
                  <Tag key={source}>{source}</Tag>
                ))}
              </div>
              <div className="form-grid">
                <label>
                  Fuente de importación
                  <select
                    value={selectedImportSource}
                    onChange={(event) => setSelectedImportSource(event.target.value)}
                  >
                    {importSources.map((source) => (
                      <option key={source}>{source}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Archivo seleccionado
                  <input
                    type="text"
                    value={selectedFileName || "Sin archivo seleccionado"}
                    readOnly
                  />
                </label>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                hidden
                onChange={(event) =>
                  handleFileChange(event.target.files?.[0] || null)
                }
              />
              <div className="cta-row">
                <button className="primary-button" type="button" onClick={handleFilePick}>
                  <AppIcon name="database" size={16} />
                  Cargar archivo
                </button>
                <button className="ghost-button" type="button" onClick={handleDownloadTemplate}>
                  Descargar plantilla
                </button>
                <button className="ghost-button" type="button" onClick={handleValidateImport}>
                  Validar
                </button>
                <button className="ghost-button" type="button" onClick={handleImportBase}>
                  Actualizar base
                </button>
              </div>
              <p className="action-feedback">{importStatus}</p>

              <div className="dashboard-grid">
                <article className="list-card compact">
                  <strong>Mapeo visible</strong>
                  <div className="stack-list compact-stack">
                    {importTemplateHeaders.slice(0, 6).map((header) => (
                      <label key={header}>
                        {header}
                        <select
                          value={columnMapping[header]}
                          onChange={(event) =>
                            setColumnMapping((current) => ({
                              ...current,
                              [header]: event.target.value
                            }))
                          }
                        >
                          {importTemplateHeaders.map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </select>
                      </label>
                    ))}
                  </div>
                </article>
                <article className="list-card compact">
                  <strong>Resumen de validación</strong>
                  <div className="stack-list compact-stack">
                    <p>{importSummary.validRows} filas válidas</p>
                    <p>{importSummary.errorRows} con observaciones</p>
                    <p>{importSummary.newStudents} altas</p>
                    <p>{importSummary.updatedStudents} actualizaciones</p>
                    <p>{importSummary.inactiveStudents} inactivos</p>
                  </div>
                </article>
              </div>

              <div className="stack-list compact-stack">
                <strong>Vista previa</strong>
                {importPreviewRows.map((row) => (
                  <article key={row.matricula} className="list-card compact">
                    <div>
                      <strong>
                        {row.nombre} · {row.matricula}
                      </strong>
                      <p>
                        Grupo {row.grupo} · {row.estatus} · {row.perfil}
                      </p>
                    </div>
                    <div className="inline-tags">
                      <Tag>{row.validacion}</Tag>
                      <Tag>{row.permisos}</Tag>
                    </div>
                  </article>
                ))}
              </div>
            </SectionCard>

            <SectionCard
              title="Alta rápida de docentes"
              description="Registro inmediato para operación escolar"
            >
              <form className="form-grid" onSubmit={(event) => event.preventDefault()}>
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
                    onChange={(event) =>
                      updateField("correoInstitucional", event.target.value)
                    }
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
              </div>
              <p className="action-feedback">{statusMessage}</p>
              <div className="stack-list compact-stack" id="docentes">
                {teachers.slice(0, 4).map((teacher) => (
                  <article key={teacher.id} className="list-card compact">
                    <strong>{teacher.displayName}</strong>
                    <p>
                      {teacher.area} · {teacher.institution}
                    </p>
                  </article>
                ))}
              </div>
            </SectionCard>
          </div>

          <div className="dashboard-grid" id="base-escolar">
            <SectionCard
              title="Base de datos de alumnos"
              description="Consulta y organiza la base general"
              accent="mint"
            >
              <div className="form-grid">
                <label>
                  Buscar por nombre o matrícula
                  <input
                    type="text"
                    value={searchStudent}
                    onChange={(event) => setSearchStudent(event.target.value)}
                    placeholder="Ejemplo: E001 o Andrea López Ramírez"
                  />
                </label>
                <label>
                  Filtrar por grupo
                  <select
                    value={selectedGroup}
                    onChange={(event) => setSelectedGroup(event.target.value)}
                  >
                    {groupOptions.map((group) => (
                      <option key={group} value={group}>
                        {group === "all" ? "Todos los grupos" : group}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="stack-list compact-stack">
                {filteredStudents.slice(0, 10).map((student) => (
                  <article
                    key={student.id}
                    className={`list-card compact ${selectedStudentId === student.id ? "template-card-active" : ""}`}
                  >
                    <div>
                      <strong>{student.name}</strong>
                      <p>
                        Matrícula: {student.id} · {student.semester} · Grupo: {student.group}
                      </p>
                    </div>
                    <div className="inline-tags">
                      <Tag>{student.support}</Tag>
                      <Tag>{student.sex}</Tag>
                      <Tag>{student.age} años</Tag>
                      <button
                        className="ghost-button"
                        type="button"
                        onClick={() => handleSelectStudent(student.id)}
                      >
                        Ver perfil individual
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <article className="student-profile-inspector">
                <div className="student-profile-head">
                  <div>
                    <span className="hero-kicker">Perfil individual del alumno</span>
                    <h3>{selectedStudent?.name ?? "Sin selección"}</h3>
                    <p>
                      Matrícula {selectedStudent?.id} · {selectedStudent?.semester} · Grupo{" "}
                      {selectedStudent?.group}
                    </p>
                  </div>
                  <div className="inline-tags">
                    <Tag>{selectedStudent?.support ?? "Sin apoyo adicional"}</Tag>
                    <Tag>
                      {selectedStudentProfile
                        ? selectedStudentProfile.priorityLevel
                        : "Seguimiento general"}
                    </Tag>
                  </div>
                </div>

                <div className="student-profile-grid">
                  <article className="list-card compact">
                    <strong>Datos escolares visibles</strong>
                    <p>{selectedStudent?.barrier}</p>
                    <p>{selectedStudent?.note}</p>
                    <p>
                      Edad {selectedStudent?.age} · Sexo {selectedStudent?.sex}
                    </p>
                  </article>

                  <article className="list-card compact">
                    <strong>Apoyos visibles para docente</strong>
                    {selectedStudentProfile ? (
                      <>
                        <p>Salida sugerida: {selectedStudentProfile.teacherView.suggestedMaterial}</p>
                        <div className="inline-tags">
                          {selectedStudentProfile.teacherView.recommendedSupports.map((item) => (
                            <Tag key={item}>{item}</Tag>
                          ))}
                        </div>
                      </>
                    ) : (
                      <p>Solo material base y apoyos generales del grupo.</p>
                    )}
                  </article>

                  <article className="list-card compact sensitive-card">
                    <strong>Registro interno autorizado</strong>
                    {selectedStudentProfile ? (
                      <>
                        <p>{selectedStudentProfile.conditionRecord}</p>
                        <p>{selectedStudentProfile.diagnosisRecord}</p>
                        <div className="inline-tags">
                          {selectedStudentProfile.visibility.map((item) => (
                            <Tag key={item}>{item}</Tag>
                          ))}
                        </div>
                      </>
                    ) : (
                      <p>No existe un registro sensible activo para este alumno.</p>
                    )}
                  </article>

                  <article className="list-card compact">
                    <strong>Bitácora breve</strong>
                    {selectedStudentProfile ? (
                      <InfoList items={selectedStudentProfile.history} />
                    ) : (
                      <p>Sin movimientos sensibles registrados.</p>
                    )}
                  </article>
                </div>

                <div className="cta-row">
                  <button
                    className="primary-button"
                    type="button"
                    onClick={() =>
                      selectedStudentProfile
                        ? (handleProfileSelection(selectedStudentProfile.studentId), openSection("profiles"))
                        : setProfileStatus(
                            `No existe un perfil sensible activo para ${selectedStudent?.name}.`
                          )
                    }
                  >
                    Abrir perfil pedagógico
                  </button>
                  <button
                    className="ghost-button"
                    type="button"
                    onClick={() => openSection("privacy")}
                  >
                    Ver bitácora y permisos
                  </button>
                  {selectedStudentProfile ? (
                    <button
                      className="ghost-button"
                      type="button"
                      onClick={handleToggleDeactivateProfile}
                    >
                      {disabledProfiles.includes(selectedStudentProfile.studentId)
                        ? "Reactivar apoyos"
                        : "Desactivar apoyos"}
                    </button>
                  ) : null}
                </div>
              </article>
            </SectionCard>

            <SectionCard
              title="Grupos, salones y materias"
              description="Relación operativa de la base escolar"
            >
              <div className="section-stack">
                <section className="section-block">
                  <div className="section-block-header">
                    <strong>Grupos y salones</strong>
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
                <section className="section-block">
                  <div className="section-block-header">
                    <strong>Materias</strong>
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
              </div>
            </SectionCard>
          </div>
        </>
      ) : null}

      {activeSection === "profiles" ? (
        <div className="dashboard-grid" id="perfiles">
          <SectionCard
            title="Perfiles pedagógicos y accesibilidad"
            description="Gestión pedagógica con historial y permisos restringidos"
            accent="sky"
          >
            <div className="inline-tags">
              {accessibilityProfiles.map((profile) => (
                <Tag key={profile}>{profile}</Tag>
              ))}
            </div>
            <div className="dashboard-grid">
              <div className="stack-list compact-stack">
                {profiles.map((profile) => (
                  <article
                    key={profile.studentId}
                    className={`list-card compact ${selectedProfileId === profile.studentId ? "template-card-active" : ""}`}
                  >
                    <div>
                      <strong>{profile.studentName}</strong>
                      <p>
                        {profile.currentProfile} · {profile.updatedAt}
                      </p>
                    </div>
                    <div className="cta-row">
                      <button
                        className="ghost-button"
                        type="button"
                        onClick={() => handleProfileSelection(profile.studentId)}
                      >
                        Ver detalle
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              <article className="list-card">
                <strong>{selectedProfile.studentName}</strong>
                <p>
                  {selectedProfile.currentProfile} · Registró: {selectedProfile.registeredBy}
                </p>
                <p>
                  Alta: {selectedProfile.createdAt} · Última modificación: {selectedProfile.updatedAt}
                </p>
                <div className="dashboard-grid">
                  <article className="list-card compact">
                    <strong>Registro autorizado</strong>
                    <p>{selectedProfile.conditionRecord}</p>
                    <p>{selectedProfile.diagnosisRecord}</p>
                    <p>
                      Prioridad: {selectedProfile.priorityLevel} · Responsable: {selectedProfile.responsibleArea}
                    </p>
                    <div className="inline-tags">
                      {selectedProfile.visibility.map((item) => (
                        <Tag key={item}>{item}</Tag>
                      ))}
                    </div>
                  </article>
                  <article className="list-card compact">
                    <strong>Vista docente</strong>
                    <p>{selectedProfile.pedagogicalObservations}</p>
                    <p>Salida sugerida: {selectedProfile.teacherView.suggestedMaterial}</p>
                    <div className="inline-tags">
                      {selectedProfile.teacherView.recommendedSupports.map((item) => (
                        <Tag key={item}>{item}</Tag>
                      ))}
                    </div>
                  </article>
                </div>
                <div className="inline-tags">
                  {selectedSupports.map((support) => (
                    <button
                      key={support}
                      className="ghost-button"
                      type="button"
                      onClick={() => handleToggleSupport(support)}
                    >
                      {support}
                    </button>
                  ))}
                </div>
                <div className="stack-list compact-stack">
                  <article className="list-card compact">
                    <strong>Apoyos sugeridos</strong>
                    <p>{selectedProfile.suggestedSupports.join(" · ")}</p>
                  </article>
                  <article className="list-card compact">
                    <strong>Adaptaciones recomendadas</strong>
                    <p>{selectedProfile.recommendedAdaptations.join(" · ")}</p>
                  </article>
                  <article className="list-card compact">
                    <strong>Qué verá el docente</strong>
                    <InfoList items={selectedProfile.teacherView.practicalRecommendations} />
                  </article>
                </div>
                <div className="stack-list compact-stack">
                  {accessibilityProfiles.slice(0, 6).map((support) => (
                    <button
                      key={support}
                      className="ghost-button"
                      type="button"
                      onClick={() => handleToggleSupport(support)}
                    >
                      {selectedSupports.includes(support) ? `Quitar ${support}` : `Agregar ${support}`}
                    </button>
                  ))}
                </div>
                <div className="cta-row">
                  <button className="primary-button" type="button" onClick={handleSaveProfile}>
                    Guardar cambios
                  </button>
                  <button
                    className="ghost-button"
                    type="button"
                    onClick={handleToggleDeactivateProfile}
                  >
                    {profileDisabled ? "Reactivar perfil" : "Desactivar perfil"}
                  </button>
                </div>
                <p className="action-feedback">{profileStatus}</p>
                <div className="stack-list compact-stack">
                  {selectedProfile.history.map((item) => (
                    <article key={item} className="list-card compact">
                      <p>{item}</p>
                    </article>
                  ))}
                </div>
              </article>
            </div>
          </SectionCard>

          <SectionCard
            title="Contexto agregado de accesibilidad"
            description="Necesidades observadas y apoyos sugeridos"
            accent="mint"
          >
            <div className="stack-list compact-stack">
              {accessibilityContext.map((item) => (
                <article key={item.category} className="list-card compact">
                  <strong>{item.category}</strong>
                  <p>{item.observedNeed}</p>
                  <p>Apoyo sugerido: {item.suggestedSupport}</p>
                  <div className="inline-tags">
                    <Tag>{item.count} registros</Tag>
                  </div>
                </article>
              ))}
              <article className="list-card compact">
                <strong>Categorías internas autorizadas</strong>
                <div className="inline-tags">
                  {sensitiveCategoryExamples.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </article>
            </div>
          </SectionCard>
        </div>
      ) : null}

      {activeSection === "reports" ? (
        <div className="dashboard-grid">
          <SectionCard
            title="Reportes y analítica"
            description="Lectura agregada por fecha, grupo, materia y apoyo"
          >
            <div className="report-grid">
              {reportCards.map((card) => (
                <article key={card.title} className="report-card">
                  <span>{card.title}</span>
                  <strong>{card.value}</strong>
                  <p>{card.copy}</p>
                </article>
              ))}
            </div>
            <div className="inline-tags">
              {analytics.filters.map((filter) => (
                <Tag key={filter}>{filter}</Tag>
              ))}
            </div>
            <div className="cta-row">
              <Link className="primary-button" href="/admin/reportes">
                Ver reportes completos
              </Link>
            </div>
          </SectionCard>

          <SectionCard
            title="Lectura rápida"
            description="Tendencias y distribución"
            accent="sky"
          >
            <div className="section-stack">
              <section className="section-block">
                <div className="section-block-header">
                  <strong>Por materia</strong>
                </div>
                <div className="stack-list compact-stack">
                  {analytics.usageBySubject.slice(0, 4).map((item) => (
                    <article key={item.label} className="list-card compact">
                      <strong>{item.label}</strong>
                      <p>{item.value} materiales</p>
                    </article>
                  ))}
                </div>
              </section>
              <section className="section-block">
                <div className="section-block-header">
                  <strong>Adaptaciones más usadas</strong>
                </div>
                <div className="stack-list compact-stack">
                  {analytics.usageByAdaptation.slice(0, 4).map((item) => (
                    <article key={item.label} className="list-card compact">
                      <strong>{item.label}</strong>
                      <p>{item.value} usos</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </SectionCard>
        </div>
      ) : null}

      {activeSection === "privacy" ? (
        <div className="dashboard-grid" id="privacidad">
          <SectionCard
            title="Privacidad y control de acceso"
            description="Quién puede ver, editar y auditar cada módulo"
            accent="mint"
          >
            <div className="stack-list compact-stack">
              {permissions.map((permission) => (
                <article key={permission.module} className="list-card compact">
                  <strong>{permission.module}</strong>
                  <p>Administración: {permission.admin}</p>
                  <p>Docente: {permission.teacher}</p>
                  <p>Alumnado destinatario: {permission.student}</p>
                </article>
              ))}
              <article className="list-card compact">
                <strong>Principio de privacidad aplicada</strong>
                <p>La información sensible se traduce en apoyos pedagógicos concretos antes de la operación docente.</p>
              </article>
            </div>
          </SectionCard>

          <SectionCard
            title="Bitácora de acciones"
            description="Cambios sensibles y trazabilidad institucional"
          >
            <div className="stack-list compact-stack">
              {auditLog.map((entry) => (
                <article key={`${entry.timestamp}-${entry.action}`} className="list-card compact">
                  <strong>{entry.action}</strong>
                  <p>
                    {entry.timestamp} · {entry.actor}
                  </p>
                  <p>{entry.module}</p>
                  <p>{entry.detail}</p>
                </article>
              ))}
            </div>
          </SectionCard>
        </div>
      ) : null}

      {activeSection === "integrations" ? (
        <div className="dashboard-grid">
          <SectionCard
            title="Integraciones futuras"
            description="Ruta de crecimiento institucional"
            accent="sky"
          >
            <div className="stack-list compact-stack">
              {integrations.map((integration) => (
                <article key={integration.title} className="list-card compact">
                  <strong>{integration.title}</strong>
                  <p>{integration.copy}</p>
                  <div className="inline-tags">
                    <Tag>{integration.status}</Tag>
                  </div>
                </article>
              ))}
            </div>
            <div className="cta-row">
              <Link className="ghost-button" href="/integraciones">
                Abrir ruta de integraciones
              </Link>
            </div>
          </SectionCard>
        </div>
      ) : null}
    </AppShell>
  );
}
