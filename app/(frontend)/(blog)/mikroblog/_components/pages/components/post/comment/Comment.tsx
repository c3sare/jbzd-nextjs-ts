import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

import { IoMdWarning } from "@react-icons/all-files/io/IoMdWarning";
import { FaReply } from "@react-icons/all-files/fa/FaReply";
import { IoIosMore } from "@react-icons/all-files/io/IoIosMore";

import ActionButton from "../ActionButton";
import Rank from "../Rank";
import CommentHeader from "./CommentHeader";
import { BlogPostType } from "@/app/(frontend)/(blog)/mikroblog/(tabs)/(najnowsze)/_types/BlogPost";
import MessageBox from "../MessageBox";
import axios from "axios";
import toast from "react-hot-toast";

type CommentProps = {
  comment: BlogPostType["children"][number];
  handleReplyComment: (defaultValue: string) => void;
};

const Comment: React.FC<CommentProps> = ({ comment, handleReplyComment }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExpandedPostOptions, setIsExpandedPostOptions] =
    useState<boolean>(false);

  const handleOnClickReport = () => {
    setIsLoading(true);
    axios
      .post(`/api/blog/post/${comment.id}/report`)
      .then((res) => res.data)
      .then((data) => {
        if (data.id) toast.success("Dziękujemy");
        else toast.error(data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił błąd");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="border-t border-t-[hsla(198,_4%,_45%,.5)] flex bg-[#313131]">
      <div className="w-[30px] mt-[17px] h-[30px] mr-[15px] relative float-left min-w-auto">
        <Link href="/mikroblog/uzytkownik/c3sare">
          <Image
            src={comment.author.image || "/images/avatars/default.jpg"}
            alt="Avatar"
            width={30}
            height={30}
            className="rounded-full"
          />
        </Link>
        <Rank className="scale-[.7] absolute right-[-10px] bottom-[-15px]" />
      </div>
      <div className="w-[calc(100%_-_45px)] relative flex flex-col">
        <CommentHeader comment={comment} />
        <div className="p-[0_0_35px] text-left clear-both relative bg-[#313131]">
          <MessageBox message={comment.text} images={comment.files} />
          <ul className="transition-opacity duration-200 ease-in-out sm:opacity-0 group-hover:opacity-100">
            <li className="float-left leading-[20px] mr-[15px]">
              <ActionButton
                disabled={isLoading}
                onClick={() =>
                  handleReplyComment(`@[${comment.author.username}]`)
                }
                icon={FaReply}
              >
                Odpowiedz
              </ActionButton>
            </li>
            <li
              className={clsx(
                "float-left leading-[20px] mr-[15px]",
                !isExpandedPostOptions && "hidden md:block"
              )}
            >
              <ActionButton
                onClick={handleOnClickReport}
                disabled={isLoading}
                icon={IoMdWarning}
              >
                Zgłoś
              </ActionButton>
            </li>
            {!isExpandedPostOptions && (
              <li className="float-left leading-[20px] mr-[15px] md:hidden">
                <ActionButton
                  icon={IoIosMore}
                  onClick={() => setIsExpandedPostOptions(true)}
                >
                  Więcej opcji
                </ActionButton>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Comment;
