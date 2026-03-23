"use client";

import { useEffect, useState } from "react";
import type { UserRole } from "@aulaadapt/domain";
import { AppShell } from "../../components/AppShell";
import { AppIcon, SectionCard, Tag } from "../../components/Ui";
import {
  appearanceOptions,
  defaultUiPreferences,
  readPreferredRole,
  readUiPreferences,
  writeUiPreferences,
  type AccentMode,
  type ContrastMode,
  type DeliveryChannel,
  type DensityMode,
  type LanguageMode,
  type NotificationMode,
  type TextSize,
  type ThemeMode,
  type UiPreferences
} from "../../lib/user-preferences";

export function SettingsClient() {
  const [shellRole, setShellRole] = useState<UserRole>("teacher");
  const [preferences, setPreferences] = useState<UiPreferences>(defaultUiPreferences);
  const [statusMessage, setStatusMessage] = useState(
    "Ajusta tu lectura, visualización y forma de entrega desde un solo panel."
  );

  useEffect(() => {
    setShellRole(readPreferredRole());
    setPreferences(readUiPreferences());
  }, []);

  function updatePreference<K extends keyof UiPreferences>(
    key: K,
    value: UiPreferences[K]
  ) {
    setPreferences((current) => ({ ...current, [key]: value }));
  }

  function handleSave() {
    writeUiPreferences(preferences);
    setStatusMessage(
      "Las preferencias quedaron guardadas y se aplicaron en toda la plataforma."
    );
  }

  function handleReset() {
    setPreferences(defaultUiPreferences);
    writeUiPreferences(defaultUiPreferences);
    setStatusMessage(
      "Se restauró la configuración recomendada para lectura, contraste y navegación."
    );
  }

  return (
    <AppShell
      role={shellRole}
      title="Configuración y accesibilidad"
      subtitle="Ajusta idioma, tamaño de texto, notificaciones, privacidad y preferencias de entrega sin perder claridad visual."
    >
      <div className="dashboard-grid">
        <SectionCard
          title="Preferencias de lectura"
          description="Adaptaciones visuales de la interfaz"
        >
          <form className="form-grid" onSubmit={(event) => event.preventDefault()}>
            <label>
              Tema
              <select
                value={preferences.theme}
                onChange={(event) =>
                  updatePreference("theme", event.target.value as ThemeMode)
                }
              >
                {appearanceOptions.themes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Color principal
              <select
                value={preferences.accent}
                onChange={(event) =>
                  updatePreference("accent", event.target.value as AccentMode)
                }
              >
                {appearanceOptions.accents.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Idioma
              <select
                value={preferences.language}
                onChange={(event) =>
                  updatePreference("language", event.target.value as LanguageMode)
                }
              >
                {appearanceOptions.languages.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Tamaño de texto
              <select
                value={preferences.textSize}
                onChange={(event) =>
                  updatePreference("textSize", event.target.value as TextSize)
                }
              >
                {appearanceOptions.textSizes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Densidad visual
              <select
                value={preferences.density}
                onChange={(event) =>
                  updatePreference("density", event.target.value as DensityMode)
                }
              >
                {appearanceOptions.densities.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Contraste
              <select
                value={preferences.contrast}
                onChange={(event) =>
                  updatePreference("contrast", event.target.value as ContrastMode)
                }
              >
                {appearanceOptions.contrasts.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="full-span">
              Accesibilidad visual
              <button
                className="choice-card switch-card"
                type="button"
                onClick={() =>
                  updatePreference("reduceNoise", !preferences.reduceNoise)
                }
              >
                <div>
                  <strong>Reducir ruido visual</strong>
                  <p>
                    Usa superficies limpias, menos saturación y más segmentación del
                    contenido.
                  </p>
                </div>
                <span className={`toggle-chip ${preferences.reduceNoise ? "active" : ""}`}>
                  {preferences.reduceNoise ? "Activo" : "Inactivo"}
                </span>
              </button>
            </label>
          </form>
        </SectionCard>

        <SectionCard
          title="Entrega y notificaciones"
          description="Control operativo"
          accent="sky"
        >
          <form className="form-grid" onSubmit={(event) => event.preventDefault()}>
            <label>
              Canal preferido
              <select
                value={preferences.deliveryChannel}
                onChange={(event) =>
                  updatePreference(
                    "deliveryChannel",
                    event.target.value as DeliveryChannel
                  )
                }
              >
                {appearanceOptions.deliveryChannels.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Notificaciones
              <select
                value={preferences.notifications}
                onChange={(event) =>
                  updatePreference(
                    "notifications",
                    event.target.value as NotificationMode
                  )
                }
              >
                {appearanceOptions.notifications.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </form>
          <div className="settings-preview-grid">
            <Tag>
              {
                appearanceOptions.deliveryChannels.find(
                  (item) => item.value === preferences.deliveryChannel
                )?.label
              }
            </Tag>
            <Tag>
              {
                appearanceOptions.notifications.find(
                  (item) => item.value === preferences.notifications
                )?.label
              }
            </Tag>
          </div>
          <div className="cta-row">
            <button className="primary-button" type="button" onClick={handleSave}>
              <AppIcon name="settings" size={16} />
              Guardar preferencias
            </button>
            <button className="ghost-button" type="button" onClick={handleReset}>
              Restablecer valores
            </button>
          </div>
          <p className="action-feedback">{statusMessage}</p>
        </SectionCard>
      </div>

      <SectionCard
        title="Privacidad y uso responsable"
        description="Mensajes visibles en toda la experiencia"
        accent="mint"
      >
        <div className="stack-list">
          <article className="list-card">
            <strong>La plataforma no realiza diagnósticos.</strong>
            <p>
              Las adaptaciones son apoyos pedagógicos neutrales seleccionados por el
              docente o la institución.
            </p>
          </article>
          <article className="list-card">
            <strong>La IA no sustituye al docente.</strong>
            <p>
              Todo material pasa por una etapa de revisión y aprobación humana antes
              de enviarse.
            </p>
          </article>
          <article className="list-card">
            <strong>Protección de información.</strong>
            <p>
              Los reportes administrativos son agregados y evitan exponer datos
              sensibles individuales.
            </p>
          </article>
          <article className="list-card">
            <strong>Configuración persistente.</strong>
            <p>
              Tus ajustes de tema, contraste, color y tamaño de texto se conservan
              entre sesiones del navegador.
            </p>
          </article>
        </div>
      </SectionCard>
    </AppShell>
  );
}
