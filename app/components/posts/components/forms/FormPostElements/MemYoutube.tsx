type MemYoutubeProps = {
  data: string;
  setData: (val: string) => void;
};

const MemYoutube: React.FC<MemYoutubeProps> = ({ data, setData }) => {
  return (
    <div className="bg-[#1f1f1f] p-[15px]">
      <div>
        <header className="text-white text-[16px] font-bold mb-[10px]">
          Link do filmu Youtube
        </header>
        <input
          className="w-full max-w-full resize-none bg-[#313131] inline-block leading-[38px] text-white placeholder:text-[#808080] px-[10px] border border-[#1f1f1f]"
          placeholder="Wklej link filmu Youtube"
          type="text"
        />
      </div>
    </div>
  );
};

export default MemYoutube;
