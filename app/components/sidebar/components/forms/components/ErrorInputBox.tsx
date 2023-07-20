"use client";

const InputErrorContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="hidden absolute top-[calc(100%+8px)] left-[50%] translate-x-[-50%] group-hover:block bg-[#c03e3e] px-1 py-1 whitespace-nowrap rounded-md text-[10px]">
      {children}
      <div className="h-0 w-0 border-x-4 border-x-transparent border-b-[6px] border-b-[#c03e3e] absolute left-[50%] bottom-[100%] translate-x-[-50%]" />
    </div>
  );
};

export default InputErrorContainer;
