import { IconType } from "@react-icons/all-files";
import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

type ActionButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> & {
  href?: string;
  icon: IconType;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  icon: Icon,
  href,
  ...rest
}) => {
  const className =
    "text-[12px] text-[#c23d3a] flex items-center justify-center gap-2";

  const content = (
    <>
      <Icon size={16} /> {children}
    </>
  );

  if (href)
    return (
      <Link className={className} href={href}>
        {content}
      </Link>
    );
  else
    return (
      <button
        className="text-[12px] text-[#c23d3a] flex items-center justify-center gap-2"
        {...rest}
      >
        {content}
      </button>
    );
};

export default ActionButton;
