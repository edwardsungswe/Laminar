import { useState, useMemo } from "react";
import { Plus, Settings } from "lucide-react";
import { useBlockTemplates } from "@/stores/BlockTemplateContext";
import BlockTemplateCard from "./BlockTemplateCard";
import CategoryManager from "./CategoryManager";

interface BlockTemplatesViewProps {
  onEditTemplate: (id: string) => void;
  onCreateNew: () => void;
}

export default function BlockTemplatesView({ onEditTemplate, onCreateNew }: BlockTemplatesViewProps) {
  const { templates, categories } = useBlockTemplates();
  const [activeCategory, setActiveCategory] = useState("All");
  const [showCategoryManager, setShowCategoryManager] = useState(false);

  const categoryPills = useMemo(() => ["All", ...categories], [categories]);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return templates;
    return templates.filter(
      (t) => t.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory, templates]);

  return (
    <div className="flex-1 bg-bg overflow-y-auto">
      <div className="px-10 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold text-text-primary">Block Templates</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCategoryManager((prev) => !prev)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-100 cursor-pointer ${
                showCategoryManager
                  ? "bg-surface text-accent"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface"
              }`}
              title="Manage Categories"
            >
              <Settings className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={onCreateNew}
              className="h-8 px-4 bg-accent hover:bg-accent-hover text-white text-xs font-medium rounded-lg transition-colors duration-100 flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
              Create New
            </button>
          </div>
        </div>

        {/* Category manager panel */}
        {showCategoryManager && <CategoryManager />}

        {/* Category pills */}
        <div className="flex items-center gap-2 mb-6">
          {categoryPills.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-100 cursor-pointer ${
                activeCategory === cat
                  ? "bg-surface text-accent"
                  : "text-text-secondary hover:bg-surface/50 hover:text-text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Template grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((template) => (
            <BlockTemplateCard
              key={template.id}
              template={template}
              onClick={() => onEditTemplate(template.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
