type ModalProps = {
  title: string;
  text: string;
  onClick: () => void;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ title, text, onClick, onClose }) => {
  return (
    <div className="fixed top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center z-[9999]">
      <div className="absolute top-0 left-0 h-full w-full -z-10 bg-black opacity-70" />
      <div className="bg-black text-white shadow-[0_0_5px_rgba(50,50,50,.75)]  w-[98%] p-[15px] max-w-[400px] rounded-[5px] m-[25px_auto]">
        <h5 className="text-[18px] m-[0_0_10px] font-bold w-full text-center">
          {title}
        </h5>
        <p className="text-[14px] leading-[1.3em] pb-[15px] w-full text-center">
          {text}
        </p>
        <div className="flex items-center justify-center p-[15px_0_0]">
          <button className="inline-block relative min-w-[80px] p-[6px_20px] rounded-[4px] text-center cursor-pointer text-[16px] appearance-none bg-[#c03e3e] text-white font-normal m-[0_3px]">
            Tak
          </button>
          <button className="inline-block relative min-w-[80px] p-[6px_20px] rounded-[4px] text-center cursor-pointer text-[16px] appearance-none bg-white text-black font-normal m-[0_3px]">
            Nie
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
