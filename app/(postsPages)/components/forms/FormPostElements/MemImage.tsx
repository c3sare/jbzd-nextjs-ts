import type { DropTargetMonitor } from "react-dnd";
import type { Control, FieldValues, Path } from "react-hook-form";

import { useCallback, useRef } from "react";
import { useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend, NativeTypes } from "react-dnd-html5-backend";
import Image from "next/image";

import { GoUpload } from "react-icons/go";

type MemImageProps<T extends FieldValues> = {
  setData: (val: File | null) => void;
  fieldName: Path<T>;
  control: Control<T>;
};

const allowedFileTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

function MemImage<T extends FieldValues>({
  setData,
  fieldName,
  control,
}: MemImageProps<T>) {
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
      canDrop() {
        return true;
      },
      collect: (monitor: DropTargetMonitor) => {
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
          {data && (
            <Image
              src={URL.createObjectURL(data)}
              className="w-full h-auto"
              width={700}
              height={300}
              alt="Podgląd"
            />
          )}
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

export default function MemImageWithDnd<T extends FieldValues>({
  setData,
  fieldName,
  control,
}: MemImageProps<T>) {
  return (
    <DndProvider backend={HTML5Backend}>
      <MemImage setData={setData} fieldName={fieldName} control={control} />
    </DndProvider>
  );
}
