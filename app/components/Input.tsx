"use client";

import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";
import {
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import ErrorInputBox from "./ErrorInputBox";
import { formatISO, parseISO } from "date-fns";
import pl from "date-fns/locale/pl";
import DatePicker, { registerLocale } from "react-datepicker";
import { useMemo } from "react";
registerLocale("pl", pl);

interface InputProps<T extends FieldValues> {
  register?: UseFormRegister<T>;
  id: Path<T>;
  required?: boolean;
  errors?: FieldErrors<T>;
  placeholder?: string;
  hidden?: boolean;
  disabled?: boolean;
  type?: "password" | "text" | "number" | "date";
  watch?: UseFormWatch<T>;
  setValue?: UseFormSetValue<T>;
}

function Input<T extends FieldValues>({
  register,
  id,
  errors,
  placeholder,
  disabled,
  hidden,
  type,
  setValue,
  watch,
}: InputProps<T>) {
  const registerReturn = register!(id);

  const currentValue = watch ? watch(id) : null;

  const inputClassNames = clsx(
    `
    block
    bg-[#1f1f1f]
    outline-none
    text-[#777]
    p-[12px_10px]
    border
    w-full
    placeholder:text-[#777]
    leading-none
    border
  `,
    errors![id] ? "border-red-600" : "border-transparent",
    hidden && "hidden"
  );

  const dataPicker = useMemo(
    () => (
      <DatePicker
        disabled={disabled}
        ref={registerReturn.ref}
        name={registerReturn.name}
        placeholderText={placeholder}
        locale="pl"
        selected={currentValue ? parseISO(currentValue) : null}
        onBlur={registerReturn.onBlur}
        onChange={(date) =>
          setValue!(
            id,
            (date ? formatISO(date) : null) as PathValue<T, Path<T>>
          )
        }
        wrapperClassName="w-full"
        showPopperArrow={false}
        dateFormat="yyyy-MM-dd"
        className={inputClassNames}
      />
    ),
    [
      registerReturn,
      inputClassNames,
      currentValue,
      disabled,
      id,
      placeholder,
      setValue,
    ]
  );

  const textInput = useMemo(
    () => (
      <input
        type={type || "text"}
        {...registerReturn}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClassNames}
      />
    ),
    [disabled, inputClassNames, placeholder, registerReturn, type]
  );

  const input = useMemo(
    () => (type === "date" ? dataPicker : textInput),
    [type, dataPicker, textInput]
  );

  return (
    <div
      className={clsx(
        "group flex justify-between my-[5px] items-center flex-wrap text-[13px] relative max-w-full",
        disabled && "opacity-80"
      )}
    >
      {input}
      {errors![id] && (
        <ErrorInputBox>
          {(errors![id]?.message as string) || "To pole jest wymagane!"}
        </ErrorInputBox>
      )}
    </div>
  );
}

export default Input;
