import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

type TextSwitchButtonProps<T extends FieldValues> = {
  text: string;
  activeText: string;
  watch: UseFormWatch<T>;
  id: Path<T>;
  register: UseFormRegister<T>;
};

function TextSwitchButton<T extends FieldValues>({
  text,
  activeText,
  watch,
  id,
  register,
}: TextSwitchButtonProps<T>) {
  const isActive = watch(id);

  return (
    <label
      htmlFor={id}
      className="underline text-[#929292] text-[12px] cursor-pointer"
    >
      <span>{isActive ? activeText : text}</span>
      <input id={id} className="hidden" type="checkbox" {...register(id)} />
    </label>
  );
}

export default TextSwitchButton;
