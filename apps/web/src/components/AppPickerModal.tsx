import { useEffect } from "react";
import { Mail, CalendarDays, HardDrive, X } from "lucide-react";
import type { AppPage } from "@/types";

interface AppPickerModalProps {
  isOpen: boolean;
  activePage: AppPage;
  onSelectApp: (page: AppPage) => void;
  onClose: () => void;
}

const apps: { page: AppPage; label: string; icon: typeof Mail; description: string }[] = [
  { page: "email", label: "Email", icon: Mail, description: "Messages and conversations" },
  { page: "calendar", label: "Calendar", icon: CalendarDays, description: "Events and schedule" },
  { page: "storage" as AppPage, label: "Drive", icon: HardDrive, description: "Files and documents" },
];

export default function AppPickerModal({
  isOpen,
  activePage,
  onSelectApp,
  onClose,
}: AppPickerModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* Modal — anchored to the right of the sidebar */}
      <div className="absolute left-[224px] bottom-12 bg-bg-white rounded-xl shadow-lg border border-divider w-[200px] p-3 animate-in">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">Apps</h2>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-md flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
          >
            <X className="w-3 h-3" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {apps.map((app) => (
            <button
              key={app.page}
              onClick={() => onSelectApp(app.page)}
              className={`w-full px-3 py-2.5 rounded-lg flex items-center gap-3 transition-colors duration-100 cursor-pointer ${
                activePage === app.page
                  ? "bg-surface text-accent"
                  : "text-text-secondary hover:bg-surface/50 hover:text-text-primary"
              }`}
            >
              <app.icon className="w-[18px] h-[18px] shrink-0" strokeWidth={1.5} />
              <span className="text-sm font-medium">{app.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
