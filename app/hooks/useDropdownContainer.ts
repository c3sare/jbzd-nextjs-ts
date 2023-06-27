import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const useDropdownContainer = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisible = useCallback(
    () => setIsVisible(!isVisible),
    [isVisible]
  );

  useEffect(() => {
    if (isVisible) setIsVisible(false);
  }, [router]);

  useEffect(() => {
    const hideContainer = (e: any) => {
      if (!containerRef.current?.contains(e.target)) setIsVisible(false);
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
