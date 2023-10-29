import { PropsWithChildren } from "react";
import AddBlogForm from "../_components/layout/blogForm/AddBlogForm";
import BlogNavbar from "../_components/layout/BlogNavbar";
import BlogNavbarItem from "../_components/layout/BlogNavbarItem";
import BlogNavbarFilterItem from "../_components/layout/BlogNavbarFilterItem";
import { getSession } from "@/actions/getSession";

const TabPageLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  const session = await getSession();

  const isAuthorized = Boolean(session?.user?.id);

  return (
    <div className="w-full md:w-2/3 float-left relative min-h-[1px] px-[15px] ">
      {isAuthorized && <AddBlogForm />}
      <BlogNavbar>
        <BlogNavbarItem href="/mikroblog">Najnowsze</BlogNavbarItem>
        <BlogNavbarItem href="/mikroblog/aktywne">Aktywne</BlogNavbarItem>
        <BlogNavbarItem href="/mikroblog/gorace">Gorące</BlogNavbarItem>
        {isAuthorized && (
          <>
            <BlogNavbarItem href="/mikroblog/obserwowane">
              Obserwowane
            </BlogNavbarItem>
            <BlogNavbarItem href="/mikroblog/moje">Moje</BlogNavbarItem>
          </>
        )}
        <li className="float-right ml-auto">
          <ul className="flex flex-wrap">
            <BlogNavbarFilterItem rangeInHours={6} />
            <BlogNavbarFilterItem rangeInHours={12} />
            <BlogNavbarFilterItem rangeInHours={24} />
          </ul>
        </li>
      </BlogNavbar>
      {isAuthorized ? (
        children
      ) : (
        <div className="text-[#666] text-[14px] text-center py-[10px]">
          <span className="pt-[20px]">Zaloguj się aby zobaczyć posty</span>
        </div>
      )}
    </div>
  );
};

export default TabPageLayout;
