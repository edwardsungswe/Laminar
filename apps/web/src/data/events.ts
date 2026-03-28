export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  color: "amber" | "sage" | "slate" | "rose";
  location?: string;
  attendees?: string[];
}

export const HOUR_HEIGHT = 64;
export const DAY_START_HOUR = 7;
export const DAY_END_HOUR = 21;

export const eventColorMap = {
  amber: { bg: "bg-accent/10", border: "border-l-accent", text: "text-accent-hover" },
  sage: { bg: "bg-[#e8ede6]", border: "border-l-[#7a9a6d]", text: "text-[#5a7a4d]" },
  slate: { bg: "bg-[#e8eaed]", border: "border-l-[#6b7280]", text: "text-[#4b5563]" },
  rose: { bg: "bg-[#f5e6e8]", border: "border-l-[#c07a7a]", text: "text-[#a05a5a]" },
} as const;

function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function toISO(d: Date): string {
  return d.toISOString().split("T")[0]!;
}

function addDays(d: Date, n: number): Date {
  const result = new Date(d);
  result.setDate(result.getDate() + n);
  return result;
}

const monday = getMonday(new Date());

export const events: CalendarEvent[] = [
  {
    id: "e1",
    title: "Client Call — Aura Rebrand",
    description: "Discuss mood board directions with Maya. Review the three concepts she sent and narrow down to one direction for the full brand deck.",
    date: toISO(monday),
    startTime: "09:00",
    endTime: "10:00",
    color: "amber",
    location: "Google Meet",
    attendees: ["Maya Chen"],
  },
  {
    id: "e2",
    title: "Design Review: Solstice Packaging",
    description: "Go through print proofs with Oliver. Discuss spot UV on interior flap. Sign off for production.",
    date: toISO(monday),
    startTime: "14:00",
    endTime: "15:30",
    color: "sage",
    location: "Studio A",
    attendees: ["Oliver Park"],
  },
  {
    id: "e3",
    title: "Type Specimen Research",
    description: "Deep dive into Neue Montreal specimen. Explore pairing options for the Aura rebrand.",
    date: toISO(addDays(monday, 1)),
    startTime: "10:00",
    endTime: "11:00",
    color: "slate",
  },
  {
    id: "e4",
    title: "Photoshoot Planning with Lena",
    description: "Finalize shot list, props, and styling direction for the April 3rd studio session on Melrose.",
    date: toISO(addDays(monday, 1)),
    startTime: "15:00",
    endTime: "16:00",
    color: "rose",
    location: "Cafe Gratitude, Larchmont",
    attendees: ["Lena Moreau"],
  },
  {
    id: "e5",
    title: "Copenhagen Talk Outline",
    description: "Draft outline for 'The Weight of Nothing' talk. Gather case study materials from Aura and Solstice projects.",
    date: toISO(addDays(monday, 2)),
    startTime: "09:00",
    endTime: "10:30",
    color: "amber",
  },
  {
    id: "e6",
    title: "Figma Review: Oasis Dashboard",
    description: "Review James's latest Figma file. Check responsive breakpoints and dark mode variants for all card components.",
    date: toISO(addDays(monday, 2)),
    startTime: "13:00",
    endTime: "14:00",
    color: "sage",
    location: "Zoom",
    attendees: ["James Whitfield"],
  },
  {
    id: "e7",
    title: "Common Ground Discovery Call",
    description: "Initial discovery call with Rafael about the co-working space rebrand. Discuss deliverables, timeline, and creative direction.",
    date: toISO(addDays(monday, 3)),
    startTime: "10:00",
    endTime: "11:00",
    color: "amber",
    location: "Google Meet",
    attendees: ["Rafael Torres"],
  },
  {
    id: "e8",
    title: "Brand Color Exploration",
    description: "Explore warm, welcoming color palettes for Common Ground. Pull references from hospitality and residential interiors.",
    date: toISO(addDays(monday, 3)),
    startTime: "14:00",
    endTime: "16:00",
    color: "sage",
  },
  {
    id: "e9",
    title: "Invoice Review & Bookkeeping",
    description: "Review Suki's invoice for Solstice illustrations. Process payment and update project budget tracker.",
    date: toISO(addDays(monday, 4)),
    startTime: "09:00",
    endTime: "09:45",
    color: "slate",
  },
  {
    id: "e10",
    title: "Studio Visit — Melrose Space",
    description: "Walk through the studio space for the April 3rd photoshoot. Check lighting conditions and plan setup.",
    date: toISO(addDays(monday, 4)),
    startTime: "11:00",
    endTime: "12:30",
    color: "rose",
    location: "Melrose Studios, 7420 Melrose Ave",
    attendees: ["Lena Moreau"],
  },
  {
    id: "e11",
    title: "Portfolio Update",
    description: "Add Solstice packaging and Aura rebrand to portfolio site. Write case study drafts.",
    date: toISO(addDays(monday, 5)),
    startTime: "10:00",
    endTime: "12:00",
    color: "slate",
  },
];

export function getEventsForDate(date: string): CalendarEvent[] {
  return events.filter((e) => e.date === date);
}

export function getWeekDates(referenceDate: Date): string[] {
  const mon = getMonday(referenceDate);
  return Array.from({ length: 7 }, (_, i) => toISO(addDays(mon, i)));
}

export function formatWeekLabel(weekStart: Date): string {
  const mon = getMonday(weekStart);
  const sun = addDays(mon, 6);
  const monthFormat = new Intl.DateTimeFormat("en-US", { month: "short" });
  const startMonth = monthFormat.format(mon);
  const endMonth = monthFormat.format(sun);
  const year = sun.getFullYear();
  if (startMonth === endMonth) {
    return `${startMonth} ${mon.getDate()} \u2013 ${sun.getDate()}, ${year}`;
  }
  return `${startMonth} ${mon.getDate()} \u2013 ${endMonth} ${sun.getDate()}, ${year}`;
}
