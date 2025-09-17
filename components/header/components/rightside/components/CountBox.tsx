type CountBoxProps = {
  count: number;
};

const CountBox: React.FC<CountBoxProps> = ({ count }) => {
  return (
    count > 0 && (
      <span className="absolute text-white bg-[#b23333] z-10 right-[-12px] top-[-7px] text-[10px] px-[5px] h-[16px] leading-[16px] text-center">
        {count}
      </span>
    )
  );
};

export default CountBox;
