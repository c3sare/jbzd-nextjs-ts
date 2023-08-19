import type { DropTargetMonitor } from "react-dnd";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend, NativeTypes } from "react-dnd-html5-backend";
import { useCallback, useRef } from "react";
import { GoUpload } from "react-icons/go";
import toast from "react-hot-toast";
import { Control, FieldValues, Path, useWatch } from "react-hook-form";

type MemVideoProps<T extends FieldValues> = {
  setData: (val: File | null) => void;
  fieldName: Path<T>;
  control: Control<T>;
};

const allowedFileTypes = ["video/mp4"];

function MemVideo<T extends FieldValues>({
  setData,
  fieldName,
  control,
}: MemVideoProps<T>) {
  const data = useWatch({ control, name: fieldName });

  const ref = useRef<HTMLInputElement>(null);

  const onDrop = useCallback(
    (file: File) => {
      if (allowedFileTypes.includes(file.type)) setData(file);
      else toast.error("Niedozwolony typ pliku!");
    },
    [setData]
  );

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item: { files: any }) {
        if (onDrop) {
          onDrop(item.files[0]);
        }
      },
      canDrop(item: any) {
        console.log("canDrop", item.files, item.items);
        return true;
      },
      hover(item: any) {
        console.log("hover", item.files, item.items);
      },
      collect: (monitor: DropTargetMonitor) => {
        const item = monitor.getItem() as any;
        if (item) {
          console.log("collect", item.files, item.items);
        }

        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [data]
  );

  const handleOpenFileExplorer = () => ref.current!.click();

  return (
    <div className="w-full flex relative bg-[#252525] mb-[10px]">
      {data === null ? (
        <div
          onClick={handleOpenFileExplorer}
          className="flex h-[300px] w-full z-[2] flex-col items-center justify-center text-white text-[13px] gap-[10px] cursor-pointer"
          ref={drop}
        >
          <input
            type="file"
            className="hidden"
            ref={ref}
            accept={allowedFileTypes.join(", ")}
            onChange={(e) => {
              if (e.currentTarget?.files && e.currentTarget.files.length > 0)
                onDrop(e.currentTarget.files[0]);
            }}
          />
          <GoUpload fontSize={24} />
          <span>Przeciągnij tu plik</span>
          <span className="text-[#777]">lub</span>
          <button
            type="button"
            className="bg-[#505050] text-white text-[13px] border-0 rounded-[3px] leading-[34px] px-[15px] cursor-pointer hover:bg-[#777]"
          >
            Przeglądaj
          </button>
        </div>
      ) : (
        <>
          <video src={data ? URL.createObjectURL(data) : undefined} controls />
          <button
            type="button"
            className="absolute bottom-[15px] right-[15px] bg-[#505050] text-white text-[13px] rounded-[3px] leading-[34px] px-[15px] cursor-pointer z-[3] shadow-md"
            onClick={() => setData(null)}
          >
            Zmień
          </button>
        </>
      )}
    </div>
  );
}

export default function <T extends FieldValues>({
  setData,
  fieldName,
  control,
}: MemVideoProps<T>) {
  return (
    <DndProvider backend={HTML5Backend}>
      <MemVideo setData={setData} fieldName={fieldName} control={control} />
    </DndProvider>
  );
}
