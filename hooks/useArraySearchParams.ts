import routeParamsToArray from "@/utils/routeParamsToArray";
import { useSearchParams } from "next/navigation";

export default function useAllSearchParams() {
  const params = useSearchParams();

  return routeParamsToArray(params);
}
