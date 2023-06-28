import { FieldValues, UseFormRegister } from "react-hook-form";

type InputRadioProps = {
  label: string;
  id: string;
  register: UseFormRegister<FieldValues>;
  value: string;
  defaultChecked?: boolean;
};

const InputRadio: React.FC<InputRadioProps> = ({
  label,
  id,
  register,
  value,
  defaultChecked,
}) => {
  return (
    <label className="flex flex-row items-center mr-[15px] cursor-pointer">
      <input
        type="radio"
        value={value}
        defaultChecked={defaultChecked || false}
        {...register(id)}
        className="peer mr-[5px] w-[15px] h-[15px] bg-transparent border border-[#a4a7aa] rounded-full appearance-none checked:bg-[#a4a7aa] checked:shadow-[inset_0_0_0_3px_#080808] cursor-pointer"
      />
      <span className="text-[#a4a7aa] peer-checked:text-white">{label}</span>
    </label>
  );
};

export default InputRadio;
