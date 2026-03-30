import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, Send, Trash2, HardDrive, Paperclip, LayoutTemplate } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Variable from "@/lib/tiptap/variable-extension";
import ComposeToolbar from "./compose/ComposeToolbar";
import VariableFillDialog from "./compose/VariableFillDialog";
import BlockPickerPanel from "./blocks/BlockPickerPanel";
import type { BlockTemplate } from "@/types";

interface ComposePanelProps {
  onClose: () => void;
  onAttachFromDrive?: () => void;
}

function hasVariableNodes(editor: ReturnType<typeof useEditor>): boolean {
  if (!editor) return false;
  let found = false;
  editor.state.doc.descendants((node) => {
    if (node.type.name === "variable") found = true;
  });
  return found;
}

export default function ComposePanel({ onClose, onAttachFromDrive }: ComposePanelProps) {
  const [blockPickerOpen, setBlockPickerOpen] = useState(false);
  const [variableDialogOpen, setVariableDialogOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({ placeholder: "Write your message..." }),
      Link.configure({ openOnClick: false }),
      Variable,
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "tiptap-content focus:outline-none min-h-[400px] px-10 py-6 text-[15px] leading-[1.7] text-text-primary",
      },
    },
  });

  useEffect(() => {
    if (!blockPickerOpen) return;
    function handleMouseDown(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setBlockPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [blockPickerOpen]);

  const handleBlockSelect = useCallback(
    (template: BlockTemplate) => {
      if (!editor) return;
      const html = template.htmlBody || template.body;
      editor.chain().focus().insertContent(html).run();
      setBlockPickerOpen(false);
    },
    [editor]
  );

  const handleSend = useCallback(() => {
    if (!editor) return;
    if (hasVariableNodes(editor)) {
      setVariableDialogOpen(true);
      return;
    }
    // Mock send
    onClose();
  }, [editor, onClose]);

  const handleVariableSend = useCallback(
    (_filledHtml: string) => {
      setVariableDialogOpen(false);
      // Mock send with filledHtml
      onClose();
    },
    [onClose]
  );

  return (
    <div className="h-full flex flex-col bg-bg-white">
      <div className="px-10 py-8 flex flex-col gap-0 flex-1 min-h-0">
        {/* Toolbar */}
        <div className="flex items-center gap-1 mb-6">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
            title="Discard"
          >
            <ArrowLeft className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </button>

          <div className="w-px h-5 bg-divider mx-1" />

          <h2 className="text-sm font-semibold text-text-primary">New Message</h2>

          <div className="flex-1" />

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
            title="Delete draft"
          >
            <Trash2 className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </button>

          <button
            onClick={handleSend}
            className="h-9 px-5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors duration-100 flex items-center gap-2 cursor-pointer ml-2"
          >
            <Send className="w-4 h-4" strokeWidth={1.5} />
            Send
          </button>
        </div>

        {/* To */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-divider">
          <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider w-16 shrink-0">To</span>
          <input
            type="text"
            placeholder="recipient@example.com"
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none"
          />
        </div>

        {/* Subject */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Subject"
            className="w-full bg-transparent text-xl font-medium text-text-primary placeholder:text-text-tertiary focus:outline-none"
          />
        </div>

        {/* Divider + Compose toolbar */}
        <div className="border-t border-divider" />
        <ComposeToolbar editor={editor} />

        {/* Editor */}
        <div className="flex-1 overflow-y-auto">
          <EditorContent editor={editor} />
        </div>

        {/* Attachment toolbar */}
        <div className="border-t border-divider pt-4 mt-auto flex items-center gap-2">
          <div className="relative" ref={pickerRef}>
            <button
              onClick={() => setBlockPickerOpen((prev) => !prev)}
              className="h-8 px-3 rounded-lg flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
            >
              <LayoutTemplate className="w-4 h-4" strokeWidth={1.5} />
              Insert Block
            </button>
            {blockPickerOpen && (
              <BlockPickerPanel onSelect={handleBlockSelect} onClose={() => setBlockPickerOpen(false)} />
            )}
          </div>
          <button
            onClick={onAttachFromDrive}
            className="h-8 px-3 rounded-lg flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
          >
            <HardDrive className="w-4 h-4" strokeWidth={1.5} />
            Attach from Drive
          </button>
          <button
            className="h-8 px-3 rounded-lg flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-100 cursor-pointer"
          >
            <Paperclip className="w-4 h-4" strokeWidth={1.5} />
            Attach file
          </button>
        </div>
      </div>

      {/* Variable fill dialog */}
      {variableDialogOpen && editor && (
        <VariableFillDialog
          editor={editor}
          onSend={handleVariableSend}
          onCancel={() => setVariableDialogOpen(false)}
        />
      )}
    </div>
  );
}
