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
};

function LabelCheckbox<T extends FieldValues>({
  id,
  register,
  label,
  watch,
}: LabelCheckboxProps<T>) {
  const isChecked = watch!(id);

  return (
    <label
      htmlFor={id}
      className="flex items-center cursor-pointer select-none mb-[25px] text-[14px]"
    >
      <input id={id} className="hidden" type="checkbox" {...register!(id)} />
      <span className="text-[#b4d132] mr-[5px] text-[20px]">
        {isChecked ? <IoMdCheckboxOutline /> : <IoMdSquareOutline />}
      </span>
      <span>{label}</span>
    </label>
  );
}

export default LabelCheckbox;
