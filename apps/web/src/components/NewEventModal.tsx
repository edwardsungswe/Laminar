import { useState, useEffect, useMemo } from "react";
import { X } from "lucide-react";
import type { CalendarEvent } from "@/data/events";

interface NewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  currentWeekStart: Date;
}

const colorOptions: CalendarEvent["color"][] = ["amber", "sage", "slate", "rose"];

// Swatch display colors (bg fill for the radio circles)
const swatchColors: Record<CalendarEvent["color"], string> = {
  amber: "bg-accent",
  sage: "bg-[#7a9a6d]",
  slate: "bg-[#6b7280]",
  rose: "bg-[#c07a7a]",
};

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 7; h <= 20; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h < 21) slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

function getDefaultDate(weekStart: Date): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  if (today >= weekStart && today <= weekEnd) {
    return today.toISOString().split("T")[0]!;
  }
  return weekStart.toISOString().split("T")[0]!;
}

function getDefaultStartTime(): string {
  const now = new Date();
  const minutes = now.getMinutes();
  let hours = now.getHours();
  if (minutes > 0) hours += 1;
  // Round to next half hour
  if (minutes > 0 && minutes <= 30) {
    return `${String(now.getHours()).padStart(2, "0")}:30`;
  }
  if (hours < 7) hours = 7;
  if (hours > 20) hours = 20;
  return `${String(hours).padStart(2, "0")}:00`;
}

function addOneHour(time: string): string {
  const [h, m] = time.split(":").map(Number) as [number, number];
  let newH = h + 1;
  if (newH > 21) newH = 21;
  return `${String(newH).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function formatTimeLabel(time: string): string {
  const [h, m] = time.split(":").map(Number) as [number, number];
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

export default function NewEventModal({
  isOpen,
  onClose,
  onSave,
  currentWeekStart,
}: NewEventModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(() => getDefaultDate(currentWeekStart));
  const [startTime, setStartTime] = useState(() => getDefaultStartTime());
  const [endTime, setEndTime] = useState(() => addOneHour(getDefaultStartTime()));
  const [color, setColor] = useState<CalendarEvent["color"]>("amber");
  const [location, setLocation] = useState("");
  const [attendees, setAttendees] = useState("");
  const [description, setDescription] = useState("");

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle("");
      const defaultDate = getDefaultDate(currentWeekStart);
      setDate(defaultDate);
      const defaultStart = getDefaultStartTime();
      setStartTime(defaultStart);
      setEndTime(addOneHour(defaultStart));
      setColor("amber");
      setLocation("");
      setAttendees("");
      setDescription("");
    }
  }, [isOpen, currentWeekStart]);

  // Auto-update end time when start changes
  useEffect(() => {
    const newEnd = addOneHour(startTime);
    if (newEnd > startTime) {
      setEndTime(newEnd);
    }
  }, [startTime]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const endTimeSlots = useMemo(
    () => TIME_SLOTS.filter((t) => t > startTime),
    [startTime]
  );

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim()) return;
    if (endTime <= startTime) return;

    const event: CalendarEvent = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      date,
      startTime,
      endTime,
      color,
      ...(location.trim() && { location: location.trim() }),
      ...(attendees.trim() && {
        attendees: attendees
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
      }),
    };

    onSave(event);
  };

  const inputClass =
    "bg-surface rounded-lg px-3 py-2 text-sm text-text-primary border border-divider focus:border-accent focus:outline-none w-full";
  const labelClass = "text-sm font-medium text-text-primary";

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      {/* Card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-white rounded-xl shadow-lg border border-divider w-[520px] p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-text-primary">
            New Event
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
          >
            <X className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event title"
              className={inputClass}
              autoFocus
            />
          </div>

          {/* Date + Time row */}
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-1.5">
              <label className={labelClass}>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <label className={labelClass}>Start Time</label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={inputClass}
              >
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t}>
                    {formatTimeLabel(t)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <label className={labelClass}>End Time</label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={inputClass}
              >
                {endTimeSlots.map((t) => (
                  <option key={t} value={t}>
                    {formatTimeLabel(t)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Color */}
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Color</label>
            <div className="flex items-center gap-3">
              {colorOptions.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-full ${swatchColors[c]} cursor-pointer transition-all duration-100 ${
                    color === c
                      ? "ring-2 ring-offset-2 ring-offset-bg-white ring-accent"
                      : "hover:scale-110"
                  }`}
                  title={c}
                />
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Add location (optional)"
              className={inputClass}
            />
          </div>

          {/* Attendees */}
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Attendees</label>
            <input
              type="text"
              value={attendees}
              onChange={(e) => setAttendees(e.target.value)}
              placeholder="Comma-separated names (optional)"
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description (optional)"
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="h-9 px-4 border border-divider text-text-secondary hover:bg-surface rounded-lg text-sm font-medium transition-colors duration-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="h-9 px-4 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors duration-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
}
