import Link from "next/link";

type CategoryLinkProps = {
  children: React.ReactNode;
  href: string;
};

const CategoryLink: React.FC<CategoryLinkProps> = ({ children, href }) => {
  return (
    <Link
      href={href}
      className="block text-sm font-bold text-white hover:underline"
      prefetch={false}
    >
      {children}
    </Link>
  );
};

export default CategoryLink;
