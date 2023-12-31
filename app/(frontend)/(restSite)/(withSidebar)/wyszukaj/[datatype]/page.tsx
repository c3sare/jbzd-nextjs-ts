import TagSearch from "./components/TagSearch";
import UserSearch from "./components/UserSearch";
import ImageSearch from "./components/ImageSearch";
import { notFound } from "next/navigation";

type SearchPageProps = {
  params: {
    datatype?: string;
  };
  searchParams: {
    pharse?: string;
  };
};

const SearchPage: React.FC<SearchPageProps> = ({
  params: { datatype },
  searchParams: { pharse },
}) => {
  if (
    !datatype ||
    !["wszystko", "tagi", "uzytkownicy", "obrazki"].includes(datatype) ||
    !pharse
  )
    return notFound();

  const isTagVisible = ["wszystko", "tagi"].includes(datatype);

  const isUserVisible = ["wszystko", "uzytkownicy"].includes(datatype);

  const isImageVisible = ["wszystko", "obrazki"].includes(datatype);

  return (
    <>
      {isTagVisible && <TagSearch pharse={pharse} />}
      {isUserVisible && <UserSearch pharse={pharse} />}
      {isImageVisible && <ImageSearch pharse={pharse} />}
    </>
  );
};

export default SearchPage;
