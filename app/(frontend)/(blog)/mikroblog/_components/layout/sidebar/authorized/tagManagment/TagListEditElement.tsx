import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

type TagLinkProps = {
  name: string;
  slug: string;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  disabled?: boolean;
};

const TagListEditElement: React.FC<TagLinkProps> = ({
  name,
  slug,
  onClick,
  disabled,
}) => {
  return (
    <li className="float-left text-[11px] mb-[10px] mr-[10px]">
      <Link
        className="before:content-['#'] block bg-[#1f1f1f] rounded-[3px] rounded-br-none rounded-tr-none p-[3px_10px] float-left text-white text-[14px]"
        href={`/mikroblog/tag/${slug}`}
      >
        {name}
      </Link>
      <button
        onClick={onClick}
        disabled={disabled}
        className="float-left block bg-[#e01d1d] p-[3px_12px] rounded-[3px] rounded-bl-none rounded-tl-none text-white leading-[21px]"
      >
        x
      </button>
    </li>
  );
};

export default TagListEditElement;
