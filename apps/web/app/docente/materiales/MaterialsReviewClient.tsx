"use client";

import { useRef, useState } from "react";
import type { GeneratedMaterial, Group } from "@aulaadapt/domain";
import { AppShell } from "../../../components/AppShell";
import { InfoList, SectionCard, Tag } from "../../../components/Ui";

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
  const [isSaving, setIsSaving] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    "El borrador está listo para revisión editorial y publicación postclase."
  );

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
          recipients: [groupId],
          channel,
          scheduledFor
        })
      });

      if (!response.ok) {
        throw new Error("No fue posible programar la entrega.");
      }

      setStatusMessage(
        `Material programado para ${scheduledFor.replace("T", " ")} por ${channel === "platform" ? "plataforma interna" : "correo institucional"}.`
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
            <p className="helper-copy">
              El flujo contempla revisión, aprobación y programación antes de la entrega a grupos o estudiantes específicos.
            </p>
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
    </AppShell>
  );
}
