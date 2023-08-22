import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PresetButtonProps = {
  children?: React.ReactNode;
  preset: "" | "6h" | "12h" | "24h" | "48h" | "7d";
};

const PresetButton: React.FC<PresetButtonProps> = ({ children, preset }) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const onClick = () => {
    if (preset === "") {
      router.push(pathname);
    } else {
      router.push("?date-preset=" + preset);
    }
  };

  const presetParam = params.get("date-preset")
    ? params.get("date-preset")
    : "";

  const isActive = presetParam === preset;

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
