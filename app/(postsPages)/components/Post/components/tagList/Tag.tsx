import Link from "next/link";
import { PostType } from "../../../types/PostType";
import clsx from "clsx";
import { memo, useCallback, useState } from "react";
import setTagActionSA from "../../actions/setTagAction";
import { toast } from "react-hot-toast";

type TagProps = {
  tag: PostType["tags"][0];
};

type TagActionType = "FOLLOW" | "BLOCK" | "";

const Tag: React.FC<TagProps> = ({ tag }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tagAction, setTagAction] = useState<TagActionType>(tag.action || "");

  const handleTagAction = useCallback(
    async (method: "BLOCK" | "FOLLOW") => {
      setIsLoading(true);
      // /api/tag/action
      const res = await setTagActionSA(tag.id, method);

      if (res.method || res.method === "") {
        setTagAction(res.method as TagActionType);
      } else {
        if (res.message) toast.error(res.message);
      }
      setIsLoading(false);
    },
    [tag.id]
  );

  return (
    <div className="relative h-[25px] group">
      <Link
        className="text-white text-[11px] p-1 ml-[2px] relative mb-[3px] bg-[#4f4f4f] rounded-[2px]"
        href={`/tag/${tag.id}/${tag.slug}`}
      >
        #{tag.name}
      </Link>
      <div className="hidden group-hover:flex absolute top-full left-[calc(50%_-_15px)] translate-x--1/2">
        <div
          className={clsx(
            "mt-[5px] w-[240px] bg-[#313131] rounded-[3px] p-[15px] flex z-[11]",
            "before:w-0 before:h-0 before:content-normal before:block before:border-r-[5px] before:border-l-[5px] before:border-b-[5px] before:border-solid before:border-[transparent_transparent_#313131] before:absolute before:left-[10px] before:top-0"
          )}
        >
          <button
            disabled={isLoading}
            className={clsx(
              "w-1/2 mx-[3px] p-[10px] rounded-[3px] text-white text-center",
              "bg-[#ac2f2f]",
              tagAction === "FOLLOW" && "opacity-50"
            )}
            onClick={() => handleTagAction("FOLLOW")}
          >
            Obserwuj
          </button>
          <button
            disabled={isLoading}
            className={clsx(
              "w-1/2 mx-[3px] p-[10px] rounded-[3px] text-white text-center",
              "bg-black",
              tagAction === "BLOCK" && "opacity-50"
            )}
            onClick={() => handleTagAction("BLOCK")}
          >
            Czarna lista
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Tag);
