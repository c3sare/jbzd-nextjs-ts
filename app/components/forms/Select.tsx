import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type SelectProps<T extends FieldValues> = {
  id: Path<T>;
  register?: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  disabled?: boolean;
  children?: React.ReactNode;
  valueAsNumber?: boolean;
};

function Select<T extends FieldValues>({
  id,
  register,
  disabled,
  children,
  valueAsNumber,
}: SelectProps<T>) {
  return (
    <div className="w-full my-[5px]">
      <select
        {...register!(id, { valueAsNumber })}
        disabled={disabled}
        className="w-full bg-[#1f1f1f] px-[10px] leading-[38px] h-[38px] text-[#777]"
      >
        {children}
      </select>
    </div>
  );
}

export default Select;
