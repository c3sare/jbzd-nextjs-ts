import { DOMAttributes } from "react";
import { FieldValues, Path } from "react-hook-form";
import { ImCross } from "react-icons/im";

type TagProps<T extends FieldValues> = {
  name: string;
  onDelete: DOMAttributes<HTMLButtonElement>["onClick"];
  fieldName: Path<T>;
};

function Tag<T extends FieldValues>({
  name,
  onDelete,
  fieldName,
}: TagProps<T>) {
  return (
    <li
      className="bg-[#1f1f1f] rounded-[3px] text-white h-[35px] flex items-center p-[3px_5px] m-[2px]"
      id={fieldName}
    >
      <span className="border-r border-[#2f2f2f] pr-2">#{name}</span>
      <button className="text-[10px] mx-1" onClick={onDelete}>
        <ImCross />
      </button>
    </li>
  );
}

export default Tag;
