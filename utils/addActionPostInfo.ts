import { getSession } from "@/actions/getSession";
import { PostStats } from "@prisma/client";
import prisma from "@/libs/prismadb";
import { getPremium } from "@/actions/getPremium";

function getActionMethod(
  id: string,
  blockedIdList: string[],
  followedIdList: string[]
) {
  if (blockedIdList.includes(id)) return "BLOCK";
  else if (followedIdList.includes(id)) return "FOLLOW";
  else return "";
}

const addActionPostInfo = async (
  posts: PostStats[],
  blockedUsersIds: string[],
  followedUsersIds: string[],
  blockedTagsIds: string[],
  followedTagsIds: string[]
) => {
  const session = await getSession();

  const isLoggedIn = Boolean(session?.user?.id);

  let favouritePostsIds: string[] = [];

  let votedPostsIds: string[] = [];

  let countOnPage = 8;

  if (isLoggedIn) {
    const user = await prisma.user.findUnique({
      where: {
        id: session!.user!.id,
      },
    });

    if (!user) return null;

    const premium = await getPremium();

    if (premium.isPremium) {
      countOnPage = (premium.premium as any).picsCountOnPage || 8;
    }

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

    posts = posts.map((post: PostStats) => ({
      ...post,
      author: {
        ...post.author,
        action: getActionMethod(
          post.authorId,
          blockedUsersIds,
          followedUsersIds
        ),
      },
      tags: post.tags.map((tag) => ({
        ...tag,
        action: getActionMethod(tag.id, blockedTagsIds, followedTagsIds),
      })),
      isFavourite: favouritePostsIds.includes(post.id),
      isPlused: votedPostsIds.includes(post.id),
    }));
  } else {
    posts = posts.map((post: any) => {
      delete post.author;
      delete post.authorId;
      return post;
    });
  }

  return posts;
};

export default addActionPostInfo;
