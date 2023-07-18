const Main: React.FC<React.PropsWithChildren> = ({ children }) => (
  <main
    id="content"
    className="pt-0 pb-[25px] md:pr-[20px] xl:border-r md:border-r-[#1d1d1d] max-w-[100%] md:max-w-[750px] bg-[#252525] flex-[1] md:flex-[0_0_750px] p-[15px_0] md:p-[15px_0_25px]"
  >
    {children}
  </main>
);

export default Main;
