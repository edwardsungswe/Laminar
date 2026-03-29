import {
  Folder,
  FileText,
  Sheet,
  Presentation,
  Image,
  Film,
  Music,
  Archive,
  Star,
} from "lucide-react";
import type { FileItem } from "@/data/files";
import { fileTypeConfig } from "@/data/files";
import type { FileType } from "@/types";

const fileTypeIcons: Record<FileType, typeof FileText> = {
  folder: Folder,
  pdf: FileText,
  document: FileText,
  spreadsheet: Sheet,
  presentation: Presentation,
  image: Image,
  video: Film,
  audio: Music,
  archive: Archive,
};

interface StorageListProps {
  files: FileItem[];
  selectedFileId: string | null;
  onFileSelect: (id: string) => void;
  onFolderOpen: (id: string) => void;
  onFavoriteToggle: (id: string) => void;
  onContextMenu: (id: string, e: React.MouseEvent) => void;
}

export default function StorageList({
  files,
  selectedFileId,
  onFileSelect,
  onFolderOpen,
  onFavoriteToggle,
  onContextMenu,
}: StorageListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header row */}
      <div className="px-6 py-2 border-b border-divider flex items-center gap-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider sticky top-0 bg-bg-white z-10">
        <span className="flex-1">Name</span>
        <span className="w-32">Modified</span>
        <span className="w-24">Size</span>
        <span className="w-32">Owner</span>
        <span className="w-8" />
      </div>

      {/* Rows */}
      {files.map((file) => {
        const config = fileTypeConfig[file.type];
        const Icon = fileTypeIcons[file.type];
        const isSelected = selectedFileId === file.id;

        return (
          <button
            key={file.id}
            onClick={() =>
              file.type === "folder" ? onFileSelect(file.id) : onFileSelect(file.id)
            }
            onDoubleClick={() => {
              if (file.type === "folder") onFolderOpen(file.id);
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              onContextMenu(file.id, e);
            }}
            className={`w-full px-6 py-3 flex items-center gap-4 border-l-2 transition-colors duration-100 cursor-pointer text-left ${
              isSelected
                ? "bg-surface border-l-accent"
                : "border-l-transparent hover:bg-surface/50"
            }`}
          >
            {/* Icon */}
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${config.bgColor}`}
            >
              <Icon className={`w-4 h-4 ${config.color}`} strokeWidth={1.5} />
            </div>

            {/* Name */}
            <span className="flex-1 text-sm font-medium text-text-primary truncate">
              {file.name}
            </span>

            {/* Modified */}
            <span className="text-xs text-text-secondary w-32 shrink-0">
              {file.modified}
            </span>

            {/* Size */}
            <span className="text-xs text-text-secondary w-24 shrink-0">
              {file.size}
            </span>

            {/* Owner */}
            <span className="text-xs text-text-secondary w-32 shrink-0 truncate">
              {file.owner}
            </span>

            {/* Star toggle */}
            <span
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteToggle(file.id);
              }}
              className={`w-8 shrink-0 flex items-center justify-center ${
                file.favorite
                  ? "text-accent"
                  : "text-text-tertiary opacity-0 hover:opacity-100"
              } transition-opacity duration-100`}
            >
              <Star
                className={`w-4 h-4 ${file.favorite ? "fill-current" : ""}`}
                strokeWidth={1.5}
              />
            </span>
          </button>
        );
      })}
    </div>
  );
}
