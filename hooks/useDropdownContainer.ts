import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const useDropdownContainer = () => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisible = useCallback(
    () => setIsVisible(!isVisible),
    [isVisible]
  );

  useEffect(() => {
    setIsVisible(false);
  }, [pathname]);

  useEffect(() => {
    const hideContainer = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node))
        setIsVisible(false);
    };
    if (isVisible) {
      document.addEventListener("click", hideContainer, true);
    } else {
      document.removeEventListener("click", hideContainer, true);
    }
    return () => document.removeEventListener("click", hideContainer, true);
  }, [isVisible]);

  return { isVisible, toggleVisible, containerRef };
};

export default useDropdownContainer;
