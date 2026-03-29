import { ChevronLeft, ChevronRight, Plus, PenSquare, Upload, LayoutGrid, List } from "lucide-react";
import type { AppPage, FolderKey, StorageSection, SettingsTab } from "@/types";

const settingsTabLabels: Record<SettingsTab, string> = {
  profile: "Profile",
  theme: "Theme",
  notifications: "Notifications",
  account: "Account",
  security: "Security",
};

const storageSectionLabels: Record<StorageSection, string> = {
  all: "All Files",
  favorites: "Favorites",
  recent: "Recent",
  shared: "Shared",
  trash: "Trash",
};

const folderLabels: Record<FolderKey, string> = {
  inbox: "Inbox",
  starred: "Starred",
  sent: "Sent",
  draft: "Draft",
  done: "Done",
};

interface TopBarProps {
  activePage: AppPage;
  activeFolder?: FolderKey;
  onComposeClick?: () => void;
  weekLabel?: string;
  onPrevWeek?: () => void;
  onNextWeek?: () => void;
  onToday?: () => void;
  storageSection?: StorageSection;
  onUploadClick?: () => void;
  storageViewMode?: "grid" | "list";
  onToggleViewMode?: () => void;
  settingsTab?: SettingsTab;
}

export default function TopBar({
  activePage,
  activeFolder,
  onComposeClick,
  weekLabel,
  onPrevWeek,
  onNextWeek,
  onToday,
  storageSection,
  onUploadClick,
  storageViewMode,
  onToggleViewMode,
  settingsTab,
}: TopBarProps) {
  return (
    <header className="h-14 border-b border-divider flex items-center px-6 gap-4 bg-bg-white shrink-0">
      {activePage === "email" && (
        <>
          <h1 className="text-base font-semibold text-text-primary">
            {activeFolder ? folderLabels[activeFolder] : "Inbox"}
          </h1>

          <div className="flex-1" />

          <button
            onClick={onComposeClick}
            className="h-9 px-4 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors duration-100 flex items-center gap-2 cursor-pointer"
          >
            <PenSquare className="w-4 h-4" strokeWidth={1.5} />
            Compose
          </button>
        </>
      )}

      {activePage === "calendar" && (
        <>
          {/* Week label + nav */}
          <h1 className="text-base font-semibold text-text-primary">
            {weekLabel}
          </h1>

          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={onPrevWeek}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={onNextWeek}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={onToday}
              className="h-8 px-3 text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-100 cursor-pointer"
            >
              Today
            </button>
          </div>

          <div className="flex-1" />

          <button
            onClick={() => {}}
            className="h-9 px-4 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors duration-100 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            New Event
          </button>
        </>
      )}

      {activePage === "profile" && (
        <>
          <h1 className="text-base font-semibold text-text-primary">
            {settingsTab ? settingsTabLabels[settingsTab] : "Profile"}
          </h1>
          <div className="flex-1" />
        </>
      )}

      {activePage === "storage" && (
        <>
          <h1 className="text-base font-semibold text-text-primary">
            {storageSection ? storageSectionLabels[storageSection] : "All Files"}
          </h1>

          <div className="flex-1" />

          {/* View mode toggle */}
          <div className="bg-surface rounded-lg p-0.5 flex items-center">
            <button
              onClick={storageViewMode !== "grid" ? onToggleViewMode : undefined}
              className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-100 cursor-pointer ${
                storageViewMode === "grid"
                  ? "bg-bg-white shadow-sm text-text-primary"
                  : "text-text-tertiary hover:text-text-secondary"
              }`}
            >
              <LayoutGrid className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={storageViewMode !== "list" ? onToggleViewMode : undefined}
              className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-100 cursor-pointer ${
                storageViewMode === "list"
                  ? "bg-bg-white shadow-sm text-text-primary"
                  : "text-text-tertiary hover:text-text-secondary"
              }`}
            >
              <List className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

          <button
            onClick={onUploadClick}
            className="h-9 px-4 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors duration-100 flex items-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4" strokeWidth={1.5} />
            Upload
          </button>
        </>
      )}
    </header>
  );
}
