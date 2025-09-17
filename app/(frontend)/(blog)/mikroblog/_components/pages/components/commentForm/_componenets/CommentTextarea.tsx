import clsx from "clsx";

import { FieldValues, Path } from "react-hook-form";

import { ButtonHTMLAttributes } from "react";
import Textarea from "../../../../layout/blogForm/components/Textarea";

type TextareaProps<T extends FieldValues> = {
  id: Path<T>;
  placeholder: string;
  onFocus?: ButtonHTMLAttributes<HTMLTextAreaElement>["onFocus"];
  isActive?: boolean;
  ref?: React.Ref<HTMLTextAreaElement>;
};

const CommentTextarea = <T extends FieldValues>({
  id,
  placeholder,
  onFocus,
  isActive,
  ref,
}: TextareaProps<T>) => {
  return (
    <div className="w-full relative">
      <Textarea
        id={id}
        placeholder={placeholder}
        onFocus={onFocus}
        ref={ref}
        className={clsx(
          "placeholder:text-zinc-500 placeholder:text-[12px] resize-none overflow-hidden ml-[5px] leading-[24px] float-none transition-all duration-200 text-[16px] bg-black p-[10px] w-full text-white outline-hidden",
          isActive ? "h-[100px]" : "h-[48px]"
        )}
      />
    </div>
  );
};

export default CommentTextarea;
