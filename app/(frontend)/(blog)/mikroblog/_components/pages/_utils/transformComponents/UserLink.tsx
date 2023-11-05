import Link from "next/link";

type UserLinkProps = {
  href?: string;
  children?: React.ReactNode;
};

const UserLink: React.FC<UserLinkProps> = ({ href, children }) => {
  return (
    <Link
      className="text-[#c23d3a] text-[12px] inline-block hover:text-[#cf6260] transition-colors"
      href={href!}
    >
      {children}
    </Link>
  );
};

export default UserLink;
