import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import type { AppPage, FolderKey } from "@/types";
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

  // Calendar state
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => getMonday(new Date()));
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [eventDetailOpen, setEventDetailOpen] = useState(false);

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
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        activeFolder={activeFolder}
        onFolderChange={setActiveFolder}
        onAppPickerOpen={() => setAppPickerOpen(true)}
        unreadCount={unreadCount}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
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
        />

        <main className="flex-1 flex min-h-0 relative">
          {activePage === "email" && (
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
                  <ReadingPane email={selectedEmail} onBack={() => setSelectedId(null)} />
                </div>
              )}
              {composeOpen && (
                <div className="flex-1">
                  <ComposePanel onClose={() => setComposeOpen(false)} />
                </div>
              )}
            </>
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
    </div>
  );
}
