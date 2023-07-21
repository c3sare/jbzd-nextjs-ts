"use client";

import clsx from "clsx";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import ErrorInputBox from "./ErrorInputBox";

type CheckboxProps<T extends FieldValues> = {
  id: Path<T>;
  children?: React.ReactNode;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  required?: boolean;
  disabled?: boolean;
};

function Checkbox<T extends FieldValues>({
  id,
  children,
  register,
  errors,
  required,
  disabled,
}: CheckboxProps<T>) {
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
}

export default Checkbox;
