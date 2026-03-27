import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ThemeColors } from "@/types";
import { THEME_PRESETS } from "@/utils/constants";

interface SettingsState {
  theme: string;
  setTheme: (name: string) => void;
}

function applyThemeColors(colors: ThemeColors) {
  const root = document.documentElement;
  root.style.setProperty("--gradient-from", colors.gradientFrom);
  root.style.setProperty("--gradient-to", colors.gradientTo);
  root.style.setProperty("--glass-bg", colors.glassBg);
  root.style.setProperty("--glass-border", colors.glassBorder);
  root.style.setProperty("--accent", colors.accent);
  root.style.setProperty("--accent-hover", colors.accentHover);
  root.style.setProperty("--sidebar-bg", colors.sidebarBg);
  root.style.setProperty("--sidebar-text", colors.sidebarText);
  root.style.setProperty("--sidebar-active", colors.sidebarActive);
}

export function applyTheme(themeName: string) {
  const preset = THEME_PRESETS.find((p) => p.name === themeName);
  if (preset) {
    applyThemeColors(preset.colors);
  }
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "ocean",
      setTheme: (name: string) => {
        applyTheme(name);
        set({ theme: name });
      },
    }),
    { name: "laminar-settings" },
  ),
);
