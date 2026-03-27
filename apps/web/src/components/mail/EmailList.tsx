import { useNavigate } from "react-router";
import { useUIStore } from "@/stores/uiStore";
import { MOCK_EMAILS } from "@/utils/constants";
import { EmailListItem } from "./EmailListItem";

export function EmailList() {
  const { selectedEmailId } = useUIStore();
  const navigate = useNavigate();

  return (
    <div className="divide-y divide-white/10">
      {MOCK_EMAILS.map((email) => (
        <EmailListItem
          key={email.id}
          email={email}
          isSelected={selectedEmailId === email.id}
          onClick={() => navigate(`/mail/inbox/${email.id}`)}
        />
      ))}
    </div>
  );
}
