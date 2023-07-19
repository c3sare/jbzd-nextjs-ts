import { FieldValues, UseFormRegister } from "react-hook-form";

type SelectProps = {
  id: string;
  register: UseFormRegister<FieldValues>;
  disabled?: boolean;
  options: {
    label: string;
    value: string | number;
  }[];
};

const Select: React.FC<SelectProps> = ({ id, register, disabled, options }) => {
  return (
    <div className="w-full my-[5px]">
      <select
        {...register(id)}
        disabled={disabled}
        className="w-full bg-[#1f1f1f] px-[10px] leading-[38px] h-[38px] text-[#777]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
