import { useState, useMemo } from "react";
import { X } from "lucide-react";
import type { Editor } from "@tiptap/react";
import { TEMPLATE_VARIABLES } from "@/data/variables";

interface VariableFillDialogProps {
  editor: Editor;
  onSend: (filledHtml: string) => void;
  onCancel: () => void;
}

function extractVariables(editor: Editor): string[] {
  const variables: string[] = [];
  editor.state.doc.descendants((node) => {
    if (node.type.name === "variable" && node.attrs.variableName) {
      if (!variables.includes(node.attrs.variableName)) {
        variables.push(node.attrs.variableName);
      }
    }
  });
  return variables;
}

export default function VariableFillDialog({ editor, onSend, onCancel }: VariableFillDialogProps) {
  const variableKeys = useMemo(() => extractVariables(editor), [editor]);

  const initialValues: Record<string, string> = {};
  for (const key of variableKeys) {
    const def = TEMPLATE_VARIABLES.find((v) => v.key === key);
    initialValues[key] = def?.defaultValue ?? "";
  }

  const [values, setValues] = useState(initialValues);

  const handleSend = () => {
    let html = editor.getHTML();
    // Replace variable chip spans with filled values
    for (const key of variableKeys) {
      // Match rendered variable chips in HTML
      const pattern = new RegExp(
        `<span[^>]*data-variable-name="${key}"[^>]*class="variable-chip"[^>]*>\\{${key}\\}</span>`,
        "g"
      );
      html = html.replace(pattern, values[key] || `{${key}}`);
      // Also replace plain text variable references
      html = html.replace(new RegExp(`\\{${key}\\}`, "g"), values[key] || `{${key}}`);
    }
    onSend(html);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" onClick={onCancel} />

      {/* Dialog */}
      <div className="relative bg-bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-divider">
          <h3 className="text-sm font-semibold text-text-primary">Fill in Variables</h3>
          <button
            onClick={onCancel}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-3 max-h-80 overflow-y-auto">
          <p className="text-xs text-text-secondary mb-2">
            Your message contains template variables. Fill them in before sending.
          </p>
          {variableKeys.map((key) => {
            const def = TEMPLATE_VARIABLES.find((v) => v.key === key);
            return (
              <div key={key}>
                <label className="block text-xs font-medium text-text-secondary mb-1">
                  {def?.label ?? key}
                  <span className="ml-1 font-mono text-text-tertiary text-[10px]">{`{${key}}`}</span>
                </label>
                <input
                  type="text"
                  value={values[key] ?? ""}
                  onChange={(e) => setValues((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="w-full h-8 px-3 rounded-lg bg-surface text-sm text-text-primary border border-divider focus:outline-none focus:border-accent transition-colors"
                  placeholder={def?.defaultValue}
                />
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-divider">
          <button
            onClick={onCancel}
            className="h-8 px-4 rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-surface/50 transition-colors duration-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="h-8 px-4 bg-accent hover:bg-accent-hover text-white text-xs font-medium rounded-lg transition-colors duration-100 cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
