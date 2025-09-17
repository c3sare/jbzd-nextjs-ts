import clsx from "clsx";

type MainProps = {
  border?: boolean;
  children?: React.ReactNode;
};

const Main: React.FC<MainProps> = ({ children, border = true }) => (
  <main
    id="content"
    className={clsx(
      "pt-0 pb-[25px] max-w-full md:max-w-[750px] bg-[#252525] flex-1 md:flex-[0_0_750px] p-[15px_0] md:p-[15px_0_25px]",
      border && "md:pr-[20px] xl:border-r md:border-r-[#1d1d1d]"
    )}
  >
    {children}
  </main>
);

export default Main;
