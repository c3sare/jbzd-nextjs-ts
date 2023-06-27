import clsx from "clsx";
import { IoMdArrowDropdown } from "react-icons/io";

type MenuButtonDropdownProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
};

const MenuButtonDropdown: React.FC<MenuButtonDropdownProps> = ({
  children,
  content,
  className,
}) => {
  return (
    <div className="relative h-full group">
      <span className="pr-[20px] pl-[8px] text-[15px] flex items-center justify-center h-full border-b border-b-transparent hover:border-b-white cursor-pointer">
        {children}
        <IoMdArrowDropdown className="group-hover:rotate-180" size={16} />
      </span>
      <div
        className={clsx(
          `
            absolute
            top-[100%]
            right-0
            hidden
            bg-[#181818]
            shadow-sm
            border-t
            border-t-[#252525]
            group-hover:flex
        `,
          className ? className : null
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default MenuButtonDropdown;
