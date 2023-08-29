import type { Identifier, XYCoord } from "dnd-core";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import MoveButton from "../components/MoveButton";
import { BiTrash } from "react-icons/bi";
import { UseFieldArrayMove } from "react-hook-form";

type MemContainerProps = {
  children?: React.ReactNode;
  handleRemoveMem: () => void;
  index: number;
  move: UseFieldArrayMove;
  id: string;
};

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const ItemTypes = {
  CARD: "card",
};

const MemContainer: React.FC<MemContainerProps> = ({
  children,
  handleRemoveMem,
  index,
  move,
  id,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
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

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div className="w-full" ref={preview}>
      <div className="relative w-full my-[15px]">
        {children}
        <MoveButton ref={ref} />
      </div>
      <div className="flex justify-end">
        <button
          className="flex items-center justify-center"
          onClick={handleRemoveMem}
          type="button"
        >
          <BiTrash className="mr-1" /> usuń element
        </button>
      </div>
    </div>
  );
};

export default MemContainer;
