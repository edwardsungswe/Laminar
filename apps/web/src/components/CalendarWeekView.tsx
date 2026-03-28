import { useEffect, useRef } from "react";
import { HOUR_HEIGHT, DAY_START_HOUR, DAY_END_HOUR } from "@/data/events";
import type { CalendarEvent } from "@/data/events";
import CalendarDayColumn from "./CalendarDayColumn";

interface CalendarWeekViewProps {
  weekDates: string[];
  onEventClick: (event: CalendarEvent) => void;
}

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const totalHours = DAY_END_HOUR - DAY_START_HOUR;

function formatHour(hour: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12} ${period}`;
}

export default function CalendarWeekView({
  weekDates,
  onEventClick,
}: CalendarWeekViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (scrollRef.current) {
      const scrollTo = HOUR_HEIGHT * 1;
      scrollRef.current.scrollTop = scrollTo;
    }
  }, []);

  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  const nowOffset = (currentHour - DAY_START_HOUR) * HOUR_HEIGHT;
  const todayIndex = weekDates.indexOf(todayStr!);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-bg-white">
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="flex min-h-0">
          {/* Time gutter */}
          <div className="w-[60px] shrink-0 pt-[57px]">
            <div className="relative" style={{ height: `${totalHours * HOUR_HEIGHT}px` }}>
              {Array.from({ length: totalHours }, (_, i) => (
                <div
                  key={i}
                  className="absolute right-0 pr-3 text-xs text-text-tertiary -translate-y-1/2"
                  style={{ top: `${i * HOUR_HEIGHT}px` }}
                >
                  {formatHour(DAY_START_HOUR + i)}
                </div>
              ))}
            </div>
          </div>

          {/* Day columns */}
          <div className="flex-1 flex border-l border-divider relative">
            {weekDates.map((date, i) => {
              const d = new Date(date + "T00:00:00");
              return (
                <CalendarDayColumn
                  key={date}
                  date={date}
                  dayLabel={dayLabels[i]!}
                  dateNumber={d.getDate()}
                  isToday={date === todayStr}
                  onEventClick={onEventClick}
                />
              );
            })}

            {/* Current time indicator */}
            {todayIndex >= 0 && nowOffset > 0 && nowOffset < totalHours * HOUR_HEIGHT && (
              <div
                className="absolute pointer-events-none z-20"
                style={{
                  top: `${57 + nowOffset}px`,
                  left: `${(todayIndex / 7) * 100}%`,
                  width: `${(1 / 7) * 100}%`,
                }}
              >
                <div className="relative flex items-center">
                  <div className="w-2 h-2 rounded-full bg-accent -ml-1 shrink-0" />
                  <div className="flex-1 h-[2px] bg-accent" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
