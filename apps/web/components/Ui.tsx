import { ReactNode } from "react";

type AppIconName =
  | "home"
  | "spark"
  | "book"
  | "history"
  | "users"
  | "layers"
  | "bell"
  | "template"
  | "profile"
  | "settings"
  | "student"
  | "admin"
  | "teacher"
  | "task"
  | "bookmark"
  | "microphone"
  | "shield"
  | "report"
  | "database"
  | "compare"
  | "download"
  | "search"
  | "send"
  | "lock"
  | "integration";

export function AppIcon({
  name,
  size = 18
}: {
  name: AppIconName;
  size?: number;
}) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true
  };

  switch (name) {
    case "home":
      return (
        <svg {...commonProps}>
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5.5 10.5V20h13v-9.5" />
        </svg>
      );
    case "spark":
      return (
        <svg {...commonProps}>
          <path d="m12 3 1.9 4.8L19 9.7l-4 3.1 1.3 5-4.3-2.7-4.3 2.7 1.3-5-4-3.1 5.1-1.9Z" />
        </svg>
      );
    case "book":
      return (
        <svg {...commonProps}>
          <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v17H7.5A2.5 2.5 0 0 0 5 22Z" />
          <path d="M5 5.5V22" />
        </svg>
      );
    case "history":
      return (
        <svg {...commonProps}>
          <path d="M3 12a9 9 0 1 0 3-6.7" />
          <path d="M3 4v5h5" />
          <path d="M12 7.5V12l3 2" />
        </svg>
      );
    case "users":
      return (
        <svg {...commonProps}>
          <path d="M16 21v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V21" />
          <circle cx="9.5" cy="8" r="3" />
          <path d="M22 21v-1.5a4 4 0 0 0-3-3.9" />
          <path d="M16.5 5.1a3 3 0 0 1 0 5.8" />
        </svg>
      );
    case "layers":
      return (
        <svg {...commonProps}>
          <path d="m12 3 9 4.5-9 4.5-9-4.5Z" />
          <path d="m3 12 9 4.5 9-4.5" />
          <path d="m3 16.5 9 4.5 9-4.5" />
        </svg>
      );
    case "bell":
      return (
        <svg {...commonProps}>
          <path d="M6 9a6 6 0 1 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9" />
          <path d="M10.5 20a2 2 0 0 0 3 0" />
        </svg>
      );
    case "template":
      return (
        <svg {...commonProps}>
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <path d="M8 8h8" />
          <path d="M8 12h5" />
          <path d="M8 16h8" />
        </svg>
      );
    case "profile":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      );
    case "settings":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.7-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.7 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 1 1 4 0v.2a1 1 0 0 0 .7.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.7Z" />
        </svg>
      );
    case "student":
      return (
        <svg {...commonProps}>
          <path d="m12 5 8 4-8 4-8-4Z" />
          <path d="M8 11.5V15c0 1.4 1.8 2.5 4 2.5s4-1.1 4-2.5v-3.5" />
        </svg>
      );
    case "admin":
      return (
        <svg {...commonProps}>
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <path d="M8 8h8" />
          <path d="M8 12h8" />
          <path d="M8 16h5" />
        </svg>
      );
    case "teacher":
      return (
        <svg {...commonProps}>
          <path d="M4 6h16v10H4Z" />
          <path d="M8 20h8" />
          <path d="M12 16v4" />
        </svg>
      );
    case "task":
      return (
        <svg {...commonProps}>
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="m8 12 2.5 2.5L16 9" />
        </svg>
      );
    case "bookmark":
      return (
        <svg {...commonProps}>
          <path d="M7 4h10v16l-5-3-5 3Z" />
        </svg>
      );
    case "microphone":
      return (
        <svg {...commonProps}>
          <rect x="9" y="3" width="6" height="12" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0" />
          <path d="M12 18v3" />
        </svg>
      );
    case "shield":
      return (
        <svg {...commonProps}>
          <path d="M12 3 5 6v5c0 4.5 2.9 7.8 7 10 4.1-2.2 7-5.5 7-10V6Z" />
        </svg>
      );
    case "report":
      return (
        <svg {...commonProps}>
          <path d="M5 20V10" />
          <path d="M12 20V4" />
          <path d="M19 20v-7" />
        </svg>
      );
    case "database":
      return (
        <svg {...commonProps}>
          <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
          <path d="M5 5.5v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" />
          <path d="M5 11.5v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" />
        </svg>
      );
    case "compare":
      return (
        <svg {...commonProps}>
          <path d="M8 4H5a2 2 0 0 0-2 2v13l5-3 5 3V6a2 2 0 0 0-2-2Z" />
          <path d="M16 4h3a2 2 0 0 1 2 2v13l-5-3-5 3" />
        </svg>
      );
    case "download":
      return (
        <svg {...commonProps}>
          <path d="M12 4v11" />
          <path d="m7.5 11.5 4.5 4.5 4.5-4.5" />
          <path d="M4 20h16" />
        </svg>
      );
    case "search":
      return (
        <svg {...commonProps}>
          <circle cx="11" cy="11" r="6" />
          <path d="m20 20-4.2-4.2" />
        </svg>
      );
    case "send":
      return (
        <svg {...commonProps}>
          <path d="M21 3 3 10l7 2 2 7 9-16Z" />
        </svg>
      );
    case "lock":
      return (
        <svg {...commonProps}>
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "integration":
      return (
        <svg {...commonProps}>
          <path d="M8 8h4V4" />
          <path d="M16 16h-4v4" />
          <path d="M12 4 7 9" />
          <path d="M12 20 17 15" />
          <rect x="3" y="9" width="4" height="6" rx="1.5" />
          <rect x="17" y="9" width="4" height="6" rx="1.5" />
        </svg>
      );
  }
}

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
