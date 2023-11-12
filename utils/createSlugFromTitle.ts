const userRegex = /@\[([a-zA-Z0-9_\-]){2,25}]/gim;
const tagRegex = /#([a-zA-Z0-9]){3,32}/gim;
const imageRegex =
  /\[image hash=([A-Za-z0-9]){8}-([A-Za-z0-9]){4}-([A-Za-z0-9]){4}-([A-Za-z0-9]){4}-([A-Za-z0-9]){12}\]/gim;
const videoRegex =
  /\[video hash=([A-Za-z0-9]){8}-([A-Za-z0-9]){4}-([A-Za-z0-9]){4}-([A-Za-z0-9]){4}-([A-Za-z0-9]){12}\]/gim;

export default function createSlugFromTitle(str: string) {
  str = str.replaceAll(userRegex, "");
  str = str.replaceAll(tagRegex, "");
  str = str.replaceAll(imageRegex, "");
  str = str.replaceAll(videoRegex, "");

  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
  var to = "aaaaaeeeeeiiiiooooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  if (str.length <= 1) return "bez-tytulu";

  return str.slice(0, 50);
}
