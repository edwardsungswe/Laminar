import type { FileItem } from "@/data/files";
import FolderCard from "./FolderCard";
import FileCard from "./FileCard";

interface StorageGridProps {
  files: FileItem[];
  selectedFileId: string | null;
  onFileSelect: (id: string) => void;
  onFolderOpen: (id: string) => void;
  onFavoriteToggle: (id: string) => void;
  onContextMenu: (id: string, e: React.MouseEvent) => void;
}

export default function StorageGrid({
  files,
  selectedFileId,
  onFileSelect,
  onFolderOpen,
  onFavoriteToggle,
  onContextMenu,
}: StorageGridProps) {
  const folders = files.filter((f) => f.type === "folder");
  const regularFiles = files.filter((f) => f.type !== "folder");

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      {folders.length > 0 && (
        <>
          <h2 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">
            Folders
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3 mb-6">
            {folders.map((folder) => (
              <FolderCard
                key={folder.id}
                folder={folder}
                onOpen={() => onFolderOpen(folder.id)}
                onContextMenu={(e) => onContextMenu(folder.id, e)}
              />
            ))}
          </div>
        </>
      )}

      {regularFiles.length > 0 && (
        <>
          <h2 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">
            Files
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3">
            {regularFiles.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                isSelected={selectedFileId === file.id}
                onSelect={() => onFileSelect(file.id)}
                onDoubleClick={() => onFileSelect(file.id)}
                onFavoriteToggle={() => onFavoriteToggle(file.id)}
                onContextMenu={(e) => onContextMenu(file.id, e)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
