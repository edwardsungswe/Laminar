import { useEffect, useRef } from "react";
import {
  ExternalLink,
  Download,
  Star,
  FolderOpen,
  RefreshCw,
  Archive,
  Trash2,
} from "lucide-react";
import type { FileItem } from "@/data/files";

interface FileContextMenuProps {
  file: FileItem;
  position: { x: number; y: number };
  onClose: () => void;
  onAction: (action: string) => void;
}

export default function FileContextMenu({
  file,
  position,
  onClose,
  onAction,
}: FileContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed z-50"
      style={{ left: position.x, top: position.y }}
    >
      <div className="bg-bg-white rounded-lg shadow-lg border border-divider py-1 w-[200px]">
        <button
          onClick={() => onAction("open")}
          className="w-full px-3 py-2 flex items-center gap-2.5 text-sm text-text-secondary hover:bg-surface/50 hover:text-text-primary transition-colors duration-100 cursor-pointer"
        >
          <ExternalLink className="w-4 h-4 shrink-0" strokeWidth={1.5} />
          Open
        </button>
        <button
          onClick={() => onAction("download")}
          className="w-full px-3 py-2 flex items-center gap-2.5 text-sm text-text-secondary hover:bg-surface/50 hover:text-text-primary transition-colors duration-100 cursor-pointer"
        >
          <Download className="w-4 h-4 shrink-0" strokeWidth={1.5} />
          Download
        </button>
        <button
          onClick={() => onAction("favorite")}
          className="w-full px-3 py-2 flex items-center gap-2.5 text-sm text-text-secondary hover:bg-surface/50 hover:text-text-primary transition-colors duration-100 cursor-pointer"
        >
          <Star className="w-4 h-4 shrink-0" strokeWidth={1.5} />
          {file.favorite ? "Remove from favorites" : "Add to favorites"}
        </button>
        <button
          onClick={() => onAction("move")}
          className="w-full px-3 py-2 flex items-center gap-2.5 text-sm text-text-secondary hover:bg-surface/50 hover:text-text-primary transition-colors duration-100 cursor-pointer"
        >
          <FolderOpen className="w-4 h-4 shrink-0" strokeWidth={1.5} />
          Move to...
        </button>
        <button
          onClick={() => onAction("convert")}
          className="w-full px-3 py-2 flex items-center gap-2.5 text-sm text-text-secondary hover:bg-surface/50 hover:text-text-primary transition-colors duration-100 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 shrink-0" strokeWidth={1.5} />
          Convert
        </button>
        <button
          onClick={() => onAction("compress")}
          className="w-full px-3 py-2 flex items-center gap-2.5 text-sm text-text-secondary hover:bg-surface/50 hover:text-text-primary transition-colors duration-100 cursor-pointer"
        >
          <Archive className="w-4 h-4 shrink-0" strokeWidth={1.5} />
          Compress
        </button>

        {/* Separator */}
        <div className="border-t border-divider my-1" />

        <button
          onClick={() => onAction("delete")}
          className="w-full px-3 py-2 flex items-center gap-2.5 text-sm text-[#c07a7a] hover:bg-surface/50 hover:text-text-primary transition-colors duration-100 cursor-pointer"
        >
          <Trash2 className="w-4 h-4 shrink-0" strokeWidth={1.5} />
          Delete
        </button>
      </div>
    </div>
  );
}
