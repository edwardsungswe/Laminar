import { MOCK_EMAILS, FOLDERS } from "@/utils/constants";
import type { Email } from "@/types";
import { format, isToday, isYesterday } from "date-fns";

// Re-export the raw types and data
export type { Email };
export { MOCK_EMAILS, FOLDERS };

// Helper: get initials from a name
export function getInitials(name: string): string {
  return name
    .split(/[\s@]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

// Helper: format date for display
export function formatEmailDate(date: Date): string {
  if (isToday(date)) return format(date, "h:mm a");
  if (isYesterday(date)) return "Yesterday";
  return format(date, "MMM d");
}

// Helper: get plain text body for display
export function getPlainBody(email: Email): string {
  return email.body.plain;
}

// Helper: get emails by folder (inbox = all mock emails for now)
export function getEmailsByFolder(folder: string): Email[] {
  // The mock data doesn't have folder assignments, so we show all for inbox
  // and filter starred for starred
  if (folder === "starred") return MOCK_EMAILS.filter((e) => e.isStarred);
  if (folder === "sent") return [];
  if (folder === "draft") return [];
  if (folder === "done") return MOCK_EMAILS.filter((e) => e.isRead);
  return MOCK_EMAILS; // inbox
}
