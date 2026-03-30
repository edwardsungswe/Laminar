import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Variable from "@/lib/tiptap/variable-extension";
import { useBlockTemplates } from "@/stores/BlockTemplateContext";
import BlockBuilderToolbar from "./BlockBuilderToolbar";

// Categories come from context now

interface BlockBuilderProps {
  templateId: string | null;
  onBack: () => void;
}

function plainTextToHtml(text: string): string {
  return text
    .split("\n\n")
    .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

export default function BlockBuilder({ templateId, onBack }: BlockBuilderProps) {
  const { templates, categories, addTemplate, updateTemplate } = useBlockTemplates();
  const existing = templateId ? templates.find((t) => t.id === templateId) : null;

  const [name, setName] = useState(existing?.name ?? "");
  const [category, setCategory] = useState(existing?.category ?? categories[0] ?? "General");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Variable,
      Placeholder.configure({ placeholder: "Start writing your template..." }),
    ],
    content: existing?.htmlBody ? existing.htmlBody : existing ? plainTextToHtml(existing.body) : "",
    editorProps: {
      attributes: {
        class: "tiptap-content focus:outline-none min-h-[400px] px-10 py-6 text-[15px] leading-[1.7] text-text-primary",
      },
    },
  });

  // Reset editor content when templateId changes
  useEffect(() => {
    if (!editor) return;
    const tmpl = templateId ? templates.find((t) => t.id === templateId) : null;
    editor.commands.setContent(tmpl?.htmlBody ? tmpl.htmlBody : tmpl ? plainTextToHtml(tmpl.body) : "");
    setName(tmpl?.name ?? "");
    setCategory(tmpl?.category ?? categories[0] ?? "General");
  }, [templateId, editor, templates]);

  const handleSave = useCallback(() => {
    if (!editor) return;
    const plainText = editor.getText();
    const preview = plainText.slice(0, 80).replace(/\n/g, " ");
    const firstSentence = plainText.split(/[.!?]\s/)[0] ?? "";
    const description = firstSentence.length > 100
      ? firstSentence.slice(0, 100) + "..."
      : firstSentence + (firstSentence.endsWith(".") ? "" : ".");

    const htmlContent = editor.getHTML();

    if (existing) {
      updateTemplate(existing.id, {
        name,
        category,
        description,
        preview,
        body: plainText,
        htmlBody: htmlContent,
      });
    } else {
      addTemplate({
        name: name || "Untitled Template",
        category,
        description,
        preview,
        body: plainText,
        htmlBody: htmlContent,
        icon: category === "Personal" ? "Heart" : category === "Sales" ? "TrendingUp" : "Briefcase",
      });
    }
    onBack();
  }, [editor, existing, name, category, addTemplate, updateTemplate, onBack]);

  return (
    <div className="flex-1 flex flex-col bg-bg min-h-0">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-divider bg-bg-white shrink-0">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
          title="Back"
        >
          <ArrowLeft className="w-[18px] h-[18px]" strokeWidth={1.5} />
        </button>

        <div className="w-px h-5 bg-divider" />

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Template name"
          className="flex-1 bg-transparent text-sm font-semibold text-text-primary placeholder:text-text-tertiary focus:outline-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-8 px-3 rounded-lg bg-surface text-xs font-medium text-text-secondary border-none focus:outline-none cursor-pointer"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          onClick={onBack}
          className="h-8 px-4 rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-surface/50 transition-colors duration-100 cursor-pointer"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="h-8 px-4 bg-accent hover:bg-accent-hover text-white text-xs font-medium rounded-lg transition-colors duration-100 flex items-center gap-1.5 cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" strokeWidth={1.5} />
          Save
        </button>
      </div>

      {/* Toolbar */}
      <BlockBuilderToolbar editor={editor} />

      {/* Editor */}
      <div className="flex-1 overflow-y-auto bg-bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
