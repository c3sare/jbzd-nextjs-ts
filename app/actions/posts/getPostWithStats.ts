import prisma from "@/app/libs/prismadb";
import { getSession } from "../getSession";
import { PostStats, TagAction, UserAction } from "@prisma/client";
import { PostType } from "@/app/(postsPages)/components/types/PostType";

export async function getPostWithStats(id: string, slug: string) {
  try {
    const session = await getSession();

    const isLoggedIn = Boolean(session?.user?.id);

    let tagListActioned: TagAction[] = [];
    let blockedTagsIds: string[] = [];

    let post: any = await prisma.postStats.findFirst({
      where: {
        id,
        slug,
      },
    });

    if (!post) return null;

    if (isLoggedIn) {
      const user = await prisma.user.findUnique({
        where: {
          id: session!.user!.id,
        },
      });

      if (!user) return null;

      const favouritePost = await prisma.favouritePost.findFirst({
        where: {
          postId: id,
          authorId: user.id,
        },
      });

      post.isFavourite = favouritePost ? true : false;

      const postVote = await prisma.postVote.findFirst({
        where: {
          postId: id,
          authorId: user.id,
        },
      });

      post.isPlused = postVote ? true : false;

      tagListActioned = await prisma.tagAction.findMany({
        where: {
          authorId: user.id,
        },
      });

      blockedTagsIds = tagListActioned
        .filter((item) => item.method === "BLOCK")
        .map((item) => item.tagId);

      const userListActioned = await prisma.userAction.findFirst({
        where: {
          userId: post.authorId,
          authorId: user.id,
        },
      });

      if (userListActioned) post.author.action = userListActioned.method;
    }

    if (!post) {
      return null;
    }

    if (isLoggedIn)
      post = {
        ...post,
        tags: post.tags.map((tag: any) => ({
          ...tag,
          action:
            tagListActioned.find((action) => action.tagId === tag.id)?.method ||
            "",
        })),
      };
    else {
      delete post.authorId;
      delete post.author;
    }

    return post as PostType;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
