import { getPosts } from "../../../(tabs)/_actions/getPosts";

type GetUserPostsProps = {
  cursor?: string;
  userId: string;
};

export async function getUserPosts({ cursor, userId }: GetUserPostsProps) {
  const posts = await getPosts({
    where: {
      NOT: {
        parentId: {
          isSet: true,
        },
      },
      authorId: userId,
    },
    skip: cursor ? 1 : undefined,
    cursor: cursor
      ? {
          id: cursor,
        }
      : undefined,
  });

  console.log(posts);

  return posts;
}
