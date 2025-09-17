import { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { $patchStyleText } from "@lexical/selection";
import { $findMatchingParent, mergeRegister } from "@lexical/utils";
import { BsTypeBold } from "@react-icons/all-files/bs/BsTypeBold";
import { BsTypeUnderline } from "@react-icons/all-files/bs/BsTypeUnderline";
import { BsTypeItalic } from "@react-icons/all-files/bs/BsTypeItalic";

import { AiOutlineAlignCenter } from "@react-icons/all-files/ai/AiOutlineAlignCenter";
import { AiOutlineAlignLeft } from "@react-icons/all-files/ai/AiOutlineAlignLeft";
import { AiOutlineAlignRight } from "@react-icons/all-files/ai/AiOutlineAlignRight";
import ToolbarBtn from "../components/ToolbarBtn";
import TextSizeDropDown from "../components/TextSizeDropDown";
import TextColorDropDown from "./TextColorDropDown";

type AlignType = "left" | "right" | "center";

export default function ToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());
  const [align, setAlign] = useState<AlignType>("left");

  const applyStyleText = useCallback(
    (styles: Record<string, string>) => {
      activeEditor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, styles);
        }
      });
    },
    [activeEditor]
  );

  const onFontColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ color: value });
    },
    [applyStyleText]
  );

  const onFontSizeSelect = useCallback(
    (font: number, line: number) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {
            "font-size": font + "px",
            "line-height": line + "px",
          });
        }
      });
    },
    [editor]
  );

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));

      if (elementDOM !== null) {
        setAlign((elementDOM.style.textAlign || "left") as AlignType);
      }
    }
  }, [activeEditor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable);
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      })
    );
  }, [activeEditor, editor, updateToolbar]);

  return (
    <div className="flex mb-px p-1 align-middle bg-[#252525]">
      <TextColorDropDown disabled={!isEditable} onChange={onFontColorSelect} />
      <TextSizeDropDown disabled={!isEditable} onChange={onFontSizeSelect} />
      <ToolbarBtn
        disabled={!isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        active={isBold}
        title="Pogrubienie (Ctrl + B)"
      >
        <BsTypeBold />
      </ToolbarBtn>
      <ToolbarBtn
        disabled={!isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        active={isItalic}
        title="Kursywa (Ctrl + I)"
      >
        <BsTypeItalic />
      </ToolbarBtn>
      <ToolbarBtn
        disabled={!isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        active={isUnderline}
        title="Podkreślenie (Ctrl + U)"
      >
        <BsTypeUnderline />
      </ToolbarBtn>
      <ToolbarBtn
        disabled={!isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
        title="Do lewej"
        active={align === "left"}
      >
        <AiOutlineAlignLeft />
      </ToolbarBtn>
      <ToolbarBtn
        disabled={!isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
        active={align === "center"}
        title="Do środka"
      >
        <AiOutlineAlignCenter />
      </ToolbarBtn>
      <ToolbarBtn
        disabled={!isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
        active={align === "right"}
        title="Do prawej"
      >
        <AiOutlineAlignRight />
      </ToolbarBtn>
    </div>
  );
}
