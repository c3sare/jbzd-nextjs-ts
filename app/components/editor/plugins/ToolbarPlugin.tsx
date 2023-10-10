import { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_CRITICAL,
  DEPRECATED_$isGridSelection,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import {
  $createHeadingNode,
  $isHeadingNode,
  HeadingTagType,
} from "@lexical/rich-text";
import {
  $getSelectionStyleValueForProperty,
  $setBlocksType,
} from "@lexical/selection";
import { $isListNode, ListNode } from "@lexical/list";
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister,
} from "@lexical/utils";
import DropDown, { DropDownItem } from "../ui/DropDown";
import { BsTypeBold } from "@react-icons/all-files/bs/BsTypeBold";
import { BsTypeUnderline } from "@react-icons/all-files/bs/BsTypeUnderline";
import { BsTypeItalic } from "@react-icons/all-files/bs/BsTypeItalic";

import { AiOutlineAlignCenter } from "@react-icons/all-files/ai/AiOutlineAlignCenter";
import { AiOutlineAlignLeft } from "@react-icons/all-files/ai/AiOutlineAlignLeft";
import { AiOutlineAlignRight } from "@react-icons/all-files/ai/AiOutlineAlignRight";
import { BiFontSize } from "@react-icons/all-files/bi/BiFontSize";

const blockTypeToBlockName = {
  h1: "1",
  h2: "2",
  h3: "3",
};

function dropDownActiveClass(active: boolean) {
  if (active) return "active dropdown-item-active";
  else return "";
}

function BlockFormatDropDown({
  editor,
  blockType,
  disabled = false,
}: {
  blockType: keyof typeof blockTypeToBlockName;
  editor: LexicalEditor;
  disabled?: boolean;
}): JSX.Element {
  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
    }
  };

  const dropDownItemClassName =
    "mx-2 p-2 text-[#050505] cursor-pointer leading-[16px] text-[15px] flex content-center flex-row flex-shrink-0 justify-between bg-white rounded-[8px] border-none";

  return (
    <DropDown
      disabled={disabled}
      buttonClassName="border-none flex bg-none rounded-[10px] p-2 cursor-pointer align-middle"
      buttonLabel={<BiFontSize fontSize={16} className="text-white" />}
      buttonAriaLabel="Formatting options for text style"
    >
      <DropDownItem
        className={
          dropDownItemClassName + " " + dropDownActiveClass(blockType === "h1")
        }
        onClick={() => formatHeading("h1")}
      >
        <span className="text">1</span>
      </DropDownItem>
      <DropDownItem
        className={
          dropDownItemClassName + " " + dropDownActiveClass(blockType === "h2")
        }
        onClick={() => formatHeading("h2")}
      >
        <span className="text">2</span>
      </DropDownItem>
      <DropDownItem
        className={
          dropDownItemClassName + " " + dropDownActiveClass(blockType === "h3")
        }
        onClick={() => formatHeading("h3")}
      >
        <span className="text">3</span>
      </DropDownItem>
    </DropDown>
  );
}

function Divider(): JSX.Element {
  return <div className="divider" />;
}

export default function ToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>("h3");
  const [fontColor, setFontColor] = useState<string>("#fff");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());

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

      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type as keyof typeof blockTypeToBlockName);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName);
          }
        }
      }
      // Handle buttons
      setFontColor(
        $getSelectionStyleValueForProperty(selection, "color", "#000")
      );
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

  const toolbarItemClassName =
    "border-none flex bg-none rounded-[10px] p-2 cursor-pointer align-middle disabled:cursor-not-allowed mr-[2px] text-[16px] text-white";

  return (
    <div className="flex mb-[1px] bg-[#252525] p-1 rounded-tl-[10px] rounded-tr-[10px] align-middle">
      {blockType in blockTypeToBlockName && activeEditor === editor && (
        <>
          <BlockFormatDropDown
            disabled={!isEditable}
            blockType={blockType}
            editor={editor}
          />
          <Divider />
        </>
      )}
      <>
        <button
          disabled={!isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
          }}
          className={
            toolbarItemClassName +
            " " +
            (isBold ? "bg-[rgba(255,_255,_255,_.1)]" : "")
          }
          title="Pogrubienie"
          type="button"
        >
          <BsTypeBold />
        </button>
        <button
          disabled={!isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
          }}
          className={
            toolbarItemClassName +
            " " +
            (isItalic ? "bg-[rgba(255,_255,_255,_.1)]" : "")
          }
          title="Kursywa"
          type="button"
        >
          <BsTypeItalic />
        </button>
        <button
          disabled={!isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
          }}
          className={
            toolbarItemClassName +
            " " +
            (isUnderline ? "bg-[rgba(255,_255,_255,_.1)]" : "")
          }
          title="Podkreślenie"
          type="button"
        >
          <BsTypeUnderline />
        </button>
        <Divider />
        <button
          disabled={!isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
          }}
          className={toolbarItemClassName}
          title="Text align left"
          type="button"
        >
          <AiOutlineAlignLeft />
        </button>
        <button
          disabled={!isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
          }}
          className={toolbarItemClassName}
          title="Text align center"
          type="button"
        >
          <AiOutlineAlignCenter />
        </button>
        <button
          disabled={!isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
          }}
          className={toolbarItemClassName}
          title="Text align center"
          type="button"
        >
          <AiOutlineAlignRight />
        </button>
      </>
    </div>
  );
}
