import Link from "next/link";
import { PostType } from "../../types/PostType";

type CategoriesProps = {
  category: PostType["category"];
};

const Categories: React.FC<CategoriesProps> = ({ category }) => {
  return (
    <>
      {category.parent && (
        <>
          <Link href={`/${category.parent.slug}`}>{category.parent.name}</Link>
          <span>{" > "}</span>
        </>
      )}
      <Link href={`/${category.slug}`}>{category.name}</Link>
    </>
  );
};

export default Categories;
