import { AppShell } from "../../../components/AppShell";
import { AppIcon, SectionCard, Tag } from "../../../components/Ui";
import { demoTeacher } from "../../../lib/demo";

export default function TeacherComparisonPage() {
  return (
    <AppShell
      role="teacher"
      title="Comparativa de generación"
      subtitle="Visualiza con claridad la diferencia entre la entrada docente, el borrador de IA, la revisión humana y el resultado final enviado."
    >
      <div className="dashboard-grid">
        <SectionCard
          title="Antes y después del procesamiento"
          description="La IA organiza el contenido y el docente conserva la decisión final."
        >
          <div className="comparison-grid">
            <article className="comparison-card">
              <span className="comparison-label">Entrada</span>
              <strong>Contenido original del docente</strong>
              <ul className="comparison-list">
                {demoTeacher.comparisonCase.original.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="comparison-card">
              <span className="comparison-label">Borrador IA</span>
              <strong>Primera versión estructurada</strong>
              <ul className="comparison-list">
                {demoTeacher.comparisonCase.aiDraft.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="comparison-card">
              <span className="comparison-label">Revisión docente</span>
              <strong>Ajustes antes del envío</strong>
              <ul className="comparison-list">
                {demoTeacher.comparisonCase.teacherEdits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="comparison-card">
              <span className="comparison-label">Resultado final</span>
              <strong>Material entregado</strong>
              <ul className="comparison-list">
                {demoTeacher.comparisonCase.finalResult.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </SectionCard>

        <SectionCard
          title="Ejemplo real del sistema"
          description="Caso de uso útil para presentación institucional o concurso"
          accent="sky"
        >
          <div className="stack-list">
            {demoTeacher.exampleOutputs.map((item) => (
              <article key={item.title} className="list-card compact">
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Qué demuestra esta comparativa"
        description="Evidencia operativa del valor pedagógico de AulaAdapt IA"
        accent="mint"
      >
        <div className="institutional-grid">
          <article className="role-card">
            <div className="role-card-head">
              <span className="icon-badge">
                <AppIcon name="spark" />
              </span>
              <h3>La IA organiza</h3>
            </div>
            <p>Resume, estructura y propone materiales base y adaptados a partir de la explicación docente.</p>
          </article>
          <article className="role-card">
            <div className="role-card-head">
              <span className="icon-badge">
                <AppIcon name="teacher" />
              </span>
              <h3>El docente decide</h3>
            </div>
            <p>Revisa, edita, valida y autoriza qué versión se entrega al grupo o a estudiantes específicos.</p>
          </article>
          <article className="role-card">
            <div className="role-card-head">
              <span className="icon-badge">
                <AppIcon name="send" />
              </span>
              <h3>Entrega con criterio</h3>
            </div>
            <p>Se publican materiales base para todos y apoyos adicionales solo para quienes lo requieran y estén autorizados.</p>
          </article>
        </div>
        <div className="inline-tags">
          <Tag>Trazabilidad</Tag>
          <Tag>Revisión humana</Tag>
          <Tag>Postclase</Tag>
          <Tag>Accesibilidad</Tag>
        </div>
      </SectionCard>
    </AppShell>
  );
}
