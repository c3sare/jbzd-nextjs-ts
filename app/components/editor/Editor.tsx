import React, { useEffect } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import { HeadingNode } from "@lexical/rich-text";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const editorConfig = {
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

function OnChangePlugin({ onChange }: { onChange: any }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);

  return null;
}

const Editor = ({ setData }: { setData: (val: string) => void }) => {
  function onChange(editorState: any) {
    const editorStateJSON = editorState.toJSON();
    setData(JSON.stringify(editorStateJSON));
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="my-[20px] rounded-[2px] max-w-[600px] text-black relative leading-[20px] font-semibold text-left rounded-tl-[10px] rounded-tr-[10px]">
        <ToolbarPlugin />
        <div className="bg-[#181818] relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="max-h-[150px] resize-none text-[15px] relative outline-0 p-[15px_10px] caret-[#444]" />
            }
            placeholder={null}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <AutoFocusPlugin />
        </div>
      </div>
      <OnChangePlugin onChange={onChange} />
    </LexicalComposer>
  );
};

export default Editor;
