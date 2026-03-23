import Link from "next/link";
import { AppShell } from "../../../components/AppShell";
import { AppIcon, MetricCard, SectionCard, Tag } from "../../../components/Ui";
import { demoAdmin } from "../../../lib/demo";

export default function AdminReportsPage() {
  return (
    <AppShell
      role="admin"
      title="Reportes y analítica"
      subtitle="Consulta métricas agregadas por docente, grupo, materia, entregas y uso de apoyos pedagógicos sin exponer datos sensibles."
    >
      <div className="metric-grid">
        {demoAdmin.analytics.metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            helper={metric.helper}
          />
        ))}
      </div>

      <div className="dashboard-grid">
        <SectionCard
          title="Filtros disponibles"
          description="Explora la analítica por segmento institucional"
        >
          <div className="inline-tags">
            {demoAdmin.analytics.filters.map((filter) => (
              <Tag key={filter}>{filter}</Tag>
            ))}
          </div>
          <p className="helper-copy">
            Los reportes se muestran de forma agregada y priorizan patrones de uso,
            volumen operativo y adopción por grupo, materia y tipo de apoyo.
          </p>
        </SectionCard>

        <SectionCard
          title="Tendencia mensual"
          description="Evolución del uso de la plataforma"
          accent="sky"
        >
          <div className="stack-list">
            {demoAdmin.analytics.trend.map((item) => (
              <article key={item.period} className="list-card compact analytics-bar-card">
                <div className="analytics-bar-label">
                  <strong>{item.period}</strong>
                  <span>{item.value} materiales</span>
                </div>
                <div className="analytics-bar-track">
                  <span style={{ width: `${Math.min(item.value, 100)}%` }} />
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="dashboard-grid">
        <SectionCard
          title="Uso por materia"
          description="Materias con mayor generación de materiales"
        >
          <div className="stack-list">
            {demoAdmin.analytics.usageBySubject.map((item) => (
              <article key={item.label} className="list-card compact analytics-bar-card">
                <div className="analytics-bar-label">
                  <strong>{item.label}</strong>
                  <span>{item.value} materiales</span>
                </div>
                <div className="analytics-bar-track">
                  <span style={{ width: `${item.value * 2}%` }} />
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Adaptaciones más usadas"
          description="Apoyos pedagógicos con mayor recurrencia"
          accent="mint"
        >
          <div className="stack-list">
            {demoAdmin.analytics.usageByAdaptation.map((item) => (
              <article key={item.label} className="list-card compact analytics-bar-card">
                <div className="analytics-bar-label">
                  <strong>{item.label}</strong>
                  <span>{item.value} sesiones</span>
                </div>
                <div className="analytics-bar-track">
                  <span style={{ width: `${item.value * 2.2}%` }} />
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Lectura institucional"
        description="Qué explica esta analítica a coordinación académica"
      >
        <div className="institutional-grid">
          <article className="role-card">
            <div className="role-card-head">
              <span className="icon-badge">
                <AppIcon name="report" />
              </span>
              <h3>Adopción por materia</h3>
            </div>
            <p>Permite ubicar dónde la plataforma ya aporta valor operativo y dónde conviene acompañar más al docente.</p>
          </article>
          <article className="role-card">
            <div className="role-card-head">
              <span className="icon-badge">
                <AppIcon name="users" />
              </span>
              <h3>Uso de apoyos</h3>
            </div>
            <p>Ayuda a dimensionar qué perfiles pedagógicos requieren más producción adaptada sin exponer casos individuales.</p>
          </article>
          <article className="role-card">
            <div className="role-card-head">
              <span className="icon-badge">
                <AppIcon name="shield" />
              </span>
              <h3>Privacidad por diseño</h3>
            </div>
            <p>Las cifras son agregadas y se presentan como insumo institucional, no como perfilado sensible del alumnado.</p>
          </article>
        </div>
        <div className="cta-row">
          <Link className="ghost-button" href="/admin">
            Volver al panel administrativo
          </Link>
        </div>
      </SectionCard>
    </AppShell>
  );
}
