import { FileText, Paperclip } from "lucide-react";
import type { Attachment } from "@/types";
import { formatFileSize } from "@/utils/format";

interface AttachmentListProps {
  attachments?: Attachment[];
}

function AttachmentIcon({ contentType }: { contentType: string }) {
  if (
    contentType === "application/pdf" ||
    contentType.startsWith("text/")
  ) {
    return <FileText size={16} className="shrink-0 text-white/60" />;
  }
  return <Paperclip size={16} className="shrink-0 text-white/60" />;
}

export function AttachmentList({ attachments }: AttachmentListProps) {
  if (!attachments || attachments.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {attachments.map((attachment) => (
        <div
          key={attachment.id}
          className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2"
        >
          <AttachmentIcon contentType={attachment.contentType} />
          <span className="text-sm text-white/80">{attachment.filename}</span>
          <span className="text-xs text-white/40">
            {formatFileSize(attachment.size)}
          </span>
        </div>
      ))}
    </div>
  );
}
