import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  ...rest
}) => (
  <button
    className={clsx(
      "inline-flex items-center px-[25px] text-center h-[34px] text-[11px] bg-[#c23d3a] font-semibold text-white transition-colors ease-in-out",
      "disabled:opacity-50",
      "hover:bg-[#732423]"
    )}
    type={type}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
