import React from "react";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  props,
  ref
) => {
  return (
    <input
      {...props}
      ref={ref}
      type={props.type || "text"}
      className="w-full px-[10px] rounded-[5px] leading-[35px] bg-[#1f1f1f] text-[12px] text-white outline-none italic placeholder:text-[grey]"
    />
  );
};

export default React.forwardRef<HTMLInputElement, InputProps>(Input);
