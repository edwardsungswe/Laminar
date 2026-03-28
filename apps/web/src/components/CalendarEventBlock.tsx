import { HOUR_HEIGHT, DAY_START_HOUR, eventColorMap } from "@/data/events";
import type { CalendarEvent } from "@/data/events";

interface CalendarEventBlockProps {
  event: CalendarEvent;
  onClick: (event: CalendarEvent) => void;
}

function parseTime(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h! + m! / 60;
}

function formatTime12(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h! >= 12 ? "PM" : "AM";
  const hour12 = h! % 12 || 12;
  return m === 0 ? `${hour12} ${period}` : `${hour12}:${m!.toString().padStart(2, "0")} ${period}`;
}

export default function CalendarEventBlock({ event, onClick }: CalendarEventBlockProps) {
  const startDecimal = parseTime(event.startTime);
  const endDecimal = parseTime(event.endTime);
  const durationHours = endDecimal - startDecimal;

  const top = (startDecimal - DAY_START_HOUR) * HOUR_HEIGHT;
  const height = durationHours * HOUR_HEIGHT;

  const colors = eventColorMap[event.color];
  const showTime = durationHours >= 0.75;

  return (
    <button
      onClick={() => onClick(event)}
      className={`absolute left-1 right-1 rounded-md px-2.5 py-1.5 border-l-2 cursor-pointer transition-shadow duration-100 hover:shadow-sm overflow-hidden text-left ${colors.bg} ${colors.border}`}
      style={{ top: `${top}px`, height: `${height}px` }}
    >
      <p className={`text-xs font-medium truncate ${colors.text}`}>
        {event.title}
      </p>
      {showTime && (
        <p className="text-[10px] text-text-secondary mt-0.5">
          {formatTime12(event.startTime)} – {formatTime12(event.endTime)}
        </p>
      )}
    </button>
  );
}
