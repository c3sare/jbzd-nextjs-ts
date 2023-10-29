import Image from "next/image";
import CommentType from "../../../types/CommentType";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import { BiLoaderAlt } from "@react-icons/all-files/bi/BiLoaderAlt";
import { AiFillTrophy } from "@react-icons/all-files/ai/AiFillTrophy";
import AuthorInfoButton from "@/app/(frontend)/(restSite)/(withSidebar)/(postsPages)/components/Post/components/authorInfo/AuthorInfoButton";

type AuthorInfoProps = {
  author: CommentType["author"] & {
    method: "" | "FOLLOW" | "BLOCK";
  };
  setAuthorMethod: (method: "FOLLOW" | "BLOCK") => void;
  setSpears: (count: number) => void;
};

const AuthorInfo: React.FC<AuthorInfoProps> = ({
  author,
  setAuthorMethod,
  setSpears,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const session = useSession();

  const handleUserAction = useCallback(
    (method: "BLOCK" | "FOLLOW") => {
      setIsLoading(true);
      axios
        .post("/api/user/action", {
          method,
          id: author.id,
        })
        .then((res) => {
          setAuthorMethod(res.data.method);
          router.refresh();
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    },
    [author.id, router, setAuthorMethod]
  );

  const handleToggleSpear = useCallback(() => {
    setIsLoading(true);
    axios
      .post("/api/user/vote/" + author.id)
      .then((data) => {
        setSpears(data.data.count);
        router.refresh();
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [author.id, router, setSpears]);

  const username = session.data?.user?.username;
  const isOwnPost = username === author.username;

  return (
    <span className="text-white md:relative group">
      {author.username}
      <div className="absolute z-[9999999] hidden top-5 md:top-full left-0 md:left-[calc(50%_-_10px)] md:translate-x--1/2 group-hover:block max-w-none">
        <div className="max-w-none mt-[8px] w-[310px] rounded-[3px] bg-[#313131] flex md:before:w-0 md:before:h-0 md:before:content-normal md:before:block md:before:border-r-[5px] md:before:border-l-[5px] md:before:border-b-[5px] md:before:border-solid md:before:border-[transparent_transparent_#313131] md:before:absolute md:before:left-[10px] md:before:top-[3px] p-[15px]">
          <div className="w-full flex flex-nowrap gap-[10px]">
            <div className="w-[45px] flex items-center">
              <Image
                alt={author.username + " avatar"}
                width={45}
                height={45}
                className="rounded-[50%]"
                src={author.image || "/images/avatars/default.jpg"}
              />
            </div>
            <div className="flex-grow">
              <div className="text-white text-[14px] font-bold mb-[5px]">
                {author.username}
              </div>
              <div className="flex justify-between flex-nowrap gap-[5px] mb-[5px] w-full">
                <div
                  className={clsx(
                    "flex-grow bg-[#252525] leading-[38px] text-[20px] font-bold text-white items-center p-[0_8px] rounded-[4px] relative flex justify-between",
                    !isOwnPost && "pr-[30px]"
                  )}
                >
                  <span>
                    <Image
                      src="/images/spear.png"
                      width={22}
                      height={22}
                      alt="Dzida"
                    />
                  </span>
                  <span>{author.spears}</span>
                  {!isOwnPost && (
                    <button
                      disabled={isLoading}
                      className="w-[25px] h-[25px] rounded-full absolute right-[-5px] text-white bg-[#c03e3e] font-bold text-[30px] flex items-center justify-center ml-2"
                      onClick={handleToggleSpear}
                    >
                      {isLoading ? (
                        <BiLoaderAlt className="animate-spin text-[14px] mx-auto" />
                      ) : (
                        "+"
                      )}
                    </button>
                  )}
                </div>
                <div className="flex-grow bg-[#252525] leading-[38px] text-[20px] font-bold text-white items-center p-[0_8px] rounded-[4px] relative flex justify-between">
                  <span className="text-[22px]">
                    <AiFillTrophy />
                  </span>
                  <span>{author.rank}</span>
                </div>
              </div>
              <div className="w-full flex flex-nowrap justify-between text-[12px]">
                <AuthorInfoButton
                  disabled={author.username === username || isLoading}
                  active={author.method === "FOLLOW"}
                  activeClassName="bg-red-600"
                  onClick={() => handleUserAction("FOLLOW")}
                >
                  Obserwuj
                </AuthorInfoButton>
                <AuthorInfoButton
                  disabled={author.username === username || isLoading}
                  active={author.method === "BLOCK"}
                  activeClassName="bg-black"
                  onClick={() => handleUserAction("BLOCK")}
                >
                  Czarna lista
                </AuthorInfoButton>
                <AuthorInfoButton href={"/uzytkownik/" + author.username}>
                  Profil
                </AuthorInfoButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
};

export default AuthorInfo;
