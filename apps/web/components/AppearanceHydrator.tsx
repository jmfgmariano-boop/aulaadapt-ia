"use client";

import { useEffect } from "react";
import {
  UI_PREFERENCES_EVENT,
  applyUiPreferences,
  readUiPreferences
} from "../lib/user-preferences";

export function AppearanceHydrator() {
  useEffect(() => {
    const syncPreferences = () => {
      applyUiPreferences(readUiPreferences());
    };

    syncPreferences();
    window.addEventListener(UI_PREFERENCES_EVENT, syncPreferences);
    window.addEventListener("storage", syncPreferences);

    return () => {
      window.removeEventListener(UI_PREFERENCES_EVENT, syncPreferences);
      window.removeEventListener("storage", syncPreferences);
    };
  }, []);

  return null;
}
