import type { Email, Folder, FilterTab, ThemePreset } from "@/types";

export const THEME_PRESETS: ThemePreset[] = [
  {
    name: "ocean",
    colors: {
      gradientFrom: "#6b9dcc",
      gradientTo: "#8fb8d0",
      glassBg: "rgba(255, 255, 255, 0.15)",
      glassBorder: "rgba(255, 255, 255, 0.25)",
      accent: "#3b82f6",
      accentHover: "#2563eb",
      sidebarBg: "rgba(0, 0, 0, 0.2)",
      sidebarText: "rgba(255, 255, 255, 0.85)",
      sidebarActive: "rgba(255, 255, 255, 0.15)",
    },
  },
  {
    name: "sunset",
    colors: {
      gradientFrom: "#f97316",
      gradientTo: "#ec4899",
      glassBg: "rgba(255, 255, 255, 0.15)",
      glassBorder: "rgba(255, 255, 255, 0.25)",
      accent: "#f59e0b",
      accentHover: "#d97706",
      sidebarBg: "rgba(0, 0, 0, 0.2)",
      sidebarText: "rgba(255, 255, 255, 0.85)",
      sidebarActive: "rgba(255, 255, 255, 0.15)",
    },
  },
  {
    name: "forest",
    colors: {
      gradientFrom: "#16a34a",
      gradientTo: "#0d9488",
      glassBg: "rgba(255, 255, 255, 0.15)",
      glassBorder: "rgba(255, 255, 255, 0.25)",
      accent: "#22c55e",
      accentHover: "#16a34a",
      sidebarBg: "rgba(0, 0, 0, 0.2)",
      sidebarText: "rgba(255, 255, 255, 0.85)",
      sidebarActive: "rgba(255, 255, 255, 0.15)",
    },
  },
  {
    name: "slate",
    colors: {
      gradientFrom: "#475569",
      gradientTo: "#334155",
      glassBg: "rgba(255, 255, 255, 0.1)",
      glassBorder: "rgba(255, 255, 255, 0.15)",
      accent: "#94a3b8",
      accentHover: "#64748b",
      sidebarBg: "rgba(0, 0, 0, 0.25)",
      sidebarText: "rgba(255, 255, 255, 0.8)",
      sidebarActive: "rgba(255, 255, 255, 0.12)",
    },
  },
  {
    name: "lavender",
    colors: {
      gradientFrom: "#8b5cf6",
      gradientTo: "#a78bfa",
      glassBg: "rgba(255, 255, 255, 0.15)",
      glassBorder: "rgba(255, 255, 255, 0.25)",
      accent: "#a78bfa",
      accentHover: "#8b5cf6",
      sidebarBg: "rgba(0, 0, 0, 0.2)",
      sidebarText: "rgba(255, 255, 255, 0.85)",
      sidebarActive: "rgba(255, 255, 255, 0.15)",
    },
  },
];

export const FOLDERS: Folder[] = [
  { id: "inbox", name: "Inbox", icon: "Inbox", count: 75 },
  { id: "starred", name: "Starred", icon: "Star" },
  { id: "sent", name: "Sent", icon: "Send" },
  { id: "draft", name: "Draft", icon: "FileText" },
  { id: "done", name: "Done", icon: "CheckCircle" },
];

export const FILTER_TABS: FilterTab[] = [
  { id: "inbox", label: "Inbox", count: 12 },
  { id: "team", label: "Team" },
  { id: "calendar", label: "Calendar" },
  { id: "attachment", label: "Attachment" },
];

