export const editorConfig = {
  namespace: "MyEditor",
  theme: {
    text: {
      bold: "text-bold",
      italic: "italic",
      underline: "underline",
    },
  },
  onError(error: unknown) {
    throw error;
  },
};
