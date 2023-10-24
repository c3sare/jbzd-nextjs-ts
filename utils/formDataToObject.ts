import dot from "dot-object";

const parseTypes = (formData: FormData) => {
  const data: any = {};

  formData.forEach((value, key) => {
    if (typeof value !== "string") return (data[key] = value);

    const index = value.indexOf(":");
    if (index < 0) return (data[key] = value);

    const dataType = value.slice(0, index);
    const val = value.slice(index + 1);
    switch (dataType) {
      case "boolean":
        return (data[key] = Boolean(val));

      case "number":
        return (data[key] = Number(val));

      case "object":
        return (data[key] = null);

      case "undefined":
        return (data[key] = undefined);

      default:
        return (data[key] = val);
    }
  });
  console.log(data);
  return data;
};

export default function formDataToObject(formData: FormData) {
  return dot.object(parseTypes(formData));
}
