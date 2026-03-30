import { useState, useRef, useEffect } from "react";
import type { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link,
  List,
  ListOrdered,
  Quote,
  Braces,
} from "lucide-react";
import { TEMPLATE_VARIABLES } from "@/data/variables";

interface ComposeToolbarProps {
  editor: Editor | null;
}

export default function ComposeToolbar({ editor }: ComposeToolbarProps) {
  const [variablesOpen, setVariablesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!variablesOpen) return;
    function handleMouseDown(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setVariablesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [variablesOpen]);

  if (!editor) return null;

  const btn = (
    active: boolean,
    onClick: () => void,
    icon: React.ReactNode,
    title: string
  ) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`w-7 h-7 rounded flex items-center justify-center transition-colors duration-100 cursor-pointer ${
        active
          ? "bg-surface text-accent"
          : "text-text-secondary hover:text-text-primary hover:bg-surface/50"
      }`}
    >
      {icon}
    </button>
  );

  const sep = <div className="w-px h-4 bg-divider mx-0.5 shrink-0" />;

  const iconSize = "w-3.5 h-3.5";
  const sw = 1.5;

  const handleLink = () => {
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="flex items-center gap-0.5 px-4 py-1.5 border-b border-divider">
      {btn(editor.isActive("bold"), () => editor.chain().focus().toggleBold().run(), <Bold className={iconSize} strokeWidth={sw} />, "Bold")}
      {btn(editor.isActive("italic"), () => editor.chain().focus().toggleItalic().run(), <Italic className={iconSize} strokeWidth={sw} />, "Italic")}
      {btn(editor.isActive("underline"), () => editor.chain().focus().toggleUnderline().run(), <Underline className={iconSize} strokeWidth={sw} />, "Underline")}
      {btn(editor.isActive("strike"), () => editor.chain().focus().toggleStrike().run(), <Strikethrough className={iconSize} strokeWidth={sw} />, "Strikethrough")}

      {sep}

      {btn(editor.isActive("link"), handleLink, <Link className={iconSize} strokeWidth={sw} />, "Link")}

      {sep}

      {btn(editor.isActive("bulletList"), () => editor.chain().focus().toggleBulletList().run(), <List className={iconSize} strokeWidth={sw} />, "Bullet List")}
      {btn(editor.isActive("orderedList"), () => editor.chain().focus().toggleOrderedList().run(), <ListOrdered className={iconSize} strokeWidth={sw} />, "Ordered List")}
      {btn(editor.isActive("blockquote"), () => editor.chain().focus().toggleBlockquote().run(), <Quote className={iconSize} strokeWidth={sw} />, "Blockquote")}

      {sep}

      {/* Variables dropdown */}
      <div className="relative" ref={dropdownRef}>
        {btn(variablesOpen, () => setVariablesOpen((prev) => !prev), <Braces className={iconSize} strokeWidth={sw} />, "Insert Variable")}
        {variablesOpen && (
          <div className="absolute top-full left-0 mt-1 w-52 bg-bg-white border border-divider rounded-lg shadow-lg z-20">
            <div className="px-3 py-2 border-b border-divider">
              <span className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Variables</span>
            </div>
            <div className="max-h-48 overflow-y-auto py-1">
              {TEMPLATE_VARIABLES.map((v) => (
                <button
                  key={v.key}
                  onClick={() => {
                    editor.chain().focus().insertVariable(v.key).run();
                    setVariablesOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-surface/50 transition-colors duration-100 cursor-pointer flex items-center justify-between gap-2"
                >
                  <span className="text-sm text-text-primary">{v.label}</span>
                  <span className="text-[10px] font-mono text-text-tertiary">{`{${v.key}}`}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
