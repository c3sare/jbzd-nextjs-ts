import clsx from "clsx";
import { useState, forwardRef, useRef, useEffect } from "react";

import { FaBold } from "@react-icons/all-files/fa/FaBold";
import { FaItalic } from "@react-icons/all-files/fa/FaItalic";
import { FaQuoteRight } from "@react-icons/all-files/fa/FaQuoteRight";

import EditorButton from "@/app/(frontend)/(blog)/mikroblog/_components/layout/blogForm/components/EditorButton";
import Textarea from "../../../../layout/blogForm/components/Textarea";

const CommentTextarea: React.ForwardRefRenderFunction<HTMLTextAreaElement> = (
  {},
  ref
) => {
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    if (messageRef.current) messageRef.current.focus();
  }, [messageRef]);

  const handleSetTextFormat = (
    e: React.MouseEvent<HTMLButtonElement>,
    start: string,
    end: string
  ) => {
    e.preventDefault();
    if (messageRef.current) {
      const { value, selectionStart, selectionEnd } = messageRef.current;

      if (selectionStart === selectionEnd) return;

      const text = value.slice(selectionStart, selectionEnd);

      const textBefore = value.slice(0, selectionStart);
      const textAfter = value.slice(selectionEnd);

      const textWithFormat = start + text + end;

      messageRef.current.value = textBefore + textWithFormat + textAfter;
    }
  };

  return (
    <div className="float-left relative w-full md:w-[calc(100%_-_45px)] max-h-full transition-all ease-in-out block overflow-hidden">
      <div className="relative">
        <Textarea
          id="message"
          placeholder="Napisz coś od siebie..."
          onFocus={() => setIsExpanded(true)}
          ref={messageRef}
          className={clsx(
            "placeholder:text-zinc-500 placeholder:text-[12px] resize-none overflow-hidden ml-[5px] leading-[24px] float-none transition-all duration-200 text-[16px] bg-black p-[10px] w-full text-white outline-none",
            isExpanded ? "h-[100px]" : "h-[48px]"
          )}
        />
        {isExpanded && (
          <div className="w-[calc(100%_-_5px)] ml-[5px] relative mb-[65px] left-0 bottom-0 bg-black p-[10px]">
            <ul className="block w-full text-left">
              <EditorButton
                onClick={(e) => handleSetTextFormat(e, "***", "***")}
                icon={FaBold}
                title="Pogrubienie"
              />
              <EditorButton
                onClick={(e) => handleSetTextFormat(e, "__", "__")}
                icon={FaItalic}
                title="Pochylenie"
              />
              <EditorButton
                onClick={(e) => handleSetTextFormat(e, "```\n", "\n```")}
                icon={FaQuoteRight}
                title="Cytat"
              />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default forwardRef(CommentTextarea);
