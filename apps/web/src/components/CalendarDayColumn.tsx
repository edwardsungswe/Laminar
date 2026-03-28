import { HOUR_HEIGHT, DAY_START_HOUR, DAY_END_HOUR, getEventsForDate } from "@/data/events";
import type { CalendarEvent } from "@/data/events";
import CalendarEventBlock from "./CalendarEventBlock";

interface CalendarDayColumnProps {
  date: string;
  dayLabel: string;
  dateNumber: number;
  isToday: boolean;
  onEventClick: (event: CalendarEvent) => void;
}

const totalHours = DAY_END_HOUR - DAY_START_HOUR;

export default function CalendarDayColumn({
  date,
  dayLabel,
  dateNumber,
  isToday,
  onEventClick,
}: CalendarDayColumnProps) {
  const dayEvents = getEventsForDate(date);

  return (
    <div className={`flex-1 min-w-0 border-r border-divider last:border-r-0 ${isToday ? "bg-accent/[0.02]" : ""}`}>
      {/* Day header */}
      <div className="sticky top-0 z-10 bg-bg-white border-b border-divider px-2 py-3 text-center">
        <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">
          {dayLabel}
        </p>
        <div
          className={`inline-flex items-center justify-center text-sm font-semibold ${
            isToday
              ? "w-7 h-7 rounded-full bg-accent text-white"
              : "text-text-primary"
          }`}
        >
          {dateNumber}
        </div>
      </div>

      {/* Time grid */}
      <div className="relative" style={{ height: `${totalHours * HOUR_HEIGHT}px` }}>
        {/* Hour gridlines */}
        {Array.from({ length: totalHours }, (_, i) => (
          <div
            key={i}
            className="absolute w-full border-t border-divider"
            style={{ top: `${i * HOUR_HEIGHT}px` }}
          />
        ))}

        {/* Events */}
        {dayEvents.map((event) => (
          <CalendarEventBlock
            key={event.id}
            event={event}
            onClick={onEventClick}
          />
        ))}
      </div>
    </div>
  );
}
