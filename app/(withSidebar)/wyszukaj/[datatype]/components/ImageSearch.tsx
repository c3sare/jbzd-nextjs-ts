import getPosts from "@/app/actions/search/getPosts";
import ImageBox from "./ImageBox";
import SearchResultBox from "./SearchResultBox";

type ImageSearchProps = {
  pharse: string;
};

const ImageSearch: React.FC<ImageSearchProps> = async ({ pharse }) => {
  const images = await getPosts(pharse);
  return (
    <SearchResultBox title="OBRAZKI">
      {images && images.length > 0
        ? images.map((post) => <ImageBox key={post.id} post={post} />)
        : "Nie znaleziono ..."}
    </SearchResultBox>
  );
};

export default ImageSearch;
