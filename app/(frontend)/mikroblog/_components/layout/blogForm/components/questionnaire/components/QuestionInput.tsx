import useZodFormContext from "@/hooks/useZodFormContext";
import clsx from "clsx";
import { FieldValues, Path } from "react-hook-form";

type QuestionInputProps<T extends FieldValues> = {
  id: Path<T>;
  label: string;
  placeholder: string;
};

const QuestionInput = <T extends FieldValues>({
  id,
  label,
  placeholder,
}: QuestionInputProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useZodFormContext();

  const error = errors[id]?.message;

  const isError = Boolean(error);

  const errorClassName = error ? "border-b-[#c23d3a]" : "border-b-black";

  return (
    <div className="mb-[10px]">
      <div>
        <label className="text-[12px] block text-white mb-[10px] leading-normal font-normal">
          {label}
        </label>
        <div className="relative group">
          <input
            placeholder={placeholder}
            className={clsx(
              "placeholder:text-zinc-500 float-none leading-[48px] h-[48px] bg-black border-2 border-black p-[10px] w-full text-white focus:outline-0",
              errorClassName
            )}
            type="text"
            {...register(id)}
          />
          {isError && (
            <div
              className={
                "text-center absolute bottom-full left-1/2 -translate-x-1/2 hidden group-hover:block pb-[10px] max-w-[150px] text-[11px]"
              }
            >
              <div
                className={clsx(
                  "bg-[#c23d3a] p-2 relative",
                  "after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-l-[7px] after:border-l-transparent after:border-r-[7px] after:border-r-transparent after:border-t-[7px] after:border-t-[#c23d3a]"
                )}
              >
                {error as string}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionInput;
