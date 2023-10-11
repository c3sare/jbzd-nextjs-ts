import { IoMdColorPalette } from "@react-icons/all-files/io/IoMdColorPalette";
import DropDown from "./DropDown";
import DropDownColorItem from "./DropDownColorItem";

export const colors = [
  "#de2127",
  "#94b425",
  "#1877f2",
  "#777777",
  "#8f8f8f",
  "#f0cc00",
  "#ffffff",
  "#000000",
] as const;

export type Colors = (typeof colors)[number];

export default function TextColorDropDown({
  onChange,
  disabled = false,
}: {
  disabled?: boolean;
  onChange: (value: string) => void;
}): JSX.Element {
  return (
    <DropDown
      disabled={disabled}
      buttonLabel={<IoMdColorPalette />}
      title="Rozmiar czcionki"
    >
      {colors.map((color) => (
        <DropDownColorItem
          color={color}
          key={color}
          onClick={() => onChange(color)}
        />
      ))}
    </DropDown>
  );
}
