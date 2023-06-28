import Link from "next/link";
import { IconType } from "react-icons/lib";

type MobileMenuLinkButtonProps = {
  icon: IconType;
  href: string;
  children: React.ReactNode;
};

const MobileMenuLinkButton: React.FC<MobileMenuLinkButtonProps> = ({
  icon: Icon,
  href,
  children,
}) => (
  <Link
    href={href}
    className="h-[76px] text-[12px] text-white m-[2px] bg-[#232424] flex items-center justify-center flex-col basis-[calc(25%-4px)]"
  >
    <Icon size={30} />
    <span className="pt-2">{children}</span>
  </Link>
);

export default MobileMenuLinkButton;
