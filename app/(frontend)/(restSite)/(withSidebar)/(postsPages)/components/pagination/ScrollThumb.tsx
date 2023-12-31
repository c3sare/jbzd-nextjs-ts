import clsx from "clsx";
import { ForwardRefRenderFunction, MouseEventHandler, forwardRef } from "react";

type ScrollThumbProps = {
  onMouseDown: MouseEventHandler<HTMLDivElement>;
};

const ScrollThumb: ForwardRefRenderFunction<
  HTMLDivElement,
  ScrollThumbProps
> = (props, ref) => {
  return (
    <div
      className="absolute top-0 left-0 w-[8px] h-[3px] text-[1px] bg-[#707070] z-[2]"
      style={{ left: "0px" }}
      ref={ref}
      onMouseDown={props.onMouseDown}
    >
      <div
        className={clsx(
          "absolute top-[-5px] left-[50%] w-[20px] h-[20px] ml-[-10px] overflow-hidden cursor-pointer",
          "after:content-['^'] after:relative after:top-[8px] after:block after:w-[8px] after:h-[6px] after:m-[0_auto] after:text-[15px] after:font-black after:text-[#de2127]"
        )}
      />
    </div>
  );
};

export default forwardRef(ScrollThumb);
