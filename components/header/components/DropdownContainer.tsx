type DropdownContainer = {
  children: React.ReactNode;
};

const DropdownContainer: React.FC<DropdownContainer> = ({ children }) => {
  return (
    <div className="absolute top-[46px] lg:top-[100%] right-[50%] translate-x-[50%] lg:translate-x-0 lg:right-0 flex flex-col justify-center items-center w-full lg:w-[300px] z-10 m-0 p-0 border border-[#181818]">
      {children}
    </div>
  );
};

export default DropdownContainer;
