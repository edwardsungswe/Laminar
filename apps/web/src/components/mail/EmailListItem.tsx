import { Paperclip } from "lucide-react";
import type { Email } from "@/types";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { formatEmailDate } from "@/utils/formatDate";

interface EmailListItemProps {
  email: Email;
  isSelected: boolean;
  onClick: () => void;
}

export function EmailListItem({
  email,
  isSelected,
  onClick,
}: EmailListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
        isSelected
          ? "bg-white/15"
          : email.isRead
            ? "hover:bg-white/5"
            : "bg-white/5 hover:bg-white/10"
      }`}
    >
      <Avatar name={email.from.name} size="sm" />

      <div className="flex min-w-0 flex-1 items-center gap-2">
        <span
          className={`w-24 shrink-0 truncate text-sm ${
            email.isRead
              ? "font-normal text-white/60"
              : "font-semibold text-white"
          }`}
        >
          {email.from.name}
        </span>

        <span
          className={`truncate text-sm ${
            email.isRead ? "font-normal text-white/50" : "font-semibold text-white/90"
          }`}
        >
          {email.subject}
        </span>

        <span className="truncate text-sm text-white/40">
          {email.preview}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {email.labels.map((label) => (
          <Badge key={label} label={label} />
        ))}
        {email.hasAttachment && (
          <Paperclip size={14} className="text-white/40" />
        )}
        <span className="ml-2 text-xs text-white/50">
          {formatEmailDate(email.date)}
        </span>
      </div>
    </button>
  );
}
