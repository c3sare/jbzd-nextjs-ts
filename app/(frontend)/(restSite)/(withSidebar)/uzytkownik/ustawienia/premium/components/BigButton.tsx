import clsx from "clsx";
import Link from "next/link";
import { HTMLAttributes } from "react";

type BigButtonProps = {
  href: string;
  children?: React.ReactNode;
  className?: HTMLAttributes<HTMLButtonElement>["className"];
};

const BigButton: React.FC<BigButtonProps> = ({ href, children, className }) => {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-block p-[0_30px] rounded-[5px] font-bold text-white bg-[linear-gradient(180deg,#94b425_0,#8dac20_50%,#87a61c)] z-10 leading-[40px]",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default BigButton;
