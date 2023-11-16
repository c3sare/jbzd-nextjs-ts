import { getPosts } from "../../../(tabs)/_actions/getPosts";

type GetTagPostsProps = {
  slug: string;
  cursor?: string;
};

export async function getTagPosts({ slug, cursor }: GetTagPostsProps) {
  const posts = getPosts({
    where: {
      tags: {
        some: {
          slug,
        },
      },
      NOT: undefined,
    },
    skip: cursor ? 1 : 0,
    cursor: cursor
      ? {
          id: cursor,
        }
      : undefined,
  });

  return posts;
}
