type MemVideoProps = {
  data: File;
  setData: (val: File) => void;
};

const MemVideo: React.FC<MemVideoProps> = ({ data, setData }) => {
  return <div>video</div>;
};

export default MemVideo;
