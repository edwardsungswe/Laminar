import { X } from "lucide-react";
import { useBlockTemplates } from "@/stores/BlockTemplateContext";
import type { BlockTemplate } from "@/types";

interface BlockPickerPanelProps {
  onSelect: (template: BlockTemplate) => void;
  onClose: () => void;
}

export default function BlockPickerPanel({ onSelect, onClose }: BlockPickerPanelProps) {
  const { templates } = useBlockTemplates();

  return (
    <div className="absolute bottom-full left-0 mb-2 w-72 bg-bg-white border border-divider rounded-lg shadow-lg z-10">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-divider">
        <span className="text-xs font-semibold text-text-primary">Insert Block</span>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
      </div>

      {/* Template list */}
      <div className="max-h-52 overflow-y-auto py-1">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className="w-full text-left px-3 py-2 hover:bg-surface/50 transition-colors duration-100 cursor-pointer flex items-center gap-2"
          >
            <span className="text-sm text-text-primary truncate">{template.name}</span>
            <span className="ml-auto text-[10px] font-medium text-text-tertiary bg-surface rounded px-1.5 py-0.5 shrink-0">
              {template.category}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
