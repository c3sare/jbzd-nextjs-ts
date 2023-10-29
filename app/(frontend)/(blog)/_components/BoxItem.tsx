import Link from "next/link";

type BoxItemProps = {
  name: string;
  href: string;
  count: number;
};

const BoxItem: React.FC<BoxItemProps> = ({ name, href, count }) => {
  return (
    <li className="float-left text-[11px] mr-[15px]">
      <Link className="text-[12px] text-white" href={href}>
        #{name}{" "}
        <span className="text-[12px] italic text-[#6e7578]">({count})</span>
      </Link>
    </li>
  );
};

export default BoxItem;
