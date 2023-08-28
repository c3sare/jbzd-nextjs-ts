import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ScrollThumb from "./ScrollThumb";

type ScrollBarProps = {
  allPages: number;
  setScrollBarProgress: Dispatch<SetStateAction<number>>;
  currentPage: number;
};

const ScrollBar: React.FC<ScrollBarProps> = ({
  allPages,
  setScrollBarProgress,
  currentPage,
}) => {
  const [drag, setDrag] = useState<boolean>(false);
  const startClientX = useRef<number>(0);
  const scrollThumb = useRef<HTMLDivElement>(null);
  const scrollBar = useRef<HTMLDivElement>(null);

  const setScrollBar = useCallback(
    (e: any) => {
      const scrollBarWidth = scrollBar.current!.offsetWidth;
      const thumbWidth =
        allPages > 7 ? (scrollBarWidth / allPages) * 7 : scrollBarWidth;
      const scrollBarLeft = scrollBar.current!.offsetLeft;

      const max = scrollBarWidth - thumbWidth;
      const result = e.clientX - scrollBarLeft - thumbWidth / 2;

      const current = result > max ? max : result < 0 ? 0 : result;
      const percent = current / (max + thumbWidth);
      setScrollBarProgress(percent);

      scrollThumb.current!.style.left = current + "px";
    },
    [allPages, setScrollBarProgress]
  );

  useEffect(() => {
    function scrollBarSet(e: any) {
      if (drag) setScrollBar(e);
    }

    window.addEventListener("mousemove", scrollBarSet, true);

    return () => window.removeEventListener("mousemove", scrollBarSet, true);
  }, [drag, setScrollBar]);

  useEffect(() => {
    function disableDrag() {
      setDrag(false);
    }

    if (drag) {
      window.addEventListener("mouseup", disableDrag, true);
    } else {
      window.removeEventListener("mouseup", disableDrag, true);
    }

    return () => window.removeEventListener("mouseup", disableDrag, true);
  }, [drag]);

  const setScrollBarPage = useCallback(
    (page: number, allPages: number) => {
      const scrollBarWidth = scrollBar.current!.offsetWidth;
      const thumbWidth =
        allPages > 7 ? (scrollBarWidth / allPages) * 7 : scrollBarWidth;
      scrollThumb.current!.style.width = `${thumbWidth}px`;
      if (allPages < 7 || page < 5) {
        scrollThumb.current!.style.left = "0px";
        setScrollBarProgress(0);
      } else {
        const percentProgress =
          page + 4 >= allPages ? 1 : (page - 4) / allPages;
        const maxProgress = scrollBarWidth - thumbWidth;
        const progress = maxProgress * percentProgress;
        scrollThumb.current!.style.left = (progress >= 0 ? progress : 0) + "px";

        setScrollBarProgress(percentProgress);
      }
    },
    [setScrollBarProgress]
  );

  useEffect(() => {
    setScrollBarPage(currentPage, allPages);
  }, [setScrollBarPage, currentPage, allPages]);

  return (
    <div
      className="relative w-full h-[20px] mt-[10px]"
      ref={scrollBar}
      onClick={setScrollBar}
    >
      <div className="w-full h-[3px] bg-[#464646] overflow-hidden" />
      <ScrollThumb
        ref={scrollThumb}
        onMouseDown={(e) => {
          startClientX.current = e.clientX;
          setDrag(true);
        }}
      />
      <div className="absolute top-0 left-[697.477px] w-[3px] h-[3px] overflow-hidden z-[1]" />
    </div>
  );
};

export default ScrollBar;
