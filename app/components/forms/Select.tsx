import { FieldValues, UseFormRegister } from "react-hook-form";

type SelectProps = {
  id: string;
  register: UseFormRegister<FieldValues>;
  disabled?: boolean;
  children?: React.ReactNode;
  valueAsNumber?: boolean;
};

const Select: React.FC<SelectProps> = ({
  id,
  register,
  disabled,
  children,
  valueAsNumber,
}) => {
  return (
    <div className="w-full my-[5px]">
      <select
        {...register(id, { valueAsNumber })}
        disabled={disabled}
        className="w-full bg-[#1f1f1f] px-[10px] leading-[38px] h-[38px] text-[#777]"
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
