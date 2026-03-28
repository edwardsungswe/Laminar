import { Mail } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center">
        <Mail className="w-7 h-7 text-text-tertiary" strokeWidth={1.5} />
      </div>
      <p className="text-sm text-text-tertiary">Select an email to read</p>
    </div>
  );
}
