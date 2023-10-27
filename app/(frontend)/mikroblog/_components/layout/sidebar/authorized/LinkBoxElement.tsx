import Link from "next/link";

type LinkBoxElementProps = {
  children?: React.ReactNode;
  href: string;
};

const LinkBoxElement: React.FC<LinkBoxElementProps> = ({ children, href }) => {
  return (
    <li className="float-left text-[11px] mr-[15px]">
      <Link className="text-white text-[14px]" href={href}>
        {children}
      </Link>
    </li>
  );
};

export default LinkBoxElement;
