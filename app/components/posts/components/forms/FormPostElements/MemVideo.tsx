import { useRef } from "react";
import { GoUpload } from "react-icons/go";

type MemVideoProps = {
  data: File;
  setData: (val: File) => void;
};

const MemVideo: React.FC<MemVideoProps> = ({ data, setData }) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleOpenFileExplorer = () => ref.current!.click();

  return (
    <div className="w-full flex relative bg-[#252525] mb-[10px]">
      <div
        onClick={handleOpenFileExplorer}
        className="flex h-[300px] w-full z-[2] flex-col items-center justify-center text-white text-[13px] gap-[10px] cursor-pointer"
      >
        <input type="file" className="hidden" ref={ref} />
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
    </div>
  );
};

export default MemVideo;
