import { ChevronLeft, ChevronRight, Plus, PenSquare } from "lucide-react";
import type { AppPage, FolderKey } from "@/types";

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
}

export default function TopBar({
  activePage,
  activeFolder,
  onComposeClick,
  weekLabel,
  onPrevWeek,
  onNextWeek,
  onToday,
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
    </header>
  );
}
