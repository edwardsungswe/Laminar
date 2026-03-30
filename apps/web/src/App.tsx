import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import type { AppPage, FolderKey, StorageSection, SettingsTab, EmailSubView } from "@/types";
import { MOCK_EMAILS, getEmailsByFolder } from "@/data/emails";
import { getWeekDates, formatWeekLabel } from "@/data/events";
import type { CalendarEvent } from "@/data/events";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import EmailList from "@/components/EmailList";
import ReadingPane from "@/components/ReadingPane";
import ComposePanel from "@/components/ComposePanel";
import CalendarWeekView from "@/components/CalendarWeekView";
import CalendarEventDetail from "@/components/CalendarEventDetail";
import AppPickerModal from "@/components/AppPickerModal";
import StorageView from "@/components/StorageView";
import UploadModal from "@/components/UploadModal";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import CompressDialog from "@/components/CompressDialog";
import ConvertDialog from "@/components/ConvertDialog";
import DrivePickerModal from "@/components/DrivePickerModal";
import ProfileView from "@/components/profile/ProfileView";
import BlockTemplatesView from "@/components/blocks/BlockTemplatesView";
import BlockBuilder from "@/components/blocks/BlockBuilder";
import { BlockTemplateProvider } from "@/stores/BlockTemplateContext";
import { getFileById } from "@/data/files";

function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

