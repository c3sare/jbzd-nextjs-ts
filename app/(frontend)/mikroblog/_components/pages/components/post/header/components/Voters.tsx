import useDropdownContainer from "@/hooks/useDropdownContainer";
import { AiFillQuestionCircle } from "@react-icons/all-files/ai/AiFillQuestionCircle";
import clsx from "clsx";
import VoterItem from "./VoterItem";

const Voters = () => {
  const { isVisible, toggleVisible, containerRef } = useDropdownContainer();

  return (
    <div className="relative flex items-center" ref={containerRef}>
      <button
        className="mr-[7px] text-[#6e7578] ml-0.5"
        onClick={() => {
          toggleVisible();
        }}
      >
        <AiFillQuestionCircle size={18} />
      </button>
      {isVisible && (
        <div className="z-[8] absolute top-full left-[calc(50%_-_20px)] -translate-x-1/2 w-[200px] pt-[10px]">
          <div
            className={clsx(
              "w-full p-[10px] bg-[#6e7578] text-white text-[12px] text-left rounded-[5px] shadow-md relative max-h-[250px]",
              "after:absolute after:bottom-full after:left-[calc(50%_+_18px)] after:-translate-x-1/2 after:border-[#6e7578] after:border-t-0 after:border-l-[5px] after:border-r-[5px] after:border-b-[5px] after:border-l-transparent after:border-r-transparent after:border-t-transparent"
            )}
          >
            {/* <div className="w-full text-center italic">
              Nikt jeszcze nie ocenił.
            </div> */}
            <VoterItem
              user={{
                id: "dasdas",
                username: "c3sare",
                vote: "PLUS",
              }}
            />
            <VoterItem
              user={{
                id: "dasdas",
                username: "c3sare",
                vote: "MINUS",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Voters;
