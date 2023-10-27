type BoxProps = {
  children?: React.ReactNode;
  title: string;
};

const Box: React.FC<BoxProps> = ({ children, title }) => {
  return (
    <div className="p-[15px_15px_10px] w-full float-left bg-[#313131] pb-[24px]">
      <h4 className="text-[11px] font-bold text-[#6e7578] m-[0_0_8px]">
        {title}
      </h4>
      <ul className="mb-[5px]">{children}</ul>
    </div>
  );
};

export default Box;
