import { FieldValues, UseFormRegister } from "react-hook-form";

type SelectRadioProps = {
  name: string;
  values: {
    label: string;
    value: string;
    default?: boolean;
  }[];
  register: UseFormRegister<FieldValues>;
};

const SelectRadio: React.FC<SelectRadioProps> = ({
  name,
  values,
  register,
}) => {
  const registerReturn = register(name);

  return (
    <div className="flex flex-row">
      {values.map((item) => (
        <label
          key={item.value}
          className="flex flex-row items-center mr-[15px] cursor-pointer"
        >
          <input
            type="radio"
            value={item.value}
            {...registerReturn}
            className="peer mr-[5px] w-[15px] h-[15px] bg-transparent border border-[#a4a7aa] rounded-full appearance-none checked:bg-[#a4a7aa] checked:shadow-[inset_0_0_0_3px_#080808] cursor-pointer"
          />
          <span className="text-[#a4a7aa] peer-checked:text-white">
            {item.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default SelectRadio;
