import { X, Clock, CalendarDays, MapPin, Users } from "lucide-react";
import type { CalendarEvent } from "@/data/events";
import { eventColorMap } from "@/data/events";

interface CalendarEventDetailProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

function formatTime12(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h! >= 12 ? "PM" : "AM";
  const hour12 = h! % 12 || 12;
  return m === 0 ? `${hour12} ${period}` : `${hour12}:${m!.toString().padStart(2, "0")} ${period}`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function CalendarEventDetail({
  event,
  isOpen,
  onClose,
}: CalendarEventDetailProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="absolute inset-0 bg-black/5 z-10"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`absolute top-0 right-0 h-full w-[500px] bg-bg-white border-l border-divider shadow-[-8px_0_30px_rgba(0,0,0,0.06)] z-20 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="h-14 border-b border-divider flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-2.5">
            {event && (
              <div className={`w-2.5 h-2.5 rounded-full ${eventColorMap[event.color].border.replace("border-l-", "bg-")}`} />
            )}
            <h2 className="text-sm font-semibold text-text-primary truncate">
              {event?.title ?? "Event Details"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Content */}
        {event && (
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="flex flex-col gap-4 mb-6">
              {/* Time */}
              <div className="flex items-center gap-3">
                <Clock className="w-[18px] h-[18px] text-text-tertiary shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-text-primary">
                  {formatTime12(event.startTime)} – {formatTime12(event.endTime)}
                </span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-3">
                <CalendarDays className="w-[18px] h-[18px] text-text-tertiary shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-text-secondary">
                  {formatDate(event.date)}
                </span>
              </div>

              {/* Location */}
              {event.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-[18px] h-[18px] text-text-tertiary shrink-0" strokeWidth={1.5} />
                  <span className="text-sm text-text-secondary">
                    {event.location}
                  </span>
                </div>
              )}

              {/* Attendees */}
              {event.attendees && event.attendees.length > 0 && (
                <div className="flex items-center gap-3">
                  <Users className="w-[18px] h-[18px] text-text-tertiary shrink-0" strokeWidth={1.5} />
                  <span className="text-sm text-text-secondary">
                    {event.attendees.join(", ")}
                  </span>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-divider mb-6" />

            {/* Description */}
            <div className="text-sm text-text-primary leading-[1.6] whitespace-pre-line">
              {event.description}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
