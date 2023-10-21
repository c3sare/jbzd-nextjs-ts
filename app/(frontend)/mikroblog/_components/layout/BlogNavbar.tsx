import { PropsWithChildren } from "react";

const BlogNavbar: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ul className="flex border-b border-b-[#4a4a4a] mb-[25px] flex-wrap">
      {children}
    </ul>
  );
};

export default BlogNavbar;
