import clsx from "clsx";
import {
  HTMLAttributes,
  UIEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

type ScrollContainerProps = {
  children?: React.ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
};

const ScrollContainer: React.FC<ScrollContainerProps> = ({
  children,
  className,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const scrollbarTrack = useRef<HTMLDivElement | null>(null);
  const scrollbarItem = useRef<HTMLDivElement | null>(null);
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const startScrollTop = useRef<number>(0);
  const startScroll = useRef<number>(0);

  useEffect(() => {
    const handleSetScrollItemHeight = () => {
      const height = scrollContainer.current!.clientHeight;
      const fullHeight = scrollContainer.current!.scrollHeight;
      const scrollbarItemHeight = Math.floor((height / fullHeight) * 100);

      scrollbarItem.current!.style.height = scrollbarItemHeight + "%";
    };
    handleSetScrollItemHeight();

    window.addEventListener("resize", handleSetScrollItemHeight, true);

    return () =>
      window.removeEventListener("resize", handleSetScrollItemHeight, true);
  }, []);

  useEffect(() => {
    const handleDragScrollItem = (e: MouseEvent | TouchEvent) => {
      const containerHeight =
        scrollContainer.current!.scrollHeight -
        scrollContainer.current!.offsetHeight;

      const scrollItemHeightInPercent = Number(
        scrollbarItem.current!.style.height.slice(0, -1)
      );

      const maxScrollItemTopInPercent = 100 - scrollItemHeightInPercent;
      const maxScrollItemTopInPx = scrollbarTrack.current!.offsetHeight;

      const startTopPosition = startScrollTop.current;
      const startPosition = startScroll.current;
      const movePosition =
        (e as MouseEvent).clientY || (e as TouchEvent).touches[0]!.clientY;

      const moveDiff = startPosition - movePosition;

      const moveDiffPercent = (moveDiff / maxScrollItemTopInPx) * 100;

      const positionValue = startTopPosition - moveDiffPercent;

      const value =
        positionValue < 0
          ? 0
          : positionValue > maxScrollItemTopInPercent
          ? maxScrollItemTopInPercent
          : positionValue;

      scrollbarItem.current!.style.top = value + "%";
      scrollContainer.current!.scrollTop =
        containerHeight * (value / maxScrollItemTopInPercent);
    };

    const handleStopDragging = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleDragScrollItem, true);
      window.addEventListener("mouseup", handleStopDragging, true);
      window.addEventListener("touchmove", handleDragScrollItem, true);
      window.addEventListener("touchend", handleStopDragging, true);
    } else {
      window.removeEventListener("mousemove", handleDragScrollItem, true);
      window.removeEventListener("mouseup", handleStopDragging, true);
    }

    return () => {
      window.removeEventListener("mousemove", handleDragScrollItem, true);
      window.removeEventListener("mouseup", handleStopDragging, true);
      window.removeEventListener("touchmove", handleDragScrollItem, true);
      window.removeEventListener("touchend", handleStopDragging, true);
    };
  }, [isDragging]);

  const handleOnScroll: UIEventHandler<HTMLDivElement> = (e) => {
    const heightItem = scrollbarItem.current!.style.height;
    const scrollItemHeight = Number(
      heightItem.slice(0, heightItem.indexOf("%"))
    );

    const maxScrollTop = 100 - scrollItemHeight;

    const containerHeight = e.currentTarget.clientHeight;
    const top = e.currentTarget.scrollTop;
    const scrollHeight = e.currentTarget.scrollHeight;
    scrollbarItem.current!.style.top =
      (top / (scrollHeight - containerHeight)) * maxScrollTop + "%";
  };

  const handleStartDragging = (e: React.MouseEvent | React.TouchEvent) => {
    startScroll.current =
      (e as React.MouseEvent).clientY ||
      (e as React.TouchEvent).touches[0]!.clientY;
    startScrollTop.current = Number(
      scrollbarItem.current!.style.top.slice(0, -1)
    );
    setIsDragging(true);
  };

  return (
    <div className={className}>
      <div
        className={clsx(
          "h-full overflow-y-auto scroll no-scrollbar",
          isDragging && "select-none"
        )}
        onScroll={handleOnScroll}
        onTouchStart={handleOnScroll}
        ref={scrollContainer}
      >
        <div>{children}</div>
      </div>
      <div>
        <div
          className="w-[6px] h-full top-0 right-0 opacity-50 absolute transition-all duration-500 ease-in bg-[#1f1f1f]"
          ref={scrollbarTrack}
        >
          <div
            className="top-[0%] bg-[#68696b] width-[6px] cursor-pointer relative"
            ref={scrollbarItem}
            onMouseDown={handleStartDragging}
            onTouchStart={handleStartDragging}
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollContainer;
