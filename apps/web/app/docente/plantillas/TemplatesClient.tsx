"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "../../../components/AppShell";
import { AppIcon, SectionCard, Tag } from "../../../components/Ui";
import { demoTeacher } from "../../../lib/demo";
import {
  FAVORITE_TEMPLATES_STORAGE_KEY,
  SELECTED_TEMPLATE_STORAGE_KEY
} from "../../../lib/user-preferences";

type TeacherTemplate = (typeof demoTeacher.templates)[number];

export function TemplatesClient() {
  const router = useRouter();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [previewTemplateId, setPreviewTemplateId] = useState<string>(
    demoTeacher.templates[0]?.id || ""
  );
  const [statusMessage, setStatusMessage] = useState(
    "Selecciona una plantilla para previsualizarla o aplicarla al flujo de Nueva clase."
  );

  useEffect(() => {
    const storedFavorites = window.localStorage.getItem(
      FAVORITE_TEMPLATES_STORAGE_KEY
    );

    if (storedFavorites) {
      try {
        setFavoriteIds(JSON.parse(storedFavorites) as string[]);
      } catch {
        window.localStorage.removeItem(FAVORITE_TEMPLATES_STORAGE_KEY);
      }
    }
  }, []);

  const previewTemplate =
    demoTeacher.templates.find((template) => template.id === previewTemplateId) ||
    demoTeacher.templates[0];

  function persistFavorites(nextFavorites: string[]) {
    setFavoriteIds(nextFavorites);
    window.localStorage.setItem(
      FAVORITE_TEMPLATES_STORAGE_KEY,
      JSON.stringify(nextFavorites)
    );
  }

  function handleFavorite(template: TeacherTemplate) {
    const nextFavorites = favoriteIds.includes(template.id)
      ? favoriteIds.filter((item) => item !== template.id)
      : [...favoriteIds, template.id];

    persistFavorites(nextFavorites);
    setStatusMessage(
      nextFavorites.includes(template.id)
        ? `La plantilla "${template.title}" se guardó como favorita.`
        : `La plantilla "${template.title}" se quitó de tus favoritas.`
    );
  }

  function handlePreview(template: TeacherTemplate) {
    setPreviewTemplateId(template.id);
    setStatusMessage(
      `Vista previa lista para "${template.title}". Revisa salidas y apoyos sugeridos.`
    );
  }

  function handleUseTemplate(template: TeacherTemplate) {
    window.localStorage.setItem(SELECTED_TEMPLATE_STORAGE_KEY, template.id);
    setStatusMessage(
      `La plantilla "${template.title}" quedó lista para aplicarse en una nueva clase.`
    );
    router.push("/docente/nueva-clase");
  }

  return (
    <AppShell
      role="teacher"
      title="Biblioteca de plantillas"
      subtitle="Reutiliza estructuras de salida para generar materiales postclase con más rapidez, consistencia y claridad."
    >
      <div className="dashboard-grid">
        <SectionCard
          title="Plantillas recomendadas"
          description="Formatos pensados para clases expositivas, actividades guiadas y repaso accesible"
        >
          <div className="stack-list">
            {demoTeacher.templates.map((template) => {
              const isFavorite = favoriteIds.includes(template.id);
              const isActive = previewTemplateId === template.id;

              return (
                <article
                  key={template.id}
                  className={`list-card template-card ${isActive ? "template-card-active" : ""}`}
                >
                  <div className="template-card-header">
                    <div>
                      <strong>{template.title}</strong>
                      <p>{template.copy}</p>
                    </div>
                    <div className="inline-tags">
                      <Tag>{template.focus}</Tag>
                      {isFavorite ? <Tag>Favorita</Tag> : null}
                    </div>
                  </div>
                  <div className="cta-row">
                    <button
                      className="primary-button"
                      type="button"
                      onClick={() => handleUseTemplate(template)}
                    >
                      <AppIcon name="template" size={16} />
                      Usar plantilla
                    </button>
                    <button
                      className="ghost-button"
                      type="button"
                      onClick={() => handlePreview(template)}
                    >
                      Previsualizar
                    </button>
                    <button
                      className="ghost-button"
                      type="button"
                      onClick={() => handleFavorite(template)}
                    >
                      {isFavorite ? "Quitar favorita" : "Guardar favorita"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="action-feedback">{statusMessage}</p>
        </SectionCard>

        {previewTemplate ? (
          <SectionCard
            title="Vista previa de plantilla"
            description="Salidas y adaptaciones que se cargarán automáticamente"
            accent="sky"
          >
            <div className="preview-card template-preview-panel">
              <strong>{previewTemplate.title}</strong>
              <p>{previewTemplate.copy}</p>
              <div className="stack-list compact-stack">
                <div>
                  <strong>Salidas sugeridas</strong>
                  <div className="inline-tags">
                    {previewTemplate.recommendedOutputs.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>Apoyos pedagógicos</strong>
                  <div className="inline-tags">
                    {previewTemplate.recommendedAdaptations.map((item) => (
                      <Tag key={item}>{item.replaceAll("_", " ")}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
        ) : null}
      </div>
    </AppShell>
  );
}
