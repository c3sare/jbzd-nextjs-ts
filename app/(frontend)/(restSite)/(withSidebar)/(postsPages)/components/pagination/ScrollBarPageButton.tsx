import Link from "next/link";
import { useSearchParams } from "next/navigation";

type ScrollBarPageButtonProps = {
  active: boolean;
  page: number;
  pageName: string;
};

const ScrollBarPageButton: React.FC<ScrollBarPageButtonProps> = ({
  active,
  page,
  pageName,
}) => {
  const query = useSearchParams();

  const searchParamsString = query.toString().replaceAll("+", "%20");
  const searchParams = searchParamsString ? "?" + searchParamsString : "";

  return (
    <td
      className={
        "p-0 whitespace-nowrap w-[14.285714285714286%] h-[42px] ml-[1px] text-left font-bold text-[14px] box-border overflow-hidden cursor-pointer"
      }
    >
      {active ? (
        <span className="bg-[#929292] block h-[42px] leading-[58px] pl-[6px] text-white">
          <strong>{page}</strong>
        </span>
      ) : (
        <Link
          href={
            page === 1
              ? `/${pageName === "str" ? "" : pageName}${searchParams}`
              : `/${pageName}/${page}${searchParams}`
          }
          className="block h-[42px] leading-[58px] pl-[6px] text-white border-l-[2px] border-l-[hsla(0,_0%,_100%,_0)] hover:text-white hover:bg-gradient-lightred-blackred"
        >
          {page}
        </Link>
      )}
    </td>
  );
};

export default ScrollBarPageButton;
