import type { FileType } from "@/types";

export interface FileItem {
  id: string;
  name: string;
  type: FileType;
  size: string;
  modified: string;
  modifiedISO: string;
  owner: string;
  shared: boolean;
  favorite: boolean;
  trashed: boolean;
  parentId: string | null;
  mimeType: string;
}

export const fileTypeConfig: Record<
  FileType,
  { color: string; bgColor: string }
> = {
  folder: { color: "text-accent", bgColor: "bg-accent/10" },
  pdf: { color: "text-[#c07a7a]", bgColor: "bg-[#f5e6e8]" },
  document: { color: "text-[#5a7a9a]", bgColor: "bg-[#e6eef5]" },
  spreadsheet: { color: "text-[#7a9a6d]", bgColor: "bg-[#e8ede6]" },
  presentation: { color: "text-accent", bgColor: "bg-accent/10" },
  image: { color: "text-[#9a7ac0]", bgColor: "bg-[#f0e8f5]" },
  video: { color: "text-[#c07a7a]", bgColor: "bg-[#f5e6e8]" },
  audio: { color: "text-[#5a7a9a]", bgColor: "bg-[#e6eef5]" },
  archive: { color: "text-text-secondary", bgColor: "bg-surface" },
};

export const files: FileItem[] = [
  // Root folders
  {
    id: "f1",
    name: "Brand Projects",
    type: "folder",
    size: "\u2014",
    modified: "Mar 26, 2026",
    modifiedISO: "2026-03-26",
    owner: "You",
    shared: true,
    favorite: true,
    trashed: false,
    parentId: null,
    mimeType: "inode/directory",
  },
  {
    id: "f2",
    name: "Photography",
    type: "folder",
    size: "\u2014",
    modified: "Mar 22, 2026",
    modifiedISO: "2026-03-22",
    owner: "You",
    shared: false,
    favorite: false,
    trashed: false,
    parentId: null,
    mimeType: "inode/directory",
  },
  {
    id: "f3",
    name: "Invoices",
    type: "folder",
    size: "\u2014",
    modified: "Mar 19, 2026",
    modifiedISO: "2026-03-19",
    owner: "You",
    shared: false,
    favorite: false,
    trashed: false,
    parentId: null,
    mimeType: "inode/directory",
  },

  // Files in Brand Projects
  {
    id: "file1",
    name: "Aura Mood Board.pdf",
    type: "pdf",
    size: "4.2 MB",
    modified: "Mar 26, 2026",
    modifiedISO: "2026-03-26",
    owner: "Maya Chen",
    shared: true,
    favorite: true,
    trashed: false,
    parentId: "f1",
    mimeType: "application/pdf",
  },
  {
    id: "file2",
    name: "Solstice Print Proofs.pdf",
    type: "pdf",
    size: "12.8 MB",
    modified: "Mar 25, 2026",
    modifiedISO: "2026-03-25",
    owner: "Oliver Park",
    shared: true,
    favorite: false,
    trashed: false,
    parentId: "f1",
    mimeType: "application/pdf",
  },
  {
    id: "file3",
    name: "Common Ground Brief.docx",
    type: "document",
    size: "284 KB",
    modified: "Mar 20, 2026",
    modifiedISO: "2026-03-20",
    owner: "Rafael Torres",
    shared: true,
    favorite: false,
    trashed: false,
    parentId: "f1",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  {
    id: "file4",
    name: "Oasis Dashboard Export.png",
    type: "image",
    size: "1.8 MB",
    modified: "Mar 24, 2026",
    modifiedISO: "2026-03-24",
    owner: "James Whitfield",
    shared: true,
    favorite: false,
    trashed: false,
    parentId: "f1",
    mimeType: "image/png",
  },

  // Files in Photography
  {
    id: "file5",
    name: "Melrose Lighting Test.jpg",
    type: "image",
    size: "8.4 MB",
    modified: "Mar 22, 2026",
    modifiedISO: "2026-03-22",
    owner: "Lena Moreau",
    shared: false,
    favorite: true,
    trashed: false,
    parentId: "f2",
    mimeType: "image/jpeg",
  },
  {
    id: "file6",
    name: "Product Flatlays.zip",
    type: "archive",
    size: "42.6 MB",
    modified: "Mar 22, 2026",
    modifiedISO: "2026-03-22",
    owner: "Lena Moreau",
    shared: false,
    favorite: false,
    trashed: false,
    parentId: "f2",
    mimeType: "application/zip",
  },

  // Files in Invoices
  {
    id: "file7",
    name: "Invoice #2024-031 \u2014 Solstice.pdf",
    type: "pdf",
    size: "98 KB",
    modified: "Mar 19, 2026",
    modifiedISO: "2026-03-19",
    owner: "Suki Watanabe",
    shared: false,
    favorite: false,
    trashed: false,
    parentId: "f3",
    mimeType: "application/pdf",
  },
  {
    id: "file8",
    name: "Q1 Budget Tracker.xlsx",
    type: "spreadsheet",
    size: "156 KB",
    modified: "Mar 18, 2026",
    modifiedISO: "2026-03-18",
    owner: "You",
    shared: false,
    favorite: false,
    trashed: false,
    parentId: "f3",
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },

  // Root-level files
  {
    id: "file9",
    name: "Copenhagen Talk Outline.docx",
    type: "document",
    size: "32 KB",
    modified: "Mar 23, 2026",
    modifiedISO: "2026-03-23",
    owner: "You",
    shared: false,
    favorite: true,
    trashed: false,
    parentId: null,
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  {
    id: "file10",
    name: "Neue Montreal Specimen.pdf",
    type: "pdf",
    size: "2.1 MB",
    modified: "Mar 21, 2026",
    modifiedISO: "2026-03-21",
    owner: "Aria Vasquez",
    shared: true,
    favorite: false,
    trashed: false,
    parentId: null,
    mimeType: "application/pdf",
  },
  {
    id: "file11",
    name: "Brand Guidelines Template.pptx",
    type: "presentation",
    size: "5.4 MB",
    modified: "Mar 20, 2026",
    modifiedISO: "2026-03-20",
    owner: "You",
    shared: true,
    favorite: false,
    trashed: false,
    parentId: null,
    mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  },
  {
    id: "file12",
    name: "Client Onboarding Video.mp4",
    type: "video",
    size: "128 MB",
    modified: "Mar 15, 2026",
    modifiedISO: "2026-03-15",
    owner: "You",
    shared: false,
    favorite: false,
    trashed: false,
    parentId: null,
    mimeType: "video/mp4",
  },

  // Trashed file
  {
    id: "file13",
    name: "Old Logo Concepts.ai",
    type: "image",
    size: "18.2 MB",
    modified: "Feb 28, 2026",
    modifiedISO: "2026-02-28",
    owner: "You",
    shared: false,
    favorite: false,
    trashed: true,
    parentId: null,
    mimeType: "application/illustrator",
  },
  {
    id: "file14",
    name: "Deprecated Brand Colors.pdf",
    type: "pdf",
    size: "420 KB",
    modified: "Feb 15, 2026",
    modifiedISO: "2026-02-15",
    owner: "You",
    shared: false,
    favorite: false,
    trashed: true,
    parentId: null,
    mimeType: "application/pdf",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getFilesInFolder(parentId: string | null): FileItem[] {
  return files.filter((f) => f.parentId === parentId && !f.trashed);
}

export function getFavoriteFiles(): FileItem[] {
  return files.filter((f) => f.favorite && !f.trashed);
}

export function getRecentFiles(): FileItem[] {
  return [...files]
    .filter((f) => !f.trashed)
    .sort((a, b) => b.modifiedISO.localeCompare(a.modifiedISO))
    .slice(0, 10);
}

export function getSharedFiles(): FileItem[] {
  return files.filter((f) => f.shared && !f.trashed);
}

export function getTrashedFiles(): FileItem[] {
  return files.filter((f) => f.trashed);
}

export function getFileById(id: string): FileItem | undefined {
  return files.find((f) => f.id === id);
}

export function getBreadcrumbPath(folderId: string): FileItem[] {
  const path: FileItem[] = [];
  let current = files.find((f) => f.id === folderId);
  while (current) {
    path.unshift(current);
    current = current.parentId
      ? files.find((f) => f.id === current!.parentId)
      : undefined;
  }
  return path;
}
