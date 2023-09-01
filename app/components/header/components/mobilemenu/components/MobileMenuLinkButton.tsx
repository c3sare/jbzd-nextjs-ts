import clsx from "clsx";
import Link from "next/link";
import { IconType } from "@react-icons/all-files";

type MobileMenuLinkButtonProps = {
  icon: IconType;
  href?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

const MobileMenuLinkButton: React.FC<MobileMenuLinkButtonProps> = ({
  icon: Icon,
  href,
  children,
  disabled,
  onClick,
}) => {
  const className = clsx(
    `h-[76px] text-[12px] text-white m-[2px] flex items-center justify-center flex-col basis-[calc(25%-4px)]`,
    disabled &&
      "text-neutral-500 pointer-events-none cursor-default bg-transparent",
    !disabled && "bg-[#232424]"
  );

  const content = (
    <>
      <Icon size={30} />
      <span className="pt-2">{children}</span>
    </>
  );

  if (href)
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  else {
    return (
      <button className={className} onClick={onClick}>
        {content}
      </button>
    );
  }
};

export default MobileMenuLinkButton;
