import { PageSearchParams } from "./PageSearchParams";

export type TagPageProps = {
  params: {
    index: string;
    tagId: string;
    slug: string;
  };
  searchParams: PageSearchParams;
};
