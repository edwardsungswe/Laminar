import { useState } from "react";
import { Upload } from "lucide-react";

interface StorageDropZoneProps {
  children: React.ReactNode;
}

export default function StorageDropZone({ children }: StorageDropZoneProps) {
  const [dragCount, setDragCount] = useState(0);

  return (
    <div
      className="relative flex-1 overflow-y-auto"
      onDragEnter={(e) => {
        e.preventDefault();
        setDragCount((c) => c + 1);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragCount((c) => c - 1);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragCount(0);
      }}
    >
      {children}

      {dragCount > 0 && (
        <div className="absolute inset-4 bg-accent/5 border-2 border-dashed border-accent/30 rounded-xl z-10 flex flex-col items-center justify-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
            <Upload className="w-6 h-6 text-accent" strokeWidth={1.5} />
          </div>
          <span className="text-sm font-medium text-accent">
            Drop files to upload
          </span>
        </div>
      )}
    </div>
  );
}
