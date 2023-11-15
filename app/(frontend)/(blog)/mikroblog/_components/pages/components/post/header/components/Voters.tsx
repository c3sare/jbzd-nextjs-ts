import useDropdownContainer from "@/hooks/useDropdownContainer";
import { AiFillQuestionCircle } from "@react-icons/all-files/ai/AiFillQuestionCircle";
import clsx from "clsx";
import VoterItem from "./VoterItem";
import { BlogPostType } from "@/app/(frontend)/(blog)/mikroblog/(tabs)/_types/BlogPost";
import { useSession } from "next-auth/react";

type VotersProps = {
  voters: BlogPostType["votes"];
  method: "" | "PLUS" | "MINUS";
};

const Voters: React.FC<VotersProps> = ({ voters, method }) => {
  const session = useSession();
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
        <div className="absolute top-full left-[calc(50%_-_20px)] -translate-x-1/2 w-[215px] pt-[10px] z-[11]">
          <div
            className={clsx(
              "w-full p-[10px] bg-[#6e7578] text-white text-[12px] text-left rounded-[5px] shadow-md relative max-h-[250px]",
              "after:absolute after:bottom-full after:left-[calc(50%_+_18px)] after:-translate-x-1/2 after:border-[#6e7578] after:border-t-0 after:border-l-[5px] after:border-r-[5px] after:border-b-[5px] after:border-l-transparent after:border-r-transparent after:border-t-transparent"
            )}
          >
            {voters.length === 0 && method === "" && (
              <div className="w-full italic text-center">
                Nikt jeszcze nie ocenił.
              </div>
            )}
            {method !== "" && session.data?.user && (
              <VoterItem
                key={session.data.user.id}
                user={{
                  id: session.data.user.id,
                  username: session.data.user.username,
                  vote: method,
                }}
              />
            )}
            {voters.map((item) => (
              <VoterItem
                key={item.id}
                user={{
                  id: item.user.id,
                  username: item.user.username!,
                  vote: item.method,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Voters;
