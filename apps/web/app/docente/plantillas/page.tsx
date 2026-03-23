import { AppShell } from "../../../components/AppShell";
import { SectionCard, Tag } from "../../../components/Ui";
import { demoTeacher } from "../../../lib/demo";

export default function TeacherTemplatesPage() {
  return (
    <AppShell
      role="teacher"
      title="Biblioteca de plantillas"
      subtitle="Reutiliza estructuras de salida para generar materiales postclase con más rapidez y consistencia."
    >
      <SectionCard title="Plantillas recomendadas" description="Formatos pensados para clases expositivas, actividades guiadas y repaso accesible">
        <div className="stack-list">
          {demoTeacher.templates.map((template) => (
            <article key={template.title} className="list-card">
              <div>
                <strong>{template.title}</strong>
                <p>{template.copy}</p>
              </div>
              <div className="inline-tags">
                <Tag>Reutilizable</Tag>
                <Tag>Editable</Tag>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </AppShell>
  );
}
