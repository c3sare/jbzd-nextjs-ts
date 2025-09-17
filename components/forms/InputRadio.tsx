import clsx from "clsx";
import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import { RiCheckboxBlankCircleLine } from "@react-icons/all-files/ri/RiCheckboxBlankCircleLine";
import { RiCheckboxCircleFill } from "@react-icons/all-files/ri/RiCheckboxCircleFill";

type InputRadioProps<T extends FieldValues> = {
  id: Path<T>;
  register: UseFormRegister<T>;
  label: string | number;
  currentValue: string | number;
  value: string | number;
  setValue: UseFormSetValue<T>;
  disabled?: boolean;
  valueAsNumber?: boolean;
};

function InputRadio<T extends FieldValues>({
  id,
  register,
  label,
  currentValue,
  value,
  valueAsNumber,
  setValue,
  disabled,
}: InputRadioProps<T>) {
  return (
    <label
      htmlFor={id + value}
      className={clsx(
        "flex items-center cursor-pointer",
        disabled && "opacity-60"
      )}
    >
      <input
        className="hidden"
        id={id + value}
        type="radio"
        {...register(id, {
          onChange: (e) =>
            setValue(
              id,
              valueAsNumber ? Number(e.target.value) : e.target.value
            ),
        })}
        disabled={disabled}
        value={value}
      />
      <span className="text-[20px] text-[#b4d132]">
        {String(currentValue) === String(value) ? (
          <RiCheckboxCircleFill />
        ) : (
          <RiCheckboxBlankCircleLine />
        )}
      </span>
      <span className="ml-1 text-[16px]">{label}</span>
    </label>
  );
}

export default InputRadio;
