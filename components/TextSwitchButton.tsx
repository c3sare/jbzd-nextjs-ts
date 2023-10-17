import useZodFormContext from "@/hooks/useZodFormContext";
import { FieldValues, Path } from "react-hook-form";

type TextSwitchButtonProps<T extends FieldValues> = {
  text: string;
  activeText: string;
  id: Path<T>;
};

function TextSwitchButton<T extends FieldValues>({
  text,
  activeText,
  id,
}: TextSwitchButtonProps<T>) {
  const { watch, register } = useZodFormContext<T>();
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
