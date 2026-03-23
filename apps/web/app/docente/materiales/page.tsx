import { AppShell } from "../../../components/AppShell";
import { InfoList, SectionCard, Tag } from "../../../components/Ui";
import { generatedMaterials, teacherGroups } from "../../../lib/data";
import { demoConfig } from "../../../lib/demo";

const material = generatedMaterials[0];

export default function MaterialsReviewPage() {
  return (
    <AppShell
      role="teacher"
      title="Revisión de materiales generados"
      subtitle="Edita, aprueba y programa la entrega del contenido antes de publicarlo a tus grupos."
    >
      <div className="review-layout">
        <SectionCard title={material.title} description="Borrador generado por IA, listo para revisión">
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
              <textarea defaultValue={material.summary} />
            </label>
            <label>
              Versión simplificada
              <textarea defaultValue={material.simplifiedVersion} />
            </label>
            <label>
              Recordatorio de tarea
              <textarea defaultValue={material.homeworkReminder} />
            </label>
          </div>
        </SectionCard>

        <div className="stack-area">
          <SectionCard title="Vista previa final" description="Así lo verá el estudiante" accent="sky">
            <div className="preview-card">
              <span className="demo-chip">Vista estudiante simulada</span>
              <strong>Resumen</strong>
              <p>{material.summary}</p>
              <strong>Pasos</strong>
              <InfoList items={material.steps} />
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

          <SectionCard title="Entrega postclase" description="Asignación y programación" accent="mint">
            <form className="form-grid">
              <label>
                Grupo
                <select defaultValue={teacherGroups[0]?.id}>
                  {teacherGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Canal
                <select defaultValue="platform">
                  <option value="platform">Plataforma interna</option>
                  <option value="email">Correo institucional</option>
                </select>
              </label>
              <label>
                Programar
                <input type="datetime-local" defaultValue="2026-03-22T16:30" />
              </label>
            </form>
            <p className="helper-copy">
              En esta demo pública, el envío no persiste cambios. Se muestra el flujo final que luego podrá conectarse a backend real.
            </p>
            <div className="cta-row">
              <button className="ghost-button" type="button">
                Editar
              </button>
              <button className="ghost-button" type="button">
                Aprobar
              </button>
              <button className="primary-button" type="button">
                Enviar en {demoConfig.appMode}
              </button>
            </div>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  );
}
