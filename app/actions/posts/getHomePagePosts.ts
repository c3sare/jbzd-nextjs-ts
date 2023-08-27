import prisma from "@/app/libs/prismadb";
import { getSession } from "../getSession";
import { PostStats, TagAction, UserAction } from "@prisma/client";
import { PostType } from "@/app/(postsPages)/components/types/PostType";

type PageParams = {
  page: number;
};

export async function getHomePagePosts(params: PageParams) {
  try {
    const session = await getSession();

    const isLoggedIn = Boolean(session?.user?.id);

    let tagListActioned: TagAction[] = [];
    let userListActioned: UserAction[] = [];

    let blockedUsersIds: string[] = [];
    let blockedTagsIds: string[] = [];

    let favouritePostsIds: string[] = [];

    let votedPostsIds: string[] = [];

    if (isLoggedIn) {
      const user = await prisma.user.findUnique({
        where: {
          id: session!.user!.id,
        },
      });

      if (!user) return null;

      const favouritePosts = await prisma.favouritePost.findMany({
        where: {
          authorId: user.id,
        },
      });

      favouritePostsIds = favouritePosts.map((item) => item.postId);

      const postVotes = await prisma.postVote.findMany({
        where: {
          authorId: user.id,
        },
      });

      votedPostsIds = postVotes.map((item) => item.postId);

      tagListActioned = await prisma.tagAction.findMany({
        where: {
          authorId: user.id,
        },
      });

      blockedTagsIds = tagListActioned
        .filter((item) => item.method === "BLOCK")
        .map((item) => item.tagId);

      userListActioned = await prisma.userAction.findMany({
        where: {
          authorId: user.id,
        },
      });
      blockedUsersIds = userListActioned
        .filter((item) => item.method === "BLOCK")
        .map((item) => item.userId);
    }

    let posts: any = await prisma.postStats.findMany({
      where: {
        accepted: true,
        NOT: {
          tagIds: { hasSome: blockedTagsIds },
          authorId: { in: blockedUsersIds },
        },
      },
    });

    if (!posts) {
      return null;
    }

    if (isLoggedIn)
      posts = posts.map((post: PostStats) => ({
        ...post,
        author: {
          ...post.author,
          action:
            userListActioned.find((action) => action.userId === post.authorId)
              ?.method || "",
        },
        tags: post.tags.map((tag) => ({
          ...tag,
          action:
            tagListActioned.find((action) => action.tagId === tag.id)?.method ||
            "",
        })),
        isFavourite: favouritePostsIds.includes(post.id),
        isPlused: votedPostsIds.includes(post.id),
      }));
    else
      posts = posts.map((post: any) => {
        delete post.author;
        delete post.authorId;
        return post;
      });

    return posts as PostType[];
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
