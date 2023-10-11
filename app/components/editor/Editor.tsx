import React, { useEffect } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import Toolbar from "./components/Toolbar";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { editorConfig } from "./config/editorConfig";
import { $generateHtmlFromNodes } from "@lexical/html";

function OnChangePlugin({ onChange }: { onChange: any }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    const removeUpdateListener = editor.registerUpdateListener(
      ({ editorState }) => {
        editorState.read(() => {
          const htmlString = $generateHtmlFromNodes(editor, null);
          onChange(htmlString);
        });
      }
    );
    return () => {
      removeUpdateListener();
    };
  }, [editor, onChange]);

  return null;
}

const Editor = ({ setData }: { setData: (val: string) => void }) => {
  function onChange(state: any) {
    setData(state);
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="my-[20px] text-black relative leading-[20px] font-semibold text-left border border-[#999] overflow-hidden rounded-[4px]">
        <Toolbar />
        <div className="bg-[#181818] relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="resize-none text-[18px] leading-[30px] relative outline-0 p-[15px_10px] caret-[#444] text-white min-h-[264px]" />
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
