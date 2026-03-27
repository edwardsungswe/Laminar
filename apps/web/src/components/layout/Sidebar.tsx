import {
  Inbox,
  Star,
  Send,
  FileText,
  CheckCircle,
  ChevronDown,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { useUIStore } from "@/stores/uiStore";
import { FOLDERS } from "@/utils/constants";

const ICON_MAP: Record<string, React.ElementType> = {
  Inbox,
  Star,
  Send,
  FileText,
  CheckCircle,
};

export function Sidebar() {
  const {
    sidebarCollapsed,
    toggleSidebar,
    activeFolder,
    setActiveFolder,
  } = useUIStore();

  return (
    <aside
      className={`flex shrink-0 flex-col bg-sidebar transition-all duration-200 ${
        sidebarCollapsed ? "w-16" : "w-56"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4">
        {!sidebarCollapsed && (
          <span className="text-lg font-semibold text-sidebar">Laminar</span>
        )}
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-1.5 text-sidebar transition-colors hover:bg-sidebar-active"
        >
          {sidebarCollapsed ? (
            <PanelLeft size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 px-2">
        {FOLDERS.map((folder) => {
          const Icon = ICON_MAP[folder.icon];
          const isActive = activeFolder === folder.id;

          return (
            <button
              key={folder.id}
              onClick={() => setActiveFolder(folder.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-sidebar-active font-medium text-white"
                  : "text-sidebar hover:bg-sidebar-active"
              } ${sidebarCollapsed ? "justify-center" : ""}`}
            >
              {Icon && <Icon size={18} />}
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1 text-left">{folder.name}</span>
                  {folder.count != null && (
                    <span className="text-xs opacity-70">{folder.count}</span>
                  )}
                </>
              )}
            </button>
          );
        })}

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar transition-colors hover:bg-sidebar-active">
          <ChevronDown size={18} />
          {!sidebarCollapsed && <span>More...</span>}
        </button>
      </nav>
    </aside>
  );
}
