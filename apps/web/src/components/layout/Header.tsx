import { Search } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { EmailToolbar } from "@/components/mail/EmailToolbar";

export function Header() {
  return (
    <header className="flex items-center gap-4 px-4 py-3">
      <div className="flex items-center gap-3">
        <Avatar name="Thomas" size="sm" />
        <button className="rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white">
          <Search size={18} />
        </button>
      </div>

      <div className="flex-1">
        <EmailToolbar />
      </div>
    </header>
  );
}
