import { AppShell } from "../../components/AppShell";
import { InfoList, SectionCard, Tag } from "../../components/Ui";
import { generatedMaterials, student } from "../../lib/data";
import { demoStudent } from "../../lib/demo";

const material = generatedMaterials[0];

export default function StudentPage() {
  return (
    <AppShell
      role="student"
      title={`Bienvenido, ${student.name}`}
      subtitle="Encuentra rápido lo importante de cada clase: resumen, pasos, conceptos y tarea en un solo lugar."
    >
      <div className="student-hero">
        <div className="class-of-day">
          <span className="hero-kicker">Clase del día</span>
          <h2>{material.title}</h2>
          <p>{material.summary}</p>
        </div>
        <div className="student-filters">
          {demoStudent.feedFilters.map((filter) => (
            <Tag key={filter}>{filter}</Tag>
          ))}
        </div>
      </div>

      <div className="dashboard-grid" id="materiales">
        <SectionCard title="Resumen postclase" description="Versión principal de estudio">
          <p className="reading-block">{material.summary}</p>
        </SectionCard>
        <SectionCard title="Vista adaptada" description="Lenguaje claro y estructura segmentada" accent="mint">
          <p className="reading-block">{material.simplifiedVersion}</p>
          <div className="inline-tags">
            {material.selectedAdaptations.map((adaptation) => (
              <Tag key={adaptation}>{adaptation.replaceAll("_", " ")}</Tag>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="dashboard-grid">
        <SectionCard title="Pasos para repasar" description="Sigue esta ruta para estudiar">
          <InfoList items={material.steps} />
        </SectionCard>
        <SectionCard title="Glosario sencillo" description="Conceptos clave explicados con lenguaje simple" accent="sky">
          <div className="glossary-list">
            {material.glossary.map((item) => (
              <article key={item.term}>
                <h3>{item.term}</h3>
                <p>{item.definition}</p>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="dashboard-grid" id="materias">
        <SectionCard title="Materias" description="Accede por asignatura, fecha o docente">
          <div className="inline-tags">
            <Tag>Biología</Tag>
            <Tag>Comunicación</Tag>
            <Tag>22 mar 2026</Tag>
            <Tag>Mariana Gómez</Tag>
          </div>
        </SectionCard>
        <SectionCard title="Conceptos clave" description="Ideas centrales de la clase" accent="sky">
          <div className="inline-tags">
            {material.concepts.map((concept) => (
              <Tag key={concept}>{concept}</Tag>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="dashboard-grid" id="tareas">
        <SectionCard title="Tarea y entregable" description="Lo más importante para después de clase">
          <div className="task-card">
            <strong>{material.homeworkReminder}</strong>
            <p>Marca esta actividad como revisada cuando termines de leer el material.</p>
            <button className="primary-button" type="button">
              Marcar como revisado
            </button>
          </div>
        </SectionCard>
        <SectionCard title="Esquema breve" description="Apoyo visual rápido">
          <InfoList items={material.visualOutline} />
          <div className="stack-list compact-stack">
            {demoStudent.helperCards.map((card) => (
              <article key={card.title} className="list-card compact">
                <strong>{card.title}</strong>
                <p>{card.copy}</p>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
