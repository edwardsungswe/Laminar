import { Node, mergeAttributes } from "@tiptap/core";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";

export interface VariableOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    variable: {
      insertVariable: (variableName: string) => ReturnType;
    };
  }
}

export const Variable = Node.create<VariableOptions>({
  name: "variable",

  group: "inline",

  inline: true,

  selectable: true,

  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      variableName: {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute("data-variable-name"),
        renderHTML: (attributes: Record<string, string>) => ({
          "data-variable-name": attributes.variableName,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-variable-name]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, string> }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: "variable-chip",
      }),
      `{${HTMLAttributes["data-variable-name"]}}`,
    ];
  },

  addNodeView() {
    return ({ node }: { node: ProseMirrorNode }) => {
      const dom = document.createElement("span");
      dom.className = "variable-chip";
      dom.contentEditable = "false";
      dom.textContent = `{${node.attrs.variableName}}`;
      return { dom };
    };
  },

  addCommands() {
    return {
      insertVariable:
        (variableName: string) =>
        ({ commands }: { commands: { insertContent: (content: Record<string, unknown>) => boolean } }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { variableName },
          });
        },
    };
  },
});

export default Variable;
