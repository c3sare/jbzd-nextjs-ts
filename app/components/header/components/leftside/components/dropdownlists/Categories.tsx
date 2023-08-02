import CategoryLink from "./components/categories/CategoryLink";
import CategorySubLink from "./components/categories/CategorySubLink";
import getIn2DArray from "@/app/libs/getIn2DArray";
import { getCategories } from "@/app/actions/getCategories";

const Categories = async () => {
  const categories = await getCategories();

  const categoriesInColumns = getIn2DArray(categories);

  return (
    <>
      {categoriesInColumns.map((column, i) => (
        <div
          key={i}
          className="p-[15px] w-[50%] first:border-r last:border-l border-[#313131]"
        >
          {column.map((category) => {
            return (
              <div key={category.slug} className="mb-[10px] text-[13px]">
                <div className="flex items-center">
                  <CategoryLink href={"/" + category.slug}>
                    {category.name}
                  </CategoryLink>
                  {category.nsfw && (
                    <sup className="text-[9px] ml-[5px] text-[#c03e3f]">
                      +18
                    </sup>
                  )}
                </div>
                {category?.children && (
                  <ul className="p-0 list-none mt-[5px] mr-[10px] ml-[5px]">
                    {category.children.map((subCategory) => (
                      <CategorySubLink
                        key={subCategory.slug}
                        href={"/" + subCategory.slug}
                      >
                        {subCategory.name}
                      </CategorySubLink>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};

export default Categories;
