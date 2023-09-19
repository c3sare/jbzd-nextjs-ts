"use client";

import Image from "next/image";
import { DOMAttributes } from "react";

type BadgeActionButtonProps = {
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
  cost: number;
  src: string;
  name: string;
};

const BadgeActionButton: React.FC<BadgeActionButtonProps> = ({
  onClick,
  cost,
  src,
  name,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center opacity-60 hover:opacity-100"
    >
      <Image src={src} width={28} height={29.5} alt={name} />
      <div className="font-bold text-[12px] flex flex-row w-full justify-center gap-[5px] items-center">
        <span>{cost}</span>
        <Image src="/images/coin.png" alt="Moneta" width={14} height={14} />
      </div>
    </button>
  );
};

export default BadgeActionButton;
