import { useCallback, useEffect, useMemo, useState } from "react";
import { DropDownContext } from "../context/DropDownContext";

export default function DropDownItems({
  children,
  dropDownRef,
  onClose,
}: {
  children: React.ReactNode;
  dropDownRef: React.Ref<HTMLDivElement>;
  onClose: () => void;
}) {
  const [items, setItems] = useState<
    React.RefObject<HTMLButtonElement | null>[]
  >([]);
  const [highlightedItem, setHighlightedItem] =
    useState<React.RefObject<HTMLButtonElement | null>>();

  const registerItem = useCallback(
    (itemRef: React.RefObject<HTMLButtonElement | null>) => {
      setItems((prev) => (prev ? [...prev, itemRef] : [itemRef]));
    },
    [setItems]
  );

  const contextValue = useMemo(
    () => ({
      registerItem,
    }),
    [registerItem]
  );

  useEffect(() => {
    if (items && !highlightedItem) {
      setHighlightedItem(items[0]);
    }

    if (highlightedItem && highlightedItem.current) {
      highlightedItem.current.focus();
    }
  }, [items, highlightedItem]);

  return (
    <DropDownContext.Provider value={contextValue}>
      <div
        className="z-[5] block absolute shadow-sm rounded-[8px] min-w-[40px] py-2 min-h-[40px] bg-white"
        ref={dropDownRef}
      >
        {children}
      </div>
    </DropDownContext.Provider>
  );
}
