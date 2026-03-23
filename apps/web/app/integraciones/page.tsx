import { AppShell } from "../../components/AppShell";
import { AppIcon, SectionCard, Tag } from "../../components/Ui";
import { demoAdmin } from "../../lib/demo";

export default function IntegrationsPage() {
  return (
    <AppShell
      role="admin"
      title="Integraciones y crecimiento"
      subtitle="Ruta visible para conectar AulaAdapt IA con plataformas escolares, correo institucional y formatos de exportación."
    >
      <SectionCard
        title="Integraciones futuras"
        description="Módulos pensados para expansión institucional"
      >
        <div className="stack-list">
          {demoAdmin.integrations.map((integration) => (
            <article key={integration.title} className="list-card">
              <div className="role-card-head">
                <span className="icon-badge">
                  <AppIcon name="integration" />
                </span>
                <div>
                  <strong>{integration.title}</strong>
                  <p>{integration.copy}</p>
                </div>
              </div>
              <div className="inline-tags">
                <Tag>{integration.status}</Tag>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>

      <div className="dashboard-grid">
        <SectionCard
          title="Exportación de materiales"
          description="Salidas útiles para entorno escolar"
          accent="sky"
        >
          <div className="inline-tags">
            <Tag>PDF</Tag>
            <Tag>Word</Tag>
            <Tag>Correo institucional</Tag>
            <Tag>Descarga local</Tag>
          </div>
          <p className="helper-copy">
            La plataforma ya contempla materiales descargables y puede crecer hacia
            distribución formal por LMS o directorio institucional.
          </p>
        </SectionCard>

        <SectionCard
          title="Escalabilidad técnica"
          description="Preparación para más escuelas, grupos y servicios"
          accent="mint"
        >
          <div className="stack-list">
            <article className="list-card compact">
              <strong>Sincronización con directorio escolar</strong>
              <p>Alta y baja automatizada de usuarios, grupos y materias.</p>
            </article>
            <article className="list-card compact">
              <strong>Publicación externa</strong>
              <p>Entrega a Classroom, Teams o LMS institucional con trazabilidad.</p>
            </article>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
