import { createContext, useContext, useReducer, type ReactNode } from "react";
import { MOCK_BLOCK_TEMPLATES } from "@/data/blocks";
import type { BlockTemplate } from "@/types";

interface State {
  templates: BlockTemplate[];
  categories: string[];
}

function getUniqueCategories(templates: BlockTemplate[]): string[] {
  const set = new Set(templates.map((t) => t.category));
  // Ensure "General" is always present
  set.add("General");
  return Array.from(set).sort();
}

const initialState: State = {
  templates: MOCK_BLOCK_TEMPLATES,
  categories: getUniqueCategories(MOCK_BLOCK_TEMPLATES),
};

type Action =
  | { type: "ADD"; template: Omit<BlockTemplate, "id"> }
  | { type: "UPDATE"; id: string; updates: Partial<BlockTemplate> }
  | { type: "DELETE"; id: string }
  | { type: "ADD_CATEGORY"; name: string }
  | { type: "REMOVE_CATEGORY"; name: string }
  | { type: "RENAME_CATEGORY"; oldName: string; newName: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD": {
      const templates = [
        ...state.templates,
        { ...action.template, id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` },
      ];
      return { ...state, templates };
    }
    case "UPDATE": {
      const templates = state.templates.map((t) =>
        t.id === action.id ? { ...t, ...action.updates } : t
      );
      return { ...state, templates };
    }
    case "DELETE": {
      const templates = state.templates.filter((t) => t.id !== action.id);
      return { ...state, templates };
    }
    case "ADD_CATEGORY": {
      if (state.categories.includes(action.name)) return state;
      return { ...state, categories: [...state.categories, action.name].sort() };
    }
    case "REMOVE_CATEGORY": {
      if (action.name === "General") return state;
      const categories = state.categories.filter((c) => c !== action.name);
      const templates = state.templates.map((t) =>
        t.category === action.name ? { ...t, category: "General" } : t
      );
      return { ...state, categories, templates };
    }
    case "RENAME_CATEGORY": {
      if (action.oldName === "General") return state;
      if (state.categories.includes(action.newName)) return state;
      const categories = state.categories
        .map((c) => (c === action.oldName ? action.newName : c))
        .sort();
      const templates = state.templates.map((t) =>
        t.category === action.oldName ? { ...t, category: action.newName } : t
      );
      return { ...state, categories, templates };
    }
    default:
      return state;
  }
}

interface BlockTemplateContextValue {
  templates: BlockTemplate[];
  categories: string[];
  addTemplate: (template: Omit<BlockTemplate, "id">) => void;
  updateTemplate: (id: string, updates: Partial<BlockTemplate>) => void;
  deleteTemplate: (id: string) => void;
  addCategory: (name: string) => void;
  removeCategory: (name: string) => void;
  renameCategory: (oldName: string, newName: string) => void;
}

const BlockTemplateContext = createContext<BlockTemplateContextValue | null>(null);

export function BlockTemplateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTemplate = (template: Omit<BlockTemplate, "id">) =>
    dispatch({ type: "ADD", template });

  const updateTemplate = (id: string, updates: Partial<BlockTemplate>) =>
    dispatch({ type: "UPDATE", id, updates });

  const deleteTemplate = (id: string) =>
    dispatch({ type: "DELETE", id });

  const addCategory = (name: string) =>
    dispatch({ type: "ADD_CATEGORY", name });

  const removeCategory = (name: string) =>
    dispatch({ type: "REMOVE_CATEGORY", name });

  const renameCategory = (oldName: string, newName: string) =>
    dispatch({ type: "RENAME_CATEGORY", oldName, newName });

  return (
    <BlockTemplateContext.Provider
      value={{
        templates: state.templates,
        categories: state.categories,
        addTemplate,
        updateTemplate,
        deleteTemplate,
        addCategory,
        removeCategory,
        renameCategory,
      }}
    >
      {children}
    </BlockTemplateContext.Provider>
  );
}

export function useBlockTemplates() {
  const ctx = useContext(BlockTemplateContext);
  if (!ctx) throw new Error("useBlockTemplates must be used within BlockTemplateProvider");
  return ctx;
}
