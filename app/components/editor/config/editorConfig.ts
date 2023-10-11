import { HeadingNode } from "@lexical/rich-text";

export const editorConfig = {
  namespace: "MyEditor",
  theme: {
    heading: {
      h1: "text-3xl",
      h2: "text-2xl",
      h3: "text-xl",
    },
    text: {
      bold: "text-bold",
      italic: "italic",
      underline: "underline",
    },
  },
  onError(error: any) {
    throw error;
  },
  nodes: [HeadingNode],
};
