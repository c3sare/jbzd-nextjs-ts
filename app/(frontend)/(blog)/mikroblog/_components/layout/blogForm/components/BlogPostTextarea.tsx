import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
import { FieldValues, Path } from "react-hook-form";
import Textarea from "./Textarea";

type TextareaProps<T extends FieldValues> = {
  id: Path<T>;
  placeholder: string;
  onFocus?: ButtonHTMLAttributes<HTMLTextAreaElement>["onFocus"];
  isActive?: boolean;
  ref?: React.Ref<HTMLTextAreaElement>;
};

const BlogPostTextarea = <T extends FieldValues>({
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
          "mb-[-3px] float-none bg-black p-[10px] w-full text-white",
          "resize-none overflow-hidden leading-[24px] text-[18px]",
          "placeholder:text-zinc-500 outline-hidden",
          isActive ? "h-[100px]" : "h-[48px]",
          "border-l-2",
          isActive ? "border-l-black" : "border-l-[#94b424]"
        )}
      />
    </div>
  );
};

export default BlogPostTextarea;
