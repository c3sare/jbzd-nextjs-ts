export default function isValidBase64Format(str: string) {
  const regexp =
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/;
  console.log(str);
  return regexp.test(str.replace("data:image/png;base64,", ""));
}
