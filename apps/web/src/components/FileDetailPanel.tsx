import {
  X,
  HardDrive,
  Calendar,
  User,
  File,
  Users,
  Download,
  Star,
  RefreshCw,
  Archive,
  Trash2,
  Folder,
  FileText,
  Sheet,
  Presentation,
  Image,
  Film,
  Music,
} from "lucide-react";
import type { FileItem } from "@/data/files";
import { fileTypeConfig } from "@/data/files";
import type { FileType } from "@/types";

const fileTypeIcons: Record<FileType, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
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

interface FileDetailPanelProps {
  file: FileItem | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  onCompress: (id: string) => void;
  onConvert: (id: string) => void;
  onFavoriteToggle: (id: string) => void;
}

export default function FileDetailPanel({
  file,
  isOpen,
  onClose,
  onDelete,
  onCompress,
  onConvert,
  onFavoriteToggle,
}: FileDetailPanelProps) {
  const config = file ? fileTypeConfig[file.type] : null;
  const TypeIcon = file ? fileTypeIcons[file.type] : null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="absolute inset-0 bg-black/5 z-10"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`absolute top-0 right-0 h-full w-[500px] bg-bg-white border-l border-divider shadow-[-8px_0_30px_rgba(0,0,0,0.06)] z-20 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="h-14 border-b border-divider flex items-center justify-between px-6 shrink-0">
          <h2 className="text-sm font-semibold text-text-primary">
            File Details
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
          >
            <X className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </button>
        </div>

        {/* Content */}
        {file && config && TypeIcon && (
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {/* Hero icon */}
            <div className="flex flex-col items-center">
              <div
                className={`w-16 h-16 rounded-2xl ${config.bgColor} flex items-center justify-center`}
              >
                <TypeIcon className={`w-7 h-7 ${config.color}`} strokeWidth={1.5} />
              </div>
              <p className="text-base font-medium text-text-primary text-center mt-3">
                {file.name}
              </p>
              <p className="text-xs text-text-tertiary text-center mt-1">
                {file.size}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-divider my-6" />

            {/* Metadata rows */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 py-2.5">
                <HardDrive className="w-[18px] h-[18px] text-text-tertiary shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-text-secondary w-20">Size</span>
                <span className="text-sm text-text-primary">{file.size}</span>
              </div>
              <div className="flex items-center gap-3 py-2.5">
                <Calendar className="w-[18px] h-[18px] text-text-tertiary shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-text-secondary w-20">Modified</span>
                <span className="text-sm text-text-primary">{file.modified}</span>
              </div>
              <div className="flex items-center gap-3 py-2.5">
                <User className="w-[18px] h-[18px] text-text-tertiary shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-text-secondary w-20">Owner</span>
                <span className="text-sm text-text-primary">{file.owner}</span>
              </div>
              <div className="flex items-center gap-3 py-2.5">
                <File className="w-[18px] h-[18px] text-text-tertiary shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-text-secondary w-20">Type</span>
                <span className="text-sm text-text-primary">{file.mimeType}</span>
              </div>
              <div className="flex items-center gap-3 py-2.5">
                <Users className="w-[18px] h-[18px] text-text-tertiary shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-text-secondary w-20">Shared</span>
                <span className="text-sm text-text-primary">{file.shared ? "Yes" : "No"}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-divider my-6" />

            {/* Action buttons */}
            <div className="flex flex-col">
              <button className="w-full px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm font-medium text-text-secondary hover:bg-surface/50 hover:text-text-primary transition-colors duration-100 cursor-pointer">
                <Download className="w-[18px] h-[18px]" strokeWidth={1.5} />
                Download
              </button>
              <button
                onClick={() => onFavoriteToggle(file.id)}
                className="w-full px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm font-medium text-text-secondary hover:bg-surface/50 hover:text-text-primary transition-colors duration-100 cursor-pointer"
              >
                <Star className="w-[18px] h-[18px]" strokeWidth={1.5} />
                {file.favorite ? "Remove from favorites" : "Add to favorites"}
              </button>
              {file.type !== "folder" && (
                <button
                  onClick={() => onConvert(file.id)}
                  className="w-full px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm font-medium text-text-secondary hover:bg-surface/50 hover:text-text-primary transition-colors duration-100 cursor-pointer"
                >
                  <RefreshCw className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  Convert format
                </button>
              )}
              {file.type !== "folder" && (
                <button
                  onClick={() => onCompress(file.id)}
                  className="w-full px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm font-medium text-text-secondary hover:bg-surface/50 hover:text-text-primary transition-colors duration-100 cursor-pointer"
                >
                  <Archive className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  Compress
                </button>
              )}
              <button
                onClick={() => onDelete(file.id)}
                className="w-full px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm font-medium text-[#c07a7a] hover:bg-[#f5e6e8]/50 transition-colors duration-100 cursor-pointer"
              >
                <Trash2 className="w-[18px] h-[18px]" strokeWidth={1.5} />
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
