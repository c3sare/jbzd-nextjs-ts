import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import InputRadio from "./InputRadio";

type RadioSelectProps<T extends FieldValues> = {
  watch: UseFormWatch<T>;
  register: UseFormRegister<T>;
  label: string;
  id: Path<T>;
  options: {
    value: string | number;
    label: string | number;
  }[];
  setValue: UseFormSetValue<T>;
  valueAsNumber?: boolean;
};

function RadioSelect<T extends FieldValues>({
  register,
  label,
  id,
  options,
  setValue,
  watch,
  valueAsNumber,
}: RadioSelectProps<T>) {
  const currentValue = watch(id);
  console.log(currentValue);

  return (
    <div className="mb-[25px]">
      <span>{label}</span>
      <div className="flex gap-4 my-1">
        {options.map((option) => (
          <InputRadio<T>
            currentValue={currentValue}
            key={option.value}
            id={id}
            register={register}
            label={option.label}
            value={option.value}
            setValue={setValue}
            valueAsNumber
          />
        ))}
      </div>
    </div>
  );
}

export default RadioSelect;
