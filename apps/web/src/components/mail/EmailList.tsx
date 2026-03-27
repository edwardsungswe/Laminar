import { useUIStore } from "@/stores/uiStore";
import { MOCK_EMAILS } from "@/utils/constants";
import { EmailListItem } from "./EmailListItem";

export function EmailList() {
  const { selectedEmailId, setSelectedEmail } = useUIStore();

  return (
    <div className="divide-y divide-white/10">
      {MOCK_EMAILS.map((email) => (
        <EmailListItem
          key={email.id}
          email={email}
          isSelected={selectedEmailId === email.id}
          onClick={() => setSelectedEmail(email.id)}
        />
      ))}
    </div>
  );
}
