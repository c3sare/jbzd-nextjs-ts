import { PropsWithChildren } from "react";

const EmptyBoxElement: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <li className="italic text-[#b6babb] float-left text-[11px] mr-[15px]">
      {children ?? "Brak tagów obserwowanych"}
    </li>
  );
};

export default EmptyBoxElement;
