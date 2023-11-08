import Image from "next/image";
import { useSession } from "next-auth/react";
import CommentTextarea from "./_componenets/CommentTextarea";

type CommentFormProps = {
  onClose: () => void;
};

const CommentForm: React.FC<CommentFormProps> = ({ onClose }) => {
  const session = useSession();
  return (
    <div className="py-[20px] px-[15px] bg-[hsla(198,4%,45%,.3)] relative flex flex-wrap">
      <span className="w-[30px] h-[30px] mr-[10px] rounded-full overflow-hidden relative">
        <Image
          src={session.data?.user?.image || "/images/avatars/default.jpg"}
          width={30}
          height={30}
          alt="Avatar"
        />
      </span>
      <CommentTextarea />
      <div>
        <div className="w-[calc(100%_-_200px)] top-0 my-2 ml-[5px] h-[33px] bg-none leading-[33px] overflow-hidden relative clear-both">
          <p className="absolute left-[15px] text-[12px] text-left text-white indent-[105px] leading-[33px]">
            Dodaj zdjęcia ręcznie lub upuść je tutaj...
          </p>
          <input
            type="file"
            className="w-[100px] opacity-0 relative z-[9] cursor-pointer h-[30px] ml-[5px] leading-[48px] bg-black p-[10px] text-white text-[16px]"
          />
          <button className="absolute right-[7px] bg-[#6e7578] w-[105px] left-0 p-0 top-0 leading-[33px] h-[33px] inline-block text-center text-[11px] font-semibold text-white transition-all duration-200">
            Wybierz plik
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
