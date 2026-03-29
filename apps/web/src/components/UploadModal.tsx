import { useState, useEffect } from "react";
import { X, Upload, FileText } from "lucide-react";

interface UploadModalProps {
  onClose: () => void;
}

export default function UploadModal({ onClose }: UploadModalProps) {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      {/* Card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-white rounded-xl shadow-lg border border-divider w-[480px] p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-text-primary">
            Upload Files
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
          >
            <X className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </button>
        </div>

        {/* Drop zone */}
        <div
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => setIsDragging(false)}
          className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center gap-3 mt-4 ${
            isDragging
              ? "border-accent bg-accent/5"
              : "border-divider"
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-surface flex items-center justify-center">
            <Upload className="w-6 h-6 text-text-secondary" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-medium text-text-primary">
            Drag files here
          </p>
          <p className="text-xs text-text-tertiary">or</p>
          <button className="h-9 px-5 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors duration-100 cursor-pointer">
            Browse Files
          </button>
        </div>

        {/* Mock progress card */}
        <div className="mt-4 rounded-lg border border-divider p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#f5e6e8] flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 text-[#c07a7a]" strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">
              Brand_Guidelines_v3.pdf
            </p>
            <div className="h-1 bg-divider rounded-full mt-1.5">
              <div className="h-1 bg-accent rounded-full w-[65%]" />
            </div>
          </div>
          <span className="text-xs text-text-tertiary shrink-0">65%</span>
        </div>
      </div>
    </div>
  );
}
