import Image from "next/image";

const badgeImageSrc = {
  rock: "/images/likes/rock.png",
  silver: "/images/likes/silver.png",
  gold: "/images/likes/gold.png",
};

const cost = {
  rock: 100,
  silver: 400,
  gold: 1000,
};

type AddBadgeButtonProps = {
  name: "rock" | "silver" | "gold";
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const AddBadgeButton: React.FC<AddBadgeButtonProps> = ({
  title,
  name,
  onClick,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-1 w-full h-[51px] text-center text-white cursor-pointer opacity-50 hover:opacity-100"
    >
      <Image
        src={badgeImageSrc[name]}
        alt={title}
        width={28}
        height={28}
        className="h-auto"
      />
      <div className="w-full flex gap-[5px] justify-center items-center">
        <span className="text-[12px] font-bold">{cost[name]}</span>
        <Image
          src="/images/coin.png"
          alt="Moneta"
          width={14}
          height={14}
          className="h-auto"
        />
      </div>
    </button>
  );
};

export default AddBadgeButton;
