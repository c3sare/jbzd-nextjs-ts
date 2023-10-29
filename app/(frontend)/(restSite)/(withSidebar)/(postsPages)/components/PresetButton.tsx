import useArraySearchParams from "@/hooks/useArraySearchParams";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";

type PresetButtonProps = {
  children?: React.ReactNode;
  preset: "" | "6h" | "12h" | "24h" | "48h" | "7d";
};

const PresetButton: React.FC<PresetButtonProps> = ({ children, preset }) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useArraySearchParams();

  const onClick = () => {
    if (preset === "") {
      router.push(pathname);
    } else {
      const filteredParams = params.filter(
        (param) => !["from", "to", "date-preset"].includes(param.param)
      );
      const paramsString = filteredParams.map(
        (param) => `${param.param}=${param.value}`
      );

      paramsString.unshift(`date-preset=${preset}`);

      router.push(`?${paramsString.join("&")}`);
    }
  };

  const presetParam =
    params.find((item) => item.param === "date-preset")?.value || "";

  const from = params.find((item) => item.param === "from")?.value;
  const to = params.find((item) => item.param === "to")?.value;

  const isActive = presetParam === preset && !from && !to;

  return (
    <button
      onClick={onClick}
      className={clsx(
        "cursor-pointer text-[12px] h-[34px] p-[0_15px] rounded-[4px] flex justify-center items-center font-bold",
        isActive && "bg-[#c03e3f]"
      )}
    >
      {children}
    </button>
  );
};

export default PresetButton;
