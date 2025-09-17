import clsx from "clsx";
import Link from "next/link";
import TagButton from "../../components/TagButton";
import { useState } from "react";
import axios from "axios";
import { useBlogContext } from "@/app/(frontend)/(blog)/_context/BlogContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type TagLinkProps = {
  href?: string;
  children?: React.ReactNode;
};

const TagLink: React.FC<TagLinkProps> = ({ href, children }) => {
  const router = useRouter();
  const {
    method: { actionedTag },
    data: { actionedTags },
  } = useBlogContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTagAction = (method: "BLOCK" | "FOLLOW") => {
    setIsLoading(true);
    axios
      .post(`/api/blog/tag/action/${href}`, { method })
      .then((res) => res.data)
      .then((data) => {
        if (data.isDeleted) {
          actionedTag.remove(data.action.id);
        } else if (actionedTags.find((tag) => tag.id === data.action.id))
          actionedTag.update(data.action.id, data.action.method);
        else actionedTag.add(data.action);
        router.refresh();
      })
      .catch((err) => {
        toast.error("Wystąpił błąd!");
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const currentTagMethod =
    actionedTags.find((tag) => tag.tag.slug)?.method || "";

  return (
    <span className="relative group/tag">
      <Link
        className="text-[#b3d734] text-[12px] inline-block hover:text-[#e74949] transition-colors"
        href={"/mikroblog/tag/" + href!}
      >
        {children}
      </Link>
      <div className="absolute left-0 hidden pt-2 top-full group-hover/tag:block">
        <div
          className={clsx(
            "flex w-[300px] z-10 bg-[#1f1f1f] shadow-xl rounded-[3px] p-[15px] relative",
            "before:w-0 before:h-0 before:content-normal before:block before:border-r-[7.5px] before:border-l-[7.5px] before:border-b-10 before:border-solid before:border-[transparent_transparent_#1f1f1f] before:absolute before:left-[15px] before:bottom-full"
          )}
        >
          <TagButton
            disabled={isLoading}
            isActive={currentTagMethod === "FOLLOW"}
            onClick={() => handleTagAction("FOLLOW")}
            variant="red"
          >
            Obserwuj
          </TagButton>
          <TagButton
            disabled={isLoading}
            isActive={currentTagMethod === "BLOCK"}
            onClick={() => handleTagAction("BLOCK")}
          >
            Czarna lista
          </TagButton>
        </div>
      </div>
    </span>
  );
};

export default TagLink;
