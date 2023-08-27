import type { PostType } from "../../types/PostType";
import Tag from "./tagList/Tag";

type TagListProps = {
  tags: PostType["tags"];
};

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap my-[10px] relative pr-[25px]">
      {tags.map((tag) => (
        <Tag key={tag.id} tag={tag} />
      ))}
    </div>
  );
};

export default TagList;
