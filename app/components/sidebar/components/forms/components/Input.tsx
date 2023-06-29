"use client";

import clsx from "clsx";
import {
  FieldErrors,
  FieldValue,
  FieldValues,
  UseFormRegister,
  Validate,
} from "react-hook-form";
import ErrorInputBox from "./ErrorInputBox";

type InputProps = {
  register: UseFormRegister<FieldValues>;
  id: string;
  required?: boolean;
  errors: FieldErrors<FieldValues>;
  placeholder?: string;
  disabled?: boolean;
  pattern?: {
    value: RegExp;
    message: string;
  };
  validate?: Validate<FieldValue<FieldValues>, any>;
  type?: "password" | "text" | "number";
};

const Input: React.FC<InputProps> = ({
  register,
  id,
  errors,
  required,
  placeholder,
  disabled,
  type,
  validate,
  pattern,
}) => {
  return (
    <div
      className={clsx(
        "group flex justify-between my-[5px] items-center flex-wrap text-[13px] relative",
        disabled && "opacity-80"
      )}
    >
      <input
        type={type || "text"}
        {...register(id, { required, pattern, validate })}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          `
            block
            bg-[#1f1f1f]
            outline-none
            text-[#777]
            p-[12px_10px]
            border
            ${errors[id] ? "border border-red-600" : "border-transparent"}
            w-full
            placeholder:text-[#777]
            leading-none
          `
        )}
      />
      {errors[id] && (
        <ErrorInputBox>
          {(errors[id]?.message as string) || "To pole jest wymagane!"}
        </ErrorInputBox>
      )}
    </div>
  );
};

export default Input;
