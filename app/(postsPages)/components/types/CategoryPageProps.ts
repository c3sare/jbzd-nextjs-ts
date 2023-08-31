import { PageSearchParams } from "./PageSearchParams";

export type CategoryPageProps = {
  params: {
    index: string;
    category: string;
  };
  searchParams: PageSearchParams;
};
