import { GiHamburgerMenu } from "@react-icons/all-files/gi/GiHamburgerMenu";

import { useRef } from "react";
import type { Identifier, XYCoord } from "dnd-core";
import { useDrag, useDrop } from "react-dnd";

import useZodFormContext from "@/hooks/useZodFormContext";

type AnswerItemProps = {
  id: string;
  index: number;
  remove: (index: number) => void;
  move: (startIndex: number, endIndexd: number) => void;
};

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const ItemTypes = {
  CARD: "card",
};

const AnswerItem: React.FC<AnswerItemProps> = ({ index, remove, move, id }) => {
  const { register } = useZodFormContext();
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<DragItem, void, { handlerId: Identifier }>({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()!,
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      move(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [, drag, preview] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      className="mb-[4px] w-full"
      ref={(ref) => {
        preview(ref);
      }}
    >
      <div className="mb-[10px] w-full flex items-center">
        <span
          className="flex justify-center items-center w-[calc(8%-6px)] cursor-move text-[#6d7578] h-[43px] leading-[34px] text-center text-[18px] mx-[3px]"
          ref={ref}
        >
          <GiHamburgerMenu />
        </span>
        <input
          className="w-[calc(80%-3px)] block h-[34px] mr-[3px] leading-[48px] bg-black p-[10px] text-white focus:outline-hidden"
          type="text"
          {...register(`answers.${index}.value`)}
        />
        <button
          onClick={() => remove(index)}
          type="button"
          className="w-[calc(12%-3px)] bg-[#6d7578] text-[12px] mr-0 h-[34px] leading-[34px] text-white text-center inline-block mx-[3px]"
        >
          Usuń
        </button>
      </div>
    </div>
  );
};

export default AnswerItem;
