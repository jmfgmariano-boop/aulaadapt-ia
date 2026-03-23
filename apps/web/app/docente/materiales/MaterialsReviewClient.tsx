"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { GeneratedMaterial, Group } from "@aulaadapt/domain";
import { AppShell } from "../../../components/AppShell";
import { AppIcon, InfoList, SectionCard, Tag } from "../../../components/Ui";
import { demoTeacher } from "../../../lib/demo";

type MaterialsReviewClientProps = {
  material: GeneratedMaterial;
  teacherGroups: Group[];
};

export function MaterialsReviewClient({
  material,
  teacherGroups
}: MaterialsReviewClientProps) {
  const summaryRef = useRef<HTMLTextAreaElement | null>(null);
  const [summary, setSummary] = useState(material.summary);
  const [simplifiedVersion, setSimplifiedVersion] = useState(material.simplifiedVersion);
  const [homeworkReminder, setHomeworkReminder] = useState(material.homeworkReminder);
  const [groupId, setGroupId] = useState(teacherGroups[0]?.id ?? "");
  const [channel, setChannel] = useState("platform");
  const [scheduledFor, setScheduledFor] = useState("2026-03-22T16:30");
  const [recipientMode, setRecipientMode] = useState<"group" | "selected">("group");
  const [recipientFilter, setRecipientFilter] = useState("");
  const [showSupportOnly, setShowSupportOnly] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [confirmPublish, setConfirmPublish] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    "El borrador está listo para revisión editorial y publicación postclase."
  );

  const recipientGroup =
    demoTeacher.recipientGroups.find((group) => group.id === groupId) ||
    demoTeacher.recipientGroups[0];

  useEffect(() => {
    setSelectedRecipients(recipientGroup?.students.map((student) => student.id) ?? []);
  }, [recipientGroup?.id]);

  const filteredRecipients = useMemo(() => {
    const normalizedFilter = recipientFilter.trim().toLowerCase();

    return (recipientGroup?.students ?? []).filter((student) => {
      const matchesSearch =
        !normalizedFilter ||
        student.name.toLowerCase().includes(normalizedFilter) ||
        student.id.toLowerCase().includes(normalizedFilter);
      const matchesSupport =
        !showSupportOnly || student.support !== "Sin apoyo adicional";

      return matchesSearch && matchesSupport;
    });
  }, [recipientFilter, recipientGroup, showSupportOnly]);

  const additionalSupportCount =
    recipientMode === "group"
      ? recipientGroup?.supportCount ?? 0
      : (recipientGroup?.students ?? []).filter(
          (student) =>
            selectedRecipients.includes(student.id) &&
            student.support !== "Sin apoyo adicional"
        ).length;

  const recipientCount =
    recipientMode === "group"
      ? recipientGroup?.total ?? 0
      : selectedRecipients.length;

  const editSummary = [
    summary !== material.summary ? "Se editó el resumen accesible." : null,
    simplifiedVersion !== material.simplifiedVersion
      ? "Se ajustó la versión simplificada."
      : null,
    homeworkReminder !== material.homeworkReminder
      ? "Se actualizó el recordatorio de tarea."
      : null
  ].filter(Boolean) as string[];

  function toggleRecipient(studentId: string) {
    setSelectedRecipients((current) =>
      current.includes(studentId)
        ? current.filter((item) => item !== studentId)
        : [...current, studentId]
    );
  }

  async function syncDraft() {
    await fetch(`/api/materials/${material.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        summary,
        simplifiedVersion,
        homeworkReminder
      })
    });
  }

  function handleEdit() {
    summaryRef.current?.focus();
    setStatusMessage("Edición activada. Puedes ajustar resumen, versión simplificada y recordatorio antes de aprobar.");
  }

  async function handleApprove() {
    try {
      setIsSaving(true);
      await syncDraft();

      const response = await fetch(`/api/materials/${material.id}/approve`, {
        method: "POST"
      });

      if (!response.ok) {
        throw new Error("No se pudo aprobar el material.");
      }

      setIsApproved(true);
      setStatusMessage("Material aprobado correctamente. Ya puedes publicarlo para el grupo seleccionado.");
    } catch (error) {
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Ocurrió un problema al aprobar el material."
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handlePublish() {
    try {
      setIsPublishing(true);

      if (!confirmPublish) {
        setStatusMessage(
          "Confirma primero la entrega final para proteger destinatarios, apoyos y canal de publicación."
        );
        return;
      }

      if (!isApproved) {
        await handleApprove();
      }

      const response = await fetch("/api/deliveries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          materialId: material.id,
          recipients:
            recipientMode === "group" ? [groupId] : selectedRecipients,
          channel,
          scheduledFor
        })
      });

      if (!response.ok) {
        throw new Error("No fue posible programar la entrega.");
      }

      setStatusMessage(
        `Material programado para ${scheduledFor.replace("T", " ")} por ${channel === "platform" ? "plataforma interna" : "correo institucional"} con ${recipientCount} destinatarios y ${additionalSupportCount} apoyos adicionales activos.`
      );
    } catch (error) {
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Ocurrió un problema al publicar el material."
      );
    } finally {
      setIsPublishing(false);
    }
  }

  return (
    <AppShell
      role="teacher"
      title="Revisión de materiales generados"
      subtitle="Edita, aprueba y programa la entrega del contenido antes de publicarlo a tus grupos."
    >
      <div className="review-layout">
        <SectionCard
          title={material.title}
          description="Borrador generado por IA, listo para revisión"
        >
          <div className="review-nav">
            <Tag>Resumen</Tag>
            <Tag>Pasos</Tag>
            <Tag>Conceptos</Tag>
            <Tag>Glosario</Tag>
            <Tag>Vista adaptada</Tag>
            <Tag>Recordatorio</Tag>
          </div>

          <div className="editor-stack">
            <label>
              Resumen accesible
              <textarea
                ref={summaryRef}
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
              />
            </label>
            <label>
              Versión simplificada
              <textarea
                value={simplifiedVersion}
                onChange={(event) => setSimplifiedVersion(event.target.value)}
              />
            </label>
            <label>
              Recordatorio de tarea
              <textarea
                value={homeworkReminder}
                onChange={(event) => setHomeworkReminder(event.target.value)}
              />
            </label>
          </div>
        </SectionCard>

        <div className="stack-area">
          <SectionCard
            title="Vista previa final"
            description="Así lo verá el estudiante"
            accent="sky"
          >
            <div className="preview-card">
              <span className="status-pill">Vista estudiante</span>
              <strong>Resumen</strong>
              <p>{summary}</p>
              <strong>Pasos</strong>
              <InfoList items={material.steps} />
              <strong>Versión adaptada</strong>
              <p>{simplifiedVersion}</p>
              <strong>Glosario</strong>
              <div className="glossary-list">
                {material.glossary.map((item) => (
                  <article key={item.term}>
                    <h3>{item.term}</h3>
                    <p>{item.definition}</p>
                  </article>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Entrega postclase"
            description="Asignación y programación"
            accent="mint"
          >
            <form className="form-grid">
              <label>
                Grupo
                <select value={groupId} onChange={(event) => setGroupId(event.target.value)}>
                  {teacherGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Canal
                <select value={channel} onChange={(event) => setChannel(event.target.value)}>
                  <option value="platform">Plataforma interna</option>
                  <option value="email">Correo institucional</option>
                </select>
              </label>
              <label>
                Programar
                <input
                  type="datetime-local"
                  value={scheduledFor}
                  onChange={(event) => setScheduledFor(event.target.value)}
                />
              </label>
            </form>
            <div className="stack-list">
              <article className="list-card compact">
                <strong>Destinatarios del material</strong>
                <p>
                  Define si el material base va a todo el grupo o solo a estudiantes
                  seleccionados, manteniendo apoyos adicionales solo para quienes
                  corresponda.
                </p>
                <div className="inline-tags">
                  <button
                    className="ghost-button"
                    type="button"
                    onClick={() => setRecipientMode("group")}
                  >
                    Enviar a todo el grupo
                  </button>
                  <button
                    className="ghost-button"
                    type="button"
                    onClick={() => setRecipientMode("selected")}
                  >
                    Selección individual
                  </button>
                </div>
              </article>

              <div className="recipient-summary-grid">
                <article className="list-card compact">
                  <strong>Total de destinatarios</strong>
                  <p>{recipientCount} estudiantes listos para recibir el material.</p>
                </article>
                <article className="list-card compact">
                  <strong>Con apoyos adicionales</strong>
                  <p>{additionalSupportCount} estudiantes recibirán material adaptado.</p>
                </article>
              </div>

              <article className="list-card compact">
                <strong>Apoyos pedagógicos visibles para el docente</strong>
                <p>
                  La plataforma traduce información institucional autorizada en ajustes
                  de salida concretos, sin mostrar etiquetas diagnósticas en este flujo.
                </p>
                <p>Salida sugerida: {recipientGroup?.suggestedMaterial}</p>
                <div className="inline-tags">
                  {(recipientGroup?.recommendedSupports ?? []).map((support) => (
                    <Tag key={support}>{support}</Tag>
                  ))}
                </div>
                <InfoList items={recipientGroup?.practicalRecommendations ?? []} />
              </article>

              <div className="form-grid">
                <label>
                  Buscar estudiante
                  <input
                    type="text"
                    placeholder="Buscar por nombre o matrícula"
                    value={recipientFilter}
                    onChange={(event) => setRecipientFilter(event.target.value)}
                  />
                </label>
                <label className="full-span">
                  <button
                    className="choice-card switch-card"
                    type="button"
                    onClick={() => setShowSupportOnly((current) => !current)}
                  >
                    <div>
                      <strong>Mostrar solo apoyos adicionales</strong>
                      <p>Filtra estudiantes con apoyos pedagógicos activos.</p>
                    </div>
                    <span className={`toggle-chip ${showSupportOnly ? "active" : ""}`}>
                      {showSupportOnly ? "Activo" : "Inactivo"}
                    </span>
                  </button>
                </label>
              </div>

              <div className="stack-list">
                {filteredRecipients.map((student) => {
                  const isSelected =
                    recipientMode === "group" ||
                    selectedRecipients.includes(student.id);

                  return (
                    <article key={student.id} className="list-card compact recipient-card">
                      <div>
                        <strong>{student.name}</strong>
                        <p>
                          {student.id} · {student.support}
                        </p>
                      </div>
                      <div className="cta-row">
                        <Tag>{student.active ? "Activo" : "Inactivo"}</Tag>
                        <button
                          className="ghost-button"
                          type="button"
                          onClick={() => toggleRecipient(student.id)}
                          disabled={recipientMode === "group"}
                        >
                          {isSelected ? "Seleccionado" : "Seleccionar"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
            <p className="helper-copy">
              El flujo contempla revisión, aprobación y programación antes de la entrega a grupos o estudiantes específicos.
            </p>
            <label className="choice-card switch-card">
              <div>
                <strong>Confirmación antes del envío final</strong>
                <p>Verifica destinatarios, apoyos activos y canal de publicación.</p>
              </div>
              <input
                type="checkbox"
                checked={confirmPublish}
                onChange={(event) => setConfirmPublish(event.target.checked)}
              />
            </label>
            <div className="cta-row">
              <button className="ghost-button" type="button" onClick={handleEdit}>
                Editar
              </button>
              <button
                className="ghost-button"
                type="button"
                onClick={handleApprove}
                disabled={isSaving}
              >
                {isApproved ? "Aprobado" : isSaving ? "Aprobando..." : "Aprobar"}
              </button>
              <button
                className="primary-button"
                type="button"
                onClick={handlePublish}
                disabled={isPublishing}
              >
                {isPublishing ? "Publicando..." : "Publicar material"}
              </button>
            </div>
            <p className="action-feedback">{statusMessage}</p>
          </SectionCard>
        </div>
      </div>

      <SectionCard
        title="Comparativa de generación"
        description="Evidencia de cómo la IA organiza y el docente decide"
      >
        <div className="comparison-grid">
          <article className="comparison-card">
            <span className="comparison-label">Entrada</span>
            <strong>Contenido original</strong>
            <ul className="comparison-list">
              {demoTeacher.comparisonCase.original.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="comparison-card">
            <span className="comparison-label">Borrador IA</span>
            <strong>Versión generada</strong>
            <ul className="comparison-list">
              <li>{material.summary}</li>
              <li>{material.simplifiedVersion}</li>
              <li>{material.homeworkReminder}</li>
            </ul>
          </article>
          <article className="comparison-card">
            <span className="comparison-label">Revisión docente</span>
            <strong>Cambios aplicados</strong>
            <ul className="comparison-list">
              {(editSummary.length ? editSummary : ["Sin cambios respecto al borrador base."]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="comparison-card">
            <span className="comparison-label">Resultado final</span>
            <strong>Entrega enviada</strong>
            <ul className="comparison-list">
              <li>{summary}</li>
              <li>{homeworkReminder}</li>
              <li>
                {recipientMode === "group"
                  ? `Material base para ${recipientGroup?.group ?? "el grupo seleccionado"}.`
                  : `Material dirigido a ${recipientCount} estudiantes seleccionados.`}
              </li>
            </ul>
          </article>
        </div>
      </SectionCard>
    </AppShell>
  );
}
