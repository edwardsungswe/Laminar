import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import type {
  AppPage,
  FolderKey,
  StorageSection,
  SettingsTab,
  EmailSubView,
  ComposeContext,
} from "@/types";
import { MOCK_EMAILS } from "@/data/emails";
import {
  events as MOCK_EVENTS,
  getWeekDates,
  formatWeekLabel,
} from "@/data/events";
import type { CalendarEvent } from "@/data/events";
import NewEventModal from "@/components/NewEventModal";
import LoginPage from "@/components/LoginPage";
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
import Toast from "@/components/Toast";

function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

const MOCK_USER = {
  name: "Bobby Jones",
  email: "email@email.com",
  password: "123",
};

export default function App() {
  // Auth state — auto-logged in for development
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = (email: string, password: string): boolean => {
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // App-level state
  const [activePage, setActivePage] = useState<AppPage>("email");
  const [appPickerOpen, setAppPickerOpen] = useState(false);

  // Email state
  const [emails, setEmails] = useState(() => [...MOCK_EMAILS]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeContext, setComposeContext] = useState<ComposeContext | null>(null);
  const [activeFolder, setActiveFolder] = useState<FolderKey>("inbox");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeEmailSubView, setActiveEmailSubView] =
    useState<EmailSubView>("mail");
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);

  // Calendar state
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() =>
    getMonday(new Date()),
  );
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [eventDetailOpen, setEventDetailOpen] = useState(false);
  const [calendarEvents, setCalendarEvents] =
    useState<CalendarEvent[]>(MOCK_EVENTS);
  const [newEventModalOpen, setNewEventModalOpen] = useState(false);

  // Storage state
  const [activeStorageSection, setActiveStorageSection] =
    useState<StorageSection>("all");
  const [storageViewMode, setStorageViewMode] = useState<"grid" | "list">(
    "grid",
  );
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [fileDetailOpen, setFileDetailOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [deleteConfirmFileId, setDeleteConfirmFileId] = useState<string | null>(
    null,
  );
  const [compressModalFileId, setCompressModalFileId] = useState<string | null>(
    null,
  );
  const [convertModalFileId, setConvertModalFileId] = useState<string | null>(
    null,
  );
  const [toastMessage, setToastMessage] = useState("");
  const [drivePickerOpen, setDrivePickerOpen] = useState(false);
  const [drivePickerMode, setDrivePickerMode] = useState<"save" | "attach">(
    "save",
  );

  // Settings state
  const [activeSettingsTab, setActiveSettingsTab] =
    useState<SettingsTab>("profile");

  // Derived email values
  const filteredEmails = useMemo(() => {
    let filtered: typeof emails;
    if (activeFolder === "starred") filtered = emails.filter((e) => e.isStarred);
    else if (activeFolder === "sent") filtered = [];
    else if (activeFolder === "draft") filtered = [];
    else if (activeFolder === "done") filtered = emails.filter((e) => e.isRead);
    else filtered = emails;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.from.name.toLowerCase().includes(q) ||
          e.subject.toLowerCase().includes(q) ||
          e.preview.toLowerCase().includes(q),
      );
    }
    return filtered;
  }, [activeFolder, searchQuery, emails]);

  const selectedEmail = useMemo(
    () => emails.find((e) => e.id === selectedId) ?? null,
    [selectedId, emails],
  );

  const unreadCount = useMemo(
    () => emails.filter((e) => !e.isRead).length,
    [emails],
  );

  // Derived calendar values
  const weekDates = useMemo(
    () => getWeekDates(currentWeekStart),
    [currentWeekStart],
  );
  const weekLabel = useMemo(
    () => formatWeekLabel(currentWeekStart),
    [currentWeekStart],
  );

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

  const handleCreateEvent = (event: CalendarEvent) => {
    setCalendarEvents((prev) => [...prev, event]);
    setNewEventModalOpen(false);
  };

  // Email mutation handlers
  const handleToggleStar = (id: string) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isStarred: !e.isStarred } : e)),
    );
  };

  const handleArchiveEmail = (id: string) => {
    setEmails((prev) => prev.filter((e) => e.id !== id));
    setSelectedId(null);
    setToastMessage("Email archived");
  };

  const handleDeleteEmail = (id: string) => {
    setEmails((prev) => prev.filter((e) => e.id !== id));
    setSelectedId(null);
    setToastMessage("Email deleted");
  };

  const handleToggleRead = (id: string) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isRead: !e.isRead } : e)),
    );
  };

  // Compose context handlers
  const handleReply = (email: typeof selectedEmail) => {
    if (!email) return;
    setComposeContext({
      to: email.from.email,
      subject: email.subject.startsWith("Re: ") ? email.subject : `Re: ${email.subject}`,
      body: `\n\n---\nOn ${email.date.toLocaleDateString()}, ${email.from.name} wrote:\n> ${email.body.plain.split("\n").join("\n> ")}`,
      mode: "reply",
    });
    setComposeOpen(true);
    setSelectedId(null);
  };

  const handleReplyAll = (email: typeof selectedEmail) => {
    if (!email) return;
    const allRecipients = [email.from.email, ...email.to.map((r) => r.email)].join(", ");
    setComposeContext({
      to: allRecipients,
      subject: email.subject.startsWith("Re: ") ? email.subject : `Re: ${email.subject}`,
      body: `\n\n---\nOn ${email.date.toLocaleDateString()}, ${email.from.name} wrote:\n> ${email.body.plain.split("\n").join("\n> ")}`,
      mode: "replyAll",
    });
    setComposeOpen(true);
    setSelectedId(null);
  };

  const handleForward = (email: typeof selectedEmail) => {
    if (!email) return;
    setComposeContext({
      to: "",
      subject: email.subject.startsWith("Fwd: ") ? email.subject : `Fwd: ${email.subject}`,
      body: `\n\n---\nForwarded message from ${email.from.name}:\n\n${email.body.plain}`,
      mode: "forward",
    });
    setComposeOpen(true);
    setSelectedId(null);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

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
          onLogout={handleLogout}
          user={MOCK_USER}
          onTodayClick={handleToday}
        />

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0">
          {!(
            activePage === "email" &&
            (activeEmailSubView === "blockTemplates" ||
              activeEmailSubView === "blockBuilder")
          ) && (
            <TopBar
              activePage={activePage}
              activeFolder={activeFolder}
              onComposeClick={() => {
                setComposeContext(null);
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
              onToggleViewMode={() =>
                setStorageViewMode((m) => (m === "grid" ? "list" : "grid"))
              }
              settingsTab={
                activePage === "profile" ? activeSettingsTab : undefined
              }
              onNewEvent={() => setNewEventModalOpen(true)}
            />
          )}

          <main className="flex-1 flex min-h-0 relative">
            {activePage === "email" && activeEmailSubView === "mail" && (
              <>
                <div
                  className={`bg-bg shrink-0 flex flex-col ${selectedEmail || composeOpen ? "w-[380px] border-r border-divider" : "flex-1"}`}
                >
                  {/* Search bar at top of email list */}
                  <div className="px-4 py-3 border-b border-divider shrink-0">
                    <div className="flex items-center gap-2 bg-surface rounded-lg px-3 py-2">
                      <Search
                        className="w-4 h-4 text-text-tertiary shrink-0"
                        strokeWidth={1.5}
                      />
                      <input
                        type="text"
                        placeholder="Search emails..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none w-full"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="cursor-pointer shrink-0"
                        >
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
                      onReply={() => handleReply(selectedEmail)}
                      onReplyAll={() => handleReplyAll(selectedEmail)}
                      onForward={() => handleForward(selectedEmail)}
                      onArchive={() => selectedEmail && handleArchiveEmail(selectedEmail.id)}
                      onDelete={() => selectedEmail && handleDeleteEmail(selectedEmail.id)}
                      onToggleStar={() => selectedEmail && handleToggleStar(selectedEmail.id)}
                      onToggleRead={() => selectedEmail && handleToggleRead(selectedEmail.id)}
                      onShowToast={setToastMessage}
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
                      composeContext={composeContext}
                    />
                  </div>
                )}
              </>
            )}

            {activePage === "email" &&
              activeEmailSubView === "blockTemplates" && (
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

            {activePage === "email" &&
              activeEmailSubView === "blockBuilder" && (
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
                  events={calendarEvents}
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
              <ProfileView
                activeTab={activeSettingsTab}
                user={MOCK_USER}
                onShowToast={setToastMessage}
              />
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

        {uploadModalOpen && (
          <UploadModal onClose={() => setUploadModalOpen(false)} />
        )}

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

        {convertModalFileId &&
          (() => {
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

        <NewEventModal
          isOpen={newEventModalOpen}
          onClose={() => setNewEventModalOpen(false)}
          onSave={handleCreateEvent}
          currentWeekStart={currentWeekStart}
        />

        <DrivePickerModal
          mode={drivePickerMode}
          isOpen={drivePickerOpen}
          onClose={() => {
            setDrivePickerOpen(false);
            setToastMessage(
              drivePickerMode === "save" ? "Saved to Drive" : "File attached",
            );
          }}
        />

        {/* App-level Toast */}
        {activePage !== "storage" && (
          <Toast
            message={toastMessage}
            isVisible={!!toastMessage}
            onDismiss={() => setToastMessage("")}
          />
        )}
      </div>
    </BlockTemplateProvider>
  );
}
