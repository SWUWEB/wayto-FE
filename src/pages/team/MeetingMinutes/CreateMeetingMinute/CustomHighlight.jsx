import { Mark, mergeAttributes } from "@tiptap/core";

export const CustomHighlight = Mark.create({
  name: "customHighlight",

  addOptions() {
    return {
      multicolor: true,
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      color: {
        default: "#ffff00",
        parseHTML: (element) => element.getAttribute("data-highlight-color"),
        renderHTML: (attributes) => {
          if (!attributes.color) {
            return {};
          }
          return {
            "data-highlight-color": attributes.color,
            style: `background-color: ${attributes.color}`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "mark",
      },
      {
        tag: "span",
        getAttrs: (element) => element.style.backgroundColor && null,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "mark",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setCustomHighlight:
        (attributes) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes);
        },
      toggleCustomHighlight:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, attributes);
        },
      unsetCustomHighlight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});