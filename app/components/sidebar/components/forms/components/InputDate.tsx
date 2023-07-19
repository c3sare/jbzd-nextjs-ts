"use client";

import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";
registerLocale("pl", pl);

type InputDateProps = {
  register: UseFormRegister<FieldValues>;
  id: string;
  required?: boolean;
  errors: FieldErrors<FieldValues>;
  placeholder?: string;
  disabled?: boolean;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
};

const InputDate: React.FC<InputDateProps> = ({
  register,
  id,
  required,
  errors,
  placeholder,
  disabled,
  watch,
  setValue,
}) => {
  const { onBlur, ref, name } = register(id, { required });

  const currentValue = watch(id);

  return (
    <div
      className={clsx(
        "group flex justify-between my-[5px] items-center flex-wrap text-[13px] relative",
        disabled && "opacity-80"
      )}
    >
      <DatePicker
        disabled={disabled}
        ref={ref}
        name={name}
        placeholderText={placeholder}
        locale="pl"
        selected={currentValue}
        onBlur={onBlur}
        onChange={(date) => setValue(id, date)}
        wrapperClassName="w-full"
        showPopperArrow={false}
        dateFormat="yyyy-MM-dd"
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
    </div>
  );
};

export default InputDate;
