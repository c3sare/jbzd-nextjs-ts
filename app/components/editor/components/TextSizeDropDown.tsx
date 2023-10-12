import { BiFontSize } from "@react-icons/all-files/bi/BiFontSize";
import DropDown from "./DropDown";
import { DropDownItem } from "./DropDownItem";

export default function BlockFormatDropDown({
  disabled = false,
  onChange,
}: {
  disabled?: boolean;
  onChange: (fontSize: number, leading: number) => void;
}): JSX.Element {
  return (
    <DropDown
      disabled={disabled}
      buttonLabel={<BiFontSize fontSize={16} className="text-white" />}
      title="Rozmiar czcionki"
    >
      <DropDownItem onClick={() => onChange(18, 30)}>1</DropDownItem>
      <DropDownItem onClick={() => onChange(24, 34)}>2</DropDownItem>
      <DropDownItem onClick={() => onChange(30, 40)}>3</DropDownItem>
    </DropDown>
  );
}
