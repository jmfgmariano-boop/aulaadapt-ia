import { AppShell } from "../../../components/AppShell";
import { SectionCard } from "../../../components/Ui";
import { demoTeacher } from "../../../lib/demo";

export default function TeacherNotificationsPage() {
  return (
    <AppShell
      role="teacher"
      title="Notificaciones"
      subtitle="Consulta pendientes de revisión, entregas programadas y recordatorios relevantes sin perder foco en tu trabajo docente."
    >
      <SectionCard title="Bandeja docente" description="Alertas operativas y seguimiento del día">
        <div className="stack-list">
          {demoTeacher.notifications.map((item) => (
            <article key={item.title} className="list-card">
              <strong>{item.title}</strong>
              <p>{item.copy}</p>
            </article>
          ))}
          <article className="list-card">
            <strong>Confirmación de envío</strong>
            <p>El material de Fotosíntesis fue programado para el grupo 5A y quedará disponible al cierre de la jornada.</p>
          </article>
        </div>
      </SectionCard>
    </AppShell>
  );
}
