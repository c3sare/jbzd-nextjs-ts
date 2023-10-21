import { IconType } from "@react-icons/all-files";
import { ButtonHTMLAttributes } from "react";

type ActionButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> & {
  icon: IconType;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  icon: Icon,
  ...rest
}) => (
  <button
    className="text-[12px] text-[#c23d3a] flex items-center justify-center gap-2"
    {...rest}
  >
    <Icon size={16} /> {children}
  </button>
);

export default ActionButton;
