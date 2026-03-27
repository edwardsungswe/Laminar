export interface EmailAddress {
  name: string;
  email: string;
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
