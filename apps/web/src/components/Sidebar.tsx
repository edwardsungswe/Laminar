import { useState } from "react";
import { Inbox, Send, Star, FileText, CheckCircle, CalendarDays, Calendar, Clock, LayoutGrid, FolderOpen, Users, Trash2, User, Palette, Bell, Settings, Shield, ChevronRight, LayoutTemplate, Hammer } from "lucide-react";
import type { AppPage, FolderKey, StorageSection, SettingsTab, EmailSubView } from "@/types";
import SidebarNavItem from "./SidebarNavItem";

interface SidebarProps {
  activePage: AppPage;
  activeFolder: FolderKey;
  onFolderChange: (folder: FolderKey) => void;
  onAppPickerOpen: () => void;
  unreadCount: number;
  activeStorageSection?: StorageSection;
  onStorageSectionChange?: (section: StorageSection) => void;
  onProfileClick: () => void;
  activeSettingsTab?: SettingsTab;
  onSettingsTabChange?: (tab: SettingsTab) => void;
  activeEmailSubView?: EmailSubView;
  onEmailSubViewChange?: (view: EmailSubView) => void;
  onCreateNewBlock?: () => void;
}

const settingsNav: { value: SettingsTab; label: string; icon: typeof User }[] = [
  { value: "profile", label: "Profile", icon: User },
  { value: "theme", label: "Theme", icon: Palette },
  { value: "notifications", label: "Notifications", icon: Bell },
  { value: "account", label: "Account", icon: Settings },
  { value: "security", label: "Security", icon: Shield },
];

const storageNav: { value: StorageSection; label: string; icon: typeof FolderOpen }[] = [
  { value: "all", label: "All Files", icon: FolderOpen },
  { value: "favorites", label: "Favorites", icon: Star },
  { value: "recent", label: "Recent", icon: Clock },
  { value: "shared", label: "Shared", icon: Users },
  { value: "trash", label: "Trash", icon: Trash2 },
];

const emailNav: { value: FolderKey; label: string; icon: typeof Inbox }[] = [
  { value: "inbox", label: "Inbox", icon: Inbox },
  { value: "starred", label: "Starred", icon: Star },
  { value: "sent", label: "Sent", icon: Send },
  { value: "draft", label: "Draft", icon: FileText },
  { value: "done", label: "Done", icon: CheckCircle },
];

export default function Sidebar({
  activePage,
  activeFolder,
  onFolderChange,
  onAppPickerOpen,
  unreadCount,
  activeStorageSection,
  onStorageSectionChange,
  onProfileClick,
  activeSettingsTab,
  onSettingsTabChange,
  activeEmailSubView,
  onEmailSubViewChange,
  onCreateNewBlock,
}: SidebarProps) {
  const [blocksExpanded, setBlocksExpanded] = useState(false);

  return (
    <aside className="w-[220px] h-full bg-bg-white border-r border-divider flex flex-col shrink-0">
      {/* Wordmark */}
      <div className="px-5 pt-5 pb-6">
        <span className="text-base font-semibold tracking-wide text-text-primary select-none">
          Laminar
        </span>
      </div>

      {/* Page-specific nav */}
      <nav className="px-3 flex flex-col gap-0.5">
        {activePage === "email" && (
          <>
            {emailNav.map((item) => (
              <SidebarNavItem
                key={item.value}
                icon={item.icon}
                label={item.label}
                isActive={activeEmailSubView === "mail" && activeFolder === item.value}
                onClick={() => {
                  onFolderChange(item.value);
                  onEmailSubViewChange?.("mail");
                }}
                badge={item.value === "inbox" ? unreadCount : undefined}
              />
            ))}

            {/* Blocks divider and section */}
            <div className="border-t border-divider my-2 mx-2" />

            <button
              onClick={() => setBlocksExpanded((prev) => !prev)}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-text-tertiary hover:text-text-secondary transition-colors duration-100 cursor-pointer"
            >
              <ChevronRight
                className={`w-3.5 h-3.5 shrink-0 transition-transform duration-150 ${blocksExpanded ? "rotate-90" : ""}`}
                strokeWidth={2}
              />
              <span>Blocks</span>
            </button>

            {blocksExpanded && (
              <div className="pl-2 flex flex-col gap-0.5">
                <SidebarNavItem
                  icon={LayoutTemplate}
                  label="Block Templates"
                  isActive={activeEmailSubView === "blockTemplates"}
                  onClick={() => onEmailSubViewChange?.("blockTemplates")}
                />
                <SidebarNavItem
                  icon={Hammer}
                  label="Block Builder"
                  isActive={activeEmailSubView === "blockBuilder"}
                  onClick={() => {
                    onCreateNewBlock?.();
                    onEmailSubViewChange?.("blockBuilder");
                  }}
                />
              </div>
            )}
          </>
        )}
        {activePage === "calendar" && (
          <>
            <SidebarNavItem
              icon={CalendarDays}
              label="This Week"
              isActive={true}
              onClick={() => {}}
            />
            <SidebarNavItem
              icon={Calendar}
              label="Month"
              isActive={false}
              onClick={() => {}}
              disabled
            />
            <SidebarNavItem
              icon={Clock}
              label="Upcoming"
              isActive={false}
              onClick={() => {}}
              disabled
            />
          </>
        )}
        {activePage === "storage" &&
          storageNav.map((item) => (
            <SidebarNavItem
              key={item.value}
              icon={item.icon}
              label={item.label}
              isActive={activeStorageSection === item.value}
              onClick={() => onStorageSectionChange?.(item.value)}
            />
          ))}
        {activePage === "profile" &&
          settingsNav.map((item) => (
            <SidebarNavItem
              key={item.value}
              icon={item.icon}
              label={item.label}
              isActive={activeSettingsTab === item.value}
              onClick={() => onSettingsTabChange?.(item.value)}
            />
          ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom section */}
      <div className="px-3 pb-4">
        <button
          onClick={onAppPickerOpen}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-surface/50 hover:text-text-primary transition-colors duration-100 cursor-pointer"
        >
          <LayoutGrid className="w-[18px] h-[18px] shrink-0" strokeWidth={1.5} />
          <span>Apps</span>
        </button>

        <div className="border-t border-divider my-2 mx-2" />

        <button
          onClick={onProfileClick}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-surface/50 transition-colors duration-100 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-[11px] font-medium text-text-secondary shrink-0 select-none">
            You
          </div>
          <span className="text-xs text-text-tertiary truncate">you@laminar.design</span>
        </button>
      </div>
    </aside>
  );
}
