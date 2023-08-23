type MemTextProps = {
  html: string;
};

const MemText: React.FC<MemTextProps> = ({ html }) => {
  return (
    <div
      className="w-full bg-[#000] text-[18px] leading-[30px] text-white overflow-hidden p-[10px_15px]"
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
};

export default MemText;
