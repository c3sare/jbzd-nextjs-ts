import htmlToReact from "./htmlToReact";

type AssetList = {
  id: string;
  type: "IMAGE" | "VIDEO";
  url: string;
}[];

export default function transformText(str: string, assetList: AssetList) {
  const userRegex = /@\[([a-zA-Z0-9_\-]){2,25}]/gim;
  const tagRegex = /#([a-zA-Z0-9]){3,32}/gim;
  const imageRegex =
    /\[image hash=([A-Za-z0-9]){8}-([A-Za-z0-9]){4}-([A-Za-z0-9]){4}-([A-Za-z0-9]){4}-([A-Za-z0-9]){12}\]/gim;
  const videoRegex =
    /\[video hash=([A-Za-z0-9]){8}-([A-Za-z0-9]){4}-([A-Za-z0-9]){4}-([A-Za-z0-9]){4}-([A-Za-z0-9]){12}\]/gim;

  const users = str.match(userRegex) || [];
  const tags = str.match(tagRegex) || [];
  const images = str.match(imageRegex) || [];
  const videos = str.match(videoRegex) || [];

  const usedImageIds: string[] = [];
  let replaceTab: [string, string][] = [];

  replaceTab = [
    ...replaceTab,
    ...images.map((item) => {
      const img = assetList.find((file) => file.id === item.slice(12, -1));

      if (img) usedImageIds.push(img.id);

      return [item, `<img src="${img?.url}" alt="image" />`] as [
        string,
        string
      ];
    }),
  ];

  replaceTab = [
    ...replaceTab,
    ...videos.map(
      (item) =>
        [
          item,
          `<video src="${
            assetList.find((file) => file.id === item.slice(12, -1))?.url
          }" />`,
        ] as [string, string]
    ),
  ];

  replaceTab = [
    ...replaceTab,
    ...users.map(
      (item) =>
        [
          item,
          `<a id="user" href="/uzytkownik/${item.slice(2, -1)}">@${item.slice(
            2,
            -1
          )}</a>`,
        ] as [string, string]
    ),
  ];

  replaceTab = [
    ...replaceTab,
    ...tags.map(
      (item) =>
        [
          item,
          `<a id="tag" href="/mikroblog/tag/${item
            .slice(1)
            .toLowerCase()}">${item}</a>`,
        ] as [string, string]
    ),
  ];

  replaceTab.forEach(([oldValue, newValue]) => {
    str = str.replaceAll(oldValue, newValue);
  });

  const quoteRegex = /```(.|\r\n|\r|\n)*```/;

  while (str.match(quoteRegex)) {
    const toReplace = str.match(quoteRegex);
    if (toReplace === null) break;

    str = str.replaceAll(toReplace[0], `<q>${toReplace[0].slice(3, -3)}</q>`);
  }

  const boldRegex = /\*\*\*(.|\r\n|\r|\n)*\*\*\*/gim;

  while (str.match(boldRegex)) {
    const toReplace = str.match(boldRegex);
    if (toReplace === null) break;

    str = str.replaceAll(toReplace[0], `<b>${toReplace[0].slice(3, -3)}</b>`);
  }

  const italicRegex = /__(.|\r\n|\r|\n)*__/gim;

  while (str.match(italicRegex)) {
    const toReplace = str.match(italicRegex);
    if (toReplace === null) break;

    str = str.replaceAll(toReplace[0], `<i>${toReplace[0].slice(2, -2)}</i>`);
  }

  str = str
    .split("\n")
    .filter((item) => item)
    .join("\n");

  return { parsed: htmlToReact(str), usedImageIds };
}
