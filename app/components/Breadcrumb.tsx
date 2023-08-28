"use client";

import { CSSProperties } from "react";

type BreadcrumbProps = {
  children?: React.ReactNode;
  currentNode: string;
  styles?: CSSProperties;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  children,
  currentNode,
  styles,
}) => {
  const solo = children instanceof Array;

  return (
    <div
      className="mb-[15px] text-[14px] md:ml-[45px]"
      style={styles ? styles : {}}
    >
      {children &&
        (solo ? (
          children
            ?.filter((item) => item !== null)
            .map((el, i) => (
              <span
                className="text-[12px] relative after:content-['>'] after:text-[#777] after:inline-block after:m-[0_5px]"
                key={i}
              >
                {el}
              </span>
            ))
        ) : (
          <span className="text-[12px] relative after:content-['>'] after:text-[#777] after:inline-block after:m-[0_5px]">
            {children}
          </span>
        ))}
      <span className={"text-[12px] relative text-[#777]"}>{currentNode}</span>
    </div>
  );
};

export default Breadcrumb;
