"use client";

import Link from "next/link";

type DropdownLinkElementProps = {
  children: React.ReactNode;
  href: string;
};

const DropdownLinkElement: React.FC<DropdownLinkElementProps> = ({
  children,
  href,
}) => {
  return (
    <Link
      href={href}
      className="block text-[15px] border-b border-b-transparent mx-3 my-[4px] hover:border-b-[#c03e3f] w-fit"
      prefetch={false}
    >
      {children}
    </Link>
  );
};

export default DropdownLinkElement;
