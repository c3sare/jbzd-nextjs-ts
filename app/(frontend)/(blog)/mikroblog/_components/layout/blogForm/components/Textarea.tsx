import useZodFormContext from "@/hooks/useZodFormContext";
import { getCaretPosition } from "@/utils/getCaretPosition";
import axios from "axios";
import {
  ButtonHTMLAttributes,
  ChangeEvent,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { FieldValues, Path } from "react-hook-form";
import { Autocomplete } from "../types/Autocomplete";
import ChooseList from "./ChooseList";

const usernameRegex = /^@([A-Za-z0-9\_])\w{1,22}$/;
const tagRegex = /^#([A-Za-z0-9\_])\w{1,22}$/;

type TextareaProps<T extends FieldValues> = {
  id: Path<T>;
  placeholder: string;
  onFocus?: ButtonHTMLAttributes<HTMLTextAreaElement>["onFocus"];
  isActive?: boolean;
  className?: HTMLAttributes<HTMLTextAreaElement>["className"];
  ref?: React.Ref<HTMLTextAreaElement>;
};

const Textarea = <T extends FieldValues>({
  id,
  placeholder,
  onFocus,
  className,
  ref,
}: TextareaProps<T>) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [autocomplete, setAutocomplete] = useState<Autocomplete>(null);
  const { register } = useZodFormContext();

  useEffect(() => {
    const handleHideAutocomplete = (e: KeyboardEvent) => {
      if (!isFocused) return;
      if (e.key === "Escape") setAutocomplete(null);
    };
    if (autocomplete) {
      window.addEventListener("keydown", handleHideAutocomplete, true);
    } else {
      window.removeEventListener("keydown", handleHideAutocomplete, true);
    }

    return () =>
      window.removeEventListener("keydown", handleHideAutocomplete, true);
  }, [autocomplete, isFocused]);

  useEffect(() => {
    const scrollY = textAreaRef.current!.getBoundingClientRect().top;
    window.scrollTo(0, scrollY);
  }, []);

  const getList = (type: "user" | "tag", pharse: string) => {
    const endpoint = `/api/blog/${type}/autocomplete`;

    axios
      .post(endpoint, { pharse })
      .then((res) => res.data)
      .then((data) => {
        if (typeof data?.length === "number") {
          if (autocomplete !== null) {
            setAutocomplete((prev) => {
              if (prev !== null) {
                const newState = { ...prev };
                newState.tab = data;
                newState.type = type;

                return newState;
              }
              return prev;
            });
          }
        }
      });
  };

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { style, scrollHeight, selectionStart, selectionEnd, value } =
      e.target;

    registerReturn.onChange(e);
    style.removeProperty("height");
    style.height = scrollHeight + "px";
    if (selectionStart === selectionEnd) {
      const startingValue = value.slice(0, selectionStart);
      let val = startingValue;
      const spaceIndex =
        val.lastIndexOf(" ") === -1 ? 0 : val.lastIndexOf(" ") + 1;
      const enterIndex =
        val.lastIndexOf("\n") === -1 ? 0 : val.lastIndexOf("\n") + 1;
      val = val.slice(Math.max(spaceIndex, enterIndex));
      const indexOfAt =
        val.lastIndexOf("@") > -1 ? val.lastIndexOf("@") : undefined;
      const indexOfHash =
        val.lastIndexOf("#") > -1 ? val.lastIndexOf("#") : undefined;

      if (typeof indexOfAt === "number" || typeof indexOfHash === "number") {
        const currentMark = val.slice(indexOfAt || indexOfHash);

        const indexOfSpace = currentMark.lastIndexOf(" ");
        const indexOfEnter = currentMark.lastIndexOf("\n");

        const valIndexOfAt = startingValue.lastIndexOf("@");
        const valIndexOfHash = startingValue.lastIndexOf("#");

        if (indexOfSpace === -1 && indexOfEnter === -1) {
          if (usernameRegex.test(currentMark) || tagRegex.test(currentMark)) {
            const { x, y } = getCaretPosition(
              e.target,
              Math.max(valIndexOfAt, valIndexOfHash) + 1
            );
            if (timeout.current !== null) clearTimeout(timeout.current);
            timeout.current = null;

            const pharse = currentMark.slice(1);

            timeout.current = setTimeout(
              () =>
                getList(typeof indexOfAt === "number" ? "user" : "tag", pharse),
              300
            );

            return setAutocomplete({
              x,
              y,
              pharse,
              index: selectionStart,
              type: indexOfAt ? "user" : "tag",
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
        onFocus={(e) => {
          if (onFocus) onFocus(e);
          setIsFocused(true);
        }}
        onKeyDown={(e) => {
          if (
            autocomplete?.tab &&
            autocomplete.tab.length &&
            ["ArrowUp", "ArrowDown", "Enter"].includes(e.key)
          )
            e.preventDefault();
        }}
        className={className}
        {...registerReturn}
        onBlur={(e) => {
          registerReturn.onBlur(e);
          setIsFocused(false);
        }}
        onChange={handleOnChange}
        ref={(e) => {
          registerReturn.ref(e);
          textAreaRef.current = e;
          if (ref)
            (ref as React.MutableRefObject<HTMLTextAreaElement>).current = e!;
        }}
      />
      {!!autocomplete && autocomplete.tab && autocomplete.tab?.length > 0 && (
        <ChooseList
          isFocused={isFocused}
          autocomplete={autocomplete}
          setAutocomplete={setAutocomplete}
          textAreaRef={textAreaRef}
        />
      )}
    </>
  );
};

export default Textarea;
