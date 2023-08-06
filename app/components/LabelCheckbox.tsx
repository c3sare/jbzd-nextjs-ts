import clsx from "clsx";
import { HTMLAttributes } from "react";
import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { IoMdCheckboxOutline, IoMdSquareOutline } from "react-icons/io";

type LabelCheckboxProps<T extends FieldValues> = {
  id: Path<T>;
  register?: UseFormRegister<T>;
  label: string;
  watch?: UseFormWatch<T>;
  disabled?: boolean;
  className?: HTMLAttributes<HTMLLabelElement>["className"];
  variant?: "primary" | "secondary";
};

function LabelCheckbox<T extends FieldValues>({
  id,
  register,
  label,
  watch,
  disabled,
  className = "mb-[25px]",
  variant = "primary",
}: LabelCheckboxProps<T>) {
  const isChecked = watch!(id);

  const color = {
    primary: "text-[#b4d132]",
    secondary: "text-[#a4a7aa]",
  };

  return (
    <label
      htmlFor={id}
      className={clsx(
        "flex items-center cursor-pointer select-none text-[14px]",
        className,
        disabled && "opacity-60"
      )}
    >
      <input
        id={id}
        className="hidden"
        disabled={disabled}
        type="checkbox"
        {...register!(id)}
      />
      <span className={clsx("mr-[5px] text-[20px]", color[variant])}>
        {isChecked ? <IoMdCheckboxOutline /> : <IoMdSquareOutline />}
      </span>
      <span>{label}</span>
    </label>
  );
}

export default LabelCheckbox;
