import { FieldValues, Path } from "react-hook-form";
import useZodFormContext from "@/hooks/useZodFormContext";

type SelectProps<T extends FieldValues> = {
  id: Path<T>;
  children?: React.ReactNode;
  valueAsNumber?: boolean;
};

function Select<T extends FieldValues>({
  id,
  children,
  valueAsNumber,
}: SelectProps<T>) {
  const {
    register,
    formState: { isLoading: disabled },
  } = useZodFormContext<T>();

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
