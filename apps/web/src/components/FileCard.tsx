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

interface FileCardProps {
  file: FileItem;
  isSelected: boolean;
  onSelect: () => void;
  onDoubleClick: () => void;
  onFavoriteToggle: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

export default function FileCard({
  file,
  isSelected,
  onSelect,
  onDoubleClick,
  onFavoriteToggle,
  onContextMenu,
}: FileCardProps) {
  const config = fileTypeConfig[file.type];
  const Icon = fileTypeIcons[file.type];

  return (
    <div
      onClick={onSelect}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
      className={`group relative rounded-xl border p-4 flex flex-col items-center gap-3 transition-all duration-100 cursor-pointer ${
        isSelected
          ? "border-accent/30 bg-accent/5"
          : "border-divider hover:border-accent/20 hover:bg-surface/30"
      }`}
    >
      {/* Favorite star */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onFavoriteToggle();
        }}
        className={`absolute top-2.5 right-2.5 transition-opacity duration-100 cursor-pointer ${
          file.favorite
            ? "opacity-100 text-accent"
            : "opacity-0 group-hover:opacity-100 text-text-tertiary hover:text-accent"
        }`}
      >
        <Star
          className={`w-4 h-4 ${file.favorite ? "fill-current" : ""}`}
          strokeWidth={1.5}
        />
      </button>

      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${config.bgColor}`}
      >
        <Icon className={`w-6 h-6 ${config.color}`} strokeWidth={1.5} />
      </div>

      {/* Name */}
      <span className="text-sm font-medium text-text-primary truncate w-full text-center">
        {file.name}
      </span>

      {/* Size */}
      <span className="text-xs text-text-tertiary">{file.size}</span>
    </div>
  );
}
