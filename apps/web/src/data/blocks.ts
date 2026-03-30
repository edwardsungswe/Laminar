import type { BlockTemplate } from "@/types";

export const MOCK_BLOCK_TEMPLATES: BlockTemplate[] = [
  {
    id: "block-1",
    name: "Meeting Follow-up",
    category: "Professional",
    description: "Follow up after a meeting with key points and next steps",
    preview: "Hi {recipient_name}, Thanks for taking the time to meet today. I wanted to follow up on the key points...",
    icon: "Briefcase",
    body: `Hi {recipient_name},

Thanks for taking the time to meet today. I wanted to follow up on the key points we discussed and make sure we're aligned on next steps.

Here's a quick summary of what we covered:
- [Key point 1]
- [Key point 2]
- [Key point 3]

As agreed, the next steps are:
1. [Action item] — owned by [Person], due by {date}
2. [Action item] — owned by [Person], due by {date}

Please let me know if I missed anything or if you have any questions. Looking forward to our continued progress on this.

Best regards,
{sender_name}`,
    htmlBody: `<p>Hi <strong>{recipient_name}</strong>,</p>
<p>Thanks for taking the time to meet today. I wanted to follow up on the key points we discussed and make sure we're aligned on next steps.</p>
<h3>Summary</h3>
<p>Here's a quick summary of what we covered:</p>
<ul>
<li>[Key point 1]</li>
<li>[Key point 2]</li>
<li>[Key point 3]</li>
</ul>
<h3>Next Steps</h3>
<p>As agreed, the next steps are:</p>
<ol>
<li><strong>[Action item]</strong> — owned by [Person], due by <em>{date}</em></li>
<li><strong>[Action item]</strong> — owned by [Person], due by <em>{date}</em></li>
</ol>
<p>Please let me know if I missed anything or if you have any questions. Looking forward to our continued progress on this.</p>
<p>Best regards,<br>{sender_name}</p>`,
  },
  {
    id: "block-2",
    name: "Welcome Email",
    category: "Professional",
    description: "Onboard new team members or clients with a warm welcome",
    preview: "Welcome to {company_name}! We're thrilled to have you on board...",
    icon: "Briefcase",
    body: `Welcome to {company_name}!

We're thrilled to have you on board. This email has everything you need to get started and feel right at home.

Here are a few things to help you hit the ground running:
- Your account has been set up at [login URL]
- Your onboarding guide is available at [link]
- Your main point of contact is {sender_name} ({sender_email})

During your first week, we recommend:
1. Complete the onboarding checklist in your dashboard
2. Schedule a 1:1 with your team lead
3. Join the #welcome channel in our team chat

If you have any questions at all, don't hesitate to reach out. We're here to help you succeed.

Warm regards,
{sender_name}`,
    htmlBody: `<p>Welcome to <strong>{company_name}</strong>!</p>
<p>We're thrilled to have you on board. This email has everything you need to get started and feel right at home.</p>
<h3>Getting Started</h3>
<p>Here are a few things to help you hit the ground running:</p>
<ul>
<li>Your account has been set up at <a href="#">login URL</a></li>
<li>Your onboarding guide is available at <a href="#">onboarding link</a></li>
<li>Your main point of contact is <strong>{sender_name}</strong> (<em>{sender_email}</em>)</li>
</ul>
<h3>First Week Checklist</h3>
<p>During your first week, we recommend:</p>
<ol>
<li>Complete the onboarding checklist in your dashboard</li>
<li>Schedule a <strong>1:1</strong> with your team lead</li>
<li>Join the <em>#welcome</em> channel in our team chat</li>
</ol>
<p>If you have any questions at all, don't hesitate to reach out. We're here to help you succeed.</p>
<p>Warm regards,<br>{sender_name}</p>`,
  },
  {
    id: "block-3",
    name: "Invoice Reminder",
    category: "Professional",
    description: "Send a polite payment reminder for outstanding invoices",
    preview: "This is a friendly reminder that invoice #[number] for $[amount] is due on {date}...",
    icon: "Briefcase",
    body: `Hi {recipient_name},

This is a friendly reminder that invoice #[number] for $[amount] is due on {date}.

Invoice details:
- Invoice Number: #[number]
- Amount Due: $[amount]
- Due Date: {date}
- Payment Terms: [Net 30 / Upon Receipt]

You can view and pay the invoice using the following link: [payment link]

We accept payment via bank transfer, credit card, or check. If you've already sent payment, please disregard this message.

If you have any questions about this invoice or need to discuss payment arrangements, please don't hesitate to reach out.

Thank you for your prompt attention to this matter.

Best regards,
{sender_name}`,
    htmlBody: `<p>Hi <strong>{recipient_name}</strong>,</p>
<p>This is a friendly reminder that invoice <strong>#[number]</strong> for <strong>$[amount]</strong> is due on <em>{date}</em>.</p>
<h3>Invoice Details</h3>
<ul>
<li><strong>Invoice Number:</strong> #[number]</li>
<li><strong>Amount Due:</strong> $[amount]</li>
<li><strong>Due Date:</strong> {date}</li>
<li><strong>Payment Terms:</strong> Net 30 / Upon Receipt</li>
</ul>
<p>You can view and pay the invoice using the following link: <a href="#">payment link</a></p>
<p>We accept payment via <em>bank transfer</em>, <em>credit card</em>, or <em>check</em>. If you've already sent payment, please disregard this message.</p>
<p>If you have any questions about this invoice or need to discuss payment arrangements, please don't hesitate to reach out.</p>
<p>Thank you for your prompt attention to this matter.</p>
<p>Best regards,<br>{sender_name}</p>`,
  },
  {
    id: "block-4",
    name: "Project Update",
    category: "Professional",
    description: "Share progress updates on an ongoing project",
    preview: "Here's a quick update on the progress of {project_name}...",
    icon: "Briefcase",
    body: `Hi Team,

Here's a quick update on the progress of {project_name} as of {date}.

Current Status: [On Track / At Risk / Behind Schedule]

What we accomplished this week:
- [Completed milestone or task]
- [Completed milestone or task]
- [Completed milestone or task]

What's coming up next:
- [Upcoming task] — target date: {date}
- [Upcoming task] — target date: {date}

Blockers or risks:
- [Blocker description and mitigation plan]

Overall, we're [summary of progress]. Please review and let me know if you have any concerns or suggestions.

Thanks,
{sender_name}`,
    htmlBody: `<p>Hi Team,</p>
<p>Here's a quick update on the progress of <strong>{project_name}</strong> as of <em>{date}</em>.</p>
<p><strong>Current Status:</strong> [On Track / At Risk / Behind Schedule]</p>
<h3>Accomplishments</h3>
<p>What we accomplished this week:</p>
<ul>
<li>[Completed milestone or task]</li>
<li>[Completed milestone or task]</li>
<li>[Completed milestone or task]</li>
</ul>
<h3>Upcoming</h3>
<p>What's coming up next:</p>
<ol>
<li><strong>[Upcoming task]</strong> — target date: <em>{date}</em></li>
<li><strong>[Upcoming task]</strong> — target date: <em>{date}</em></li>
</ol>
<h3>Blockers</h3>
<blockquote><p>[Blocker description and mitigation plan]</p></blockquote>
<p>Overall, we're [summary of progress]. Please review and let me know if you have any concerns or suggestions.</p>
<p>Thanks,<br>{sender_name}</p>`,
  },
  {
    id: "block-5",
    name: "Introduction",
    category: "Professional",
    description: "Introduce yourself to a new contact or connection",
    preview: "I'd like to introduce myself — I'm {sender_name} from {company_name}...",
    icon: "Briefcase",
    body: `Hi {recipient_name},

I'd like to introduce myself — I'm {sender_name} from {company_name}. I came across your work on [context] and thought it would be great to connect.

A little about me: I work as a [Role] at {company_name}, where I focus on [area of expertise]. We specialize in [brief company description], and I believe there may be some interesting synergies between what we do and your work in [their area].

I'd love to schedule a brief call to learn more about what you're working on and explore how we might collaborate. Would you have 15-20 minutes sometime this week or next?

Looking forward to hearing from you.

Best,
{sender_name}`,
    htmlBody: `<p>Hi <strong>{recipient_name}</strong>,</p>
<p>I'd like to introduce myself — I'm <strong>{sender_name}</strong> from <strong>{company_name}</strong>. I came across your work on [context] and thought it would be great to connect.</p>
<h3>About Me</h3>
<p>I work as a [Role] at {company_name}, where I focus on <em>[area of expertise]</em>. We specialize in [brief company description], and I believe there may be some interesting synergies between what we do and your work in [their area].</p>
<p>I'd love to schedule a brief call to learn more about what you're working on and explore how we might collaborate. Would you have <strong>15-20 minutes</strong> sometime this week or next?</p>
<p>Looking forward to hearing from you.</p>
<p>Best,<br>{sender_name}</p>`,
  },
  {
    id: "block-6",
    name: "Thank You",
    category: "Personal",
    description: "Express gratitude for a kind gesture, gift, or support",
    preview: "Thank you so much for [reason]. I really appreciate your time and support...",
    icon: "Heart",
    body: `Hi {recipient_name},

Thank you so much for [reason]. I really appreciate your time and support — it truly means a lot to me.

[Specific detail about what they did and why it mattered to you]. It made a real difference, and I wanted you to know how grateful I am.

Your generosity and thoughtfulness don't go unnoticed. If there's ever anything I can do to return the favor, please don't hesitate to ask.

Thank you again for everything. I'm lucky to have someone like you in my corner.

Warmly,
{sender_name}`,
    htmlBody: `<p>Hi <strong>{recipient_name}</strong>,</p>
<p>Thank you so much for [reason]. I really appreciate your time and support — it truly means a lot to me.</p>
<p>[Specific detail about what they did and why it mattered to you]. It made a <em>real difference</em>, and I wanted you to know how grateful I am.</p>
<p>Your generosity and thoughtfulness don't go unnoticed. If there's ever anything I can do to return the favor, please don't hesitate to ask.</p>
<p>Thank you again for everything. I'm lucky to have someone like you in my corner.</p>
<p>Warmly,<br>{sender_name}</p>`,
  },
  {
    id: "block-7",
    name: "Event Invitation",
    category: "Personal",
    description: "Invite someone to an upcoming event or gathering",
    preview: "You're invited to [Event Name] on {date} at [Location]...",
    icon: "Heart",
    body: `Hi {recipient_name},

You're invited to [Event Name] on {date} at [Location]! We'd love for you to join us.

Event Details:
- What: [Event Name / Description]
- When: {date} at [Time]
- Where: [Location / Address]
- Dress Code: [Casual / Smart Casual / Formal]

[Additional context about the event — what to expect, who else is attending, any special activities planned.]

Please RSVP by {date} so we can make sure everything is arranged. You can reply to this email or reach me at [phone number].

We really hope to see you there!

Cheers,
{sender_name}`,
    htmlBody: `<p>Hi <strong>{recipient_name}</strong>,</p>
<p>You're invited to <strong>[Event Name]</strong> on <em>{date}</em> at [Location]! We'd love for you to join us.</p>
<h3>Event Details</h3>
<ul>
<li><strong>What:</strong> [Event Name / Description]</li>
<li><strong>When:</strong> {date} at [Time]</li>
<li><strong>Where:</strong> [Location / Address]</li>
<li><strong>Dress Code:</strong> <em>[Casual / Smart Casual / Formal]</em></li>
</ul>
<p>[Additional context about the event — what to expect, who else is attending, any special activities planned.]</p>
<p>Please RSVP by <strong>{date}</strong> so we can make sure everything is arranged. You can reply to this email or reach me at [phone number].</p>
<p>We really hope to see you there!</p>
<p>Cheers,<br>{sender_name}</p>`,
  },
  {
    id: "block-8",
    name: "Feedback Request",
    category: "Sales",
    description: "Ask customers for their thoughts on a product or service",
    preview: "We'd love to hear your thoughts on [product/service]. Your feedback helps us...",
    icon: "TrendingUp",
    body: `Hi {recipient_name},

We'd love to hear your thoughts on [product/service]. Your feedback helps us improve and deliver a better experience for you.

It's been [time period] since you started using [product/service], and we'd really value your perspective on how things are going.

We've put together a short survey that takes about 3-5 minutes to complete:
[Survey Link]

A few things we're especially curious about:
- How has [product/service] helped you with [use case]?
- Is there anything you wish worked differently?
- Would you recommend us to a colleague?

As a thank you for your time, we're offering [incentive — discount, gift card, etc.] to everyone who completes the survey by {date}.

Thank you for being a valued customer. Your input directly shapes what we build next.

Best,
{sender_name}`,
    htmlBody: `<p>Hi <strong>{recipient_name}</strong>,</p>
<p>We'd love to hear your thoughts on [product/service]. Your feedback helps us improve and deliver a <em>better experience</em> for you.</p>
<p>It's been [time period] since you started using [product/service], and we'd really value your perspective on how things are going.</p>
<p>We've put together a short survey that takes about <strong>3-5 minutes</strong> to complete:</p>
<p><a href="#">Take the Survey</a></p>
<h3>We're curious about</h3>
<ul>
<li>How has [product/service] helped you with [use case]?</li>
<li>Is there anything you wish worked differently?</li>
<li>Would you recommend us to a colleague?</li>
</ul>
<p>As a thank you for your time, we're offering <strong>[incentive]</strong> to everyone who completes the survey by <em>{date}</em>.</p>
<p>Thank you for being a valued customer. Your input directly shapes what we build next.</p>
<p>Best,<br>{sender_name}</p>`,
  },
];

export function getBlocksByCategory(category: string): BlockTemplate[] {
  if (category === "all") return MOCK_BLOCK_TEMPLATES;
  return MOCK_BLOCK_TEMPLATES.filter(
    (t) => t.category.toLowerCase() === category.toLowerCase()
  );
}
