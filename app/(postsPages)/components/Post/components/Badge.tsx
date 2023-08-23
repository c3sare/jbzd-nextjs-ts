import Image from "next/image";

const badgeImage = {
  rock: "/images/likes/rock.png",
  silver: "/images/likes/silver.png",
  gold: "/images/likes/gold.png",
};

type BadgeProps = {
  title: string;
  count: number;
  name: "rock" | "silver" | "gold";
};

const Badge: React.FC<BadgeProps> = ({ title, count, name }) => {
  return (
    count > 0 && (
      <div className="flex flex-nowrap gap-[2px] justify-center items-center relative group">
        <Image src={badgeImage[name]} alt={title} />
        <span className="text-[12px] font-bold">{count}</span>
        <div className="absolute bottom-full left-1/2 translate-x--1/2 group-hover:block">
          {title}
        </div>
      </div>
    )
  );
};

export default Badge;
