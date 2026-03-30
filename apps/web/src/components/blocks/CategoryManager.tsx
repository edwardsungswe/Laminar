import { useState } from "react";
import { Pencil, Trash2, Plus, Check, X } from "lucide-react";
import { useBlockTemplates } from "@/stores/BlockTemplateContext";

export default function CategoryManager() {
  const { categories, addCategory, removeCategory, renameCategory } = useBlockTemplates();

  const [newName, setNewName] = useState("");
  const [addingNew, setAddingNew] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleAddCategory = () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    addCategory(trimmed);
    setNewName("");
    setAddingNew(false);
  };

  const handleStartEdit = (cat: string) => {
    setEditingCategory(cat);
    setEditValue(cat);
    setConfirmDelete(null);
  };

  const handleConfirmEdit = () => {
    if (!editingCategory) return;
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== editingCategory) {
      renameCategory(editingCategory, trimmed);
    }
    setEditingCategory(null);
    setEditValue("");
  };

  const handleDelete = (cat: string) => {
    removeCategory(cat);
    setConfirmDelete(null);
  };

  return (
    <div className="bg-bg-white border border-divider rounded-lg p-4 mb-6">
      <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
        Manage Categories
      </h3>

      <div className="space-y-1.5">
        {categories.map((cat) => (
          <div key={cat} className="flex items-center gap-2 h-8 group">
            {editingCategory === cat ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleConfirmEdit();
                    if (e.key === "Escape") setEditingCategory(null);
                  }}
                  autoFocus
                  className="flex-1 h-7 px-2 rounded bg-surface text-sm text-text-primary border border-divider focus:outline-none focus:border-accent"
                />
                <button
                  onClick={handleConfirmEdit}
                  className="w-7 h-7 rounded flex items-center justify-center text-accent hover:bg-surface transition-colors cursor-pointer"
                  title="Save"
                >
                  <Check className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => setEditingCategory(null)}
                  className="w-7 h-7 rounded flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-surface transition-colors cursor-pointer"
                  title="Cancel"
                >
                  <X className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </>
            ) : confirmDelete === cat ? (
              <>
                <span className="flex-1 text-sm text-text-primary">
                  Delete <strong>{cat}</strong>?
                </span>
                <button
                  onClick={() => handleDelete(cat)}
                  className="h-6 px-2 rounded bg-red-500/10 text-red-600 text-[11px] font-medium hover:bg-red-500/20 transition-colors cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="h-6 px-2 rounded text-text-secondary text-[11px] font-medium hover:bg-surface transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 text-sm text-text-primary">{cat}</span>
                {cat !== "General" && (
                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleStartEdit(cat)}
                      className="w-7 h-7 rounded flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-surface transition-colors cursor-pointer"
                      title="Rename"
                    >
                      <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(cat)}
                      className="w-7 h-7 rounded flex items-center justify-center text-text-tertiary hover:text-red-500 hover:bg-surface transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Add new category */}
      <div className="mt-3 pt-3 border-t border-divider">
        {addingNew ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddCategory();
                if (e.key === "Escape") {
                  setAddingNew(false);
                  setNewName("");
                }
              }}
              autoFocus
              placeholder="Category name"
              className="flex-1 h-7 px-2 rounded bg-surface text-sm text-text-primary placeholder:text-text-tertiary border border-divider focus:outline-none focus:border-accent"
            />
            <button
              onClick={handleAddCategory}
              className="w-7 h-7 rounded flex items-center justify-center text-accent hover:bg-surface transition-colors cursor-pointer"
              title="Add"
            >
              <Check className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => {
                setAddingNew(false);
                setNewName("");
              }}
              className="w-7 h-7 rounded flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-surface transition-colors cursor-pointer"
              title="Cancel"
            >
              <X className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setAddingNew(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent-hover transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
            Add Category
          </button>
        )}
      </div>
    </div>
  );
}
