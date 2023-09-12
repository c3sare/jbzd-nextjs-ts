import { FaAward } from "@react-icons/all-files/fa/FaAward";
import CommentButton from "./CommentButton";
import useDropdownContainer from "@/app/hooks/useDropdownContainer";
import BadgeActionButton from "./BadgeActionButton";
import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type BadgeType = "rock" | "silver" | "gold";

type BadgeButtonProps = {
  postId: string;
  commentId: string;
  setBadge: Dispatch<
    SetStateAction<{
      rock: number;
      silver: number;
      gold: number;
    }>
  >;
};

const BadgeButton: React.FC<BadgeButtonProps> = ({
  postId,
  commentId,
  setBadge,
}) => {
  const router = useRouter();
  const session = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isVisible, toggleVisible, containerRef } = useDropdownContainer();

  const handleAddBadge = (type: BadgeType) => {
    toggleVisible();
    setIsLoading(true);
    axios
      .post(`/api/post/${postId}/comment/${commentId}/badge`, { type })
      .then((res) => {
        if (res.data?.badged) {
          const {
            count,
            type,
            coins,
          }: { count: number; type: BadgeType; coins: number } = res.data;
          toast.success("Przyznano odznakę!");
          setBadge((prev) => {
            const newState = { ...prev };
            newState[type] = count;
            return newState;
          });
          session.update({ coins });
          router.refresh();
        } else if (res.data?.alreadyExist) {
          toast.error("Już przyznałeś taką odznakę!");
        } else if (res.data?.notEnoughtCoins) {
          toast.error("Za mało monet na wybraną odznakę!");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił błąd!");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="ml-auto relative" ref={containerRef}>
      <CommentButton
        onClick={toggleVisible}
        className="ml-auto"
        icon={FaAward}
        disabled={isLoading}
      >
        Nagroda
      </CommentButton>
      {isVisible && (
        <div className="absolute bottom-full left-0 w-full min-w-[51px] flex flex-col bg-[#313131] py-[5px] gap-[10px] z-[10] shadow-xl">
          <BadgeActionButton
            src="/images/likes/gold.png"
            name="Złota dzida"
            cost={1000}
            onClick={() => handleAddBadge("gold")}
          />
          <BadgeActionButton
            src="/images/likes/silver.png"
            name="Srebrna dzida"
            cost={400}
            onClick={() => handleAddBadge("silver")}
          />
          <BadgeActionButton
            src="/images/likes/rock.png"
            name="Kamienna dzida"
            cost={100}
            onClick={() => handleAddBadge("rock")}
          />
        </div>
      )}
    </div>
  );
};

export default BadgeButton;
