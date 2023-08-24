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
      <div className="inline-flex mx-1 pt-2 flex-nowrap gap-[2px] justify-center items-center">
        <div className="relative group">
          <Image
            src={badgeImage[name]}
            width={18}
            height={18}
            className="h-auto"
            alt={title}
          />
          <div className="bg-black p-[4px_8px] rounded-md text-[10px] absolute bottom-[calc(100%_+_4px)] left-1/2 whitespace-nowrap translate-x-[-50%] hidden group-hover:block">
            {title}
          </div>
        </div>
        <span className="text-[12px] font-bold">{count}</span>
      </div>
    )
  );
};

export default Badge;
