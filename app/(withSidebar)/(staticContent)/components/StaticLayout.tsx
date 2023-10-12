import Breadcrumb from "@/app/components/Breadcrumb";
import Link from "next/link";

type StaticLayoutProps = {
  children?: React.ReactNode;
  title: string;
};

const StaticLayout: React.FC<StaticLayoutProps> = ({ children, title }) => {
  return (
    <>
      <Breadcrumb currentNode={title} styles={{ marginLeft: 0 }}>
        <Link href="/">Strona główna</Link>
      </Breadcrumb>
      <h1 className="text-[2em] text-bold my-[0.67em] font-bold">{title}</h1>
      <div className="text-[14px] leading-[20px] break-words">{children}</div>
    </>
  );
};

export default StaticLayout;
