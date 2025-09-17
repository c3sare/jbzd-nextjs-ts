"use client";

import clsx from "clsx";
import { FieldValues, Path } from "react-hook-form";
import ErrorInputBox from "./ErrorInputBox";
import useZodFormContext from "@/hooks/useZodFormContext";

type CheckboxProps<T extends FieldValues> = {
  id: Path<T>;
  children?: React.ReactNode;
};

function Checkbox<T extends FieldValues>({ id, children }: CheckboxProps<T>) {
  const {
    formState: { errors, isLoading: disabled },
    register,
  } = useZodFormContext();

  return (
    <label
      className={clsx(
        "group relative w-full flex gap-[10px] items-center border",
        errors![id] ? "border-red-600" : "border-transparent",
        disabled && "opacity-80"
      )}
    >
      <input type="checkbox" disabled={disabled} {...register!(id)} />
      <span className="text-[#777] w-full text-right">{children}</span>
      {errors![id] && (
        <ErrorInputBox>
          {(errors![id]?.message as string) || "Musisz zaakceptować!"}
        </ErrorInputBox>
      )}
    </label>
  );
}

export default Checkbox;
