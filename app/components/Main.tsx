const Main: React.FC<React.PropsWithChildren> = ({ children }) => (
  <main
    id="content"
    className="pt-0 pb-[25px] xl:pr-[20px] xl:border-r xl:border-r-[#1d1d1d] max-w-[100%] xl:max-w-[750px] bg-[#252525] flex-[1] xl:flex-[0_0_750px]"
  >
    {children}
  </main>
);

export default Main;
