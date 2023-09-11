import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type TextareaProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  id: Path<T>;
  defaultValue?: string;
};

export default function Textarea<T extends FieldValues>({
  register,
  id,
  defaultValue = "",
}: TextareaProps<T>) {
  const { onChange, ...registerTextareaReturn } = register(id);

  return (
    <textarea
      style={{ height: "40px" }}
      className="resize-none bg-[#1f1f1f] inline-block leading-[17px] text-white px-[10px] border border-[#1f1f1f] mx-[2px] pt-[5px] flex-[1] min-h-[42px] max-h-none outline-none overflow-hidden"
      placeholder="Wpisz swój komentarz"
      defaultValue={defaultValue}
      onChange={(e) => {
        onChange(e);
        e.target.style.removeProperty("height");
        e.target.style.height = e.target.scrollHeight + 5 + "px";
      }}
      {...registerTextareaReturn}
    />
  );
}
