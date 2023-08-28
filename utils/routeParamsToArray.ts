import { ReadonlyURLSearchParams } from "next/navigation";

export default function routeParamsToArray(params: ReadonlyURLSearchParams) {
  const data: {
    param: string;
    value: string;
  }[] = [];

  params.forEach((val, key) => {
    data.push({
      param: key,
      value: val,
    });
  });

  return data;
}
