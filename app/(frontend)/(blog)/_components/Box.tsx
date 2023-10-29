type BoxProps = {
  title: string;
  children?: React.ReactNode;
};

const Box: React.FC<BoxProps> = ({ title, children }) => {
  return (
    <div className="bg-[#313131] mb-[24px]">
      <h4 className="text-[18px] text-white mb-[25px]">{title}</h4>
      <ul>{children}</ul>
    </div>
  );
};

export default Box;
