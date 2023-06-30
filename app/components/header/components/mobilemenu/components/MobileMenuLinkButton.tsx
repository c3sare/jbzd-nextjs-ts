import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons/lib";

type MobileMenuLinkButtonProps = {
  icon: IconType;
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
};

const MobileMenuLinkButton: React.FC<MobileMenuLinkButtonProps> = ({
  icon: Icon,
  href,
  children,
  disabled,
}) => (
  <Link
    href={href}
    className={clsx(
      `h-[76px] text-[12px] text-white m-[2px] flex items-center justify-center flex-col basis-[calc(25%-4px)]`,
      disabled &&
        "text-neutral-500 pointer-events-none cursor-default bg-transparent",
      !disabled && "bg-[#232424]"
    )}
  >
    <Icon size={30} />
    <span className="pt-2">{children}</span>
  </Link>
);

export default MobileMenuLinkButton;
