import useZodFormContext from "@/hooks/useZodFormContext";
import clsx from "clsx";
import {
  ButtonHTMLAttributes,
  ForwardedRef,
  MutableRefObject,
  forwardRef,
} from "react";
import { FieldValues, Path } from "react-hook-form";

type TextareaProps<T extends FieldValues> = {
  id: Path<T>;
  placeholder: string;
  onFocus?: ButtonHTMLAttributes<HTMLTextAreaElement>["onFocus"];
  isActive?: boolean;
};

const Textarea = <T extends FieldValues>(
  { id, placeholder, onFocus, isActive }: TextareaProps<T>,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  const { register } = useZodFormContext();

  const registerReturn = register(id);

  return (
    <textarea
      placeholder={placeholder}
      onFocus={onFocus}
      className={clsx(
        "mb-[-3px] float-none bg-black p-[10px] w-full text-white",
        "resize-none overflow-hidden leading-[24px] text-[18px]",
        "placeholder:text-zinc-500 outline-none",
        isActive ? "h-[100px]" : "h-[48px]",
        "border-l-2",
        isActive ? "border-l-black" : "border-l-[#94b424]"
      )}
      {...registerReturn}
      ref={(e) => {
        registerReturn.ref(e);
        if (ref) (ref as MutableRefObject<HTMLTextAreaElement>).current = e!;
      }}
    />
  );
};

export default forwardRef(Textarea);
