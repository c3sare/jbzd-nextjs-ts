type MemTextProps = {
  data: string;
  setData: (val: string) => void;
};

const MemText: React.FC<MemTextProps> = ({ data, setData }) => {
  return <div>text</div>;
};

export default MemText;
