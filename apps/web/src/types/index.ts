export type AppPage = "email" | "calendar" | "storage" | "profile";
export type SettingsTab = "profile" | "theme" | "notifications" | "account" | "security";
export type FolderKey = "inbox" | "starred" | "sent" | "draft" | "done";

export type EmailSubView = "mail" | "blockTemplates" | "blockBuilder";

export interface BlockTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  body: string;
  htmlBody: string;
  icon: string;
}

export type StorageSection = "all" | "favorites" | "recent" | "shared" | "trash";

export type FileType =
  | "folder"
  | "document"
  | "image"
  | "spreadsheet"
  | "presentation"
  | "pdf"
  | "video"
  | "audio"
  | "archive";

export interface EmailAddress {
  name: string;
  email: string;
}

export interface Attachment {
  id: string;
  filename: string;
  contentType: string;
  size: number; // bytes
  contentId?: string; // for inline images (cid: references)
}

export interface EmailBody {
  plain: string;
  html: string;
  attachments?: Attachment[];
}

export interface Email {
  id: string;
  from: EmailAddress;
  to: EmailAddress[];
  subject: string;
  preview: string;
  date: Date;
  isRead: boolean;
  isStarred: boolean;
  labels: string[];
  hasAttachment: boolean;
  threadId: string;
  body: EmailBody;
}

export interface Folder {
  id: string;
  name: string;
  icon: string;
  count?: number;
}

export interface FilterTab {
  id: string;
  label: string;
  count?: number;
}

export interface ThemeColors {
  gradientFrom: string;
  gradientTo: string;
  glassBg: string;
  glassBorder: string;
  accent: string;
  accentHover: string;
  sidebarBg: string;
  sidebarText: string;
  sidebarActive: string;
}

export interface ThemePreset {
  name: string;
  colors: ThemeColors;
}
