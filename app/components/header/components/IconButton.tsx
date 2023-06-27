type IconButtonProps = {
  children: React.ReactNode;
  onClick?: (_e: React.MouseEvent<HTMLButtonElement>) => void;
};

const IconButton: React.FC<IconButtonProps> = ({ children, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="ml-[15px] inline-block text-left relative text-[16px]"
    >
      {children}
    </button>
  );
};

export default IconButton;
