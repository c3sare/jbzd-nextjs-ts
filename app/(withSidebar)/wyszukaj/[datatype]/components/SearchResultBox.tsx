type SearchResultBoxProps = {
  children?: React.ReactNode;
  title: string;
};

const SearchResultBox: React.FC<SearchResultBoxProps> = ({
  children,
  title,
}) => {
  return (
    <div className="relative w-full bg-[#1f1f1f] mt-[20px] p-[20px]">
      <div className="flex mb-[15px] justify-between text-[12px] text-[#777]">
        <span>{title}</span>
      </div>
      <div className="flex flex-wrap">{children}</div>
    </div>
  );
};

export default SearchResultBox;