export default function App() {
  // App-level state
  const [activePage, setActivePage] = useState<AppPage>("email");
  const [appPickerOpen, setAppPickerOpen] = useState(false);

  // Email state
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [activeFolder, setActiveFolder] = useState<FolderKey>("inbox");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeEmailSubView, setActiveEmailSubView] = useState<EmailSubView>("mail");
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);

  // Calendar state
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => getMonday(new Date()));
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [eventDetailOpen, setEventDetailOpen] = useState(false);

  // Storage state
  const [activeStorageSection, setActiveStorageSection] = useState<StorageSection>("all");
  const [storageViewMode, setStorageViewMode] = useState<"grid" | "list">("grid");
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [fileDetailOpen, setFileDetailOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [deleteConfirmFileId, setDeleteConfirmFileId] = useState<string | null>(null);
  const [compressModalFileId, setCompressModalFileId] = useState<string | null>(null);
  const [convertModalFileId, setConvertModalFileId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [drivePickerOpen, setDrivePickerOpen] = useState(false);
  const [drivePickerMode, setDrivePickerMode] = useState<"save" | "attach">("save");

  // Settings state
  const [activeSettingsTab, setActiveSettingsTab] = useState<SettingsTab>("profile");

  // Derived email values
  const filteredEmails = useMemo(() => {
    let filtered = getEmailsByFolder(activeFolder);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.from.name.toLowerCase().includes(q) ||
          e.subject.toLowerCase().includes(q) ||
          e.preview.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [activeFolder, searchQuery]);

  const selectedEmail = useMemo(
    () => MOCK_EMAILS.find((e) => e.id === selectedId) ?? null,
    [selectedId]
  );

  const unreadCount = useMemo(
    () => MOCK_EMAILS.filter((e) => !e.isRead).length,
    []
  );

  // Derived calendar values
  const weekDates = useMemo(() => getWeekDates(currentWeekStart), [currentWeekStart]);
  const weekLabel = useMemo(() => formatWeekLabel(currentWeekStart), [currentWeekStart]);

  // Calendar navigation
  const handlePrevWeek = () => {
    setCurrentWeekStart((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
  };

  const handleNextWeek = () => {
    setCurrentWeekStart((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  };

  const handleToday = () => {
    setCurrentWeekStart(getMonday(new Date()));
  };

  return (
    <BlockTemplateProvider>
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        activeFolder={activeFolder}
        onFolderChange={(folder) => {
          setActiveFolder(folder);
          setActiveEmailSubView("mail");
        }}
        onAppPickerOpen={() => setAppPickerOpen(true)}
        unreadCount={unreadCount}
        activeStorageSection={activeStorageSection}
        onStorageSectionChange={(section) => {
          setActiveStorageSection(section);
          setCurrentFolderId(null);
          setSelectedFileId(null);
          setFileDetailOpen(false);
        }}
        onProfileClick={() => setActivePage("profile")}
        activeSettingsTab={activeSettingsTab}
        onSettingsTabChange={setActiveSettingsTab}
        activeEmailSubView={activeEmailSubView}
        onEmailSubViewChange={setActiveEmailSubView}
        onCreateNewBlock={() => setEditingBlockId(null)}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {!(activePage === "email" && (activeEmailSubView === "blockTemplates" || activeEmailSubView === "blockBuilder")) && (
          <TopBar
            activePage={activePage}
            activeFolder={activeFolder}
            onComposeClick={() => {
              setComposeOpen(true);
              setSelectedId(null);
            }}
            weekLabel={weekLabel}
            onPrevWeek={handlePrevWeek}
            onNextWeek={handleNextWeek}
            onToday={handleToday}
            storageSection={activeStorageSection}
            onUploadClick={() => setUploadModalOpen(true)}
            storageViewMode={storageViewMode}
            onToggleViewMode={() => setStorageViewMode((m) => m === "grid" ? "list" : "grid")}
            settingsTab={activePage === "profile" ? activeSettingsTab : undefined}
          />
        )}

        <main className="flex-1 flex min-h-0 relative">
          {activePage === "email" && activeEmailSubView === "mail" && (
            <>
              <div className={`bg-bg shrink-0 flex flex-col ${selectedEmail || composeOpen ? "w-[380px] border-r border-divider" : "flex-1"}`}>
                {/* Search bar at top of email list */}
                <div className="px-4 py-3 border-b border-divider shrink-0">
                  <div className="flex items-center gap-2 bg-surface rounded-lg px-3 py-2">
                    <Search className="w-4 h-4 text-text-tertiary shrink-0" strokeWidth={1.5} />
                    <input
                      type="text"
                      placeholder="Search emails..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none w-full"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery("")} className="cursor-pointer shrink-0">
                        <X className="w-3.5 h-3.5 text-text-tertiary hover:text-text-primary" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <EmailList
                    emails={filteredEmails}
                    selectedId={selectedId}
                    onSelect={(id) => {
                      setSelectedId(id);
                      setComposeOpen(false);
                    }}
                    expanded={!selectedEmail && !composeOpen}
                  />
                </div>
              </div>
              {selectedEmail && !composeOpen && (
                <div className="flex-1 bg-bg-white">
                  <ReadingPane
                    email={selectedEmail}
                    onBack={() => setSelectedId(null)}
                    onSaveToDrive={() => {
                      setDrivePickerMode("save");
                      setDrivePickerOpen(true);
                    }}
                  />
                </div>
              )}
              {composeOpen && (
                <div className="flex-1">
                  <ComposePanel
                    onClose={() => setComposeOpen(false)}
                    onAttachFromDrive={() => {
                      setDrivePickerMode("attach");
                      setDrivePickerOpen(true);
                    }}
                  />
                </div>
              )}
            </>
          )}

          {activePage === "email" && activeEmailSubView === "blockTemplates" && (
            <BlockTemplatesView
              onEditTemplate={(id) => {
                setEditingBlockId(id);
                setActiveEmailSubView("blockBuilder");
              }}
              onCreateNew={() => {
                setEditingBlockId(null);
                setActiveEmailSubView("blockBuilder");
              }}
            />
          )}

          {activePage === "email" && activeEmailSubView === "blockBuilder" && (
            <BlockBuilder
              templateId={editingBlockId}
              onBack={() => {
                setEditingBlockId(null);
                setActiveEmailSubView("blockTemplates");
              }}
            />
          )}

          {activePage === "calendar" && (
            <>
              <CalendarWeekView
                weekDates={weekDates}
                onEventClick={(event) => {
                  setSelectedEvent(event);
                  setEventDetailOpen(true);
                }}
              />
              <CalendarEventDetail
                event={selectedEvent}
                isOpen={eventDetailOpen}
                onClose={() => setEventDetailOpen(false)}
              />
            </>
          )}

          {activePage === "profile" && (
            <ProfileView activeTab={activeSettingsTab} />
          )}

          {activePage === "storage" && (
            <StorageView
              section={activeStorageSection}
              viewMode={storageViewMode}
              currentFolderId={currentFolderId}
              onFolderOpen={(id) => {
                setCurrentFolderId(id);
                setSelectedFileId(null);
                setFileDetailOpen(false);
              }}
              onNavigateUp={(id) => {
                setCurrentFolderId(id);
                setSelectedFileId(null);
                setFileDetailOpen(false);
              }}
              selectedFileId={selectedFileId}
              onFileSelect={setSelectedFileId}
              onFileDetailOpen={() => setFileDetailOpen(true)}
              fileDetailOpen={fileDetailOpen}
              onFileDetailClose={() => setFileDetailOpen(false)}
              onUploadOpen={() => setUploadModalOpen(true)}
              onDeleteFile={(id) => setDeleteConfirmFileId(id)}
              onCompressFile={(id) => setCompressModalFileId(id)}
              onConvertFile={(id) => setConvertModalFileId(id)}
              onFavoriteToggle={() => setToastMessage("Favorites updated")}
              toastMessage={toastMessage}
              onToastDismiss={() => setToastMessage("")}
            />
          )}
        </main>
      </div>

      {/* App Picker Modal */}
      <AppPickerModal
        isOpen={appPickerOpen}
        activePage={activePage}
        onSelectApp={(page) => {
          setActivePage(page);
          setAppPickerOpen(false);
        }}
        onClose={() => setAppPickerOpen(false)}
      />

      {uploadModalOpen && <UploadModal onClose={() => setUploadModalOpen(false)} />}

      {deleteConfirmFileId && (
        <DeleteConfirmDialog
          fileName={getFileById(deleteConfirmFileId)?.name ?? ""}
          onConfirm={() => {
            setDeleteConfirmFileId(null);
            setToastMessage("File moved to trash");
          }}
          onCancel={() => setDeleteConfirmFileId(null)}
        />
      )}

      {compressModalFileId && (
        <CompressDialog
          fileName={getFileById(compressModalFileId)?.name ?? ""}
          onClose={() => {
            setCompressModalFileId(null);
            setToastMessage("File compressed");
          }}
        />
      )}

      {convertModalFileId && (() => {
        const f = getFileById(convertModalFileId);
        return f ? (
          <ConvertDialog
            fileName={f.name}
            fileType={f.type}
            onClose={() => {
              setConvertModalFileId(null);
              setToastMessage("File converted");
            }}
          />
        ) : null;
      })()}

      <DrivePickerModal
        mode={drivePickerMode}
        isOpen={drivePickerOpen}
        onClose={() => {
          setDrivePickerOpen(false);
          setToastMessage(drivePickerMode === "save" ? "Saved to Drive" : "File attached");
        }}
      />
    </div>
    </BlockTemplateProvider>
  );
}
