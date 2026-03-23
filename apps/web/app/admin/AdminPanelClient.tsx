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
  const [students] = useState(studentRegistry);
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [searchStudent, setSearchStudent] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedImportSource, setSelectedImportSource] = useState(importSources[0] ?? "");
  const [selectedProfileId, setSelectedProfileId] = useState(profileRegistry[0]?.studentId ?? "");
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
    profileRegistry.find((item) => item.studentId === selectedProfileId) ?? profileRegistry[0];
  const profileDisabled = disabledProfiles.includes(selectedProfile.studentId);

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
      "Docente D06",
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

    setSelectedFileName(file.name);
    setImportStatus(
      `Archivo ${file.name} recibido. Revisa mapeo, validación y resumen antes de actualizar la base.`
    );
  }

  function handleValidateImport() {
    setImportStatus(
      `Validación completada: ${importSummary.validRows} filas válidas, ${importSummary.errorRows} con observaciones, ${importSummary.newStudents} altas nuevas y ${importSummary.updatedStudents} actualizaciones.`
    );
  }

  function handleImportBase() {
    document
      .getElementById("base-escolar")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setStatusMessage(
      `Importación lista para aplicarse: ${importSummary.newStudents} altas, ${importSummary.updatedStudents} actualizaciones y ${importSummary.inactiveStudents} alumnos marcados como inactivos.`
    );
  }

  function handleProfileSelection(studentId: string) {
    const nextProfile =
      profileRegistry.find((item) => item.studentId === studentId) ?? profileRegistry[0];

    setSelectedProfileId(studentId);
    setSelectedSupports(nextProfile?.activeSupports ?? []);
    setProfileStatus(
      `Perfil pedagógico cargado para ${nextProfile.studentName}. Puedes actualizar apoyos o desactivarlos con permisos restringidos.`
    );
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
        <SectionCard
          title="Importar base escolar"
          description="Carga masiva, mapeo, validación y actualización de registros"
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
              Descargar plantilla modelo
            </button>
            <button className="ghost-button" type="button" onClick={handleValidateImport}>
              Validar datos
            </button>
            <button className="ghost-button" type="button" onClick={handleImportBase}>
              Actualizar base existente
            </button>
          </div>
          <p className="action-feedback">{importStatus}</p>

          <div className="dashboard-grid">
            <article className="list-card compact">
              <strong>Mapeo de columnas</strong>
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
                <p>{importSummary.errorRows} filas con observaciones</p>
                <p>{importSummary.newStudents} altas nuevas</p>
                <p>{importSummary.updatedStudents} actualizaciones</p>
                <p>{importSummary.inactiveStudents} alumnos inactivos</p>
              </div>
            </article>
          </div>

          <div className="stack-list">
              <strong>Vista previa de registros</strong>
            {importPreviewRows.map((row) => (
              <article key={row.matricula} className="list-card compact">
                <div>
                  <strong>
                    {row.nombre} · {row.matricula}
                  </strong>
                  <p>
                    Grupo {row.grupo} · Estatus {row.estatus} · Perfil {row.perfil}
                  </p>
                  <p>
                    Uso interno: {row.condicionInterna} · Prioridad {row.prioridad}
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
          <div className="stack-list" id="docentes">
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
          description="Consulta, filtra y organiza la base general de la escuela"
          accent="mint"
        >
          <div className="form-grid">
            <label>
              Buscar por nombre o matrícula
              <input
                type="text"
                value={searchStudent}
                onChange={(event) => setSearchStudent(event.target.value)}
                placeholder="Ejemplo: E001 o Estudiante E001"
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
          <div className="stack-list">
            {filteredStudents.slice(0, 12).map((student) => (
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
          title="Grupos, salones y materias"
          description="Relación operativa de la base escolar"
        >
          <div className="stack-list">
            {teacherGroups.map((group) => (
              <article key={group.id} className="list-card compact">
                <strong>{group.name}</strong>
                <p>
                  {group.grade} · {group.shift}
                </p>
              </article>
            ))}
            {teacherSubjects.map((subject) => (
              <article key={subject.id} className="list-card compact">
                <strong>{subject.name}</strong>
                <p>{subject.area}</p>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="dashboard-grid" id="perfiles">
        <SectionCard
          title="Perfiles pedagógicos y accesibilidad"
          description="Gestión pedagógica, no clínica, con historial y permisos restringidos"
          accent="sky"
        >
          <div className="inline-tags">
            {accessibilityProfiles.map((profile) => (
              <Tag key={profile}>{profile}</Tag>
            ))}
          </div>
          <div className="dashboard-grid">
            <div className="stack-list">
              {profileRegistry.map((profile) => (
                <article
                  key={profile.studentId}
                  className={`list-card compact ${selectedProfileId === profile.studentId ? "template-card-active" : ""}`}
                >
                  <div>
                    <strong>{profile.studentName}</strong>
                    <p>
                      Perfil actual: {profile.currentProfile} · Última actualización:{" "}
                      {profile.updatedAt}
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
                Perfil actual: {selectedProfile.currentProfile} · Registró:{" "}
                {selectedProfile.registeredBy}
              </p>
              <p>
                Fecha de alta: {selectedProfile.createdAt} · Última modificación:{" "}
                {selectedProfile.updatedAt}
              </p>
              <div className="dashboard-grid">
                <article className="list-card compact">
                  <strong>Información sensible autorizada</strong>
                  <p>{selectedProfile.conditionRecord}</p>
                  <p>{selectedProfile.diagnosisRecord}</p>
                  <p>
                    Prioridad educativa: {selectedProfile.priorityLevel} · Responsable:{" "}
                    {selectedProfile.responsibleArea}
                  </p>
                  <div className="inline-tags">
                    {selectedProfile.visibility.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </article>
                <article className="list-card compact">
                  <strong>Traducción pedagógica para operación docente</strong>
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
                  <strong>Apoyos sugeridos por el área autorizada</strong>
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
          description="Necesidades observadas y apoyos sugeridos por la investigación"
          accent="mint"
        >
          <div className="stack-list">
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
            <article className="list-card compact">
              <strong>Categorías internas autorizadas</strong>
              <p>
                Solo visibles para administración, orientación y roles autorizados.
                Nunca se muestran como etiqueta diagnóstica al estudiante.
              </p>
              <div className="inline-tags">
                {sensitiveCategoryExamples.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </article>
          </div>
        </SectionCard>
      </div>

      <div className="dashboard-grid">
        <SectionCard
          title="Reportes y analítica"
          description="Lectura agregada por fecha, grupo, materia, docente y tipo de apoyo"
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
          title="Integraciones futuras"
          description="Ruta de crecimiento para la operación institucional"
          accent="sky"
        >
          <div className="stack-list">
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

      <div className="dashboard-grid" id="privacidad">
        <SectionCard
          title="Privacidad y control de acceso"
          description="Quién puede ver, editar y auditar cada módulo"
          accent="mint"
        >
          <div className="stack-list">
            {permissions.map((permission) => (
              <article key={permission.module} className="list-card">
                <strong>{permission.module}</strong>
                <p>Administración: {permission.admin}</p>
                <p>Docente: {permission.teacher}</p>
                <p>Estudiante: {permission.student}</p>
              </article>
            ))}
            <article className="list-card compact">
              <strong>Principio de privacidad aplicada</strong>
              <p>
                La plataforma puede resguardar diagnósticos previos o condiciones
                identificadas, pero los convierte en apoyos pedagógicos concretos
                antes de la operación docente y la entrega al estudiante.
              </p>
            </article>
          </div>
        </SectionCard>

        <SectionCard
          title="Bitácora de acciones"
          description="Trazabilidad institucional y cambios sensibles"
        >
          <div className="stack-list">
            {auditLog.map((entry) => (
              <article key={`${entry.timestamp}-${entry.action}`} className="list-card">
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
    </AppShell>
  );
}
