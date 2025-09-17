import { FieldValues, Path } from "react-hook-form";
import InputRadio from "./InputRadio";
import clsx from "clsx";
import useZodFormContext from "@/hooks/useZodFormContext";

type RadioSelectProps<T extends FieldValues> = {
  label: string;
  id: Path<T>;
  options: {
    value: string | number;
    label: string | number;
  }[];
  valueAsNumber?: boolean;
};

function RadioSelect<T extends FieldValues>({
  label,
  id,
  options,
  valueAsNumber,
}: RadioSelectProps<T>) {
  const {
    register,
    watch,
    setValue,
    formState: { isLoading: disabled },
  } = useZodFormContext<T>();
  const currentValue = watch(id);

  return (
    <div className="mb-[25px]">
      <span className={clsx(disabled && "opacity-60")}>{label}</span>
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
            disabled={disabled}
            valueAsNumber={valueAsNumber}
          />
        ))}
      </div>
    </div>
  );
}

export default RadioSelect;
