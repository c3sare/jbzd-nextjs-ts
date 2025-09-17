import React, { useEffect } from "react";
import { useRef } from "react";
import { DropDownContext } from "../context/DropDownContext";

export function DropDownItem({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
}) {
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
      className="py-2 px-4 text-[#050505] cursor-pointer leading-[16px] text-[14px] flex content-center flex-row shrink-0 justify-between border-none hover:bg-[#F0F0F0]"
      onClick={onClick}
      ref={ref}
      title={title}
      type="button"
    >
      {children}
    </button>
  );
}
