"use client";

import { useMemo, useState } from "react";
import { AppShell } from "../../../components/AppShell";
import { AppIcon, SectionCard, Tag } from "../../../components/Ui";
import { demoTeacher } from "../../../lib/demo";

type NotificationFilter = "all" | "unread" | "high";

export function NotificationsClient() {
  const [filter, setFilter] = useState<NotificationFilter>("all");
  const [readIds, setReadIds] = useState<string[]>(
    demoTeacher.notificationCenter.filter((item) => item.read).map((item) => item.id)
  );
  const [statusMessage, setStatusMessage] = useState(
    "Consulta alertas, actualizaciones y pendientes sin perder el foco en tu trabajo docente."
  );

  const filteredNotifications = useMemo(() => {
    return demoTeacher.notificationCenter.filter((item) => {
      if (filter === "unread") {
        return !readIds.includes(item.id);
      }

      if (filter === "high") {
        return item.priority === "Alta";
      }

      return true;
    });
  }, [filter, readIds]);

  function toggleRead(id: string) {
    setReadIds((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];

      setStatusMessage(
        next.includes(id)
          ? "La notificación se marcó como leída."
          : "La notificación volvió al estado pendiente."
      );

      return next;
    });
  }

  return (
    <AppShell
      role="teacher"
      title="Notificaciones"
      subtitle="Consulta pendientes de revisión, entregas programadas, cambios institucionales y actualizaciones relevantes para tu operación docente."
    >
      <div className="dashboard-grid">
        <SectionCard
          title="Centro de notificaciones"
          description="Filtra por lectura o prioridad"
        >
          <div className="inline-tags">
            <button className="ghost-button" type="button" onClick={() => setFilter("all")}>
              Todas
            </button>
            <button className="ghost-button" type="button" onClick={() => setFilter("unread")}>
              No leídas
            </button>
            <button className="ghost-button" type="button" onClick={() => setFilter("high")}>
              Prioridad alta
            </button>
          </div>
          <div className="stack-list">
            {filteredNotifications.map((item) => {
              const isRead = readIds.includes(item.id);

              return (
                <article key={item.id} className="list-card notification-card">
                  <div className="notification-card-header">
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.copy}</p>
                    </div>
                    <div className="inline-tags">
                      <Tag>{item.category}</Tag>
                      <Tag>{item.priority}</Tag>
                      <Tag>{item.date}</Tag>
                    </div>
                  </div>
                  <div className="cta-row">
                    <button
                      className="primary-button"
                      type="button"
                      onClick={() => toggleRead(item.id)}
                    >
                      <AppIcon name="bell" size={16} />
                      {isRead ? "Marcar como pendiente" : "Marcar como leída"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="action-feedback">{statusMessage}</p>
        </SectionCard>

        <SectionCard
          title="Qué incluye este centro"
          description="Tipos de eventos visibles para el docente"
          accent="sky"
        >
          <div className="stack-list">
            <article className="list-card compact">
              <strong>Material generado o pendiente de revisión</strong>
              <p>Identifica borradores nuevos y tareas que conviene aprobar antes de publicar.</p>
            </article>
            <article className="list-card compact">
              <strong>Entregas y tareas</strong>
              <p>Confirma publicaciones, programaciones y recordatorios por grupo o materia.</p>
            </article>
            <article className="list-card compact">
              <strong>Cambios institucionales</strong>
              <p>Informa actualizaciones de perfiles pedagógicos, base escolar o configuración académica.</p>
            </article>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
