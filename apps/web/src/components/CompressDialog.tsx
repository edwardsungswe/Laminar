import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface CompressDialogProps {
  fileName: string;
  onClose: () => void;
}

const formats = ["ZIP", "TAR.GZ", "7Z"] as const;

export default function CompressDialog({
  fileName,
  onClose,
}: CompressDialogProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>("ZIP");

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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-white rounded-xl shadow-lg border border-divider w-[400px] p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-text-primary">
            Compress File
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
          >
            <X className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </button>
        </div>

        {/* Subtitle */}
        <p className="text-sm text-text-secondary mt-1">{fileName}</p>

        {/* Format options */}
        {formats.map((format) => (
          <button
            key={format}
            onClick={() => setSelectedFormat(format)}
            className={`w-full px-4 py-3 rounded-lg border text-sm font-medium text-left transition-all duration-100 cursor-pointer mt-3 ${
              selectedFormat === format
                ? "border-accent bg-accent/5 text-accent"
                : "border-divider text-text-secondary hover:border-accent/20"
            }`}
          >
            {format}
          </button>
        ))}

        {/* Compress button */}
        <button
          onClick={onClose}
          className="w-full h-9 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors duration-100 cursor-pointer mt-4"
        >
          Compress
        </button>
      </div>
    </div>
  );
}
