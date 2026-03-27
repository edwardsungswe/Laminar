import { isToday, isThisYear, format } from "date-fns";

export function formatEmailDate(date: Date): string {
  if (isToday(date)) {
    return format(date, "h:mm a");
  }
  if (isThisYear(date)) {
    return format(date, "MMM d");
  }
  return format(date, "MMM d, yyyy");
}
