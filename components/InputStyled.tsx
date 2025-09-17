import React from "react";

type InputStyledProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "className"
>;

const InputStyled = (props: InputStyledProps) => {
  return (
    <input
      {...props}
      className="block bg-[#1f1f1f] outline-none text-[#777] p-[12px_10px] w-full placeholder:text-[#777] leading-none border border-transparent disabled:opacity-80"
    />
  );
};

export default InputStyled;
