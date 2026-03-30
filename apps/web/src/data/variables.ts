export interface TemplateVariable {
  key: string;
  label: string;
  defaultValue: string;
}

export const TEMPLATE_VARIABLES: TemplateVariable[] = [
  { key: "recipient_name", label: "Recipient Name", defaultValue: "John" },
  { key: "recipient_email", label: "Recipient Email", defaultValue: "john@example.com" },
  { key: "sender_name", label: "Sender Name", defaultValue: "Jane" },
  { key: "sender_email", label: "Sender Email", defaultValue: "jane@example.com" },
  { key: "company_name", label: "Company Name", defaultValue: "Acme Inc." },
  { key: "date", label: "Date", defaultValue: new Date().toLocaleDateString() },
  { key: "project_name", label: "Project Name", defaultValue: "Project Alpha" },
];
