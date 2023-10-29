import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Autocomplete } from "../types/Autocomplete";
import clsx from "clsx";

type ChooseListProps = {
  autocomplete: Autocomplete;
  setAutocomplete: Dispatch<SetStateAction<Autocomplete>>;
  textAreaRef: MutableRefObject<HTMLTextAreaElement | null>;
  isFocused: boolean;
};

const ChooseList: React.FC<ChooseListProps> = ({
  autocomplete,
  textAreaRef,
  setAutocomplete,
  isFocused,
}) => {
  const [currentOption, setCurrentOption] = useState<number>(0);

  const handleSelectOption = useCallback(
    (item: { id: string; username: string }) => {
      if (textAreaRef.current) {
        const beforeText = textAreaRef.current.value.slice(
          0,
          autocomplete!.index
        );
        const afterText = textAreaRef.current.value.slice(autocomplete!.index);
        const searchVal = "@" + autocomplete!.pharse;
        const replaceToVal = "@[" + item.username + "]";
        const replaceVal = beforeText
          .split(" ")
          .reverse()
          .join(" ")
          .replace(searchVal, replaceToVal)
          .split(" ")
          .reverse()
          .join(" ");
        textAreaRef.current.value = replaceVal + afterText;

        setAutocomplete(null);
      }
    },
    [autocomplete, textAreaRef, setAutocomplete]
  );

  useEffect(() => {
    const handleArrowNavigation = (e: KeyboardEvent) => {
      if (!autocomplete?.tab || autocomplete.tab.length <= 1) return;

      if (e.key === "ArrowUp") {
        setCurrentOption((prev) => {
          if (prev <= 0) return autocomplete.tab!.length - 1;
          else return prev - 1;
        });
      } else if (e.key === "ArrowDown") {
        setCurrentOption((prev) => {
          if (prev >= autocomplete.tab!.length - 1) return 0;
          else return prev + 1;
        });
      } else if (e.key === "Enter") {
        handleSelectOption(autocomplete!.tab[currentOption]);
      }
    };

    window.addEventListener("keydown", handleArrowNavigation, true);

    return () => {
      window.removeEventListener("keydown", handleArrowNavigation, true);
    };
  }, [isFocused, autocomplete, currentOption, handleSelectOption]);

  if (autocomplete === null) return null;

  return (
    <div
      className="text-white absolute bg-[#4a4a4a] text-[12px] min-w-[140px] max-w-[180px] max-h-[200px] overflow-y-auto z-[999]"
      style={{
        top: autocomplete.y + 40 + "px",
        left: autocomplete.x + 20 + "px",
      }}
    >
      <ul>
        {autocomplete.tab?.map((item, i) => (
          <li
            className={clsx(
              "border-b border-b-[#313131] cursor-pointer box-border h-[27px] p-[0_12px] whitespace-nowrap flex items-center",
              currentOption === i && "bg-[#c23d3a]"
            )}
            onMouseEnter={() => setCurrentOption(i)}
            key={item.id}
            onClick={() => handleSelectOption(item)}
          >
            {item.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChooseList;
