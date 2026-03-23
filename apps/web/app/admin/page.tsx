import { teacherGroups, teacherSubjects } from "../../lib/data";
import { demoAdmin } from "../../lib/demo";
import { AdminPanelClient } from "./AdminPanelClient";

export default function AdminPage() {
  return (
    <AdminPanelClient
      teacherDirectory={demoAdmin.teacherDirectory}
      studentRegistry={demoAdmin.studentRegistry}
      teacherSubjects={teacherSubjects}
      teacherGroups={teacherGroups}
      accessibilityProfiles={demoAdmin.accessibilityProfiles}
      accessibilityContext={demoAdmin.accessibilityContext}
      importSources={demoAdmin.importSources}
      reportCards={demoAdmin.reportCards}
      importTemplateHeaders={demoAdmin.importTemplateHeaders}
      importPreviewRows={demoAdmin.importPreviewRows}
      importSummary={demoAdmin.importSummary}
      profileRegistry={demoAdmin.profileRegistry}
      auditLog={demoAdmin.auditLog}
      permissions={demoAdmin.permissions}
      analytics={demoAdmin.analytics}
      integrations={demoAdmin.integrations}
      sensitiveCategoryExamples={demoAdmin.sensitiveCategoryExamples}
    />
  );
}
