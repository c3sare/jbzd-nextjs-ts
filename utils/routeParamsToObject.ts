import { ReadonlyURLSearchParams } from "next/navigation";

export default function routeParamsToObject(params: ReadonlyURLSearchParams) {
  let data: {
    [key: string]: string;
  } = {};

  params.forEach((val, key) => {
    data[key] = val;
  });

  return data;
}
