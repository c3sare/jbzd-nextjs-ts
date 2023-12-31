import React from "react";

type InputStyledProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "className" | "ref"
>;

const InputStyled = React.forwardRef<HTMLInputElement, InputStyledProps>(
  (props, ref) => {
    return (
      <input
        {...props}
        className="block bg-[#1f1f1f] outline-none text-[#777] p-[12px_10px] w-full placeholder:text-[#777] leading-none border border-transparent disabled:opacity-80"
        ref={ref}
      />
    );
  }
);

InputStyled.displayName = "InputStyled";

export default InputStyled;
