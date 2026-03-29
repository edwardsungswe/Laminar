import { useState, useEffect } from "react";
import {
  X,
  ChevronRight,
  Folder,
  FileText,
  Sheet,
  Presentation,
  Image,
  Film,
  Music,
  Archive,
} from "lucide-react";
import {
  getFilesInFolder,
  getBreadcrumbPath,
  fileTypeConfig,
} from "@/data/files";
import type { FileItem } from "@/data/files";
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

interface DrivePickerModalProps {
  mode: "save" | "attach";
  isOpen: boolean;
  onClose: () => void;
}

export default function DrivePickerModal({
  mode,
  isOpen,
  onClose,
}: DrivePickerModalProps) {
  const [browseFolderId, setBrowseFolderId] = useState<string | null>(null);
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setBrowseFolderId(null);
      setSelectedFileIds([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const items = getFilesInFolder(browseFolderId);
  const breadcrumbPath = browseFolderId ? getBreadcrumbPath(browseFolderId) : [];

  // In save mode, only show folders; in attach mode, show all
  const visibleItems =
    mode === "save" ? items.filter((f) => f.type === "folder") : items;

  const toggleFileSelection = (id: string) => {
    setSelectedFileIds((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleItemClick = (file: FileItem) => {
    if (file.type === "folder") {
      setBrowseFolderId(file.id);
      setSelectedFileIds([]);
    } else if (mode === "attach") {
      toggleFileSelection(file.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20" onClick={onClose} />

      {/* Card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-white rounded-xl shadow-lg border border-divider w-[520px] max-h-[500px] flex flex-col">
        {/* Header */}
        <div className="h-14 border-b border-divider flex items-center justify-between px-6 shrink-0">
          <h2 className="text-sm font-semibold text-text-primary">
            {mode === "save" ? "Save to Drive" : "Attach from Drive"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="px-6 py-2 border-b border-divider flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => {
              setBrowseFolderId(null);
              setSelectedFileIds([]);
            }}
            className={`text-xs font-medium transition-colors duration-100 cursor-pointer ${
              browseFolderId
                ? "text-accent hover:text-accent-hover"
                : "text-text-primary"
            }`}
          >
            My Drive
          </button>
          {breadcrumbPath.map((crumb, i) => (
            <span key={crumb.id} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-text-tertiary" />
              <button
                onClick={() => {
                  setBrowseFolderId(crumb.id);
                  setSelectedFileIds([]);
                }}
                className={`text-xs font-medium transition-colors duration-100 cursor-pointer ${
                  i === breadcrumbPath.length - 1
                    ? "text-text-primary"
                    : "text-accent hover:text-accent-hover"
                }`}
              >
                {crumb.name}
              </button>
            </span>
          ))}
        </div>

        {/* File list */}
        <div className="flex-1 overflow-y-auto px-3 py-2">
          {visibleItems.length === 0 && (
            <div className="py-8 text-center text-sm text-text-tertiary">
              {mode === "save" ? "No folders here" : "This folder is empty"}
            </div>
          )}
          {visibleItems.map((file) => {
            const config = fileTypeConfig[file.type];
            const Icon = fileTypeIcons[file.type];
            const isSelected = selectedFileIds.includes(file.id);
            const isFolder = file.type === "folder";

            return (
              <div
                key={file.id}
                onClick={() => handleItemClick(file)}
                className={`px-3 py-2.5 rounded-lg flex items-center gap-3 transition-colors duration-100 cursor-pointer hover:bg-surface/50 ${
                  isSelected ? "bg-accent/5 text-accent" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${config.bgColor}`}
                >
                  <Icon
                    className={`w-4 h-4 ${isSelected ? "text-accent" : config.color}`}
                    strokeWidth={1.5}
                  />
                </div>
                <span
                  className={`text-sm font-medium ${
                    isSelected ? "text-accent" : "text-text-primary"
                  }`}
                >
                  {file.name}
                </span>
                {isFolder ? (
                  <ChevronRight className="w-4 h-4 text-text-tertiary ml-auto" />
                ) : (
                  <span className="text-xs text-text-tertiary ml-auto">
                    {file.size}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-divider px-6 py-3 flex items-center justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="h-9 px-4 text-sm text-text-secondary hover:text-text-primary transition-colors duration-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="h-9 px-4 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors duration-100 cursor-pointer"
          >
            {mode === "save"
              ? "Save Here"
              : selectedFileIds.length > 0
                ? `Attach (${selectedFileIds.length})`
                : "Attach"}
          </button>
        </div>
      </div>
    </div>
  );
}
