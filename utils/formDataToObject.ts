import dot from "dot-object";

export default function formDataToObject(formData: FormData) {
  const data: any = {};

  formData.forEach((val, key) => {
    const isEmpty = val === "";
    const isNumber = !isNaN(Number(val)) && val !== "";
    const isBoolean = ["true", "false"].includes(val as string);
    if (isEmpty) {
      data[key] = null;
    } else if (isNumber) {
      data[key] = Number(val);
    } else if (isBoolean) {
      data[key] = val === "true" ? true : false;
    } else {
      data[key] = val;
    }
  });

  return dot.object(data);
}
