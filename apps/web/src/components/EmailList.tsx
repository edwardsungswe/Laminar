import type { Email } from "@/types";
import EmailListItem from "./EmailListItem";

interface EmailListProps {
  emails: Email[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  expanded?: boolean;
}

export default function EmailList({
  emails,
  selectedId,
  onSelect,
  expanded,
}: EmailListProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className={`flex flex-col py-2 ${expanded ? "gap-0" : "gap-2"}`}>
        {emails.map((email) => (
          <EmailListItem
            key={email.id}
            email={email}
            isSelected={selectedId === email.id}
            onSelect={onSelect}
            expanded={expanded}
          />
        ))}
      </div>
    </div>
  );
}
