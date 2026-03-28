import type { Email } from "@/types";
import { getInitials, formatEmailDate } from "@/data/emails";

interface EmailListItemProps {
  email: Email;
  isSelected: boolean;
  onSelect: (id: string) => void;
  expanded?: boolean;
}

export default function EmailListItem({
  email,
  isSelected,
  onSelect,
  expanded,
}: EmailListItemProps) {
  const avatar = getInitials(email.from.name);
  const timestamp = formatEmailDate(email.date);

  if (expanded) {
    return (
      <button
        onClick={() => onSelect(email.id)}
        className="w-full text-left px-5 py-3 flex items-center gap-3.5 transition-colors duration-100 cursor-pointer hover:bg-surface/50 border-l-2 border-l-transparent"
      >
        {/* Avatar */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium shrink-0 ${
            !email.isRead
              ? "bg-accent text-white"
              : "bg-surface text-text-secondary"
          }`}
        >
          {avatar}
        </div>

        {/* Sender */}
        <span
          className={`text-sm shrink-0 w-[160px] truncate ${
            !email.isRead
              ? "font-semibold text-text-primary"
              : "font-medium text-text-primary"
          }`}
        >
          {email.from.name}
        </span>

        {/* Subject + Preview inline */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {!email.isRead && (
            <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
          )}
          <span className="text-sm text-text-primary truncate shrink-0 max-w-[300px]">
            {email.subject}
          </span>
          <span className="text-sm text-text-tertiary mx-1 shrink-0">&mdash;</span>
          <span className="text-sm text-text-tertiary truncate min-w-0">
            {email.preview}
          </span>
        </div>

        {/* Timestamp */}
        <span className="text-xs text-text-tertiary whitespace-nowrap shrink-0 ml-auto">
          {timestamp}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={() => onSelect(email.id)}
      className={`w-full text-left px-5 py-4 flex gap-3.5 transition-colors duration-100 cursor-pointer border-l-2 ${
        isSelected
          ? "bg-surface border-l-accent"
          : "border-l-transparent hover:bg-surface/50"
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium shrink-0 mt-0.5 ${
          !email.isRead
            ? "bg-accent text-white"
            : "bg-surface text-text-secondary"
        }`}
      >
        {avatar}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span
            className={`text-sm truncate ${
              !email.isRead
                ? "font-semibold text-text-primary"
                : "font-medium text-text-primary"
            }`}
          >
            {email.from.name}
          </span>
          <span className="text-xs text-text-tertiary whitespace-nowrap shrink-0">
            {timestamp}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!email.isRead && (
            <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
          )}
          <p className="text-sm text-text-primary truncate leading-snug">
            {email.subject}
          </p>
        </div>
        <p className="text-xs text-text-secondary truncate mt-1 leading-relaxed">
          {email.preview}
        </p>
      </div>
    </button>
  );
}
