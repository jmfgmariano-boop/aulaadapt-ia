"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import type { UserRole } from "@aulaadapt/domain";
import { AppShell } from "../../components/AppShell";
import { AppIcon, SectionCard, Tag } from "../../components/Ui";
import { demoConfig } from "../../lib/demo";
import {
  appearanceOptions,
  buildDefaultProfileState,
  defaultUiPreferences,
  getInitials,
  readPreferredRole,
  readProfileState,
  readUiPreferences,
  writeProfileState,
  writeUiPreferences,
  type AccentMode,
  type ContrastMode,
  type DensityMode,
  type ProfileState,
  type ThemeMode,
  type UiPreferences
} from "../../lib/user-preferences";

type ProfileClientProps = {
  defaultName: string;
};

const MAX_PHOTO_SIZE_MB = 3;

export function ProfileClient({ defaultName }: ProfileClientProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [shellRole, setShellRole] = useState<UserRole>("teacher");
  const [profile, setProfile] = useState<ProfileState>(
    buildDefaultProfileState(defaultName)
  );
  const [appearance, setAppearance] = useState<UiPreferences>(defaultUiPreferences);
  const [profileMessage, setProfileMessage] = useState(
    "Actualiza tu información visible y tus preferencias sin salir del flujo docente."
  );
  const [photoMessage, setPhotoMessage] = useState(
    "Puedes subir un archivo JPG o PNG y dejarlo listo para la vista previa."
  );

  useEffect(() => {
    setShellRole(readPreferredRole());
    setProfile(readProfileState(defaultName));
    setAppearance(readUiPreferences());
  }, [defaultName]);

  function updateProfileField<K extends keyof ProfileState>(
    key: K,
    value: ProfileState[K]
  ) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function updateAppearanceField<K extends keyof UiPreferences>(
    key: K,
    value: UiPreferences[K]
  ) {
    setAppearance((current) => ({ ...current, [key]: value }));
  }

  function handleProfileSave() {
    writeProfileState(profile);
    setProfileMessage("Datos visibles guardados correctamente en este navegador.");
  }

  function handleAppearanceSave() {
    writeUiPreferences(appearance);
    setProfileMessage(
      "La apariencia visual se aplicó al sitio completo y ya quedó guardada."
    );
  }

  function handleAppearanceReset() {
    setAppearance(defaultUiPreferences);
    writeUiPreferences(defaultUiPreferences);
    setProfileMessage("La apariencia visual volvió a la configuración recomendada.");
  }

  function handlePhotoPicker() {
    fileInputRef.current?.click();
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0];

    if (!nextFile) {
      return;
    }

    const isSupportedType =
      nextFile.type === "image/jpeg" || nextFile.type === "image/png";
    const isSupportedSize = nextFile.size <= MAX_PHOTO_SIZE_MB * 1024 * 1024;

    if (!isSupportedType) {
      setPhotoMessage("Solo se admiten archivos JPG o PNG.");
      event.target.value = "";
      return;
    }

    if (!isSupportedSize) {
      setPhotoMessage(`La fotografía no debe superar ${MAX_PHOTO_SIZE_MB} MB.`);
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const nextProfile = {
        ...profile,
        photoDataUrl: String(reader.result),
        photoFileName: nextFile.name
      };

      setProfile(nextProfile);
      writeProfileState(nextProfile);
      setPhotoMessage(
        "Fotografía actualizada correctamente y disponible en tu perfil."
      );
    });

    reader.readAsDataURL(nextFile);
    event.target.value = "";
  }

  function handleRemovePhoto() {
    const nextProfile = {
      ...profile,
      photoDataUrl: null,
      photoFileName: null
    };

    setProfile(nextProfile);
    writeProfileState(nextProfile);
    setPhotoMessage("La fotografía personalizada se eliminó del perfil.");
  }

  function handleUseDefaultAvatar() {
    const nextProfile = {
      ...profile,
      photoDataUrl: null
    };

    setProfile(nextProfile);
    writeProfileState(nextProfile);
    setPhotoMessage(
      "Se aplicó el avatar predeterminado con tus iniciales para toda la plataforma."
    );
  }

  return (
    <AppShell
      role={shellRole}
      title="Perfil y personalización"
      subtitle="Administra tu información visible, fotografía y preferencias visuales dentro de una experiencia profesional y accesible."
    >
      <div className="dashboard-grid">
        <SectionCard
          title="Datos visibles"
          description="Información principal del usuario"
        >
          <div className="list-card">
            <div className="profile-header">
              {profile.photoDataUrl ? (
                <img
                  className="profile-photo"
                  src={profile.photoDataUrl}
                  alt="Fotografía de perfil"
                />
              ) : (
                <span className="profile-avatar">
                  {getInitials(profile.displayName || defaultName)}
                </span>
              )}
              <div>
                <strong>{profile.displayName}</strong>
                <p>{demoConfig.schoolName}</p>
              </div>
            </div>
          </div>
          <form className="form-grid" onSubmit={(event) => event.preventDefault()}>
            <label>
              Nombre visible
              <input
                type="text"
                value={profile.displayName}
                onChange={(event) =>
                  updateProfileField("displayName", event.target.value)
                }
              />
            </label>
            <label>
              Rol
              <input
                type="text"
                value={profile.roleLabel}
                onChange={(event) =>
                  updateProfileField("roleLabel", event.target.value)
                }
              />
            </label>
            <label className="full-span">
              Grupo principal
              <input
                type="text"
                value={profile.primaryGroup}
                onChange={(event) =>
                  updateProfileField("primaryGroup", event.target.value)
                }
              />
            </label>
          </form>
          <div className="cta-row">
            <button className="primary-button" type="button" onClick={handleProfileSave}>
              <AppIcon name="profile" size={16} />
              Guardar datos visibles
            </button>
          </div>
          <p className="action-feedback">{profileMessage}</p>
        </SectionCard>

        <SectionCard
          title="Fotografía de perfil"
          description="Carga, validación y vista previa"
          accent="sky"
        >
          <div className="stack-list">
            <article className="list-card compact profile-photo-card">
              <div className="profile-photo-stage">
                {profile.photoDataUrl ? (
                  <img
                    className="profile-photo-large"
                    src={profile.photoDataUrl}
                    alt="Vista previa de la fotografía de perfil"
                  />
                ) : (
                  <span className="profile-avatar profile-avatar-large">
                    {getInitials(profile.displayName || defaultName)}
                  </span>
                )}
              </div>
              <div className="stack-list compact-stack">
                <strong>
                  {profile.photoFileName || "Avatar predeterminado con iniciales"}
                </strong>
                <p>
                  Formatos admitidos: JPG y PNG con validación básica de tamaño
                  antes de guardarse.
                </p>
              </div>
            </article>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              hidden
              onChange={handlePhotoChange}
            />
            <div className="cta-row">
              <button className="primary-button" type="button" onClick={handlePhotoPicker}>
                <AppIcon name="profile" size={16} />
                {profile.photoDataUrl ? "Cambiar foto" : "Subir foto"}
              </button>
              <button
                className="ghost-button"
                type="button"
                onClick={handleRemovePhoto}
                disabled={!profile.photoDataUrl}
              >
                Eliminar foto
              </button>
              <button
                className="ghost-button"
                type="button"
                onClick={handleUseDefaultAvatar}
              >
                Usar avatar predeterminado
              </button>
            </div>
            <div className="inline-tags">
              <Tag>JPG</Tag>
              <Tag>PNG</Tag>
              <Tag>Hasta 3 MB</Tag>
            </div>
            <p className="action-feedback">{photoMessage}</p>
          </div>
        </SectionCard>
      </div>

      <div className="dashboard-grid">
        <SectionCard
          title="Apariencia visual"
          description="Controla tema, color principal, contraste y densidad"
        >
          <form className="form-grid" onSubmit={(event) => event.preventDefault()}>
            <label>
              Tema
              <select
                value={appearance.theme}
                onChange={(event) =>
                  updateAppearanceField("theme", event.target.value as ThemeMode)
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
                value={appearance.accent}
                onChange={(event) =>
                  updateAppearanceField("accent", event.target.value as AccentMode)
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
              Densidad visual
              <select
                value={appearance.density}
                onChange={(event) =>
                  updateAppearanceField("density", event.target.value as DensityMode)
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
                value={appearance.contrast}
                onChange={(event) =>
                  updateAppearanceField("contrast", event.target.value as ContrastMode)
                }
              >
                {appearanceOptions.contrasts.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </form>
          <div className="cta-row">
            <button
              className="primary-button"
              type="button"
              onClick={handleAppearanceSave}
            >
              <AppIcon name="settings" size={16} />
              Aplicar apariencia
            </button>
            <button
              className="ghost-button"
              type="button"
              onClick={handleAppearanceReset}
            >
              Restablecer
            </button>
          </div>
        </SectionCard>

        <SectionCard
          title="Vista previa de lectura"
          description="Así se verán tus materiales"
          accent="mint"
        >
          <div className="preview-card">
            <strong>Resumen con lectura clara</strong>
            <p>
              La interfaz mantiene estructura por bloques, alto contraste moderado y
              densidad configurable para priorizar comprensión y repaso postclase.
            </p>
            <div className="inline-tags">
              <Tag>
                {
                  appearanceOptions.themes.find((item) => item.value === appearance.theme)
                    ?.label
                }
              </Tag>
              <Tag>
                {
                  appearanceOptions.accents.find(
                    (item) => item.value === appearance.accent
                  )?.label
                }
              </Tag>
              <Tag>
                {
                  appearanceOptions.densities.find(
                    (item) => item.value === appearance.density
                  )?.label
                }
              </Tag>
              <Tag>
                {
                  appearanceOptions.contrasts.find(
                    (item) => item.value === appearance.contrast
                  )?.label
                }
              </Tag>
            </div>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
