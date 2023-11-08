import clsx from "clsx";
import { useState } from "react";

const CommentTextarea = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <div className="float-left relative w-[calc(100%_-_45px)] max-h-full transition-all ease-in-out block overflow-hidden">
      <div className="relative">
        <textarea
          placeholder="Napisz coś od siebie..."
          onFocus={() => setIsExpanded(true)}
          className={clsx(
            "placeholder:text-zinc-500 placeholder:text-[12px] resize-none overflow-hidden ml-[5px] leading-[24px] float-none transition-all duration-200 text-[16px] bg-black p-[10px] w-full text-white",
            isExpanded ? "h-[100px]" : "h-[48px]"
          )}
        />
      </div>
    </div>
  );
};

export default CommentTextarea;
