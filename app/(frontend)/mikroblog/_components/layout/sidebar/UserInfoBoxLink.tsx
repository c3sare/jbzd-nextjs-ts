import Link from "next/link";

type UserInfoBoxLinkProps = {
  children?: React.ReactNode;
  href: string;
};

const UserInfoBoxLink: React.FC<UserInfoBoxLinkProps> = ({
  children,
  href,
}) => {
  return (
    <Link
      className="mr-[20px] text-[12px] text-[#b3d734] whitespace-nowrap"
      href={href}
    >
      {children}
    </Link>
  );
};

export default UserInfoBoxLink;
