import { categories } from "@/app/data/categories";
import CategoryLink from "./components/categories/CategoryLink";
import CategorySubLink from "./components/categories/CategorySubLink";

const Categories = () => {
  return (
    <>
      {categories.map((column, i) => (
        <div
          key={i}
          className="p-[15px] w-[50%] first:border-r last:border-l border-[#313131]"
        >
          {column.map((category) => (
            <div key={category.href} className="mb-[10px] text-[13px]">
              <div className="flex items-center">
                <CategoryLink href={category.href}>
                  {category.title}
                </CategoryLink>
                {category.nsfw && (
                  <sup className="text-[9px] ml-[5px] text-[#c03e3f]">+18</sup>
                )}
              </div>
              {category?.childrens && (
                <ul className="p-0 list-none mt-[5px] mr-[10px] ml-[5px]">
                  {category.childrens.map((subCategory) => (
                    <CategorySubLink
                      key={subCategory.href}
                      href={subCategory.href}
                    >
                      {subCategory.title}
                    </CategorySubLink>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Categories;
