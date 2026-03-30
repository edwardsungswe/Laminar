import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { useBlockTemplates } from "@/stores/BlockTemplateContext";
import type { BlockTemplate } from "@/types";

interface BlockTemplateCardProps {
  template: BlockTemplate;
  onClick: () => void;
}

export default function BlockTemplateCard({ template, onClick }: BlockTemplateCardProps) {
  const { categories, updateTemplate, deleteTemplate } = useBlockTemplates();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleMouseDown(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [menuOpen]);

  return (
    <div className="relative w-full bg-bg-white border border-divider rounded-lg p-4 hover:border-text-tertiary transition-colors duration-100 group">
      <button
        onClick={onClick}
        className="w-full text-left cursor-pointer"
      >
        <h3 className="text-sm font-semibold text-text-primary mb-1 truncate">
          {template.name}
        </h3>
        <p className="text-xs text-text-secondary mb-2">
          {template.category} &middot; {template.description}
        </p>
        <p className="text-xs text-text-tertiary leading-relaxed line-clamp-3">
          {template.preview}
        </p>
      </button>

      {/* Menu button */}
      <div className="absolute top-3 right-3" ref={menuRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
          className="w-7 h-7 rounded flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer opacity-0 group-hover:opacity-100"
          title="Options"
        >
          <MoreHorizontal className="w-4 h-4" strokeWidth={1.5} />
        </button>

        {menuOpen && (
          <div className="absolute top-full right-0 mt-1 w-44 bg-bg-white border border-divider rounded-lg shadow-lg z-10 py-1">
            {/* Category submenu */}
            <div className="px-3 py-1.5">
              <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">
                Move to category
              </span>
            </div>
            {categories
              .filter((c) => c !== template.category)
              .map((cat) => (
                <button
                  key={cat}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateTemplate(template.id, { category: cat });
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-sm text-text-primary hover:bg-surface/50 transition-colors duration-100 cursor-pointer"
                >
                  {cat}
                </button>
              ))}

            <div className="border-t border-divider my-1" />

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTemplate(template.id);
                setMenuOpen(false);
              }}
              className="w-full text-left px-3 py-1.5 text-sm text-red-500 hover:bg-red-500/5 transition-colors duration-100 cursor-pointer"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
