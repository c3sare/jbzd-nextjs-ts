"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import ErrorInputBox from "./ErrorInputBox";

type CheckboxProps = {
  id: string;
  children?: React.ReactNode;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  required?: boolean;
  disabled?: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  children,
  register,
  errors,
  required,
  disabled,
}) => {
  return (
    <label
      className={clsx(
        "group relative w-full flex gap-[10px] items-center border",
        errors[id] ? "border-red-600" : "border-transparent",
        disabled && "opacity-80"
      )}
    >
      <input
        type="checkbox"
        disabled={disabled}
        {...register(id, { required })}
      />
      <span className="text-[#777] w-full text-right">{children}</span>
      {errors[id] && (
        <ErrorInputBox>
          {(errors[id]?.message as string) || "Musisz zaakceptować!"}
        </ErrorInputBox>
      )}
    </label>
  );
};

export default Checkbox;
