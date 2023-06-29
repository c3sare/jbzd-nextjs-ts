"use client";

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: (_e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type,
  disabled,
}) => {
  return (
    <div className="flex justify-end my-2">
      <button
        disabled={disabled}
        onClick={onClick}
        type={type || "button"}
        className="w-full max-w-none bg-[#c03e3e] rounded-[5px] font-normal text-[13px] outline-none h-[30px] disabled:opacity-80"
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
