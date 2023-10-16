import { Category } from "@prisma/client";

export type CategoryWithChildren = Category & { children: Category[] };

function getMaxNumber(arr: CategoryWithChildren[]) {
  let max = 1;
  arr.forEach((item) => {
    if (item?.column) if (item.column > max) max = item.column;
  });

  return max;
}

export default function getIn2DArray(arr: CategoryWithChildren[]) {
  const max = getMaxNumber(arr);

  const columns: CategoryWithChildren[][] = [...new Array(max)].map(
    (_item) => []
  );
  arr.forEach((item) => {
    columns[item.column ? item.column - 1 : 0].push(item);
  });
  return columns;
}
