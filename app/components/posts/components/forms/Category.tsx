import clsx from "clsx";
import { FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";

type CategoryProps = {
  name: string;
  slug: string;
  fieldName: string;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
};

const Category: React.FC<CategoryProps> = ({
  name,
  slug,
  fieldName,
  register,
  watch,
}) => {
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
};

export default Category;
