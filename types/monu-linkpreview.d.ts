declare module "monu-linkpreview" {
  interface LinkPreviewReturn {
    description: string;
    domain: string;
    img: string;
    origin: string;
    title: string;
  }

  declare function getLinkPreview(uri: string): Promise<LinkPreviewReturn>;

  export = getLinkPreview;
}
