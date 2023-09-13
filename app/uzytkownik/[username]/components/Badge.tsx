"use client";

import Image from "next/image";

type BadgeProps = {
  image: string;
  name: string;
  count: number;
};

const Badge: React.FC<BadgeProps> = ({ image, name, count }) => {
  return (
    <div className="w-[max-content] flex justify-center items-center gap-1">
      <div className="relative group">
        <Image src={image} alt={name} width={28} height={29.5} />
        <div className="hidden group-hover:block absolute bottom-[calc(100%+4px)] left-[50%] translate-x-[-50%] bg-black text-[11px] whitespace-nowrap p-1">
          {name}
        </div>
      </div>
      <span className="font-bold">{count}</span>
    </div>
  );
};

export default Badge;
