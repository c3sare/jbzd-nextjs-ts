import Link from "next/link";

type TagLinkProps = {
  name: string;
  slug: string;
  count: number;
};

const TagLink: React.FC<TagLinkProps> = ({ name, slug, count }) => {
  return (
    <li className="float-left text-[11px] mr-[15px]">
      <Link className="flex items-end gap-1" href={`/mikroblog/tag/${slug}`}>
        <span className="text-white text-[14px] before:content-['#']">
          {name}
        </span>
        <span className="text-[12px] italic text-[#6e7578]">({count})</span>
      </Link>
    </li>
  );
};

export default TagLink;
