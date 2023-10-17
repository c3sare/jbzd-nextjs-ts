import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type SearchInputProps = {
  label: string;
  id: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  errors: FieldErrors<FieldValues>;
};

const SearchInput: React.FC<SearchInputProps> = ({
  register,
  required,
  id,
  errors,
  label,
}) => {
  return (
    <input
      id={id}
      type="text"
      placeholder="Wpisz szukaną wartość"
      className={clsx(
        `max-w-[700px]
        w-full
        h-[40px]
        rounded-[5px]
        pl-[15px]
        text-[15px]
        outline-none
        border
        border-transparent
        text-black`,
        errors[id] ? "border-[#c03e3e]" : null
      )}
      {...register(id, {
        required: required ? `Pole ${label} jest wymagane!` : false,
        minLength: {
          value: 3,
          message: "Minimalna długość szukanej frazy to 3!",
        },
      })}
    />
  );
};

export default SearchInput;
