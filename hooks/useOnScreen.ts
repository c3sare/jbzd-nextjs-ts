import { RefObject, useEffect, useState } from "react";

const useOnScreen = <T>(ref: RefObject<T>, rootMargin = "0px") => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!!entry?.isIntersecting);
      },
      {
        rootMargin,
      }
    );

    const currentElement = ref.current as Element;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      observer.unobserve(currentElement);
    };
  }, []);

  return isVisible;
};

export default useOnScreen;
