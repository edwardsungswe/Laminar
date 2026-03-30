import type { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo,
  Redo,
} from "lucide-react";

interface BlockBuilderToolbarProps {
  editor: Editor | null;
}

export default function BlockBuilderToolbar({ editor }: BlockBuilderToolbarProps) {
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
      className={`w-8 h-8 rounded flex items-center justify-center transition-colors duration-100 cursor-pointer ${
        active
          ? "bg-surface text-accent"
          : "text-text-secondary hover:text-text-primary hover:bg-surface/50"
      }`}
    >
      {icon}
    </button>
  );

  const sep = <div className="w-px h-5 bg-divider mx-1 shrink-0" />;

  const iconSize = "w-4 h-4";
  const sw = 1.5;

  return (
    <div className="flex items-center gap-0.5 px-4 py-2 border-b border-divider bg-bg-white">
      {btn(editor.isActive("bold"), () => editor.chain().focus().toggleBold().run(), <Bold className={iconSize} strokeWidth={sw} />, "Bold")}
      {btn(editor.isActive("italic"), () => editor.chain().focus().toggleItalic().run(), <Italic className={iconSize} strokeWidth={sw} />, "Italic")}
      {btn(editor.isActive("underline"), () => editor.chain().focus().toggleUnderline().run(), <Underline className={iconSize} strokeWidth={sw} />, "Underline")}
      {btn(editor.isActive("strike"), () => editor.chain().focus().toggleStrike().run(), <Strikethrough className={iconSize} strokeWidth={sw} />, "Strikethrough")}

      {sep}

      {btn(editor.isActive("heading", { level: 1 }), () => editor.chain().focus().toggleHeading({ level: 1 }).run(), <Heading1 className={iconSize} strokeWidth={sw} />, "Heading 1")}
      {btn(editor.isActive("heading", { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), <Heading2 className={iconSize} strokeWidth={sw} />, "Heading 2")}
      {btn(editor.isActive("heading", { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run(), <Heading3 className={iconSize} strokeWidth={sw} />, "Heading 3")}

      {sep}

      {btn(editor.isActive("bulletList"), () => editor.chain().focus().toggleBulletList().run(), <List className={iconSize} strokeWidth={sw} />, "Bullet List")}
      {btn(editor.isActive("orderedList"), () => editor.chain().focus().toggleOrderedList().run(), <ListOrdered className={iconSize} strokeWidth={sw} />, "Ordered List")}
      {btn(editor.isActive("blockquote"), () => editor.chain().focus().toggleBlockquote().run(), <Quote className={iconSize} strokeWidth={sw} />, "Blockquote")}

      {sep}

      {btn(false, () => editor.chain().focus().setHorizontalRule().run(), <Minus className={iconSize} strokeWidth={sw} />, "Horizontal Rule")}

      {sep}

      {btn(false, () => editor.chain().focus().undo().run(), <Undo className={iconSize} strokeWidth={sw} />, "Undo")}
      {btn(false, () => editor.chain().focus().redo().run(), <Redo className={iconSize} strokeWidth={sw} />, "Redo")}
    </div>
  );
}
