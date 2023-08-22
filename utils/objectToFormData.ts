import dot from "dot-object";

export default function objectToFormData(data: any) {
  const obj = dot.dot(data);

  const fd = new FormData();

  Object.keys(obj).forEach((item) => {
    fd.append(item, obj[item]);
  });

  console.log(fd);
  return fd;
}
