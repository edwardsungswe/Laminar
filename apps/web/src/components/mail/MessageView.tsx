import type { Email } from "@/types";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { HtmlEmailRenderer } from "./HtmlEmailRenderer";
import { AttachmentList } from "./AttachmentList";
import { formatEmailDate } from "@/utils/formatDate";

interface MessageViewProps {
  email: Email;
}

export function MessageView({ email }: MessageViewProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Subject + labels */}
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold text-white">
          {email.subject}
        </h1>
        {email.labels.map((label) => (
          <Badge key={label} label={label} />
        ))}
      </div>

      {/* Sender row */}
      <div className="flex items-center gap-3">
        <Avatar name={email.from.name} size="md" />
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">
              {email.from.name}
            </span>
            <span className="text-sm text-white/50">
              &lt;{email.from.email}&gt;
            </span>
          </div>
          <div className="text-sm text-white/50">
            To:{" "}
            {email.to
              .map((r) => (r.name ? `${r.name} <${r.email}>` : r.email))
              .join(", ")}
          </div>
        </div>
        <span className="shrink-0 text-sm text-white/50">
          {formatEmailDate(email.date)}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Body */}
      <div>
        {email.body.html ? (
          <HtmlEmailRenderer html={email.body.html} />
        ) : (
          <pre className="whitespace-pre-wrap text-sm leading-relaxed text-white/80">
            {email.body.plain}
          </pre>
        )}
      </div>

      {/* Attachments */}
      <AttachmentList attachments={email.body.attachments} />
    </div>
  );
}
