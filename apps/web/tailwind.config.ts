import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
      },
      backgroundColor: {
        glass: "var(--glass-bg)",
        sidebar: "var(--sidebar-bg)",
        "sidebar-active": "var(--sidebar-active)",
      },
      borderColor: {
        glass: "var(--glass-border)",
      },
      textColor: {
        sidebar: "var(--sidebar-text)",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
