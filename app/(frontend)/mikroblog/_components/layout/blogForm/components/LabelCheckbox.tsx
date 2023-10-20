import useZodFormContext from "@/hooks/useZodFormContext";
import { FieldValues, Path } from "react-hook-form";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import clsx from "clsx";

type LabelCheckboxProps<T extends FieldValues> = {
  id: Path<T>;
  label: string;
};

const LabelCheckbox = <T extends FieldValues>({
  id,
  label,
}: LabelCheckboxProps<T>) => {
  const { register, watch } = useZodFormContext();

  const checked = watch(id);

  return (
    <label
      htmlFor={id}
      className="flex items-center font-bold text-[18px] cursor-pointer disabled:cursor-default"
    >
      {label}
      <span
        className={clsx(
          "flex items-center justify-center w-[23px] h-[23px] bg-black ml-[5px] relative border rounded-[2px]",
          checked ? "border-[#c23d3a]" : "border-[#6e7578]"
        )}
      >
        {checked && <FaCheck size={14} />}
      </span>
      <input className="hidden" id={id} type="checkbox" {...register(id)} />
    </label>
  );
};

export default LabelCheckbox;
