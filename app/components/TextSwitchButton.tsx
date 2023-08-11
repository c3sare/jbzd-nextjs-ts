import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

type TextSwitchButtonProps = {
  text: string;
  activeText: string;
  watch: UseFormWatch<FieldValues>;
  id: Path<FieldValues>;
  register: UseFormRegister<FieldValues>;
};

const TextSwitchButton: React.FC<TextSwitchButtonProps> = ({
  text,
  activeText,
  watch,
  id,
  register,
}) => {
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
};

export default TextSwitchButton;
