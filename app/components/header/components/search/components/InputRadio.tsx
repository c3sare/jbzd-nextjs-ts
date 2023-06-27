import { useRef } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type InputRadioProps = {
  label: string;
  id: string;
  register: UseFormRegister<FieldValues>;
  value: string;
};

const InputRadio: React.FC<InputRadioProps> = ({
  label,
  id,
  register,
  value,
}) => {
  const refRadio = useRef<HTMLInputElement>(null);

  return (
    <div
      className="flex flex-row items-center cursor-pointer"
      onClick={() => refRadio.current?.click()}
    >
      <input
        type="radio"
        {...register(id)}
        value={value}
        ref={refRadio}
        className="mr-[5px] w-[15px] h-[15px] bg-transparent border border-[#a4a7aa] rounded-full appearance-none checked:bg-[#a4a7aa] checked:shadow-[inset_0_0_0_3px_#080808] cursor-pointer"
      />
      <label className="mr-[15px] cursor-pointer">{label}</label>
    </div>
  );
};

export default InputRadio;
