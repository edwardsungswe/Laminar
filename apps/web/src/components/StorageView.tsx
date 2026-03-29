import { useState, useMemo } from "react";
import { FolderOpen } from "lucide-react";
import type { StorageSection } from "@/types";
import type { FileItem } from "@/data/files";
import {
  getFilesInFolder,
  getFavoriteFiles,
  getRecentFiles,
  getSharedFiles,
  getTrashedFiles,
  getFileById,
} from "@/data/files";
import FolderBreadcrumb from "./FolderBreadcrumb";
import StorageDropZone from "./StorageDropZone";
import StorageGrid from "./StorageGrid";
import StorageList from "./StorageList";
import FileDetailPanel from "./FileDetailPanel";
import FileContextMenu from "./FileContextMenu";
import Toast from "./Toast";

interface StorageViewProps {
  section: StorageSection;
  viewMode: "grid" | "list";
  currentFolderId: string | null;
  onFolderOpen: (id: string) => void;
  onNavigateUp: (id: string | null) => void;
  selectedFileId: string | null;
  onFileSelect: (id: string) => void;
  onFileDetailOpen: () => void;
  fileDetailOpen: boolean;
  onFileDetailClose: () => void;
  onUploadOpen: () => void;
  onDeleteFile: (id: string) => void;
  onCompressFile: (id: string) => void;
  onConvertFile: (id: string) => void;
  onFavoriteToggle: (id: string) => void;
  toastMessage: string;
  onToastDismiss: () => void;
}

export default function StorageView({
  section,
  viewMode,
  currentFolderId,
  onFolderOpen,
  onNavigateUp,
  selectedFileId,
  onFileSelect,
  onFileDetailOpen,
  fileDetailOpen,
  onFileDetailClose,
  onDeleteFile,
  onCompressFile,
  onConvertFile,
  onFavoriteToggle,
  toastMessage,
  onToastDismiss,
}: StorageViewProps) {
  const displayFiles: FileItem[] = useMemo(() => {
    switch (section) {
      case "all":
        return getFilesInFolder(currentFolderId);
      case "favorites":
        return getFavoriteFiles();
      case "recent":
        return getRecentFiles();
      case "shared":
        return getSharedFiles();
      case "trash":
        return getTrashedFiles();
    }
  }, [section, currentFolderId]);

  const selectedFile = useMemo(
    () => (selectedFileId ? getFileById(selectedFileId) : undefined),
    [selectedFileId],
  );

  const [contextMenu, setContextMenu] = useState<{
    fileId: string;
    x: number;
    y: number;
  } | null>(null);

  return (
    <div className="flex-1 flex min-h-0 relative">
      <div className="flex-1 flex flex-col min-h-0 bg-bg-white">
        {section === "all" && (
          <FolderBreadcrumb
            currentFolderId={currentFolderId}
            onNavigate={onNavigateUp}
          />
        )}
        <StorageDropZone>
          {displayFiles.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
              <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center">
                <FolderOpen
                  className="w-7 h-7 text-text-tertiary"
                  strokeWidth={1.5}
                />
              </div>
              <p className="text-sm text-text-tertiary">
                {section === "trash" ? "Trash is empty" : "No files here yet"}
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <StorageGrid
              files={displayFiles}
              selectedFileId={selectedFileId}
              onFileSelect={(id) => {
                onFileSelect(id);
                onFileDetailOpen();
              }}
              onFolderOpen={onFolderOpen}
              onFavoriteToggle={onFavoriteToggle}
              onContextMenu={(id, e) => {
                e.preventDefault();
                setContextMenu({ fileId: id, x: e.clientX, y: e.clientY });
              }}
            />
          ) : (
            <StorageList
              files={displayFiles}
              selectedFileId={selectedFileId}
              onFileSelect={(id) => {
                onFileSelect(id);
                onFileDetailOpen();
              }}
              onFolderOpen={onFolderOpen}
              onFavoriteToggle={onFavoriteToggle}
              onContextMenu={(id, e) => {
                e.preventDefault();
                setContextMenu({ fileId: id, x: e.clientX, y: e.clientY });
              }}
            />
          )}
        </StorageDropZone>
      </div>

      <FileDetailPanel
        file={selectedFile ?? null}
        isOpen={fileDetailOpen}
        onClose={onFileDetailClose}
        onDelete={onDeleteFile}
        onCompress={onCompressFile}
        onConvert={onConvertFile}
        onFavoriteToggle={onFavoriteToggle}
      />

      {contextMenu && (
        <FileContextMenu
          file={getFileById(contextMenu.fileId)!}
          position={{ x: contextMenu.x, y: contextMenu.y }}
          onClose={() => setContextMenu(null)}
          onAction={(action) => {
            setContextMenu(null);
            const id = contextMenu.fileId;
            if (action === "delete") onDeleteFile(id);
            else if (action === "compress") onCompressFile(id);
            else if (action === "convert") onConvertFile(id);
            else if (action === "favorite") onFavoriteToggle(id);
            else if (action === "open") {
              const f = getFileById(id);
              if (f?.type === "folder") onFolderOpen(id);
              else {
                onFileSelect(id);
                onFileDetailOpen();
              }
            }
          }}
        />
      )}

      <Toast
        message={toastMessage}
        isVisible={!!toastMessage}
        onDismiss={onToastDismiss}
      />
    </div>
  );
}
