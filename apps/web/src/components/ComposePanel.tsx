import { ArrowLeft, Send, Trash2, HardDrive, Paperclip } from "lucide-react";

interface ComposePanelProps {
  onClose: () => void;
  onAttachFromDrive?: () => void;
}

export default function ComposePanel({ onClose, onAttachFromDrive }: ComposePanelProps) {
  return (
    <div className="h-full overflow-y-auto bg-bg-white">
      <div className="px-10 py-8">
        {/* Toolbar */}
        <div className="flex items-center gap-1 mb-6">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
            title="Discard"
          >
            <ArrowLeft className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </button>

          <div className="w-px h-5 bg-divider mx-1" />

          <h2 className="text-sm font-semibold text-text-primary">New Message</h2>

          <div className="flex-1" />

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
            title="Delete draft"
          >
            <Trash2 className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </button>

          <button className="h-9 px-5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors duration-100 flex items-center gap-2 cursor-pointer ml-2">
            <Send className="w-4 h-4" strokeWidth={1.5} />
            Send
          </button>
        </div>

        {/* To */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-divider">
          <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider w-16 shrink-0">To</span>
          <input
            type="text"
            placeholder="recipient@example.com"
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none"
          />
        </div>

        {/* Subject */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Subject"
            className="w-full bg-transparent text-xl font-medium text-text-primary placeholder:text-text-tertiary focus:outline-none"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-divider mb-6" />

        {/* Body */}
        <textarea
          autoFocus
          placeholder="Write your message..."
          className="w-full bg-transparent text-[15px] text-text-primary placeholder:text-text-tertiary leading-[1.7] resize-none focus:outline-none min-h-[400px]"
        />

        {/* Attachment toolbar */}
        <div className="border-t border-divider pt-4 mt-auto flex items-center gap-2">
          <button
            onClick={onAttachFromDrive}
            className="h-8 px-3 rounded-lg flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
          >
            <HardDrive className="w-4 h-4" strokeWidth={1.5} />
            Attach from Drive
          </button>
          <button
            className="h-8 px-3 rounded-lg flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
          >
            <Paperclip className="w-4 h-4" strokeWidth={1.5} />
            Attach file
          </button>
        </div>
      </div>
    </div>
  );
}
