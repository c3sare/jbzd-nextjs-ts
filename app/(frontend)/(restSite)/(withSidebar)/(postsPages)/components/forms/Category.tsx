import type {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

import clsx from "clsx";
import useZodFormContext from "@/hooks/useZodFormContext";

type CategoryProps<T extends FieldValues> = {
  name: string;
  slug: string;
  fieldName: Path<T>;
};

function Category<T extends FieldValues>({
  name,
  slug,
  fieldName,
}: CategoryProps<T>) {
  const { register, watch } = useZodFormContext();
  const currentValue = watch(fieldName);

  const isCurrentCategory = slug === currentValue;

  return (
    <label
      htmlFor={slug}
      className={clsx(
        "text-white p-[3px_9px] rounded-[3px] inline-block text-[12px] cursor-pointer",
        isCurrentCategory ? "bg-[#c03e3e]" : "bg-[#505050]"
      )}
    >
      <span>{name}</span>
      <input
        id={slug}
        className="hidden"
        type="radio"
        value={slug}
        {...register(fieldName)}
      />
    </label>
  );
}

export default Category;
