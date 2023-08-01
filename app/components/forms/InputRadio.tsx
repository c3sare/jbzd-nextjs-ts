import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";

type InputRadioProps<T extends FieldValues> = {
  id: Path<T>;
  register: UseFormRegister<T>;
  label: string | number;
  currentValue: string | number;
  value: string | number;
  setValue: UseFormSetValue<T>;
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
}: InputRadioProps<T>) {
  return (
    <label htmlFor={id + value} className="flex items-center cursor-pointer">
      <input
        className="hidden"
        id={id + value}
        type="radio"
        {...register(id, {
          onChange: (e) =>
            setValue(
              id,
              valueAsNumber ? (Number(e.target.value) as any) : e.target.value
            ),
        })}
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
