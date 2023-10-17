const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="mt-[46px] flex justify-center items-stretch min-h-[calc(100vh-115px)] flex-wrap max-w-[1116px] px-[5px] m-auto">
    {children}
  </div>
);

export default Wrapper;
