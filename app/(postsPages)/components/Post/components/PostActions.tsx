import Link from "next/link";
import BadgeActionButton from "./postActions/BadgeActionButton";
import { FaComment } from "react-icons/fa";
import PlusCounterButton from "./postActions/PlusCounterButton";

type PostActionsProps = {
  postLink: string;
  pluses: number;
};

const PostActions: React.FC<PostActionsProps> = ({ postLink, pluses }) => {
  return (
    <div className="w-[82px] absolute left-[calc(100%_+_2px)] bottom-0 text-center">
      <BadgeActionButton />
      <Link
        href={postLink + "#komentarze"}
        className="bg-[#181818] rounded-[2px] cursor-pointer flex w-[51px] h-[45px] mb-[3px] items-center justify-center"
      >
        <FaComment className="text-[22px] text-[#777]" />
      </Link>
      <PlusCounterButton pluses={pluses} />
    </div>
  );
};

export default PostActions;
