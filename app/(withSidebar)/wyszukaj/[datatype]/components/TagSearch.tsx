import SearchResultBox from "./SearchResultBox";
import TagBox from "./TagBox";
import getTags from "@/app/actions/search/getTags";

type TagSearchProps = {
  pharse: string;
};

const TagSearch: React.FC<TagSearchProps> = async ({ pharse }) => {
  const tags = await getTags(pharse);

  return (
    <SearchResultBox title="TAGI">
      {tags && tags.length > 0
        ? tags.map((tag) => <TagBox key={tag.id} tag={tag} />)
        : "Nie znaleziono ..."}
    </SearchResultBox>
  );
};

export default TagSearch;
