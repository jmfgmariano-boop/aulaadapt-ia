import { ReactNode } from "react";

export function SectionCard({
  title,
  description,
  children,
  accent = "default"
}: {
  title: string;
  description?: string;
  children: ReactNode;
  accent?: "default" | "mint" | "sky";
}) {
  return (
    <section className={`section-card accent-${accent}`}>
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

export function MetricCard({
  label,
  value,
  helper
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <article className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{helper}</p>
    </article>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}

export function InfoList({ items }: { items: string[] }) {
  return (
    <ul className="info-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function FlowSteps({ items }: { items: string[] }) {
  return (
    <div className="flow-steps">
      {items.map((item, index) => (
        <article key={item} className="flow-step">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{item}</strong>
        </article>
      ))}
    </div>
  );
}
