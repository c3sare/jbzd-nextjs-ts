import clsx from "clsx";
import Link from "next/link";
import TagButton from "../../components/TagButton";

type TagLinkProps = {
  href?: string;
  children?: React.ReactNode;
};

const TagLink: React.FC<TagLinkProps> = ({ href, children }) => {
  return (
    <span className="relative group/tag">
      <Link
        className="text-[#b3d734] text-[12px] inline-block hover:text-[#e74949] transition-colors"
        href={href!}
      >
        {children}
      </Link>
      <div className="absolute top-full left-0 hidden group-hover/tag:block mt-2">
        <div
          className={clsx(
            "flex w-[300px] z-10 bg-[#1f1f1f] shadow-xl rounded-[3px] p-[15px]",
            "before:w-0 before:h-0 before:content-normal before:block before:border-r-[7.5px] before:border-l-[7.5px] before:border-b-[10px] before:border-solid before:border-[transparent_transparent_#1f1f1f] before:absolute before:left-[15px] before:bottom-full"
          )}
        >
          <TagButton variant="red">Obserwuj</TagButton>
          <TagButton>Czarna lista</TagButton>
        </div>
      </div>
    </span>
  );
};

export default TagLink;
