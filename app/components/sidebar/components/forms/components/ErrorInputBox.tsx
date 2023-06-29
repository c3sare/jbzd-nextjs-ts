"use client";

const InputErrorContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="hidden shadow-lg absolute top-[calc(100%+8px)] left-[50%] lg:left-[unset] translate-x-[-50%] lg:translate-x-0 lg:right-[calc(100%+8px)] lg:top-[50%] lg:translate-y-[-50%] group-hover:block bg-[#c03e3e] px-1 py-1 whitespace-nowrap rounded-md text-[10px]">
      {children}
      <div className="h-0 w-0 border-y-4 border-y-transparent border-l-[6px] border-l-[#c03e3e] absolute left-[100%] top-[50%] translate-y-[-50%] hidden lg:block" />
      <div className="h-0 w-0 border-x-4 border-x-transparent border-b-[6px] border-b-[#c03e3e] absolute left-[50%] bottom-[100%] translate-x-[-50%] lg:hidden" />
    </div>
  );
};

export default InputErrorContainer;
