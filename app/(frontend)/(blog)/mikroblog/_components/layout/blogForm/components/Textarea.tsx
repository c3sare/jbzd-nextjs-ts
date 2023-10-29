import useZodFormContext from "@/hooks/useZodFormContext";
import { getCaretPosition } from "@/utils/getCaretPosition";
import clsx from "clsx";
import {
  ButtonHTMLAttributes,
  ChangeEvent,
  ForwardedRef,
  MutableRefObject,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { FieldValues, Path } from "react-hook-form";

const usernameRegex = /(@[A-Za-z0-9\-\_])\w+/g;

type TextareaProps<T extends FieldValues> = {
  id: Path<T>;
  placeholder: string;
  onFocus?: ButtonHTMLAttributes<HTMLTextAreaElement>["onFocus"];
  isActive?: boolean;
};

type Autocomplete =
  | {
      x: number;
      y: number;
      pharse: string;
      type: "users";
      tab?: { id: string; username: string }[];
    }
  | {
      x: number;
      y: number;
      pharse: string;
      type: "tags";
      tab?: {
        id: string;
        name: string;
      }[];
    };

const Textarea = <T extends FieldValues>(
  { id, placeholder, onFocus, isActive }: TextareaProps<T>,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  const [autocomplete, setAutocomplete] = useState<Autocomplete | null>(null);
  const { register } = useZodFormContext();

  useEffect(() => {
    const handleHideAutocomplete = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAutocomplete(null);
    };
    if (autocomplete) {
      window.addEventListener("keydown", handleHideAutocomplete, true);
    } else {
      window.removeEventListener("keydown", handleHideAutocomplete, true);
    }

    return () =>
      window.removeEventListener("keydown", handleHideAutocomplete, true);
  }, [autocomplete]);

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { style, scrollHeight, selectionStart, selectionEnd, value } =
      e.target;

    registerReturn.onChange(e);
    style.removeProperty("height");
    style.height = scrollHeight + "px";
    if (selectionStart === selectionEnd) {
      const val = value.slice(0, selectionStart);
      const indexOfAt =
        val.lastIndexOf("@") > -1 ? val.lastIndexOf("@") : undefined;
      const indexOfHash =
        val.lastIndexOf("#") > -1 ? val.lastIndexOf("#") : undefined;

      if (indexOfAt || indexOfHash) {
        const currentMark = val.slice(indexOfAt || indexOfHash);

        const indexOfSpace = currentMark.lastIndexOf(" ");
        const indexOfEnter = currentMark.lastIndexOf("\n");

        if (indexOfSpace === -1 && indexOfEnter === -1) {
          if (usernameRegex.test(currentMark)) {
            const { x, y } = getCaretPosition(
              e.target,
              indexOfAt! || indexOfHash!
            );
            return setAutocomplete({
              x,
              y,
              pharse: currentMark.slice(1),
              type: indexOfAt ? "users" : "tags",
            });
          }
        }
      }
    }
    setAutocomplete(null);
  };

  const registerReturn = register(id);

  return (
    <>
      <textarea
        placeholder={placeholder}
        onFocus={onFocus}
        className={clsx(
          "mb-[-3px] float-none bg-black p-[10px] w-full text-white",
          "resize-none overflow-hidden leading-[24px] text-[18px]",
          "placeholder:text-zinc-500 outline-none",
          isActive ? "h-[100px]" : "h-[48px]",
          "border-l-2",
          isActive ? "border-l-black" : "border-l-[#94b424]"
        )}
        {...registerReturn}
        onChange={handleOnChange}
        ref={(e) => {
          registerReturn.ref(e);
          if (ref) (ref as MutableRefObject<HTMLTextAreaElement>).current = e!;
        }}
      />
      {!!autocomplete && autocomplete.tab && autocomplete.tab?.length > 0 && (
        <div
          className="text-white absolute bg-[#4a4a4a] text-[12px] min-w-[140px] max-w-[180px] max-h-[200px] overflow-y-auto z-[999]"
          style={{
            top: autocomplete.y + 40 + "px",
            left: autocomplete.x + 20 + "px",
          }}
        >
          <ul>
            {[...Array(10)].map((_i, i) => (
              <li
                className="border-b border-b-[#313131] cursor-pointer box-border h-[27px] p-[0_12px] whitespace-nowrap flex items-center"
                key={i}
              >
                {autocomplete.pharse}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default forwardRef(Textarea);
