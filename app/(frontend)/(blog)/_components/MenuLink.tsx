import clsx from "clsx";
import Link from "next/link";

type MenuLinkProps = {
  title: string;
  href: string;
  isActive?: boolean;
};

const MenuLink: React.FC<MenuLinkProps> = ({ title, href, isActive }) => {
  return (
    <li
      className={clsx(
        "w-full text-[15px] font-semibold leading-[33px] relative"
      )}
    >
      <Link
        className={clsx(
          "inline-block text-[18px] overflow-hidden text-white p-[0_0_7px]",
          "relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-white",
          isActive
            ? "after:opacity-100"
            : "hover:after:opacity-100 after:opacity-0"
        )}
        href={href}
      >
        {title}
      </Link>
    </li>
  );
};

export default MenuLink;
