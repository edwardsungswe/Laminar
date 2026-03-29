import { ChevronRight } from "lucide-react";
import { getBreadcrumbPath } from "@/data/files";

interface FolderBreadcrumbProps {
  currentFolderId: string | null;
  onNavigate: (id: string | null) => void;
}

export default function FolderBreadcrumb({
  currentFolderId,
  onNavigate,
}: FolderBreadcrumbProps) {
  const path = currentFolderId ? getBreadcrumbPath(currentFolderId) : [];

  return (
    <div className="px-6 py-3 border-b border-divider flex items-center gap-1.5 shrink-0">
      {currentFolderId ? (
        <button
          onClick={() => onNavigate(null)}
          className="text-sm text-text-secondary hover:text-text-primary cursor-pointer transition-colors duration-100"
        >
          My Drive
        </button>
      ) : (
        <span className="text-sm text-text-primary font-medium">My Drive</span>
      )}

      {path.map((segment, i) => {
        const isLast = i === path.length - 1;
        return (
          <span key={segment.id} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-text-tertiary" strokeWidth={1.5} />
            {isLast ? (
              <span className="text-sm text-text-primary font-medium">
                {segment.name}
              </span>
            ) : (
              <button
                onClick={() => onNavigate(segment.id)}
                className="text-sm text-text-secondary hover:text-text-primary cursor-pointer transition-colors duration-100"
              >
                {segment.name}
              </button>
            )}
          </span>
        );
      })}
    </div>
  );
}
