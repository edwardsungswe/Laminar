import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { MOCK_EMAILS } from "@/utils/constants";
import { useUIStore } from "@/stores/uiStore";
import { MessageView } from "@/components/mail/MessageView";

export default function EmailViewPage() {
  const { emailId } = useParams<{ emailId: string }>();
  const navigate = useNavigate();
  const setSelectedEmail = useUIStore((s) => s.setSelectedEmail);

  const email = MOCK_EMAILS.find((e) => e.id === emailId);

  useEffect(() => {
    setSelectedEmail(emailId ?? null);
    return () => setSelectedEmail(null);
  }, [emailId, setSelectedEmail]);

  if (!email) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-12">
        <p className="text-lg text-white/60">Email not found</p>
        <button
          onClick={() => navigate("/mail/inbox")}
          className="text-sm text-white/50 underline hover:text-white/80"
        >
          Back to inbox
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6">
      <button
        onClick={() => navigate("/mail/inbox")}
        className="mb-4 flex w-fit items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to Inbox
      </button>

      <MessageView email={email} />
    </div>
  );
}
