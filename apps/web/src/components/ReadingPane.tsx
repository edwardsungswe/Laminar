import { useState, useEffect, useRef } from "react";
import {
  Reply,
  ReplyAll,
  Forward,
  Archive,
  ArrowLeft,
  Trash2,
  Star,
  Tag,
  MoreHorizontal,
  Printer,
  Flag,
  BellOff,
  ExternalLink,
  EyeOff,
  HardDrive,
} from "lucide-react";
import type { Email } from "@/types";
import { getInitials, formatEmailDate } from "@/data/emails";
import EmptyState from "./EmptyState";

interface ReadingPaneProps {
  email: Email | null;
  onBack?: () => void;
  onSaveToDrive?: () => void;
  onReply?: () => void;
  onReplyAll?: () => void;
  onForward?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  onToggleStar?: () => void;
  onToggleRead?: () => void;
  onShowToast?: (msg: string) => void;
}

function ActionButton({
  icon: Icon,
  label,
  onClick,
  className: extraClass,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      title={label}
      onClick={onClick}
      className={`w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer ${extraClass ?? ""}`}
    >
      <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
    </button>
  );
}

function LabelDropdown({ onShowToast }: { onShowToast?: (msg: string) => void }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const labels = ["Work", "Personal", "Important", "Finance"];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        title="Label"
        className="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
      >
        <Tag className="w-[18px] h-[18px]" strokeWidth={1.5} />
      </button>

      {open && (
        <div className="absolute left-0 top-11 bg-bg-white rounded-lg shadow-lg border border-divider py-1 w-[160px] z-30">
          {labels.map((label) => (
            <button
              key={label}
              onClick={() => {
                setOpen(false);
                onShowToast?.(`Label added: ${label}`);
              }}
              className="w-full px-3 py-2 flex items-center gap-2.5 text-sm text-text-secondary hover:bg-surface/50 hover:text-text-primary transition-colors duration-100 cursor-pointer"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MoreMenu({
  onSaveToDrive,
  onToggleRead,
  onShowToast,
}: {
  onSaveToDrive?: () => void;
  onToggleRead?: () => void;
  onShowToast?: (msg: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const items: { icon: typeof Printer; label: string; action: () => void }[] = [
    { icon: Printer, label: "Print", action: () => window.print() },
    { icon: Flag, label: "Report spam", action: () => onShowToast?.("Reported as spam") },
    { icon: BellOff, label: "Mute thread", action: () => onShowToast?.("Thread muted") },
    { icon: EyeOff, label: "Mark as unread", action: () => onToggleRead?.() },
    { icon: ExternalLink, label: "Open in new window", action: () => onShowToast?.("Opening in new window...") },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        title="More actions"
        className="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
      >
        <MoreHorizontal className="w-[18px] h-[18px]" strokeWidth={1.5} />
      </button>

      {open && (
        <div className="absolute right-0 top-11 bg-bg-white rounded-lg shadow-lg border border-divider py-1 w-[200px] z-30">
          <button
            onClick={() => {
              setOpen(false);
              onSaveToDrive?.();
            }}
            className="w-full px-3 py-2 flex items-center gap-2.5 text-sm text-text-secondary hover:bg-surface/50 hover:text-text-primary transition-colors duration-100 cursor-pointer"
          >
            <HardDrive className="w-4 h-4 shrink-0" strokeWidth={1.5} />
            Save to Drive
          </button>
          <div className="border-t border-divider my-1" />
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setOpen(false);
                item.action();
              }}
              className="w-full px-3 py-2 flex items-center gap-2.5 text-sm text-text-secondary hover:bg-surface/50 hover:text-text-primary transition-colors duration-100 cursor-pointer"
            >
              <item.icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ReadingPane({
  email,
  onBack,
  onSaveToDrive,
  onReply,
  onReplyAll,
  onForward,
  onArchive,
  onDelete,
  onToggleStar,
  onToggleRead,
  onShowToast,
}: ReadingPaneProps) {
  if (!email) return <EmptyState />;

  const avatar = getInitials(email.from.name);
  const timestamp = formatEmailDate(email.date);

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-10 py-8">
        {/* Toolbar */}
        <div className="flex items-center gap-1 mb-6">
          {onBack && (
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
              title="Back to list"
            >
              <ArrowLeft className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </button>
          )}

          {onBack && <div className="w-px h-5 bg-divider mx-1" />}

          <ActionButton icon={Reply} label="Reply" onClick={onReply} />
          <ActionButton icon={ReplyAll} label="Reply all" onClick={onReplyAll} />
          <ActionButton icon={Forward} label="Forward" onClick={onForward} />

          <div className="w-px h-5 bg-divider mx-1" />

          <ActionButton icon={Archive} label="Archive" onClick={onArchive} />
          <ActionButton icon={Trash2} label="Delete" onClick={onDelete} />
          <button
            title="Star"
            onClick={onToggleStar}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
          >
            <Star
              className={`w-[18px] h-[18px] ${email.isStarred ? "fill-amber-500 text-amber-500" : ""}`}
              strokeWidth={1.5}
            />
          </button>
          <LabelDropdown onShowToast={onShowToast} />

          <div className="flex-1" />

          <MoreMenu
            onSaveToDrive={onSaveToDrive}
            onToggleRead={onToggleRead}
            onShowToast={onShowToast}
          />
        </div>

        {/* Subject */}
        <h1 className="text-xl font-medium text-text-primary mb-6 leading-snug">
          {email.subject}
        </h1>

        {/* Sender */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center text-xs font-medium">
            {avatar}
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">
              {email.from.name}
            </p>
            <p className="text-xs text-text-secondary">{email.from.email}</p>
          </div>
          <span className="text-xs text-text-tertiary ml-auto">
            {timestamp}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-divider mb-8" />

        {/* Body */}
        <div className="text-[15px] text-text-primary leading-[1.7] whitespace-pre-line">
          {email.body.plain}
        </div>
      </div>
    </div>
  );
}
