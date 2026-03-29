import { useEffect } from "react";
import { Trash2 } from "lucide-react";

interface DeleteConfirmDialogProps {
  fileName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmDialog({
  fileName,
  onConfirm,
  onCancel,
}: DeleteConfirmDialogProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={onCancel} />

      {/* Card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-white rounded-xl shadow-lg border border-divider w-[400px] p-6">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#f5e6e8] flex items-center justify-center mx-auto">
          <Trash2 className="w-6 h-6 text-[#c07a7a]" strokeWidth={1.5} />
        </div>

        {/* Heading */}
        <h2 className="text-base font-semibold text-text-primary text-center mt-4">
          Delete file?
        </h2>

        {/* Description */}
        <p className="text-sm text-text-secondary text-center mt-2">
          &ldquo;{fileName}&rdquo; will be moved to trash. You can restore it later.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-3 mt-6 justify-center">
          <button
            onClick={onCancel}
            className="h-9 px-5 rounded-lg border border-divider text-sm font-medium text-text-secondary hover:bg-surface transition-colors duration-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="h-9 px-5 rounded-lg bg-[#c07a7a] hover:bg-[#a85a5a] text-white text-sm font-medium transition-colors duration-100 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
