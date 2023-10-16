export default function deleteAuthorDuplicates(arr: any[]) {
  const newArr = arr.filter((item) => item);

  return newArr.filter(
    (item, index) =>
      index === newArr.findIndex((sitem) => sitem!.id === item!.id)
  );
}
