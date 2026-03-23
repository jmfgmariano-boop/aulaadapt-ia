import { AppShell } from "../../../components/AppShell";
import { NewClassComposerClient } from "./NewClassComposerClient";

export default function NewClassPage() {
  return (
    <AppShell
      role="teacher"
      title="Crear nueva clase"
      subtitle="Captura el contenido de la sesión, selecciona salidas y define adaptaciones neutrales antes de generar materiales."
    >
      <NewClassComposerClient />
    </AppShell>
  );
}
