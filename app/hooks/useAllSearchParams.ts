import routeParamsToObject from "@/utils/routeParamsToObject";
import { useSearchParams } from "next/navigation";

export default function useAllSearchParams() {
  const params = useSearchParams();

  return routeParamsToObject(params);
}
