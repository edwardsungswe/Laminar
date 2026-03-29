import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { THEME_PRESETS } from "@/utils/constants";

const STORAGE_KEY = "laminar-theme";

/** Map a ThemePreset's accent colors onto the CSS custom properties used by @theme in index.css */
function applyTheme(presetName: string) {
  const preset = THEME_PRESETS.find((p) => p.name === presetName);
  if (!preset) return;

  const root = document.documentElement.style;
  root.setProperty("--color-accent", preset.colors.accent);
  root.setProperty("--color-accent-hover", preset.colors.accentHover);
}

function clearTheme() {
  const root = document.documentElement.style;
  root.removeProperty("--color-accent");
  root.removeProperty("--color-accent-hover");
}

export default function ThemeTab() {
  const [activeTheme, setActiveTheme] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEY);
  });

  // Apply saved theme on mount
  useEffect(() => {
    if (activeTheme) {
      applyTheme(activeTheme);
    }
  }, []);

  const handleSelect = (name: string) => {
    if (activeTheme === name) {
      // Deselect — revert to default
      setActiveTheme(null);
      localStorage.removeItem(STORAGE_KEY);
      clearTheme();
      return;
    }
    setActiveTheme(name);
    localStorage.setItem(STORAGE_KEY, name);
    applyTheme(name);
  };

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-2xl">
        <h2 className="text-lg font-semibold text-text-primary mb-1">Theme</h2>
        <p className="text-sm text-text-secondary mb-6">
          Choose an accent color for the interface.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {/* Default theme card */}
          <button
            onClick={() => {
              setActiveTheme(null);
              localStorage.removeItem(STORAGE_KEY);
              clearTheme();
            }}
            className={`relative flex flex-col items-start gap-3 p-4 rounded-xl border transition-colors duration-100 cursor-pointer ${
              activeTheme === null
                ? "border-accent bg-surface"
                : "border-divider bg-bg-white hover:border-text-tertiary"
            }`}
          >
            {/* Default swatch — solid accent from CSS defaults */}
            <div
              className="w-full h-16 rounded-lg"
              style={{ background: "#c07a40" }}
            />
            <span className="text-sm font-medium text-text-primary">Default</span>
            {activeTheme === null && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
              </div>
            )}
          </button>

          {THEME_PRESETS.map((preset) => {
            const isActive = activeTheme === preset.name;
            return (
              <button
                key={preset.name}
                onClick={() => handleSelect(preset.name)}
                className={`relative flex flex-col items-start gap-3 p-4 rounded-xl border transition-colors duration-100 cursor-pointer ${
                  isActive
                    ? "border-accent bg-surface"
                    : "border-divider bg-bg-white hover:border-text-tertiary"
                }`}
              >
                {/* Gradient preview */}
                <div
                  className="w-full h-16 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${preset.colors.gradientFrom}, ${preset.colors.gradientTo})`,
                  }}
                />
                <span className="text-sm font-medium text-text-primary capitalize">
                  {preset.name}
                </span>
                {isActive && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
