import dot from "dot-object";

export default function objectToFormData(data: any) {
  const obj = dot.dot(data);

  const fd = new FormData();

  Object.keys(obj).forEach((item) => {
    if (obj[item] instanceof File) {
      fd.append(item, obj[item]);
    } else if (typeof obj[item] === "object") {
      fd.append(item, `object:${JSON.stringify(obj[item])}`);
    } else {
      fd.append(item, `${typeof obj[item]}:` + obj[item]);
    }
  });

  return fd;
}
