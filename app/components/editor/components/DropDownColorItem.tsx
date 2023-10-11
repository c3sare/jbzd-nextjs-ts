import React, { useEffect } from "react";
import { useRef } from "react";
import { DropDownContext } from "../context/DropDownContext";
import { Colors } from "./TextColorDropDown";

const DropDownColorItem = ({
  onClick,
  color,
}: {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
  color: Colors;
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  const dropDownContext = React.useContext(DropDownContext);

  if (dropDownContext === null) {
    throw new Error("DropDownItem must be used within a DropDown");
  }

  const { registerItem } = dropDownContext;

  useEffect(() => {
    if (ref && ref.current) {
      registerItem(ref);
    }
  }, [ref, registerItem]);

  return (
    <button
      style={{ backgroundColor: color }}
      className="w-[18px] h-[18px] border m-1 border-white hover:scale-110 hover:border-[#777]"
      onClick={onClick}
      ref={ref}
      type="button"
    />
  );
};

export default DropDownColorItem;
