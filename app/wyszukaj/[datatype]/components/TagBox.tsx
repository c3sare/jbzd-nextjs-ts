import { Tag } from "@prisma/client";
import Link from "next/link";

type TagBoxProps = {
  tag: {
    id: string;
    name: string;
    slug: string;
  };
};

const TagBox: React.FC<TagBoxProps> = ({ tag }) => {
  return (
    <Link
      className="text-left text-[15px] border border-[#464646] m-[5px] text-white p-[5px]"
      href={`/tag/${tag.id}/${tag.slug}`}
    >
      #{tag.name}
    </Link>
  );
};

export default TagBox;
