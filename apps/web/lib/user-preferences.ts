"use client";

import type { UserRole } from "@aulaadapt/domain";

export const PREFERRED_ROLE_STORAGE_KEY = "aulaadapt-demo-role";
export const UI_PREFERENCES_STORAGE_KEY = "aulaadapt-ui-preferences";
export const PROFILE_STORAGE_KEY = "aulaadapt-profile";
export const SELECTED_TEMPLATE_STORAGE_KEY = "aulaadapt-selected-template";
export const FAVORITE_TEMPLATES_STORAGE_KEY = "aulaadapt-favorite-templates";
export const RECENT_DOWNLOADS_STORAGE_KEY = "aulaadapt-recent-downloads";

export const UI_PREFERENCES_EVENT = "aulaadapt:ui-preferences-updated";
export const PROFILE_EVENT = "aulaadapt:profile-updated";

export type ThemeMode = "light" | "dark";
export type AccentMode = "petroleum" | "academic" | "mint" | "turquoise";
export type DensityMode = "comfortable" | "compact";
export type ContrastMode = "standard" | "high";
export type TextSize = "normal" | "large" | "xlarge";
export type LanguageMode = "es" | "en";
export type DeliveryChannel = "platform" | "email";
export type NotificationMode = "enabled" | "disabled";

export type UiPreferences = {
  theme: ThemeMode;
  accent: AccentMode;
  density: DensityMode;
  contrast: ContrastMode;
  textSize: TextSize;
  language: LanguageMode;
  reduceNoise: boolean;
  deliveryChannel: DeliveryChannel;
  notifications: NotificationMode;
};

export type ProfileState = {
  displayName: string;
  roleLabel: string;
  primaryGroup: string;
  photoDataUrl: string | null;
  photoFileName: string | null;
};

export const defaultUiPreferences: UiPreferences = {
  theme: "light",
  accent: "petroleum",
  density: "comfortable",
  contrast: "standard",
  textSize: "large",
  language: "es",
  reduceNoise: true,
  deliveryChannel: "platform",
  notifications: "enabled"
};

export function buildDefaultProfileState(
  displayName: string,
  roleLabel = "Docente",
  primaryGroup = "5A · Biología"
): ProfileState {
  return {
    displayName,
    roleLabel,
    primaryGroup,
    photoDataUrl: null,
    photoFileName: null
  };
}

function parseStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  const storedValue = window.localStorage.getItem(key);

  if (!storedValue) {
    return fallback;
  }

  try {
    return {
      ...fallback,
      ...JSON.parse(storedValue)
    };
  } catch {
    return fallback;
  }
}

export function readUiPreferences(): UiPreferences {
  return parseStoredValue(UI_PREFERENCES_STORAGE_KEY, defaultUiPreferences);
}

export function readProfileState(
  displayName: string,
  roleLabel = "Docente",
  primaryGroup = "5A · Biología"
): ProfileState {
  return parseStoredValue(
    PROFILE_STORAGE_KEY,
    buildDefaultProfileState(displayName, roleLabel, primaryGroup)
  );
}

export function readPreferredRole(): UserRole {
  if (typeof window === "undefined") {
    return "teacher";
  }

  const storedRole = window.localStorage.getItem(PREFERRED_ROLE_STORAGE_KEY);

  if (storedRole === "student" || storedRole === "admin") {
    return storedRole;
  }

  return "teacher";
}

export function writeUiPreferences(nextPreferences: UiPreferences) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    UI_PREFERENCES_STORAGE_KEY,
    JSON.stringify(nextPreferences)
  );
  applyUiPreferences(nextPreferences);
  window.dispatchEvent(new CustomEvent(UI_PREFERENCES_EVENT));
}

export function writeProfileState(nextProfile: ProfileState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(nextProfile));
  window.dispatchEvent(new CustomEvent(PROFILE_EVENT));
}

export function applyUiPreferences(preferences: UiPreferences) {
  if (typeof document === "undefined") {
    return;
  }

  const { body, documentElement } = document;

  body.dataset.theme = preferences.theme;
  body.dataset.accent = preferences.accent;
  body.dataset.density = preferences.density;
  body.dataset.contrast = preferences.contrast;
  body.dataset.textSize = preferences.textSize;
  body.dataset.noise = preferences.reduceNoise ? "reduced" : "default";
  documentElement.lang = preferences.language;
}

export function getInitials(displayName: string) {
  return displayName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((fragment) => fragment.charAt(0).toUpperCase())
    .join("");
}

export const appearanceOptions = {
  themes: [
    { value: "light" as const, label: "Claro" },
    { value: "dark" as const, label: "Oscuro" }
  ],
  accents: [
    { value: "petroleum" as const, label: "Azul petróleo" },
    { value: "academic" as const, label: "Azul académico" },
    { value: "mint" as const, label: "Verde menta" },
    { value: "turquoise" as const, label: "Turquesa suave" }
  ],
  densities: [
    { value: "comfortable" as const, label: "Cómoda" },
    { value: "compact" as const, label: "Compacta" }
  ],
  contrasts: [
    { value: "standard" as const, label: "Estándar" },
    { value: "high" as const, label: "Alto contraste" }
  ],
  textSizes: [
    { value: "normal" as const, label: "Normal" },
    { value: "large" as const, label: "Grande" },
    { value: "xlarge" as const, label: "Muy grande" }
  ],
  languages: [
    { value: "es" as const, label: "Español" },
    { value: "en" as const, label: "English" }
  ],
  deliveryChannels: [
    { value: "platform" as const, label: "Plataforma interna" },
    { value: "email" as const, label: "Correo institucional" }
  ],
  notifications: [
    { value: "enabled" as const, label: "Activadas" },
    { value: "disabled" as const, label: "Desactivadas" }
  ]
};
