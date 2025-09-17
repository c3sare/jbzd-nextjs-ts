import useOnScreen from "@/hooks/useOnScreen";
import { useEffect, useRef } from "react";
import { BiLoaderAlt } from "@react-icons/all-files/bi/BiLoaderAlt";

type LoadMoreProps = {
  loadMore: () => void;
  isEnd: boolean;
};

const LoadMore: React.FC<LoadMoreProps> = ({ loadMore, isEnd }) => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(loadingRef);

  useEffect(() => {
    if (isVisible && !isEnd) {
      loadMore();
    }
  }, [isVisible, isEnd, loadMore]);

  return (
    <div
      ref={loadingRef}
      className="md:ml-[50px] w-full md:w-[calc(100%-50px)] text-[#666] text-[14px] text-center py-[10px]"
    >
      {isVisible && !isEnd ? (
        <BiLoaderAlt className="animate-spin mx-auto text-[32px]" />
      ) : (
        <span>Dotarłeś do końca internetu, gratulujemy!</span>
      )}
    </div>
  );
};

export default LoadMore;
