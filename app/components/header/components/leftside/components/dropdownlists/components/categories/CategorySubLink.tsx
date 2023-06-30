import Link from "next/link";

type CategoryLinkProps = {
  children: React.ReactNode;
  href: string;
};

const CategorySubLink: React.FC<CategoryLinkProps> = ({ children, href }) => {
  return (
    <Link
      href={href}
      className="text-[#8f8f8f] block text-[1em] hover:underline my-[3px]"
    >
      {children}
    </Link>
  );
};

export default CategorySubLink;
