import { Folder } from "lucide-react";
import type { FileItem } from "@/data/files";
import { getFilesInFolder } from "@/data/files";

interface FolderCardProps {
  folder: FileItem;
  onOpen: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

export default function FolderCard({
  folder,
  onOpen,
  onContextMenu,
}: FolderCardProps) {
  const childCount = getFilesInFolder(folder.id).length;

  return (
    <div
      onClick={onOpen}
      onContextMenu={onContextMenu}
      className="rounded-xl border border-divider hover:border-accent/20 hover:bg-surface/30 p-4 flex items-center gap-3 cursor-pointer transition-all duration-100"
    >
      {/* Folder icon */}
      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
        <Folder className="w-5 h-5 text-accent" strokeWidth={1.5} />
      </div>

      {/* Name */}
      <span className="text-sm font-medium text-text-primary">{folder.name}</span>

      {/* Child count */}
      <span className="text-xs text-text-tertiary ml-auto">
        {childCount} {childCount === 1 ? "item" : "items"}
      </span>
    </div>
  );
}