// ---------------------------------------------------------------------------
// Body helpers — simulate parsed MIME output (multipart/alternative)
// ---------------------------------------------------------------------------
function makeBody(
  plain: string,
  sig: string,
  attachments?: import("@/types").Attachment[],
): import("@/types").EmailBody {
  const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;font-size:14px;color:#1a1a1a;background:#ffffff;">
<div style="max-width:600px;margin:0 auto;padding:24px 16px;">
${plain
  .split("\n\n")
  .map((p) => `<p style="margin:0 0 16px 0;line-height:1.6;">${p.replace(/\n/g, "<br>")}</p>`)
  .join("")}
<div style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:13px;line-height:1.5;">
${sig.replace(/\n/g, "<br>")}
</div>
</div>
</body></html>`;
  return { plain: plain + "\n\n--\n" + sig, html, attachments };
}

function serviceBody(
  html: string,
  plain: string,
  attachments?: import("@/types").Attachment[],
): import("@/types").EmailBody {
  return { plain, html, attachments };
}

export const MOCK_EMAILS: Email[] = [
  // --- Today ---
  {
    id: "1",
    from: { name: "Joe Martinez", email: "joe.martinez@acmecorp.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Freelance Contract — Q2 2026",
    preview: "Hi Thomas, attached is the signed contract for Q2. Please review the revised payment schedule on page 3 and let me know if anything needs adjustment before we proceed.",
    date: new Date("2026-03-27T10:30:00"),
    isRead: false,
    isStarred: true,
    labels: ["Legal", "Freelance"],
    hasAttachment: true,
    threadId: "t1",
    body: makeBody(
      `Hi Thomas,

Attached is the signed freelance contract for Q2 2026. I've reviewed all sections and everything looks good on my end.

One thing to flag: the payment schedule on page 3 was updated to reflect the milestone-based structure we discussed — 30% upfront, 40% at mid-point delivery, 30% on final acceptance. Please confirm this works before I countersign the SOW.

Looking forward to getting started on April 1. Let me know if you need anything else from my side.`,
      `Joe Martinez\nSenior Contractor, Acme Corp\njoe.martinez@acmecorp.com\n+1 (415) 555-0192`,
      [{ id: "a1", filename: "Q2_2026_Contract_Martinez.pdf", contentType: "application/pdf", size: 284_210 }],
    ),
  },
  {
    id: "2",
    from: { name: "GitHub", email: "noreply@github.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "[laminar/api] Pull request #47 opened by sarah-dev",
    preview: "sarah-dev wants to merge 12 commits into main from feature/email-threading. Changes include the JWZ algorithm implementation and updated unit tests.",
    date: new Date("2026-03-27T09:55:00"),
    isRead: false,
    isStarred: false,
    labels: ["Dev"],
    hasAttachment: false,
    threadId: "t2",
    body: serviceBody(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f6f8fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:32px 16px;">
<div style="background:#ffffff;border:1px solid #d0d7de;border-radius:6px;padding:24px;">
<p style="margin:0 0 8px;font-size:16px;font-weight:600;color:#24292f;">[laminar/api] Pull request #47 opened by sarah-dev</p>
<p style="margin:0 0 16px;font-size:14px;color:#57606a;">sarah-dev wants to merge 12 commits into <code style="background:#f6f8fa;padding:2px 4px;border-radius:3px;">main</code> from <code style="background:#f6f8fa;padding:2px 4px;border-radius:3px;">feature/email-threading</code></p>
<p style="margin:0 0 16px;font-size:14px;color:#24292f;line-height:1.6;">Implements the JWZ threading algorithm using References and In-Reply-To headers. Falls back to subject-based matching within a 7-day window. Includes unit tests for all edge cases including missing Message-ID and malformed References headers.</p>
<p style="margin:0 0 16px;font-size:14px;color:#57606a;">12 files changed &nbsp;·&nbsp; +842 additions &nbsp;·&nbsp; −31 deletions</p>
<a href="#" style="display:inline-block;padding:8px 16px;background:#2da44e;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:500;">Review pull request</a>
</div>
</div>
</body></html>`,
      `[laminar/api] Pull request #47 opened by sarah-dev\n\nsarah-dev wants to merge 12 commits into main from feature/email-threading.\n\nImplements the JWZ threading algorithm using References and In-Reply-To headers. Falls back to subject-based matching within a 7-day window. Includes unit tests for all edge cases.\n\n12 files changed · +842 additions · -31 deletions\n\nView: https://github.com/laminar/api/pull/47`,
    ),
  },
  {
    id: "3",
    from: { name: "Stripe", email: "receipts@stripe.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Your receipt from Stripe — $299.00",
    preview: "Thank you for your payment of $299.00 to DigitalOcean. Your invoice #INV-2026-0327 is available in your dashboard.",
    date: new Date("2026-03-27T08:12:00"),
    isRead: false,
    isStarred: false,
    labels: ["Finance"],
    hasAttachment: true,
    threadId: "t3",
    body: serviceBody(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f6f9fc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:32px 16px;">
<div style="background:#ffffff;border-radius:8px;padding:32px;border:1px solid #e6ebf1;">
<img src="cid:stripe-logo" alt="Stripe" style="height:32px;margin-bottom:24px;">
<p style="margin:0 0 8px;font-size:24px;font-weight:600;color:#1a1a2e;">Receipt from Stripe</p>
<p style="margin:0 0 24px;font-size:14px;color:#6b7c93;">Amount paid: <strong>$299.00</strong></p>
<table style="width:100%;border-collapse:collapse;font-size:14px;color:#4a5568;">
<tr><td style="padding:8px 0;border-bottom:1px solid #e6ebf1;">Merchant</td><td style="padding:8px 0;border-bottom:1px solid #e6ebf1;text-align:right;">DigitalOcean LLC</td></tr>
<tr><td style="padding:8px 0;border-bottom:1px solid #e6ebf1;">Invoice</td><td style="padding:8px 0;border-bottom:1px solid #e6ebf1;text-align:right;">#INV-2026-0327</td></tr>
<tr><td style="padding:8px 0;border-bottom:1px solid #e6ebf1;">Date</td><td style="padding:8px 0;border-bottom:1px solid #e6ebf1;text-align:right;">March 27, 2026</td></tr>
<tr><td style="padding:8px 0;font-weight:600;">Total</td><td style="padding:8px 0;text-align:right;font-weight:600;">$299.00 USD</td></tr>
</table>
<p style="margin:24px 0 0;font-size:13px;color:#8898aa;">If you have questions, visit your <a href="#" style="color:#635bff;">Stripe Dashboard</a>.</p>
</div></div></body></html>`,
      `Receipt from Stripe\n\nAmount paid: $299.00 USD\nMerchant: DigitalOcean LLC\nInvoice: #INV-2026-0327\nDate: March 27, 2026\n\nYour invoice is available at stripe.com/dashboard.`,
      [{ id: "a3", filename: "receipt-INV-2026-0327.pdf", contentType: "application/pdf", size: 98_304 }],
    ),
  },
  {
    id: "4",
    from: { name: "Lauren Okafor", email: "lauren@designstudio.io" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "New feature announcement — Dark mode shipped",
    preview: "Great news! The dark mode feature we discussed has been implemented and is live on staging. Can you do a final review before we push to prod this afternoon?",
    date: new Date("2026-03-27T07:44:00"),
    isRead: false,
    isStarred: false,
    labels: [],
    hasAttachment: false,
    threadId: "t4",
    body: makeBody(
      `Hi Thomas,

Great news — dark mode shipped to staging this morning. I ended up using CSS custom properties for the theme tokens so switching is a single class toggle on <html>. No flash on load.

Can you do a final pass before we push to prod? Main things to check: the compose dialog overlay, the sidebar active state in dark, and the HTML email iframe background. Those three gave me the most trouble.

Aiming to go live by 3pm today if you're free for a quick sign-off.`,
      `Lauren Okafor\nDesign Studio\nlaurен@designstudio.io`,
    ),
  },
  {
    id: "5",
    from: { name: "Notion", email: "notify@notionhq.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Sarah Chen mentioned you in Engineering Roadmap",
    preview: "@Thomas can you confirm the API rate limit spec? I've left a comment on the endpoint design section with some open questions from the backend team.",
    date: new Date("2026-03-27T07:01:00"),
    isRead: false,
    isStarred: false,
    labels: ["Dev"],
    hasAttachment: false,
    threadId: "t5",
    body: serviceBody(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f7f6f3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:32px 16px;">
<div style="background:#fff;border-radius:4px;padding:24px;border:1px solid #e9e9e7;">
<p style="margin:0 0 4px;font-size:12px;color:#9b9a97;text-transform:uppercase;letter-spacing:.5px;">Notion</p>
<p style="margin:0 0 16px;font-size:18px;font-weight:600;color:#1a1a1a;">Sarah Chen mentioned you in <a href="#" style="color:#2eaadc;text-decoration:none;">Engineering Roadmap</a></p>
<div style="background:#f7f6f3;border-left:3px solid #2eaadc;padding:12px 16px;border-radius:0 4px 4px 0;margin-bottom:16px;">
<p style="margin:0;font-size:14px;color:#37352f;line-height:1.6;"><strong>@Thomas</strong> can you confirm the API rate limit spec? I've left a comment on the endpoint design section with some open questions from the backend team.</p>
</div>
<a href="#" style="display:inline-block;padding:8px 16px;background:#2eaadc;color:#fff;text-decoration:none;border-radius:4px;font-size:14px;">Open in Notion</a>
</div></div></body></html>`,
      `Sarah Chen mentioned you in Engineering Roadmap\n\n"@Thomas can you confirm the API rate limit spec? I've left a comment on the endpoint design section with some open questions from the backend team."\n\nOpen in Notion: https://notion.so/...`,
    ),
  },
  // --- Yesterday ---
  {
    id: "6",
    from: { name: "Chris Wade", email: "chris.wade@partners.vc" },
    to: [
      { name: "Thomas", email: "thomas@laminar.email" },
      { name: "Akash Patel", email: "akash@laminar.email" },
    ],
    subject: "Meeting reminder — Seed round discussion Thu 2pm",
    preview: "Hi all, just a reminder about our meeting scheduled for Thursday at 2pm EST. Please come prepared with your deck and any updated financial projections.",
    date: new Date("2026-03-26T17:30:00"),
    isRead: true,
    isStarred: true,
    labels: ["Investor"],
    hasAttachment: false,
    threadId: "t6",
    body: makeBody(
      `Hi Thomas and Akash,

Just a reminder that our seed round discussion is scheduled for Thursday at 2:00 PM EST. The call will be held via Zoom — link in the calendar invite.

Please come prepared with your latest deck and updated financial projections. Specifically, I'd like to dig into your CAC assumptions and the 18-month runway model. If you can also pull together a brief competitive landscape slide that would be helpful.

Looking forward to it. Feel free to ping me if anything comes up beforehand.`,
      `Chris Wade\nPartner, Partners.vc\nchris.wade@partners.vc\n+1 (212) 555-0138`,
    ),
  },
  {
    id: "7",
    from: { name: "Rodrigo Fernandez", email: "r.fernandez@clientco.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Re: Project timeline update",
    preview: "Thanks for the update. We're aligned on the revised dates. One thing — can we push the UAT phase back by a week? Our QA team has a conflict during that window.",
    date: new Date("2026-03-26T15:12:00"),
    isRead: true,
    isStarred: false,
    labels: ["Client"],
    hasAttachment: false,
    threadId: "t7",
    body: makeBody(
      `Hi Thomas,

Thanks for the update. We're fully aligned on the revised timeline — the new dates work well for our internal planning.

One request: is it possible to push the UAT phase back by one week? Our QA team has a company offsite during that window and we won't have the bandwidth to run acceptance testing properly. Even 5 business days would make a big difference.

Let me know and I'll update our internal project plan accordingly.`,
      `Rodrigo Fernandez\nEngineering Manager, ClientCo\nr.fernandez@clientco.com`,
    ),
  },
  {
    id: "8",
    from: { name: "AWS", email: "no-reply@aws.amazon.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Action required: Your EC2 instance is approaching spend limit",
    preview: "Your AWS account has reached 85% of the configured spend limit for March. Current projected spend: $842.00. Review your usage in the Cost Explorer console.",
    date: new Date("2026-03-26T14:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Finance", "Infra"],
    hasAttachment: false,
    threadId: "t8",
    body: serviceBody(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f1f3f4;font-family:'Amazon Ember',Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:32px 16px;">
<div style="background:#fff;border-radius:2px;padding:24px;">
<p style="margin:0 0 4px;font-size:20px;font-weight:700;color:#232f3e;">AWS Billing Alert</p>
<p style="margin:0 0 20px;font-size:14px;color:#545b64;">Your account has reached <strong style="color:#d13212;">85%</strong> of your configured spend limit for March 2026.</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;color:#16191f;margin-bottom:20px;">
<tr style="background:#f2f3f3;"><th style="padding:10px;text-align:left;">Service</th><th style="padding:10px;text-align:right;">Spend (MTD)</th></tr>
<tr><td style="padding:10px;border-bottom:1px solid #eaeded;">Amazon EC2</td><td style="padding:10px;border-bottom:1px solid #eaeded;text-align:right;">$512.40</td></tr>
<tr><td style="padding:10px;border-bottom:1px solid #eaeded;">Amazon RDS</td><td style="padding:10px;border-bottom:1px solid #eaeded;text-align:right;">$198.20</td></tr>
<tr><td style="padding:10px;border-bottom:1px solid #eaeded;">Amazon S3</td><td style="padding:10px;border-bottom:1px solid #eaeded;text-align:right;">$84.60</td></tr>
<tr><td style="padding:10px;border-bottom:1px solid #eaeded;">Amazon ElastiCache</td><td style="padding:10px;border-bottom:1px solid #eaeded;text-align:right;">$46.80</td></tr>
<tr style="font-weight:600;"><td style="padding:10px;">Projected Total</td><td style="padding:10px;text-align:right;">$842.00</td></tr>
</table>
<a href="#" style="display:inline-block;padding:10px 20px;background:#ff9900;color:#111;text-decoration:none;border-radius:2px;font-weight:600;font-size:14px;">View Cost Explorer</a>
</div></div></body></html>`,
      `AWS Billing Alert\n\nYour account has reached 85% of your configured spend limit for March 2026.\n\nEC2: $512.40\nRDS: $198.20\nS3: $84.60\nElastiCache: $46.80\nProjected Total: $842.00\n\nView Cost Explorer: https://console.aws.amazon.com/cost-management`,
    ),
  },
  {
    id: "9",
    from: { name: "Ehein Nakamura", email: "ehein@laminar.email" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Feedback request — UI review for email list component",
    preview: "Hi Thomas, I would appreciate your feedback on the latest iteration of the email list component. I've attached a Figma link and a short Loom walkthrough of the interactions.",
    date: new Date("2026-03-26T11:20:00"),
    isRead: true,
    isStarred: false,
    labels: ["Design"],
    hasAttachment: false,
    threadId: "t9",
    body: makeBody(
      `Hi Thomas,

I've pushed the latest iteration of the email list component to staging and would really appreciate your eyes on it before I file the design ticket as done.

The main changes: virtualized row height is now dynamic based on whether the email has labels (avoids the height jank on rows with badges), the unread dot is now a left-border accent instead of a filled circle, and hover states use a glass tint that adapts to the active theme.

I've attached a short Loom walkthrough and the updated Figma link is in the ticket. Let me know your thoughts — especially on the unread treatment, I went back and forth on it.`,
      `Ehein Nakamura\nFrontend Engineer, Laminar\nehein@laminar.email`,
    ),
  },
  {
    id: "10",
    from: { name: "Mike Thornton", email: "mike.thornton@freelance.dev" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Invoice #0042 — March backend work",
    preview: "Dear Thomas, please find attached the invoice for my backend work during March. Total: $4,200. Net 30 terms as agreed. Let me know if you have any questions.",
    date: new Date("2026-03-26T09:05:00"),
    isRead: true,
    isStarred: false,
    labels: ["Finance", "Freelance"],
    hasAttachment: true,
    threadId: "t10",
    body: makeBody(
      `Dear Thomas,

Please find attached invoice #0042 for backend development work completed during March 2026. The work covered the Redis session store implementation, asynq worker setup, and the S3 presigned URL service.

Total: $4,200.00 USD
Terms: Net 30 (due April 25, 2026)
Payment: Wire transfer to details on file, or ACH via the link below.

Let me know if you need a breakdown by task or any adjustments to the line items.`,
      `Mike Thornton\nBackend Contractor\nmike.thornton@freelance.dev\n+1 (628) 555-0177`,
      [{ id: "a10", filename: "Invoice_0042_March2026_Thornton.pdf", contentType: "application/pdf", size: 142_336 }],
    ),
  },
  {
    id: "11",
    from: { name: "Linear", email: "notify@linear.app" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "ENG-204 assigned to you — SMTP processor edge case",
    preview: "Rodrigo assigned ENG-204 to you: Handle malformed MIME boundary in inbound processor. Priority: High. Due: Mar 29.",
    date: new Date("2026-03-26T08:30:00"),
    isRead: true,
    isStarred: false,
    labels: ["Dev"],
    hasAttachment: false,
    threadId: "t11",
    body: serviceBody(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:560px;margin:0 auto;padding:24px 16px;">
<div style="background:#fff;border-radius:6px;padding:24px;border:1px solid #dfe1e6;">
<p style="margin:0 0 4px;font-size:12px;color:#6b778c;text-transform:uppercase;font-weight:600;">Linear · ENG-204 assigned to you</p>
<p style="margin:0 0 12px;font-size:18px;font-weight:600;color:#172b4d;">Handle malformed MIME boundary in inbound processor</p>
<div style="display:flex;gap:16px;margin-bottom:16px;font-size:13px;color:#6b778c;">
<span>Priority: <strong style="color:#de350b;">High</strong></span>
<span>Due: <strong style="color:#172b4d;">Mar 29, 2026</strong></span>
<span>Assignee: <strong style="color:#172b4d;">Thomas</strong></span>
</div>
<p style="margin:0 0 16px;font-size:14px;color:#172b4d;line-height:1.6;">Some inbound emails from Outlook 365 use a non-standard MIME boundary format that causes the parser to return an empty body. The raw .eml is stored correctly in S3 but the parsed text/html part is nil. Affects ~0.4% of inbound volume.</p>
<a href="#" style="display:inline-block;padding:8px 16px;background:#0052cc;color:#fff;text-decoration:none;border-radius:4px;font-size:13px;font-weight:500;">Open ENG-204</a>
</div></div></body></html>`,
      `[Linear] ENG-204 assigned to you — Handle malformed MIME boundary in inbound processor\n\nPriority: High | Due: Mar 29, 2026 | Assigned by: Rodrigo\n\nSome inbound emails from Outlook 365 use a non-standard MIME boundary format that causes the parser to return an empty body. Affects ~0.4% of inbound volume.\n\nOpen: https://linear.app/laminar/issue/ENG-204`,
    ),
  },
  // --- This week ---
  {
    id: "12",
    from: { name: "Lisa Park", email: "lisa.park@clientco.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Project Proposal — Phase 2 scope",
    preview: "Hello Thomas, I've submitted the updated proposal for Phase 2. The scope includes the reporting dashboard and the bulk export feature. Budget remains within the original estimate.",
    date: new Date("2026-03-25T16:45:00"),
    isRead: true,
    isStarred: false,
    labels: ["Client"],
    hasAttachment: true,
    threadId: "t12",
    body: makeBody(
      `Hello Thomas,

I've submitted the updated Phase 2 proposal for your review. The scope covers two main deliverables: the reporting dashboard (filterable by date range, folder, and sender) and the bulk export feature (CSV and mbox format).

The budget estimate remains within the original $28,000 figure. Timeline is 6 weeks from kickoff assuming design assets are finalized by end of next week.

The proposal document is attached. Please let me know if you'd like to schedule a call to walk through the details.`,
      `Lisa Park\nProject Manager, ClientCo\nlisa.park@clientco.com\n+1 (503) 555-0214`,
      [{ id: "a12", filename: "Laminar_Phase2_Proposal_v2.pdf", contentType: "application/pdf", size: 531_456 }],
    ),
  },
  {
    id: "13",
    from: { name: "Vercel", email: "notifications@vercel.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Deployment failed — laminar-web [main]",
    preview: "Your deployment to laminar-web failed. Error: Build failed with exit code 1. Command 'tsc -b' exited with code 1. View the full build logs for details.",
    date: new Date("2026-03-25T14:22:00"),
    isRead: true,
    isStarred: false,
    labels: ["Dev", "Infra"],
    hasAttachment: false,
    threadId: "t13",
    body: serviceBody(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#000;font-family:system-ui,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:32px 16px;">
<div style="background:#111;border-radius:8px;padding:24px;border:1px solid #333;">
<p style="margin:0 0 4px;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Vercel</p>
<p style="margin:0 0 16px;font-size:18px;font-weight:600;color:#ff4444;">⚠ Deployment Failed</p>
<p style="margin:0 0 8px;font-size:14px;color:#ccc;">Project: <strong style="color:#fff;">laminar-web</strong> &nbsp;·&nbsp; Branch: <strong style="color:#fff;">main</strong></p>
<div style="background:#1a0000;border:1px solid #ff4444;border-radius:4px;padding:12px;margin:16px 0;font-family:'Courier New',monospace;font-size:12px;color:#ff8080;">
<p style="margin:0 0 4px;">Error: Build failed with exit code 1</p>
<p style="margin:0 0 4px;">Command: tsc -b</p>
<p style="margin:0;">src/components/mail/EmailListItem.tsx(42,9): error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.</p>
</div>
<a href="#" style="display:inline-block;padding:8px 16px;background:#fff;color:#000;text-decoration:none;border-radius:4px;font-size:13px;font-weight:600;">View Build Logs</a>
</div></div></body></html>`,
      `[Vercel] Deployment failed — laminar-web [main]\n\nError: Build failed with exit code 1\nCommand: tsc -b\n\nsrc/components/mail/EmailListItem.tsx(42,9): error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.\n\nView logs: https://vercel.com/laminar/laminar-web/deployments`,
    ),
  },
  {
    id: "14",
    from: { name: "Sarah Chen", email: "sarah.chen@laminar.email" },
    to: [
      { name: "Thomas", email: "thomas@laminar.email" },
      { name: "Ehein Nakamura", email: "ehein@laminar.email" },
    ],
    subject: "Design system tokens — final color palette",
    preview: "Hey team, sharing the finalized design token file. I've exported both the Figma variables and the CSS custom properties. Please review before I PR it into the repo.",
    date: new Date("2026-03-25T11:10:00"),
    isRead: true,
    isStarred: false,
    labels: ["Design"],
    hasAttachment: true,
    threadId: "t14",
    body: makeBody(
      `Hey Thomas and Ehein,

Sharing the finalized design token file — this is the source of truth going forward for all color, spacing, and typography decisions.

What's in the package:
- Figma variables file (auto-syncs to components)
- tokens.css — CSS custom properties, ready to import
- tokens.json — for any tooling that needs structured token data
- Usage guide PDF with do/don't examples

One thing to call out: I renamed the "primary" tokens to "accent" to match what Thomas already has in the Tailwind config. Should be a zero-friction swap.

Please review before I open the PR. I want both of you to sign off since this touches everything.`,
      `Sarah Chen\nLead Engineer, Laminar\nsarah.chen@laminar.email`,
      [
        { id: "a14a", filename: "laminar-tokens-v2.css", contentType: "text/css", size: 8_192 },
        { id: "a14b", filename: "laminar-tokens-v2.json", contentType: "application/json", size: 12_288 },
        { id: "a14c", filename: "Design_Token_Usage_Guide.pdf", contentType: "application/pdf", size: 2_097_152 },
      ],
    ),
  },
  {
    id: "15",
    from: { name: "Google Workspace", email: "admin-console@google.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Security alert: New sign-in on Chrome, San Francisco",
    preview: "We noticed a new sign-in to your account from Chrome on macOS in San Francisco, CA. If this was you, no action is required. If not, secure your account immediately.",
    date: new Date("2026-03-25T09:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Security"],
    hasAttachment: false,
    threadId: "t15",
    body: serviceBody(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#fff;font-family:Google Sans,Roboto,Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:32px 16px;">
<p style="margin:0 0 24px;font-size:22px;font-weight:400;color:#202124;">Security alert</p>
<p style="margin:0 0 16px;font-size:14px;color:#202124;line-height:1.6;">We noticed a new sign-in to your Google Account <strong>thomas@laminar.email</strong> from a new device.</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;color:#202124;margin-bottom:20px;">
<tr><td style="padding:10px 0;border-bottom:1px solid #e0e0e0;color:#5f6368;width:120px;">Device</td><td style="padding:10px 0;border-bottom:1px solid #e0e0e0;">Chrome on macOS</td></tr>
<tr><td style="padding:10px 0;border-bottom:1px solid #e0e0e0;color:#5f6368;">Location</td><td style="padding:10px 0;border-bottom:1px solid #e0e0e0;">San Francisco, CA, USA</td></tr>
<tr><td style="padding:10px 0;color:#5f6368;">Time</td><td style="padding:10px 0;">March 25, 2026, 9:00 AM PST</td></tr>
</table>
<p style="margin:0 0 16px;font-size:14px;color:#202124;">If this was you, you don't need to do anything. If you don't recognize this activity, your account may be compromised.</p>
<a href="#" style="display:inline-block;padding:10px 24px;background:#1a73e8;color:#fff;text-decoration:none;border-radius:4px;font-size:14px;font-weight:500;">Check activity</a>
</div></body></html>`,
      `Security alert for thomas@laminar.email\n\nNew sign-in detected:\nDevice: Chrome on macOS\nLocation: San Francisco, CA, USA\nTime: March 25, 2026, 9:00 AM PST\n\nIf this was you, no action required. Otherwise, secure your account immediately at myaccount.google.com.`,
    ),
  },
  {
    id: "16",
    from: { name: "Akash Patel", email: "akash@laminar.email" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Redis cache strategy — thoughts before the standup",
    preview: "Hey, wanted to share some thoughts on the Redis key structure before we discuss in standup. I think we should namespace by userId+folderId rather than just messageId to avoid cross-user collisions.",
    date: new Date("2026-03-24T20:15:00"),
    isRead: true,
    isStarred: true,
    labels: ["Dev"],
    hasAttachment: false,
    threadId: "t16",
    body: makeBody(
      `Hey Thomas,

Wanted to drop a quick note before standup so we can align on direction. I've been thinking about the Redis key structure for email bodies and I think we have a subtle bug waiting to happen.

Currently we're keying by messageId alone: body:{messageId}. The problem is that messageId comes from the Message-ID header which is set by the sending server — there's no guarantee of global uniqueness across users. Two users could theoretically receive the same forwarded message with the same Message-ID, and one user's cached body could overwrite or leak to another.

Safer structure: body:{userId}:{messageId}. It's a one-line change in the cache write and read paths but it's worth doing now before we have real user data.

Let me know your thoughts — happy to just make the change if you agree.`,
      `Akash Patel\nCo-founder & Backend Engineer, Laminar\nakash@laminar.email`,
    ),
  },
  {
    id: "17",
    from: { name: "DocuSign", email: "dse@docusign.net" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Please DocuSign: SaaS Subscription Agreement — Laminar Inc.",
    preview: "Chris Wade has sent you a DocuSign document to review and sign. Please sign by April 3, 2026. This document contains 3 signature fields.",
    date: new Date("2026-03-24T16:00:00"),
    isRead: true,
    isStarred: true,
    labels: ["Legal"],
    hasAttachment: false,
    threadId: "t17",
    body: serviceBody(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8f7f5;font-family:'DocuSign Sans',Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:32px 16px;">
<div style="background:#fff;border-radius:4px;padding:32px;text-align:center;border:1px solid #e0dcd8;">
<div style="width:48px;height:48px;background:#26ae60;border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;">
<span style="color:#fff;font-size:24px;font-weight:700;">✓</span>
</div>
<p style="margin:0 0 8px;font-size:20px;font-weight:600;color:#1a1a1a;">Please DocuSign this document</p>
<p style="margin:0 0 4px;font-size:14px;color:#6b6b6b;">Chris Wade has sent you a document to review and sign.</p>
<p style="margin:0 0 24px;font-size:14px;color:#6b6b6b;"><strong>SaaS Subscription Agreement — Laminar Inc.</strong></p>
<p style="margin:0 0 8px;font-size:13px;color:#6b6b6b;">Please sign by: <strong>April 3, 2026</strong></p>
<p style="margin:0 0 24px;font-size:13px;color:#6b6b6b;">3 signature fields required</p>
<a href="#" style="display:inline-block;padding:12px 32px;background:#26ae60;color:#fff;text-decoration:none;border-radius:4px;font-size:16px;font-weight:600;">Review Document</a>
</div></div></body></html>`,
      `Please DocuSign: SaaS Subscription Agreement — Laminar Inc.\n\nChris Wade (chris.wade@partners.vc) has sent you a document to review and sign.\n\nDocument: SaaS Subscription Agreement — Laminar Inc.\nPlease sign by: April 3, 2026\nSignature fields: 3\n\nReview and sign: https://docusign.net/...`,
    ),
  },
  {
    id: "18",
    from: { name: "Figma", email: "notification@figma.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Ehein Nakamura shared a file with you",
    preview: "Ehein shared 'Laminar — Design System v2' with you in the Laminar workspace. You now have editor access. Open in Figma.",
    date: new Date("2026-03-24T13:30:00"),
    isRead: true,
    isStarred: false,
    labels: ["Design"],
    hasAttachment: false,
    threadId: "t18",
    body: serviceBody(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:32px 16px;">
<div style="background:#fff;border-radius:6px;padding:24px;">
<p style="margin:0 0 16px;font-size:15px;color:#333;line-height:1.5;"><strong>Ehein Nakamura</strong> shared <strong>Laminar — Design System v2</strong> with you in the <strong>Laminar</strong> workspace.</p>
<p style="margin:0 0 16px;font-size:14px;color:#555;">You now have <strong>editor</strong> access.</p>
<p style="margin:0 0 16px;font-size:13px;color:#888;">Note from Ehein: "Updated token structure and added the email list component. Let me know if the spacing on the thread view feels right."</p>
<a href="#" style="display:inline-block;padding:10px 20px;background:#1abcfe;color:#fff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;">Open in Figma</a>
</div></div></body></html>`,
      `Ehein Nakamura shared "Laminar — Design System v2" with you in the Laminar workspace.\n\nYou now have editor access.\n\nNote from Ehein: "Updated token structure and added the email list component. Let me know if the spacing on the thread view feels right."\n\nOpen in Figma: https://figma.com/file/...`,
    ),
  },
  {
    id: "19",
    from: { name: "PagerDuty", email: "alerts@pagerduty.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "RESOLVED: API p99 latency spike — all systems normal",
    preview: "Incident #INC-0091 has been resolved. Duration: 14 minutes. Root cause: Redis connection pool exhaustion during a spike in concurrent WebSocket connections. Post-mortem linked.",
    date: new Date("2026-03-24T03:47:00"),
    isRead: true,
    isStarred: false,
    labels: ["Infra"],
    hasAttachment: false,
    threadId: "t19",
    body: serviceBody(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#fff;font-family:-apple-system,BlinkMacSystemFont,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:24px 16px;">
<div style="border-left:4px solid #27ae60;padding:16px 20px;background:#f0fdf4;border-radius:0 6px 6px 0;margin-bottom:20px;">
<p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#166534;">✓ RESOLVED — INC-0091</p>
<p style="margin:0;font-size:13px;color:#166534;">API p99 latency spike · Duration: 14 minutes</p>
</div>
<table style="width:100%;font-size:13px;color:#374151;border-collapse:collapse;margin-bottom:16px;">
<tr><td style="padding:6px 0;color:#6b7280;width:140px;">Root cause</td><td style="padding:6px 0;">Redis connection pool exhaustion during WebSocket connection spike</td></tr>
<tr><td style="padding:6px 0;color:#6b7280;">Peak p99 latency</td><td style="padding:6px 0;">2,840ms (threshold: 500ms)</td></tr>
<tr><td style="padding:6px 0;color:#6b7280;">Affected service</td><td style="padding:6px 0;">laminar-api (all instances)</td></tr>
<tr><td style="padding:6px 0;color:#6b7280;">Duration</td><td style="padding:6px 0;">02:33 – 02:47 UTC (14 min)</td></tr>
<tr><td style="padding:6px 0;color:#6b7280;">User impact</td><td style="padding:6px 0;">Degraded — WebSocket reconnects, slow inbox loads</td></tr>
</table>
<p style="margin:0 0 12px;font-size:13px;color:#374151;">Post-mortem: <a href="#" style="color:#4f46e5;">INC-0091 Post-mortem</a></p>
</div></body></html>`,
      `RESOLVED: INC-0091 — API p99 latency spike\n\nRoot cause: Redis connection pool exhaustion during a spike in concurrent WebSocket connections.\nPeak p99 latency: 2,840ms\nDuration: 02:33–02:47 UTC (14 min)\nUser impact: Degraded WebSocket and inbox performance\n\nPost-mortem linked in the PagerDuty dashboard.`,
    ),
  },
  {
    id: "20",
    from: { name: "Marcus Bell", email: "marcus.bell@enterprise.co" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Enterprise pilot — onboarding 50 seats next week",
    preview: "Hi Thomas, we're ready to start the pilot with 50 seats. Can you provision the accounts by Monday? I'll send over the CSV with user details and domain restrictions this afternoon.",
    date: new Date("2026-03-23T17:00:00"),
    isRead: true,
    isStarred: true,
    labels: ["Client"],
    hasAttachment: false,
    threadId: "t20",
    body: makeBody(
      `Hi Thomas,

We're ready to move ahead with the pilot. Procurement gave final sign-off this afternoon, so we're clear to onboard starting April 1.

I'll send over a CSV with user details (name, email, role) by end of day Friday. A few things we'll need configured before go-live:
- SSO via Okta (SAML 2.0) — I'll send the metadata XML separately
- Domain restriction to @enterprise.co only
- Audit log export endpoint for our compliance team

Can you have our IT contact reach out to Akash directly to sort out the SSO setup? I'd like to have it tested by March 31. Let me know if the timeline is feasible.`,
      `Marcus Bell\nVP Engineering, Enterprise Co.\nmarcus.bell@enterprise.co\n+1 (646) 555-0101`,
    ),
  },
  {
    id: "21",
    from: { name: "npm", email: "npm@npmjs.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Critical security advisory: lodash < 4.17.21",
    preview: "A critical vulnerability (CVE-2021-23337) has been found in lodash versions below 4.17.21. Run npm audit to check if any of your projects are affected.",
    date: new Date("2026-03-23T12:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Security", "Dev"],
    hasAttachment: false,
    threadId: "t21",
    body: serviceBody(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#fff;font-family:monospace;">
<div style="max-width:600px;margin:0 auto;padding:24px;background:#1a1a1a;color:#d4d4d4;border-radius:4px;">
<p style="margin:0 0 8px;color:#569cd6;font-size:14px;">npm security advisory</p>
<p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#f14c4c;">Critical vulnerability: lodash &lt; 4.17.21</p>
<p style="margin:0 0 4px;font-size:13px;"><span style="color:#9cdcfe;">CVE</span>: <span style="color:#ce9178;">CVE-2021-23337</span></p>
<p style="margin:0 0 4px;font-size:13px;"><span style="color:#9cdcfe;">Severity</span>: <span style="color:#f14c4c;">Critical (9.8)</span></p>
<p style="margin:0 0 4px;font-size:13px;"><span style="color:#9cdcfe;">CVSS vector</span>: <span style="color:#ce9178;">CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:H</span></p>
<p style="margin:0 0 16px;font-size:13px;"><span style="color:#9cdcfe;">Fix</span>: <span style="color:#4ec9b0;">Update to lodash@4.17.21 or later</span></p>
<p style="margin:0 0 8px;font-size:13px;color:#888;">Run the following to check your projects:</p>
<div style="background:#0d0d0d;padding:12px;border-radius:4px;font-size:13px;color:#4ec9b0;">$ npm audit</div>
</div></body></html>`,
      `npm security advisory\n\nCritical vulnerability in lodash < 4.17.21\nCVE: CVE-2021-23337 | Severity: Critical (9.8)\n\nCommand injection via prototype pollution. An attacker with access to a template string can execute arbitrary code.\n\nFix: Update to lodash@4.17.21 or later.\nRun: npm audit`,
    ),
  },
  {
    id: "22",
    from: { name: "Priya Nair", email: "priya.nair@designpartner.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Brand assets delivered — logo, wordmark, icon set",
    preview: "Hi Thomas! All brand assets are ready. The package includes SVG, PNG (1x/2x/3x), and the Figma source file. I've also included usage guidelines in the PDF.",
    date: new Date("2026-03-23T10:45:00"),
    isRead: true,
    isStarred: false,
    labels: ["Design"],
    hasAttachment: true,
    threadId: "t22",
    body: makeBody(
      `Hi Thomas!

All brand assets are delivered and ready to use. Here's what's in the package:

SVG files: logo (horizontal), wordmark (stacked), icon mark (standalone). Each in light and dark variants.
PNG exports: 1x, 2x, and 3x for all marks.
Figma source: full master file with all variants on organized frames.
Usage guide: PDF with clear/minimum-size rules, incorrect usage examples, and color pairing guidelines.

One thing to note: the icon mark has a minimum size of 24x24px on screen — below that it gets too tight. I've called this out in the guide.

Let me know if you need any format I've missed (ico, icns, etc.) and I'll export those too.`,
      `Priya Nair\nBrand Designer, Design Partner\npriya.nair@designpartner.com`,
      [
        { id: "a22a", filename: "Laminar_Brand_Assets.zip", contentType: "application/zip", size: 18_874_368 },
        { id: "a22b", filename: "Laminar_Brand_Usage_Guide.pdf", contentType: "application/pdf", size: 3_145_728 },
      ],
    ),
  },
  // --- Last week ---
  {
    id: "23",
    from: { name: "Cloudflare", email: "noreply@cloudflare.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "DDoS attack mitigated — laminar.email",
    preview: "Cloudflare detected and mitigated a DDoS attack targeting laminar.email between 02:10–02:38 UTC. 1.2M requests were blocked. No downtime was observed.",
    date: new Date("2026-03-21T03:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Security", "Infra"],
    hasAttachment: false,
    threadId: "t23",
    body: serviceBody(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8971d;font-family:sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:2px;">
<div style="background:#fff;margin:0;padding:24px;">
<p style="margin:0 0 4px;font-size:12px;color:#f38020;font-weight:700;letter-spacing:1px;">CLOUDFLARE</p>
<p style="margin:0 0 16px;font-size:18px;font-weight:600;color:#1d1d1d;">DDoS attack mitigated — laminar.email</p>
<table style="width:100%;font-size:13px;color:#4a5568;border-collapse:collapse;">
<tr><td style="padding:6px 0;color:#718096;width:160px;">Zone</td><td style="padding:6px 0;">laminar.email</td></tr>
<tr><td style="padding:6px 0;color:#718096;">Attack duration</td><td style="padding:6px 0;">02:10 – 02:38 UTC (28 min)</td></tr>
<tr><td style="padding:6px 0;color:#718096;">Requests blocked</td><td style="padding:6px 0;color:#e53e3e;font-weight:600;">1,247,830</td></tr>
<tr><td style="padding:6px 0;color:#718096;">Attack type</td><td style="padding:6px 0;">HTTP flood (volumetric L7)</td></tr>
<tr><td style="padding:6px 0;color:#718096;">Downtime</td><td style="padding:6px 0;color:#38a169;font-weight:600;">None — fully mitigated</td></tr>
</table>
</div></div></body></html>`,
      `Cloudflare — DDoS attack mitigated on laminar.email\n\nZone: laminar.email\nAttack duration: 02:10–02:38 UTC (28 min)\nRequests blocked: 1,247,830\nAttack type: HTTP flood (volumetric L7)\nDowntime: None — fully mitigated by Cloudflare WAF`,
    ),
  },
  {
    id: "24",
    from: { name: "David Kim", email: "david.kim@advisor.net" },
    to: [
      { name: "Thomas", email: "thomas@laminar.email" },
      { name: "Akash Patel", email: "akash@laminar.email" },
    ],
    subject: "Advisor check-in notes — March 20",
    preview: "Great conversation today. Summary: focus on enterprise B2B for next 6 months, defer consumer launch, prioritize SOC 2 Type II certification before going upmarket.",
    date: new Date("2026-03-20T19:30:00"),
    isRead: true,
    isStarred: true,
    labels: ["Investor"],
    hasAttachment: true,
    threadId: "t24",
    body: makeBody(
      `Hi Thomas and Akash,

Great session today. Here are the key takeaways from our March 20 check-in:

Go-to-market: Stay enterprise B2B for the next 6 months. Consumer launch adds complexity without meaningful revenue signal at this stage. One logo customer at $50K ARR is worth more than 500 individual subscribers.

Fundraising: The term sheet conversations look promising but don't optimize for highest valuation — optimize for best partner fit. You want someone who's done enterprise SaaS before.

Compliance: SOC 2 Type II should be on the roadmap before you approach F500 accounts. Consider a lightweight compliance tool (Vanta or Drata) rather than hiring a compliance person this early.

Next check-in: April 17. I'd like to see updated ARR projections and a competitive differentiation one-pager.

Notes PDF attached.`,
      `David Kim\nAdvisor\ndavid.kim@advisor.net`,
      [{ id: "a24", filename: "Advisor_Checkin_Mar20_Notes.pdf", contentType: "application/pdf", size: 204_800 }],
    ),
  },
  {
    id: "25",
    from: { name: "Loom", email: "notifications@loom.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Sarah Chen shared a video with you — 'SMTP pipeline walkthrough'",
    preview: "Sarah sent you a Loom video: 'SMTP pipeline walkthrough — 18 min'. She left a comment: 'Flagging the race condition at 11:42, curious if you've seen this in prod.'",
    date: new Date("2026-03-20T14:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Dev"],
    hasAttachment: false,
    threadId: "t25",
    body: serviceBody(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f9f9f9;font-family:sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:24px 16px;">
<div style="background:#fff;border-radius:8px;padding:20px;border:1px solid #e5e5e5;">
<p style="margin:0 0 4px;font-size:12px;color:#888;">Loom · New video shared with you</p>
<p style="margin:0 0 12px;font-size:17px;font-weight:600;color:#111;">SMTP pipeline walkthrough — 18 min</p>
<div style="background:#000;border-radius:6px;height:160px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;">
<div style="width:48px;height:48px;background:rgba(255,255,255,.9);border-radius:50%;display:flex;align-items:center;justify-content:center;">
<span style="font-size:20px;">▶</span>
</div>
</div>
<p style="margin:0 0 12px;font-size:13px;color:#555;">From: <strong>Sarah Chen</strong></p>
<p style="margin:0 0 16px;font-size:13px;color:#555;font-style:italic;">"Flagging the race condition at 11:42 — the Redis SETNX and the Postgres INSERT aren't atomic. If the worker crashes between the two, you'll get a dangling Redis key with no DB row. Curious if you've seen this in prod."</p>
<a href="#" style="display:inline-block;padding:8px 20px;background:#625df5;color:#fff;text-decoration:none;border-radius:6px;font-size:14px;">Watch video</a>
</div></div></body></html>`,
      `Sarah Chen shared a Loom video with you: "SMTP pipeline walkthrough — 18 min"\n\nComment: "Flagging the race condition at 11:42 — the Redis SETNX and the Postgres INSERT aren't atomic. If the worker crashes between the two, you'll get a dangling Redis key with no DB row. Curious if you've seen this in prod."\n\nWatch: https://loom.com/share/...`,
    ),
  },
  {
    id: "26",
    from: { name: "Gusto", email: "no-reply@gusto.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Payroll processed — March 15 payroll complete",
    preview: "Your March 15 payroll has been processed successfully. Total payroll: $18,400.00. Funds will be debited from your account on March 15. View full payroll summary.",
    date: new Date("2026-03-20T09:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Finance"],
    hasAttachment: true,
    threadId: "t26",
    body: makeBody(
      `Hi Thomas,

Your March 15 payroll has been processed and is confirmed.

Total payroll: $18,400.00
Employees paid: 2 (Thomas, Sarah Chen)
Contractors: 1 (Mike Thornton — paid separately via Deel)
Debit date: March 15, 2026

The full payroll summary including tax withholdings and employer contributions is attached as a PDF. You can also view the breakdown in your Gusto dashboard.`,
      `Gusto Payroll\nno-reply@gusto.com`,
      [{ id: "a26", filename: "Gusto_Payroll_Mar15_2026.pdf", contentType: "application/pdf", size: 176_128 }],
    ),
  },
  {
    id: "27",
    from: { name: "James Obi", email: "james.obi@legaldoc.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "NDA — countersigned copy enclosed",
    preview: "Hi Thomas, please find the fully executed NDA enclosed. Both parties have signed. You may retain this for your records. Let me know if you need any amendments.",
    date: new Date("2026-03-19T16:15:00"),
    isRead: true,
    isStarred: false,
    labels: ["Legal"],
    hasAttachment: true,
    threadId: "t27",
    body: makeBody(
      `Hi Thomas,

Please find the fully executed NDA enclosed. Both parties have now signed and the agreement is in effect as of today, March 19, 2026.

Key terms to note:
- Confidentiality period: 3 years from date of execution
- Governing law: State of Delaware
- Mutual — both parties are bound equally

You may retain this for your records. I've also uploaded a copy to our shared client portal. Let me know if you have any questions or need amendments.`,
      `James Obi\nAttorney, LegalDoc LLP\njames.obi@legaldoc.com\n+1 (212) 555-0047`,
      [{ id: "a27", filename: "NDA_Laminar_Executed_Mar19_2026.pdf", contentType: "application/pdf", size: 389_120 }],
    ),
  },
  {
    id: "28",
    from: { name: "Product Hunt", email: "hello@producthunt.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "You've been upvoted 142 times — Laminar is trending",
    preview: "Laminar is trending on Product Hunt today with 142 upvotes! You're currently #3 for the day. Share this milestone with your community to keep the momentum going.",
    date: new Date("2026-03-19T12:00:00"),
    isRead: true,
    isStarred: true,
    labels: ["Marketing"],
    hasAttachment: false,
    threadId: "t28",
    body: serviceBody(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#da552f;font-family:-apple-system,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:2px;">
<div style="background:#fff;padding:32px;">
<p style="margin:0 0 4px;font-size:13px;color:#da552f;font-weight:700;">Product Hunt</p>
<p style="margin:0 0 16px;font-size:22px;font-weight:700;color:#24292e;">🎉 Laminar is trending with 142 upvotes!</p>
<p style="margin:0 0 16px;font-size:14px;color:#586069;line-height:1.6;">You're currently <strong>#3 for the day</strong>. Your community is rallying — keep the momentum going by sharing the link on Twitter, LinkedIn, and in your newsletters.</p>
<div style="background:#fff8f6;border:1px solid #f9c5b1;border-radius:8px;padding:16px;margin-bottom:20px;text-align:center;">
<p style="margin:0 0 4px;font-size:32px;font-weight:800;color:#da552f;">142</p>
<p style="margin:0;font-size:13px;color:#888;">upvotes today</p>
</div>
<a href="#" style="display:inline-block;padding:10px 24px;background:#da552f;color:#fff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;">View your listing</a>
</div></div></body></html>`,
      `Product Hunt — Laminar is trending!\n\nYou've been upvoted 142 times today. You're currently #3 for the day.\n\nShare this milestone with your community to keep the momentum going.\n\nView your listing: https://producthunt.com/posts/laminar`,
    ),
  },
  {
    id: "29",
    from: { name: "Sentry", email: "noreply@sentry.io" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "New issue detected — UnhandledPromiseRejection in worker.ts",
    preview: "A new issue was detected in your laminar-worker project: UnhandledPromiseRejection: Cannot read properties of undefined (reading 'threadId'). Seen 23 times in the last hour.",
    date: new Date("2026-03-19T08:20:00"),
    isRead: true,
    isStarred: false,
    labels: ["Dev"],
    hasAttachment: false,
    threadId: "t29",
    body: serviceBody(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#1a1a2e;font-family:'Courier New',monospace;">
<div style="max-width:620px;margin:0 auto;padding:24px 16px;">
<div style="background:#16213e;border:1px solid #e63946;border-radius:6px;padding:20px;">
<p style="margin:0 0 4px;font-size:11px;color:#e63946;letter-spacing:2px;text-transform:uppercase;">Sentry · New Issue</p>
<p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#fff;">UnhandledPromiseRejection in worker.ts</p>
<div style="background:#0f0f1a;padding:12px;border-radius:4px;font-size:12px;color:#f0f0f0;margin-bottom:16px;overflow-x:auto;">
<p style="margin:0 0 4px;color:#888;">Error</p>
<p style="margin:0 0 8px;color:#e63946;">Cannot read properties of undefined (reading 'threadId')</p>
<p style="margin:0 0 4px;color:#888;">Stack trace</p>
<p style="margin:0 0 2px;color:#aaa;">  at processInboundEmail (worker.ts:142:28)</p>
<p style="margin:0 0 2px;color:#aaa;">  at RedisStream.handler (worker.ts:87:5)</p>
<p style="margin:0;color:#aaa;">  at EventEmitter.emit (node:events:514:28)</p>
</div>
<p style="margin:0 0 16px;font-size:13px;color:#aaa;">Seen <strong style="color:#fff;">23 times</strong> in the last hour · First seen 10 minutes ago</p>
<a href="#" style="display:inline-block;padding:8px 16px;background:#e63946;color:#fff;text-decoration:none;border-radius:4px;font-size:13px;font-weight:600;">View in Sentry</a>
</div></div></body></html>`,
      `[Sentry] New issue — laminar-worker\n\nUnhandledPromiseRejection: Cannot read properties of undefined (reading 'threadId')\n\nStack:\n  at processInboundEmail (worker.ts:142:28)\n  at RedisStream.handler (worker.ts:87:5)\n\nSeen 23 times in the last hour.\nView: https://sentry.io/laminar/issues/...`,
    ),
  },
  {
    id: "30",
    from: { name: "Aisha Okonkwo", email: "aisha@betauser.io" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Beta feedback — loving it, one big ask",
    preview: "Thomas, I've been using Laminar for two weeks. The speed is incredible compared to Gmail. One thing I really miss: keyboard shortcut to archive. Any plans for that?",
    date: new Date("2026-03-18T21:00:00"),
    isRead: true,
    isStarred: true,
    labels: ["Feedback"],
    hasAttachment: false,
    threadId: "t30",
    body: makeBody(
      `Hi Thomas,

I've been using Laminar for two weeks now as my daily driver and the speed is genuinely incredible — switching back to Gmail even briefly feels painful.

One big ask: keyboard shortcut to archive. I live in my inbox and archiving is probably my most frequent action. Right now I have to reach for the mouse which breaks flow. Even just mapping 'e' (like Gmail) would be a game-changer.

A couple of smaller things:
- The compose dialog sometimes loses focus after I insert an attachment
- Would love a way to undo-send (even 5 seconds would help)

Keep up the incredible work. Happy to jump on a call if you want more detailed feedback.`,
      `Aisha Okonkwo\naisha@betauser.io`,
    ),
  },
  {
    id: "31",
    from: { name: "GitHub", email: "noreply@github.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "[laminar/api] PR #44 merged — feat: Redis session store",
    preview: "Pull request #44 'feat: Redis session store with sliding expiry' was merged into main by thomas. 8 files changed, 312 additions, 47 deletions.",
    date: new Date("2026-03-18T17:45:00"),
    isRead: true,
    isStarred: false,
    labels: ["Dev"],
    hasAttachment: false,
    threadId: "t31",
    body: serviceBody(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#f6f8fa;font-family:-apple-system,sans-serif;"><div style="max-width:600px;margin:0 auto;padding:24px 16px;"><div style="background:#fff;border:1px solid #d0d7de;border-radius:6px;padding:20px;"><p style="margin:0 0 8px;font-size:15px;font-weight:600;color:#24292f;">[laminar/api] PR #44 merged into main</p><p style="margin:0 0 12px;font-size:13px;color:#57606a;">feat: Redis session store with sliding expiry — merged by <strong>thomas</strong></p><div style="background:#f6f8fa;border-radius:4px;padding:12px;font-size:13px;color:#24292f;margin-bottom:16px;"><p style="margin:0 0 4px;">8 files changed</p><p style="margin:0 0 4px;color:#2da44e;">+312 additions</p><p style="margin:0;color:#cf222e;">−47 deletions</p></div><a href="#" style="display:inline-block;padding:6px 14px;background:#2da44e;color:#fff;text-decoration:none;border-radius:6px;font-size:13px;">View pull request</a></div></div></body></html>`,
      `[laminar/api] PR #44 merged into main\n\nfeat: Redis session store with sliding expiry\nMerged by: thomas\n8 files changed · +312 additions · -47 deletions`,
    ),
  },
  {
    id: "32",
    from: { name: "Deel", email: "notifications@deel.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Contract signed — Mike Thornton (Backend Contractor)",
    preview: "Both parties have signed the contract for Mike Thornton. Engagement start date: April 1, 2026. Rate: $140/hr. Contract ID: DEL-20260318-4821.",
    date: new Date("2026-03-18T14:30:00"),
    isRead: true,
    isStarred: false,
    labels: ["Legal", "Freelance"],
    hasAttachment: true,
    threadId: "t32",
    body: makeBody(
      `Hi Thomas,

Both parties have signed the contractor agreement for Mike Thornton. The engagement is confirmed to start April 1, 2026.

Contract details:
- Contractor: Mike Thornton
- Rate: $140/hr, capped at 30hrs/week
- Engagement: April 1 – June 30, 2026 (renewable)
- Contract ID: DEL-20260318-4821

The fully executed contract PDF is attached. Mike's first invoice will be due no earlier than May 1.`,
      `Deel\nno-reply@deel.com`,
      [{ id: "a32", filename: "Deel_Contract_Thornton_20260318.pdf", contentType: "application/pdf", size: 312_320 }],
    ),
  },
  // --- Two weeks ago ---
  {
    id: "33",
    from: { name: "Intercom", email: "notifications@intercom.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "New conversation from Marcus Bell — billing question",
    preview: "Marcus Bell: 'Hi, I'm trying to understand how seats are counted. If a user is invited but hasn't logged in yet, does that count toward our 50-seat limit?'",
    date: new Date("2026-03-14T11:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Client"],
    hasAttachment: false,
    threadId: "t33",
    body: serviceBody(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#fff;font-family:-apple-system,sans-serif;"><div style="max-width:600px;margin:0 auto;padding:24px;"><div style="border-left:3px solid #1f8ded;padding:12px 16px;background:#f0f7ff;border-radius:0 6px 6px 0;margin-bottom:16px;"><p style="margin:0 0 4px;font-size:12px;color:#1f8ded;font-weight:600;">New conversation · Marcus Bell</p><p style="margin:0;font-size:14px;color:#1a1a1a;">"Hi, I'm trying to understand how seats are counted. If a user is invited but hasn't logged in yet, does that count toward our 50-seat limit?"</p></div><a href="#" style="display:inline-block;padding:8px 16px;background:#1f8ded;color:#fff;text-decoration:none;border-radius:4px;font-size:13px;">Reply in Intercom</a></div></body></html>`,
      `New Intercom conversation from Marcus Bell\n\n"Hi, I'm trying to understand how seats are counted. If a user is invited but hasn't logged in yet, does that count toward our 50-seat limit?"\n\nReply: https://app.intercom.com/conversations/...`,
    ),
  },
  {
    id: "34",
    from: { name: "Ben Carter", email: "ben.carter@ycombinator.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Re: W27 application — follow-up questions",
    preview: "Hi Thomas, thanks for applying to YC W27. We had a chance to review your application and have a few follow-up questions about your go-to-market strategy and current ARR.",
    date: new Date("2026-03-14T09:30:00"),
    isRead: true,
    isStarred: true,
    labels: ["Investor"],
    hasAttachment: false,
    threadId: "t34",
    body: makeBody(
      `Hi Thomas,

Thanks for submitting your application to Y Combinator's W27 batch. We had a chance to review it and are intrigued by the approach.

We have a few follow-up questions before scheduling an interview:

1. You mention sub-100ms latency on all actions — can you share the technical approach? Is this client-side caching, server-side optimization, or a combination?
2. What is your current ARR and MRR? How many paying customers?
3. Who are the two or three companies you see as your primary competitors, and what's your strongest differentiator against each?

Please reply to this email with your answers. We aim to make interview decisions within 2 weeks.`,
      `Ben Carter\nPartner, Y Combinator\nben.carter@ycombinator.com`,
    ),
  },
  {
    id: "35",
    from: { name: "DataDog", email: "noreply@datadoghq.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Monitor alert: API error rate > 5% (threshold: 1%)",
    preview: "Monitor 'API error rate' has triggered. Current value: 6.2%. Threshold: 1%. Triggered at 14:32 UTC. Affected service: laminar-api. View dashboard for details.",
    date: new Date("2026-03-13T14:35:00"),
    isRead: true,
    isStarred: false,
    labels: ["Infra"],
    hasAttachment: false,
    threadId: "t35",
    body: serviceBody(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#fff;font-family:sans-serif;"><div style="max-width:600px;margin:0 auto;padding:24px;"><div style="border-left:4px solid #e53e3e;padding:12px 16px;background:#fff5f5;border-radius:0 4px 4px 0;margin-bottom:16px;"><p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#c53030;">ALERT TRIGGERED · laminar-api</p><p style="margin:0;font-size:13px;color:#742a2a;">API error rate &gt; 5% (threshold: 1%)</p></div><table style="width:100%;font-size:13px;color:#4a5568;border-collapse:collapse;"><tr><td style="padding:6px 0;color:#718096;width:140px;">Current value</td><td style="padding:6px 0;color:#e53e3e;font-weight:600;">6.2%</td></tr><tr><td style="padding:6px 0;color:#718096;">Triggered at</td><td style="padding:6px 0;">14:32 UTC</td></tr><tr><td style="padding:6px 0;color:#718096;">Monitor</td><td style="padding:6px 0;">API error rate</td></tr><tr><td style="padding:6px 0;color:#718096;">Service</td><td style="padding:6px 0;">laminar-api (us-east-1)</td></tr></table></div></body></html>`,
      `[DataDog] Monitor alert: API error rate > 5%\n\nCurrent value: 6.2% (threshold: 1%)\nTriggered: 14:32 UTC\nService: laminar-api (us-east-1)\n\nView dashboard: https://app.datadoghq.com/monitors/...`,
    ),
  },
  {
    id: "36",
    from: { name: "Calendly", email: "no-reply@calendly.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "New meeting scheduled — Investor call with Priya Shah",
    preview: "Priya Shah has scheduled a 30-minute call for March 28 at 10:00 AM PST. Topic: Seed round due diligence. A calendar invite has been sent to both parties.",
    date: new Date("2026-03-13T10:00:00"),
    isRead: true,
    isStarred: true,
    labels: ["Investor"],
    hasAttachment: false,
    threadId: "t36",
    body: makeBody(
      `Hi Thomas,

Priya Shah has scheduled a 30-minute intro call with you for March 28, 2026 at 10:00 AM PST.

Topic: Seed round due diligence
Duration: 30 minutes
Format: Zoom (link in calendar invite)

Priya is a General Partner at Capital Fund and has led investments in 4 enterprise SaaS companies. She's been following Laminar since your Product Hunt launch.

A calendar invite has been sent to both parties. Please let me know if you need to reschedule.`,
      `Calendly\nno-reply@calendly.com`,
    ),
  },
  {
    id: "37",
    from: { name: "Jira", email: "jira@atlassian.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "ENG-188 resolved — Attachment MIME type validation",
    preview: "ENG-188 'Attachment MIME type validation bypass' has been marked as resolved by sarah-dev. Resolution: Fixed in v0.4.2. Deployed to production.",
    date: new Date("2026-03-12T16:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Dev", "Security"],
    hasAttachment: false,
    threadId: "t37",
    body: makeBody(
      `ENG-188 — Attachment MIME type validation bypass has been resolved.

Resolution: Fixed in v0.4.2 and deployed to production on March 12, 2026.

Root cause: The content-type header was being read from the MIME part header rather than being derived from the file magic bytes. Attackers could upload a .exe renamed to .pdf. The fix runs libmagic on the raw bytes and rejects files where the detected type doesn't match the declared content-type.

Resolved by: sarah-dev
Reviewer: thomas`,
      `Jira · Atlassian\njira@atlassian.com`,
    ),
  },
  {
    id: "38",
    from: { name: "Notion", email: "notify@notionhq.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Akash Patel shared 'Infrastructure Runbook' with you",
    preview: "Akash shared the page 'Infrastructure Runbook v2' with you. It includes updated procedures for RDS failover, Redis cluster scaling, and ECS task deployment.",
    date: new Date("2026-03-12T13:20:00"),
    isRead: true,
    isStarred: false,
    labels: ["Infra"],
    hasAttachment: false,
    threadId: "t38",
    body: makeBody(
      `Hi Thomas,

I've shared the updated Infrastructure Runbook v2 with you in Notion. It covers three critical operational procedures we've had gaps on:

RDS failover: Step-by-step with expected downtime windows (typically 30–60s for Multi-AZ). Includes the parameter group checks that tripped us up last time.

Redis cluster scaling: How to add read replicas without dropping existing connections. Covers the elasticache replication group CLI commands and the app-side connection string update.

ECS task deployment: Blue/green deployment via CodeDeploy with automatic rollback triggers if p99 exceeds 800ms within 5 minutes of deploy.

Please review before our next on-call rotation handoff.`,
      `Akash Patel\nCo-founder & Backend Engineer, Laminar\nakash@laminar.email`,
    ),
  },
  {
    id: "39",
    from: { name: "Tanya Mills", email: "tanya.mills@enterprise.co" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "SOC 2 audit — documents requested",
    preview: "Hi Thomas, as part of our vendor assessment we need the following: SOC 2 Type I report or equivalent, pen test results from the past 12 months, and your data processing addendum.",
    date: new Date("2026-03-11T15:45:00"),
    isRead: true,
    isStarred: true,
    labels: ["Legal", "Security"],
    hasAttachment: false,
    threadId: "t39",
    body: makeBody(
      `Hi Thomas,

As part of our vendor security assessment, we require the following documentation before we can proceed with the Enterprise pilot:

1. SOC 2 Type I or Type II report (or equivalent — ISO 27001 accepted)
2. Penetration test results dated within the past 12 months
3. Data Processing Addendum (DPA) for GDPR compliance
4. Subprocessor list

I understand you may be early-stage on some of these. We're open to discussing a roadmap commitment in lieu of completed reports for items 1 and 2. Items 3 and 4 are hard requirements.

Can we schedule a 30-minute call with your technical team to walk through this together?`,
      `Tanya Mills\nHead of Security & Compliance, Enterprise Co.\ntanya.mills@enterprise.co`,
    ),
  },
  {
    id: "40",
    from: { name: "AngelList", email: "notifications@angellist.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "3 investors viewed your profile this week",
    preview: "Your AngelList startup profile was viewed by 3 investors this week, including 2 from Tier 1 funds. Make sure your deck and traction metrics are up to date.",
    date: new Date("2026-03-11T09:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Investor"],
    hasAttachment: false,
    threadId: "t40",
    body: makeBody(
      `Hi Thomas,

Your AngelList startup profile was viewed by 3 investors this week, including 2 from Tier 1 funds. Here's a summary:

Views this week: 3
Unique funds: 3 (2 Tier 1, 1 Tier 2)
Profile completeness: 82% — consider adding a demo video

Top viewed section: Team & Founders

Tip: Founders who update their traction metrics monthly get 4× more inbound investor interest. Make sure your MRR and user count are current.`,
      `AngelList\nnotifications@angellist.com`,
    ),
  },
  // --- Last month ---
  {
    id: "41",
    from: { name: "Brex", email: "receipts@brex.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Brex card ending 4821 — $1,240.00 charge at AWS",
    preview: "A charge of $1,240.00 was made on your Brex card ending in 4821 at Amazon Web Services on March 1, 2026. If you didn't make this charge, contact support immediately.",
    date: new Date("2026-03-01T06:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Finance"],
    hasAttachment: false,
    threadId: "t41",
    body: makeBody(
      `A charge of $1,240.00 was made on your Brex card ending in 4821 at Amazon Web Services on March 1, 2026 at 12:00 AM UTC.

Merchant: Amazon Web Services
Amount: $1,240.00 USD
Card: Brex Business ····4821
Date: March 1, 2026
Category: Cloud Infrastructure

If you did not authorize this charge, please contact Brex support immediately at support.brex.com or call 1-855-802-7390.`,
      `Brex\nreceipts@brex.com`,
    ),
  },
  {
    id: "42",
    from: { name: "Cloudflare", email: "noreply@cloudflare.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Domain laminar.email — renewal successful",
    preview: "Your domain laminar.email has been renewed for 1 year and will expire on March 1, 2027. Auto-renew is enabled. No further action is required.",
    date: new Date("2026-02-28T10:30:00"),
    isRead: true,
    isStarred: false,
    labels: ["Infra"],
    hasAttachment: false,
    threadId: "t42",
    body: makeBody(
      `Your domain laminar.email has been successfully renewed for 1 year.

Domain: laminar.email
Renewal period: 1 year
New expiry date: March 1, 2027
Auto-renew: Enabled
Payment: Brex ····4821, $12.99

No further action is required. You'll receive another reminder 30 days before your next renewal date.`,
      `Cloudflare\nnoreply@cloudflare.com`,
    ),
  },
  {
    id: "43",
    from: { name: "Sarah Chen", email: "sarah.chen@laminar.email" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Completed: Go backend architecture review",
    preview: "Finished the architecture review. Main findings: the inbound SMTP pipeline looks solid, but we should add circuit breakers around the S3 write calls in case of AWS degradation.",
    date: new Date("2026-02-27T18:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Dev"],
    hasAttachment: true,
    threadId: "t43",
    body: makeBody(
      `Hi Thomas,

I've finished the Go backend architecture review. Overall the codebase is in good shape — the separation between the three binaries (api, smtpd, worker) is clean and the internal package boundaries are well defined.

Main findings:

The inbound SMTP pipeline is solid. Writing to the Redis stream before returning 250 OK is the right call — I've seen teams get this wrong and lose emails.

Add circuit breakers around S3 writes in processor.go. If AWS has a regional degradation, your worker will pile up retries and exhaust the asynq retry budget before the issue resolves. A simple breaker with a 30-second open window would help.

The threading algorithm is correct for the RFC 5322 header chain but the subject fallback has a potential false-positive: "Re: Weekly Digest" from two unrelated senders within 7 days will get threaded. Consider adding sender domain as a secondary key.

Full review notes attached.`,
      `Sarah Chen\nLead Engineer, Laminar\nsarah.chen@laminar.email`,
      [{ id: "a43", filename: "Backend_Architecture_Review_Feb27.pdf", contentType: "application/pdf", size: 458_752 }],
    ),
  },
  {
    id: "44",
    from: { name: "HubSpot", email: "notifications@hubspot.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "New deal created — Enterprise Co. ($24,000 ARR)",
    preview: "A new deal 'Enterprise Co. Pilot → Annual' was created in your CRM pipeline. Deal value: $24,000 ARR. Close date: April 30, 2026. Owner: Thomas.",
    date: new Date("2026-02-26T14:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Client"],
    hasAttachment: false,
    threadId: "t44",
    body: makeBody(
      `A new deal has been created in your CRM pipeline.

Deal name: Enterprise Co. Pilot → Annual
Stage: Proposal Sent
Deal value: $24,000 ARR
Close date: April 30, 2026
Owner: Thomas
Contact: Marcus Bell (marcus.bell@enterprise.co)

Next step: Send security documentation requested by Tanya Mills (due March 18). Deal depends on SOC 2 roadmap commitment.

View deal in HubSpot to update notes and activities.`,
      `HubSpot CRM\nnotifications@hubspot.com`,
    ),
  },
  {
    id: "45",
    from: { name: "Priya Shah", email: "priya.shah@capitalfund.vc" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Term sheet — first look",
    preview: "Thomas, I've attached a draft term sheet for your review. Pre-money valuation: $8M. Investment: $1.5M. Lead: Capital Fund. Please review with your counsel before responding.",
    date: new Date("2026-02-25T11:00:00"),
    isRead: true,
    isStarred: true,
    labels: ["Investor", "Legal"],
    hasAttachment: true,
    threadId: "t45",
    body: makeBody(
      `Thomas,

I've attached a draft term sheet for your review. Please treat this as confidential and share only with your legal counsel.

Key terms:
- Pre-money valuation: $8,000,000
- Investment amount: $1,500,000
- Lead investor: Capital Fund (Priya Shah)
- Pro-rata rights: Yes, for follow-on rounds up to Series B
- Board seat: 1 observer seat for Capital Fund
- Liquidation preference: 1× non-participating
- Anti-dilution: Broad-based weighted average

This is a non-binding term sheet and is subject to due diligence and final documentation. We aim to close within 30 days of a signed term sheet.

Please respond by April 4, 2026 to keep the timeline on track.`,
      `Priya Shah\nGeneral Partner, Capital Fund\npriya.shah@capitalfund.vc`,
      [{ id: "a45", filename: "Laminar_TermSheet_Draft_CapitalFund.pdf", contentType: "application/pdf", size: 524_288 }],
    ),
  },
  {
    id: "46",
    from: { name: "Twilio", email: "no-reply@twilio.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Your Twilio account was charged $42.80",
    preview: "Your Twilio account was charged $42.80 for SMS and email usage during February 2026. This charge was applied to your card ending in 4821.",
    date: new Date("2026-02-24T08:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Finance"],
    hasAttachment: true,
    threadId: "t46",
    body: makeBody(
      `Your Twilio account was charged $42.80 for usage during February 2026.

Breakdown:
- SMS messages sent: 342 × $0.0079 = $2.70
- Outbound email (SendGrid): 18,400 messages × $0.00218 = $40.10

Total: $42.80 USD
Charged to: Brex ····4821
Invoice period: February 1–28, 2026

The full invoice with per-message logs is attached.`,
      `Twilio\nno-reply@twilio.com`,
      [{ id: "a46", filename: "Twilio_Invoice_Feb2026.pdf", contentType: "application/pdf", size: 89_088 }],
    ),
  },
  {
    id: "47",
    from: { name: "YC Startup School", email: "hello@startupschool.org" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Weekly check-in — week 8 submission",
    preview: "Don't forget to submit your week 8 check-in by Sunday 11:59 PM PT. Share your primary metric, what's working, and what you're struggling with.",
    date: new Date("2026-02-22T09:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Investor"],
    hasAttachment: false,
    threadId: "t47",
    body: makeBody(
      `Hi Thomas,

Don't forget to submit your week 8 check-in by Sunday 11:59 PM PT.

This week, please share:
1. Your primary metric and how it changed week-over-week
2. What's working — what's driving growth or retention
3. What you're struggling with — be specific, the community can help
4. Your goal for next week

Founders who submit check-ins consistently are 2.4× more likely to get an interview. Keep the momentum going.`,
      `YC Startup School\nhello@startupschool.org`,
    ),
  },
  {
    id: "48",
    from: { name: "Diego Reyes", email: "diego.reyes@betauser.io" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Bug report — emails not threading correctly from Outlook",
    preview: "Hi Thomas, found a bug. When I reply to a Laminar email from Outlook, the reply appears as a new thread instead of being grouped. Seems like the Message-ID parsing might be off.",
    date: new Date("2026-02-21T17:30:00"),
    isRead: true,
    isStarred: false,
    labels: ["Feedback", "Dev"],
    hasAttachment: false,
    threadId: "t48",
    body: makeBody(
      `Hi Thomas,

Found a threading bug I wanted to flag. When I reply to a Laminar email from Outlook on Windows, the reply shows up as a completely new thread in Laminar instead of being grouped with the original.

Here's what I think is happening: Outlook rewrites the Message-ID on replies rather than setting In-Reply-To to the original. Your threading algorithm probably relies on In-Reply-To being set, and when it's missing or wrong, the fallback subject match is failing too.

To reproduce:
1. Receive an email in Laminar from any sender
2. Reply to it from Outlook 365 on Windows
3. The reply arrives in Laminar as a new thread

Happy to screen share if that's helpful. This is a real workflow blocker for me since half my team uses Outlook.`,
      `Diego Reyes\ndiego.reyes@betauser.io`,
    ),
  },
  {
    id: "49",
    from: { name: "Retool", email: "noreply@retool.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Your admin dashboard is ready",
    preview: "Your Laminar admin dashboard has been deployed to retool.com/apps/laminar-admin. You can now manage users, view system metrics, and run support queries directly.",
    date: new Date("2026-02-20T13:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Dev", "Infra"],
    hasAttachment: false,
    threadId: "t49",
    body: makeBody(
      `Hi Thomas,

Your Laminar admin dashboard is now deployed and accessible.

URL: retool.com/apps/laminar-admin
Login: Use your Laminar account credentials

Available tools:
- User management: search, suspend, reset password, view usage stats
- System metrics: Redis hit rate, SES bounce/complaint rates, S3 storage by user
- Support queries: look up any email by messageId, userId, or threadId
- Migration runner: trigger golang-migrate up/down from the UI

The dashboard connects directly to your production RDS read replica — all queries are read-only by default. The "Admin Actions" panel requires a separate admin token.`,
      `Retool\nnoreply@retool.com`,
    ),
  },
  {
    id: "50",
    from: { name: "Figma", email: "notification@figma.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Comment from Ehein — compose dialog spacing",
    preview: "Ehein left a comment on frame 'Compose Dialog — Desktop': 'The bottom padding feels tight on 13-inch screens. Can we bump this to 24px and test on smaller viewports?'",
    date: new Date("2026-02-19T10:15:00"),
    isRead: true,
    isStarred: false,
    labels: ["Design"],
    hasAttachment: false,
    threadId: "t50",
    body: makeBody(
      `Hi Thomas,

I left a comment on the compose dialog frame in the Figma file — wanted to flag it before Ehein calls the design done.

The bottom padding on the compose dialog footer (where the send button lives) is 16px on desktop. On 13-inch MacBook screens at 1280×800, this creates a tight feeling when the dialog is at its default height. The send button ends up very close to the window chrome.

My suggestion: bump to 24px and add a min-height constraint on the dialog so it never collapses smaller than 480px. I've mocked this up in the Figma comment — click the yellow annotation on the footer area to see it.

Can you weigh in? Ehein is filing this as done end of day.`,
      `Figma\nnotification@figma.com`,
    ),
  },
  // --- Older ---
  {
    id: "51",
    from: { name: "Aisha Okonkwo", email: "aisha@betauser.io" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Re: Keyboard shortcut feedback — follow-up",
    preview: "Tried the new archive shortcut (E key) — it's perfect. Also noticed the compose dialog is now much snappier. Whatever you did to the TipTap integration, it works.",
    date: new Date("2026-02-14T20:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Feedback"],
    hasAttachment: false,
    threadId: "t51",
    body: makeBody(
      `Thomas,

Just wanted to follow up on my earlier feedback email — I tried the new archive shortcut (E key) and it's exactly right. Fast, muscle-memory-friendly, no confirmation dialog. That's the kind of thing that makes Laminar feel different.

Also noticed the compose dialog is noticeably snappier. Whatever you did to the TipTap integration — the toolbar no longer flickers on focus and the attachment insert is instant now. Big improvement.

One more thing I noticed: the HTML email renderer doesn't scroll horizontally on emails with wide tables (like marketing newsletters). They just get cut off. Might be worth adding overflow-x: auto to the iframe wrapper.

Keep shipping.`,
      `Aisha Okonkwo\naisha@betauser.io`,
    ),
  },
  {
    id: "52",
    from: { name: "Stripe", email: "billing@stripe.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Your Stripe account is now live — accept payments",
    preview: "Congratulations, your Stripe account has been activated and you can now accept live payments. Your test mode transactions have been preserved. View your dashboard.",
    date: new Date("2026-02-10T11:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Finance"],
    hasAttachment: false,
    threadId: "t52",
    body: makeBody(
      `Congratulations — your Stripe account has been activated for live payments.

Account ID: acct_1OzXxXXXXXXXXXXX
Business: Laminar Inc.
Country: United States
Default currency: USD

You can now:
- Accept payments via Stripe Checkout, Payment Links, or the API
- Send invoices directly from the Stripe dashboard
- View your balance and initiate payouts to your bank account

Your test mode data and configurations have been preserved. To switch to live mode in the API, replace your test secret key (sk_test_...) with your live secret key from the dashboard.`,
      `Stripe\nbilling@stripe.com`,
    ),
  },
  {
    id: "53",
    from: { name: "Marcus Bell", email: "marcus.bell@enterprise.co" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Pilot approved — procurement sign-off complete",
    preview: "Good news — procurement has signed off on the Laminar pilot. We're clear to start on April 1. I'll have the IT team reach out about SSO configuration and domain allowlisting.",
    date: new Date("2026-02-08T15:30:00"),
    isRead: true,
    isStarred: true,
    labels: ["Client"],
    hasAttachment: false,
    threadId: "t53",
    body: makeBody(
      `Thomas,

Good news — procurement has signed off on the Laminar pilot. We're clear to start onboarding on April 1.

I'll have our IT team contact Akash directly about the SSO setup (Okta SAML 2.0). They'll need:
- Your SP metadata XML or the ACS URL and Entity ID
- The attribute mapping for email, first name, last name, and role

One additional ask from our security team: can you confirm whether email data at rest is encrypted? They want AES-256 or equivalent on S3 and RDS.

I'm excited for this — the speed improvement over our current tool is going to make a real difference for the team.`,
      `Marcus Bell\nVP Engineering, Enterprise Co.\nmarcus.bell@enterprise.co`,
    ),
  },
  {
    id: "54",
    from: { name: "Let's Encrypt", email: "expiry@letsencrypt.org" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Certificate expiry notice — laminar.email expires in 20 days",
    preview: "Your certificate for laminar.email will expire in 20 days on March 1, 2026. If you are using Certbot or another ACME client, please ensure auto-renewal is configured correctly.",
    date: new Date("2026-02-07T08:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Infra"],
    hasAttachment: false,
    threadId: "t54",
    body: makeBody(
      `This is a reminder that your TLS certificate for laminar.email will expire in 20 days on March 1, 2026.

Certificate details:
- Domain: laminar.email (+ *.laminar.email)
- Issuer: Let's Encrypt Authority X3
- Expiry: March 1, 2026 at 00:00 UTC

If you are using Certbot with auto-renewal:
  sudo certbot renew --dry-run

If you are on AWS Certificate Manager (ACM), certificates are renewed automatically — no action required.

If this certificate is not renewed before expiry, HTTPS connections to laminar.email will fail and your SMTP TLS handshake will be rejected by most receiving mail servers.`,
      `Let's Encrypt\nexpiry@letsencrypt.org`,
    ),
  },
  {
    id: "55",
    from: { name: "Sarah Chen", email: "sarah.chen@laminar.email" },
    to: [
      { name: "Thomas", email: "thomas@laminar.email" },
      { name: "Akash Patel", email: "akash@laminar.email" },
      { name: "Ehein Nakamura", email: "ehein@laminar.email" },
    ],
    subject: "Retrospective notes — Sprint 4",
    preview: "Hi team, notes from today's retrospective are below. Went well: MIME parser stability. To improve: test coverage on the threading algorithm. Action items assigned in Linear.",
    date: new Date("2026-02-06T17:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Dev"],
    hasAttachment: true,
    threadId: "t55",
    body: makeBody(
      `Hi team,

Notes from the Sprint 4 retrospective are below.

What went well:
- MIME parser is now stable across all test corpus emails including the Outlook edge cases
- Deployment pipeline is clean — zero rollbacks this sprint
- P99 inbox load time hit our 100ms target for the first time

To improve:
- Test coverage on the threading algorithm is at 61% — we need to get this to 80%+ before adding more threading features
- Standup has been running long; let's timebox to 15 minutes starting next sprint

Action items (all tracked in Linear):
- Thomas: add property-based tests for JWZ algorithm (ENG-211)
- Akash: instrument Redis cache hit rate per endpoint (ENG-212)
- Ehein: file design tickets for mobile nav (ENG-213)
- Sarah: schedule architecture review for the search indexer (ENG-214)

Retrospective board and full notes attached.`,
      `Sarah Chen\nLead Engineer, Laminar\nsarah.chen@laminar.email`,
      [{ id: "a55", filename: "Sprint4_Retrospective_Notes.pdf", contentType: "application/pdf", size: 143_360 }],
    ),
  },
  {
    id: "56",
    from: { name: "LinkedIn", email: "messages-noreply@linkedin.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "You have a new message from Jordan Wu",
    preview: "Jordan Wu: 'Hi Thomas, I've been following Laminar's progress — really impressive work on the threading algo. I'd love to chat about a potential partnership opportunity.'",
    date: new Date("2026-02-05T13:00:00"),
    isRead: true,
    isStarred: false,
    labels: [],
    hasAttachment: false,
    threadId: "t56",
    body: makeBody(
      `Hi Thomas,

I've been following Laminar's progress since your Product Hunt launch — really impressive work, especially the threading algorithm. I saw your post about the JWZ implementation and it's elegantly done.

I'd love to explore a potential partnership opportunity. My company builds email analytics tooling for enterprise teams and I think there could be a natural integration point — Laminar handles the client experience, we layer on top with inbox analytics and response time tracking.

Would you be open to a 20-minute call this week or next? No agenda pressure — just want to explore if there's anything worth pursuing.

Best,
Jordan`,
      `Jordan Wu\nCo-founder, InboxIQ\nlinkedin.com/in/jordanwu`,
    ),
  },
  {
    id: "57",
    from: { name: "James Obi", email: "james.obi@legaldoc.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Privacy Policy + Terms of Service — final drafts",
    preview: "Hi Thomas, please find the final drafts of your Privacy Policy and Terms of Service enclosed. I've highlighted the sections relevant to GDPR compliance and data retention.",
    date: new Date("2026-02-03T11:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Legal"],
    hasAttachment: true,
    threadId: "t57",
    body: makeBody(
      `Hi Thomas,

Please find the final drafts of your Privacy Policy and Terms of Service enclosed. Both documents are ready for publication on laminar.email/legal.

Key points I've highlighted in the attached PDFs:

Privacy Policy:
- Data retention: emails stored for the life of the account + 30-day grace period after deletion
- Subprocessors listed: AWS (storage/compute), Stripe (billing), Gusto (payroll)
- GDPR Article 17 right-to-erasure: handled via account deletion flow, 30-day hard delete
- Cookie policy: session cookies only, no analytics tracking cookies without consent

Terms of Service:
- Acceptable use: no spam, no scraping, no resale of service
- SLA: 99.9% uptime commitment with credits for downtime
- Governing law: Delaware, USA

Once you've reviewed, I'll file these with your registered agent.`,
      `James Obi\nAttorney, LegalDoc LLP\njames.obi@legaldoc.com`,
      [
        { id: "a57a", filename: "Laminar_PrivacyPolicy_Final.pdf", contentType: "application/pdf", size: 614_400 },
        { id: "a57b", filename: "Laminar_TermsOfService_Final.pdf", contentType: "application/pdf", size: 573_440 },
      ],
    ),
  },
  {
    id: "58",
    from: { name: "Loom", email: "notifications@loom.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Ehein Nakamura shared 'Mobile nav — swipe gestures demo'",
    preview: "Ehein sent you a Loom video: 'Mobile nav — swipe gestures demo — 6 min'. Comment: 'Prototype is working. Wanted your thoughts on the swipe sensitivity before I file a ticket.'",
    date: new Date("2026-02-01T16:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Design"],
    hasAttachment: false,
    threadId: "t58",
    body: makeBody(
      `Hi Thomas,

Sharing a Loom demo of the mobile nav swipe gestures prototype — it's about 6 minutes.

The prototype covers:
- Swipe right on email list item → archive (with undo snackbar)
- Swipe left → snooze picker
- Pull-to-refresh on the email list
- Bottom sheet navigation (replaces sidebar on mobile)

One question before I file the ticket: the swipe sensitivity is currently set to trigger after 40px of horizontal travel. On some devices that feels a little eager — I've also tried 60px which feels more intentional but slightly sluggish.

Would love your read on the right tradeoff. I'll also ping Ehein for a second opinion.`,
      `Ehein Nakamura\nFrontend Engineer, Laminar\nehein@laminar.email`,
    ),
  },
  {
    id: "59",
    from: { name: "Akash Patel", email: "akash@laminar.email" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Postgres query optimization — inbox load down to 28ms",
    preview: "Good news — after adding the composite index on (user_id, folder_id, received_at DESC) and switching to keyset pagination, inbox load is down from 180ms to 28ms. Sharing the diff.",
    date: new Date("2026-01-30T19:45:00"),
    isRead: true,
    isStarred: true,
    labels: ["Dev"],
    hasAttachment: false,
    threadId: "t59",
    body: makeBody(
      `Thomas,

Good news — the inbox query is now sub-30ms on average. Here's what I did:

1. Added composite index: CREATE INDEX CONCURRENTLY idx_emails_user_folder_date ON emails (user_id, folder_id, received_at DESC) WHERE deleted_at IS NULL;

2. Switched from OFFSET pagination to keyset pagination using received_at + id as the cursor. This avoids the full table scan that was killing us on page 3+.

3. Added a covering index for the email list query so it never hits the heap for the list view fields (from_name, from_email, subject, preview, is_read, is_starred, labels).

Before: p50=180ms, p99=820ms
After: p50=18ms, p99=47ms

I'll PR the index migrations today. The app-side cursor change is already merged.`,
      `Akash Patel\nCo-founder & Backend Engineer, Laminar\nakash@laminar.email`,
    ),
  },
  {
    id: "60",
    from: { name: "AWS", email: "no-reply@aws.amazon.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "SES production access granted — laminar.email",
    preview: "Congratulations! Your request for Amazon SES production access has been approved for the domain laminar.email. You can now send email to any recipient. Daily sending limit: 50,000.",
    date: new Date("2026-01-28T10:00:00"),
    isRead: true,
    isStarred: true,
    labels: ["Infra"],
    hasAttachment: false,
    threadId: "t60",
    body: makeBody(
      `Congratulations — Amazon SES production access has been approved for the domain laminar.email.

Previous status: Sandbox (send to verified addresses only)
New status: Production (send to any recipient)

Account limits:
- Daily sending quota: 50,000 emails per 24 hours
- Maximum send rate: 14 messages per second

Important: Your bounce rate must stay below 5% and complaint rate below 0.1% to maintain production access. Monitor these in the SES console. Consider using a dedicated IP pool as your volume grows.

Recommended next steps:
1. Set up SNS notifications for bounces and complaints
2. Implement a suppression list for hard bounces
3. Enable Virtual Deliverability Manager for reputation monitoring`,
      `Amazon Web Services\nno-reply@aws.amazon.com`,
    ),
  },
  {
    id: "61",
    from: { name: "Priya Nair", email: "priya.nair@designpartner.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Onboarding flow mockups — iteration 3",
    preview: "Hi Thomas, here are the iteration 3 mockups for the onboarding flow. I've simplified the email provider setup to a single screen and removed the confusing 'advanced' toggle.",
    date: new Date("2026-01-25T14:30:00"),
    isRead: true,
    isStarred: false,
    labels: ["Design"],
    hasAttachment: true,
    threadId: "t61",
    body: makeBody(
      `Hi Thomas,

Here are the iteration 3 mockups for the onboarding flow. I've made significant simplifications based on your feedback from iteration 2.

What changed:
- Email provider setup is now a single screen instead of 3. The "Advanced SMTP" toggle is gone — if users need custom SMTP they can set it in Settings later.
- The domain verification step now shows a live DNS check with green/red indicators rather than static instructions.
- Added a "Try with demo account" path for users who aren't ready to connect their real mailbox during signup.

The Figma file is attached with all states: empty, loading, error, success. Let me know if the copy on the verification screen needs another pass.`,
      `Priya Nair\nBrand & UX Designer, Design Partner\npriya.nair@designpartner.com`,
      [{ id: "a61", filename: "Laminar_Onboarding_v3.fig", contentType: "application/octet-stream", size: 9_437_184 }],
    ),
  },
  {
    id: "62",
    from: { name: "GitHub", email: "noreply@github.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "[laminar/api] Security advisory: Dependabot alert #12",
    preview: "Dependabot has detected a high severity vulnerability in go.sum: golang.org/x/net < 0.17.0 is vulnerable to HTTP/2 rapid reset (CVE-2023-44487). Please update this dependency.",
    date: new Date("2026-01-22T08:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Dev", "Security"],
    hasAttachment: false,
    threadId: "t62",
    body: serviceBody(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#f6f8fa;font-family:-apple-system,sans-serif;"><div style="max-width:600px;margin:0 auto;padding:24px;"><div style="background:#fff;border:1px solid #d0d7de;border-radius:6px;padding:20px;"><p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#9a6700;background:#fff8c5;border:1px solid #d4a72c;padding:8px 12px;border-radius:4px;">⚠ High severity security advisory</p><p style="margin:8px 0;font-size:14px;font-weight:600;color:#24292f;">[laminar/api] Dependabot alert #12</p><p style="margin:0 0 12px;font-size:13px;color:#57606a;">golang.org/x/net &lt; 0.17.0 — CVE-2023-44487 (HTTP/2 Rapid Reset)</p><p style="margin:0 0 16px;font-size:13px;color:#24292f;line-height:1.6;">A malicious client can cause a denial of service by rapidly creating and canceling HTTP/2 streams, exhausting server resources without triggering timeouts.</p><p style="margin:0 0 8px;font-size:13px;color:#57606a;">Upgrade to: <strong style="color:#24292f;">golang.org/x/net v0.17.0</strong></p><a href="#" style="display:inline-block;padding:6px 14px;background:#0969da;color:#fff;text-decoration:none;border-radius:6px;font-size:13px;">View advisory</a></div></div></body></html>`,
      `[laminar/api] Dependabot alert #12 — High severity\n\ngolang.org/x/net < 0.17.0 is vulnerable to HTTP/2 Rapid Reset (CVE-2023-44487).\n\nA malicious client can cause DoS by rapidly creating and canceling HTTP/2 streams.\n\nFix: Update to golang.org/x/net v0.17.0 in go.mod`,
    ),
  },
  {
    id: "63",
    from: { name: "Diego Reyes", email: "diego.reyes@betauser.io" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Feature request — snooze + scheduled send",
    preview: "Hey Thomas, two features I keep reaching for: 1) Email snooze (bring it back tomorrow), 2) Scheduled send. Would these be on the roadmap? Happy to share more context on how I'd use them.",
    date: new Date("2026-01-20T19:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Feedback"],
    hasAttachment: false,
    threadId: "t63",
    body: makeBody(
      `Hey Thomas,

Two features I find myself reaching for constantly and I think would make Laminar genuinely better:

1. Email snooze — I get emails I can't deal with right now but don't want to archive. I want to say "remind me about this tomorrow at 9am" and have it reappear at the top of my inbox. Gmail has this but it's buried in the menus. A keyboard shortcut (like H for hibernate) would be perfect.

2. Scheduled send — Sometimes I write a response late at night but don't want to send it at midnight. Cmd+Shift+Enter to open a time picker would be natural.

Neither of these requires backend complexity beyond a cron job and a timestamp column. Happy to share more context if it would help prioritize.`,
      `Diego Reyes\ndiego.reyes@betauser.io`,
    ),
  },
  {
    id: "64",
    from: { name: "Gusto", email: "no-reply@gusto.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Action required: Add W-9 for Mike Thornton",
    preview: "Before you can pay Mike Thornton via Gusto, you'll need to collect a W-9. We've sent Mike a request to fill out his tax info. You'll be notified once it's complete.",
    date: new Date("2026-01-18T10:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Finance", "Legal"],
    hasAttachment: false,
    threadId: "t64",
    body: makeBody(
      `Hi Thomas,

Before you can process payments to Mike Thornton through Gusto, you'll need to collect his W-9 for tax purposes.

We've sent Mike a request to enter his tax information directly. He'll receive an email at mike.thornton@freelance.dev with instructions to complete his W-9 through our secure portal.

You'll receive a confirmation email once Mike has submitted his information. At that point, you'll be able to add him to payroll as a 1099 contractor.

If Mike has questions about the process, he can contact Gusto support directly.`,
      `Gusto\nno-reply@gusto.com`,
    ),
  },
  {
    id: "65",
    from: { name: "Ben Carter", email: "ben.carter@ycombinator.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "YC application received — W27 batch",
    preview: "Hi Thomas, we've received your application to Y Combinator's W27 batch. We'll be in touch within 3-4 weeks if we'd like to move forward. Good luck!",
    date: new Date("2026-01-15T09:00:00"),
    isRead: true,
    isStarred: true,
    labels: ["Investor"],
    hasAttachment: false,
    threadId: "t65",
    body: makeBody(
      `Hi Thomas,

We've received your application to Y Combinator's W27 batch. Thank you for applying.

Our team will review your application along with the other submissions for this batch. We typically contact applicants for interviews within 3–4 weeks of the application deadline.

A few things to note:
- Interviews are conducted in person at YC's office in San Francisco
- If selected, we'll give you at least 1 week of notice to arrange travel
- We interview about 3–5% of applicants, so the bar is competitive — but we do read every application

We'll be in touch either way. In the meantime, keep building. Good luck!`,
      `Y Combinator\nhello@ycombinator.com`,
    ),
  },
  {
    id: "66",
    from: { name: "Tanya Mills", email: "tanya.mills@enterprise.co" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Intro call recap — Enterprise pilot interest",
    preview: "Hi Thomas, great call today. We're very interested in a pilot. Key requirements from our side: SSO via Okta, audit logs, and data residency in US-East. Can you confirm Laminar supports these?",
    date: new Date("2026-01-12T16:30:00"),
    isRead: true,
    isStarred: false,
    labels: ["Client"],
    hasAttachment: false,
    threadId: "t66",
    body: makeBody(
      `Hi Thomas,

Great call today — appreciate you making time. Here's a summary of where we landed.

Enterprise pilot requirements from our side:
1. SSO via Okta (SAML 2.0 preferred, OIDC acceptable)
2. Audit log export — we need a way to pull email metadata (who sent what, when) for compliance reviews
3. Data residency — we're okay with US-East but need confirmation in writing that email data never leaves US regions

On the timeline: if you can confirm items 1–3 are on your roadmap by end of March, our procurement process can move fast — potentially a signed contract by mid-April.

Looking forward to next steps.`,
      `Tanya Mills\nHead of Security & Compliance, Enterprise Co.\ntanya.mills@enterprise.co`,
    ),
  },
  {
    id: "67",
    from: { name: "Ehein Nakamura", email: "ehein@laminar.email" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Command palette — first prototype live on staging",
    preview: "Hey Thomas, the Cmd+K command palette prototype is on staging. Supports: compose, search, archive, move-to-folder. Fuzzy search feels snappy. Give it a try and let me know.",
    date: new Date("2026-01-10T11:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Dev", "Design"],
    hasAttachment: false,
    threadId: "t67",
    body: makeBody(
      `Hey Thomas,

The Cmd+K command palette prototype is live on staging. Here's what's supported in this first cut:

Actions: compose new email, reply, archive, move to folder (all folders listed), mark as read/unread, star/unstar
Navigation: search emails (wraps the search page), go to inbox/sent/drafts/done
Settings: open settings, toggle dark mode

The fuzzy search is powered by fuse.js and feels genuinely fast — sub-10ms on a list of 500 commands. I'm using a weighted score so "inbox" ranks above "invoice" when you type "in".

Keyboard nav: arrow keys to move, Enter to execute, Escape to close. The palette also closes on click-outside.

Let me know what commands you'd add or remove before I write the tests.`,
      `Ehein Nakamura\nFrontend Engineer, Laminar\nehein@laminar.email`,
    ),
  },
  {
    id: "68",
    from: { name: "Cloudflare", email: "noreply@cloudflare.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "DKIM records verified — laminar.email is fully authenticated",
    preview: "All authentication records for laminar.email have been verified: SPF ✓, DKIM ✓, DMARC ✓. Your email deliverability score has been updated in the Cloudflare dashboard.",
    date: new Date("2026-01-08T09:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Infra"],
    hasAttachment: false,
    threadId: "t68",
    body: makeBody(
      `Hi Thomas,

All authentication DNS records for laminar.email have been verified and are active.

SPF: ✓ v=spf1 include:amazonses.com -all
DKIM: ✓ 2048-bit RSA key, selector: ses2026
DMARC: ✓ v=DMARC1; p=quarantine; rua=mailto:dmarc@laminar.email; pct=100

Your domain reputation score has been updated in the Cloudflare Email Security dashboard. You're now in the "Good" tier.

Recommendation: After 30 days of sending at production volume with low bounce and complaint rates, consider upgrading your DMARC policy to p=reject for maximum deliverability protection.`,
      `Cloudflare\nnoreply@cloudflare.com`,
    ),
  },
  {
    id: "69",
    from: { name: "David Kim", email: "david.kim@advisor.net" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Intro — connecting you with Marcus Bell at Enterprise Co.",
    preview: "Hi Thomas, I'd like to introduce you to Marcus Bell, VP of Engineering at Enterprise Co. He's evaluating email clients for a team of 50+. Marcus, meet Thomas — founder of Laminar.",
    date: new Date("2026-01-06T14:00:00"),
    isRead: true,
    isStarred: true,
    labels: ["Investor", "Client"],
    hasAttachment: false,
    threadId: "t69",
    body: makeBody(
      `Hi Thomas and Marcus,

Wanted to connect you two — I think there's a natural fit here.

Thomas is the co-founder of Laminar (laminar.email), a high-performance email client built for engineering and operations teams. Their approach to sub-100ms latency is genuinely novel.

Marcus is VP of Engineering at Enterprise Co. and has been evaluating email clients for a team of 50+ engineers. He's frustrated with the sluggishness of the current tooling and has budget approved for a switch.

I'll leave it to you two to take it from here. Marcus, Thomas will reach out shortly. Thomas, Marcus is based in NYC but happy to do video calls.`,
      `David Kim\nAdvisor\ndavid.kim@advisor.net`,
    ),
  },
  {
    id: "70",
    from: { name: "Sarah Chen", email: "sarah.chen@laminar.email" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Accepted offer — joining Laminar as Lead Engineer",
    preview: "Hi Thomas, I'm thrilled to accept the offer to join Laminar as Lead Engineer. Confirming start date of February 3, 2026. Can't wait to dig into the SMTP pipeline with you.",
    date: new Date("2026-01-04T17:00:00"),
    isRead: true,
    isStarred: true,
    labels: [],
    hasAttachment: false,
    threadId: "t70",
    body: makeBody(
      `Hi Thomas,

I'm thrilled to accept your offer to join Laminar as Lead Engineer. This is exactly the kind of problem I've wanted to work on.

Confirming:
- Start date: February 3, 2026
- Role: Lead Engineer (full-time)
- Equity: per the offer letter

Can't wait to dig into the SMTP pipeline with you and Akash. I've already been reading through your architecture notes — the decision to write to the Redis stream before returning 250 OK is exactly right. I have some thoughts on the circuit breaker pattern for the S3 write path I'd love to walk through on my first week.

See you February 3!`,
      `Sarah Chen\nsarah.chen@gmail.com`,
    ),
  },
  {
    id: "71",
    from: { name: "Stripe", email: "billing@stripe.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "First payment received — $49.00 from Aisha Okonkwo",
    preview: "Congratulations! You've received your first payment. $49.00 from aisha@betauser.io for 'Laminar Pro — Monthly'. Net payout: $47.58 after Stripe fees. View in dashboard.",
    date: new Date("2026-01-03T12:00:00"),
    isRead: true,
    isStarred: true,
    labels: ["Finance"],
    hasAttachment: false,
    threadId: "t71",
    body: serviceBody(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#f6f9fc;font-family:-apple-system,sans-serif;"><div style="max-width:600px;margin:0 auto;padding:32px 16px;"><div style="background:#fff;border-radius:8px;padding:32px;border:1px solid #e6ebf1;text-align:center;"><p style="margin:0 0 8px;font-size:28px;">🎉</p><p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#1a1a2e;">First payment received!</p><p style="margin:0 0 24px;font-size:14px;color:#6b7c93;">$49.00 from Aisha Okonkwo for Laminar Pro — Monthly</p><div style="background:#f0fdf4;border-radius:8px;padding:20px;margin-bottom:24px;"><p style="margin:0 0 8px;font-size:32px;font-weight:800;color:#166534;">$49.00</p><p style="margin:0;font-size:13px;color:#166534;">Net payout after fees: $47.58</p></div><p style="margin:0;font-size:13px;color:#8898aa;">Payout will arrive in your bank account in 2 business days.</p></div></div></body></html>`,
      `Stripe — First payment received!\n\n$49.00 from aisha@betauser.io for Laminar Pro — Monthly.\nNet payout: $47.58 after Stripe fees (2.9% + $0.30).\nPayout: 2 business days to your bank account.\n\nView in dashboard: https://dashboard.stripe.com/payments/...`,
    ),
  },
  {
    id: "72",
    from: { name: "AWS", email: "no-reply@aws.amazon.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Your AWS account has been created",
    preview: "Welcome to Amazon Web Services! Your account ID is 482917364021. To get started, sign in to the AWS Management Console. Your free tier benefits are now active.",
    date: new Date("2025-12-20T10:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Infra"],
    hasAttachment: false,
    threadId: "t72",
    body: makeBody(
      `Welcome to Amazon Web Services!

Your AWS account has been created and is ready to use.

Account ID: 482917364021
Root email: thomas@laminar.email
Region: us-east-1 (default)

Your free tier benefits are now active for 12 months. Key free tier limits:
- EC2: 750 hrs/month of t2.micro (Linux)
- S3: 5GB storage, 20,000 GET requests, 2,000 PUT requests
- RDS: 750 hrs/month of db.t2.micro
- SES: 62,000 outbound messages/month when sent from EC2

Sign in at console.aws.amazon.com and enable MFA on your root account immediately — this is critical for security.`,
      `Amazon Web Services\nno-reply@aws.amazon.com`,
    ),
  },
  {
    id: "73",
    from: { name: "Akash Patel", email: "akash@patel.dev" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Re: Co-founder conversation — I'm in",
    preview: "Thomas, after thinking it over this week — I'm in. The email space is ripe for disruption and I think our technical approach is the right one. Let's set up the entity next week.",
    date: new Date("2025-12-15T20:30:00"),
    isRead: true,
    isStarred: true,
    labels: [],
    hasAttachment: false,
    threadId: "t73",
    body: makeBody(
      `Thomas,

I've been thinking about this since our call on Tuesday and I've made up my mind: I'm in.

The email space feels crowded on the surface but the real problem — the one you've articulated precisely — is that nobody has actually solved latency. Gmail is slow. Superhuman is fast but it's a Gmail wrapper and costs $30/month. There's a real company to be built here with the right technical approach.

I want to own the backend and infrastructure. You own product and frontend. We set up the entity 50/50 with a 4-year vest and 1-year cliff, standard startup terms.

Let's schedule time next week with a lawyer to set up the Delaware C-Corp. I'll send over the founder agreement template I've used before.

This is going to be good.`,
      `Akash Patel\nakash@patel.dev`,
    ),
  },
  {
    id: "74",
    from: { name: "Namecheap", email: "support@namecheap.com" },
    to: [{ name: "Thomas", email: "thomas@laminar.email" }],
    subject: "Domain registration confirmed — laminar.email",
    preview: "Thank you for registering laminar.email with Namecheap. Your domain is now active and will expire on December 14, 2026. Manage your domain in your account dashboard.",
    date: new Date("2025-12-14T11:00:00"),
    isRead: true,
    isStarred: false,
    labels: ["Infra"],
    hasAttachment: false,
    threadId: "t74",
    body: makeBody(
      `Thank you for registering laminar.email with Namecheap!

Domain: laminar.email
Registration date: December 14, 2025
Expiry date: December 14, 2026
Auto-renew: Enabled
Nameservers: dns1.registrar-servers.com / dns2.registrar-servers.com

You can manage your domain, update nameservers, and configure DNS records in your Namecheap account dashboard. To point your domain to Cloudflare, update the nameservers to the ones provided by Cloudflare in your account.

Keep your contact information up to date — ICANN requires that registrant data is accurate and verifiable.`,
      `Namecheap\nsupport@namecheap.com`,
    ),
  },
  {
    id: "75",
    from: { name: "Thomas", email: "thomas@laminar.email" },
    to: [{ name: "Akash Patel", email: "akash@patel.dev" }],
    subject: "Laminar — the email client we've always wanted to build",
    preview: "Hey Akash, I've been hacking on something. The idea: a blazing-fast, keyboard-driven email client with sub-100ms latency on every action. Think Superhuman but open and self-hostable. Want in?",
    date: new Date("2025-12-10T22:00:00"),
    isRead: true,
    isStarred: true,
    labels: [],
    hasAttachment: false,
    threadId: "t75",
    body: makeBody(
      `Hey Akash,

I've been hacking on something for the past three months and I think it's ready to show someone I trust.

The idea: a blazing-fast, keyboard-driven email client with sub-100ms latency on every single action. Think Superhuman, but open architecture, self-hostable, and built for engineering teams instead of executives.

The technical approach is what makes it different. Three-tier caching: everything in the current view lives in memory, the next 3–5 emails are prefetched before you open them, and the server layer uses Redis to serve cached bodies in under 15ms. S3 only gets hit for emails more than 30 days old.

Go backend (because we need real SMTP, not a Gmail API wrapper), React frontend with TipTap for compose, Electron for desktop later. The whole thing runs on AWS with SES for outbound.

I think this is a real company. The email client market hasn't had a genuine technical leap in a decade. Want to build it with me?`,
      `Thomas\nthomas@laminar.email`,
    ),
  },
];
