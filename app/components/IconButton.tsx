"use client";

type IconButtonProps = {
  children: React.ReactNode;
  onClick?: (_e: React.MouseEvent<HTMLButtonElement>) => void;
};

const IconButton: React.FC<IconButtonProps> = ({ children, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center text-[16px]"
    >
      {children}
    </button>
  );
};

export default IconButton;
