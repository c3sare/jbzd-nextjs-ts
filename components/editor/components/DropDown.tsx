import { ReactNode, useEffect, useRef, useState } from "react";
import * as React from "react";
import { createPortal } from "react-dom";
import DropDownItems from "./DropDownItems";
import ToolbarBtn from "./ToolbarBtn";

export default function DropDown({
  disabled = false,
  buttonLabel,
  children,
  stopCloseOnClickSelf,
  title,
}: {
  disabled?: boolean;
  buttonLabel?: React.ReactNode;
  children: ReactNode;
  stopCloseOnClickSelf?: boolean;
  title: string;
}): JSX.Element {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    const dropDown = dropDownRef.current;

    if (showDropDown && button !== null && dropDown !== null) {
      const { top, left } = button.getBoundingClientRect();
      dropDown.style.top = `${top + 25}px`;
      dropDown.style.left = `${Math.min(
        left,
        window.innerWidth - dropDown.offsetWidth - 20
      )}px`;
    }
  }, [dropDownRef, buttonRef, showDropDown]);

  useEffect(() => {
    const button = buttonRef.current;

    if (button !== null && showDropDown) {
      const handle = (event: MouseEvent) => {
        const target = event.target;
        if (stopCloseOnClickSelf) {
          if (
            dropDownRef.current &&
            dropDownRef.current.contains(target as Node)
          )
            return;
        }
        if (!button.contains(target as Node)) {
          setShowDropDown(false);
        }
      };
      document.addEventListener("click", handle);

      return () => {
        document.removeEventListener("click", handle);
      };
    }
  }, [dropDownRef, buttonRef, showDropDown, stopCloseOnClickSelf]);

  return (
    <>
      <ToolbarBtn
        disabled={disabled}
        onClick={() => setShowDropDown(!showDropDown)}
        ref={buttonRef}
        title={title}
      >
        {buttonLabel}
      </ToolbarBtn>
      {showDropDown &&
        createPortal(
          <DropDownItems dropDownRef={dropDownRef}>{children}</DropDownItems>,
          document.body
        )}
    </>
  );
}
