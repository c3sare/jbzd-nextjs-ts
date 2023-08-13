type MemImageProps = {
  data: File;
  setData: (file: File) => void;
};

const MemImage: React.FC<MemImageProps> = ({ data, setData }) => {
  return <div>obraz</div>;
};

export default MemImage;
