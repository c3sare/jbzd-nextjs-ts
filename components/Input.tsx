"use client";

import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";
import { FieldValues, Path, PathValue } from "react-hook-form";
import ErrorInputBox from "./ErrorInputBox";
import { formatISO, parseISO } from "date-fns";
import pl from "date-fns/locale/pl";
import DatePicker, { registerLocale } from "react-datepicker";
import { useMemo } from "react";
import useZodFormContext from "@/hooks/useZodFormContext";
registerLocale("pl", pl);

interface InputProps<T extends FieldValues> {
  id: Path<T>;
  placeholder?: string;
  hidden?: boolean;
  type?: "password" | "text" | "number" | "date" | "textarea";
  disabled?: boolean;
}

function Input<T extends FieldValues>({
  id,
  placeholder,
  hidden,
  type,
  disabled: disabledCustom,
}: InputProps<T>) {
  const {
    register,
    watch,
    formState: { errors, isLoading: disabled },
    setValue,
  } = useZodFormContext<T>();

  const registerReturn = register!(id);

  const currentValue = watch(id);

  const inputClassNames = clsx(
    `
    block
    bg-[#1f1f1f]
    outline-hidden
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
        disabled={disabledCustom || disabled}
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
      disabledCustom,
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
        disabled={disabledCustom || disabled}
        className={inputClassNames}
      />
    ),
    [
      disabled,
      disabledCustom,
      inputClassNames,
      placeholder,
      registerReturn,
      type,
    ]
  );

  const textareaInput = useMemo(
    () => (
      <textarea
        style={{ height: "200px" }}
        {...registerReturn}
        placeholder={placeholder}
        disabled={disabledCustom || disabled}
        className={inputClassNames}
      />
    ),
    [disabled, disabledCustom, inputClassNames, placeholder, registerReturn]
  );

  const input = useMemo(() => {
    switch (type) {
      case "date":
        return dataPicker;
      case "textarea":
        return textareaInput;
      default:
        return textInput;
    }
  }, [type, dataPicker, textInput, textareaInput]);

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
