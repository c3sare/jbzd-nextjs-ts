import { BadgeComment, BadgePost, Post, User } from "@prisma/client";
import prisma from "../libs/prismadb";

function sumValuesFromArray(arr: number[]) {
  let sum = 0;
  arr.forEach((item) => {
    if (typeof item === "number") {
      sum += item;
    }
  });

  return sum;
}

export default async function getUser(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      _count: {
        select: {
          actionedByUsers: {},
        },
      },
      posts: {
        include: {
          badges: true,
        },
      },
      comments: {
        include: {
          commentBadges: true,
        },
      },
    },
  });

  type userType = typeof user;

  if (!user) return {};

  function getPostBadgeCount(
    user: userType,
    badgeType: "ROCK" | "SILVER" | "GOLD"
  ) {
    return sumValuesFromArray(
      user!.posts.map(
        (item) => item.badges.filter((badge) => badge.type === badgeType).length
      )
    );
  }

  function getCommentBadgeCount(
    user: userType,
    badgeType: "ROCK" | "SILVER" | "GOLD"
  ) {
    return sumValuesFromArray(
      user!.comments.map(
        (item) =>
          item.commentBadges.filter((badge) => badge.type === badgeType).length
      )
    );
  }

  const badges = {
    rock: getPostBadgeCount(user, "ROCK") + getCommentBadgeCount(user, "ROCK"),
    silver:
      getPostBadgeCount(user, "SILVER") + getCommentBadgeCount(user, "SILVER"),
    gold: getPostBadgeCount(user, "GOLD") + getCommentBadgeCount(user, "GOLD"),
  };

  return {
    username: user.username,
    createdAt: user.createdAt,
    image: user.image,
    posts: {
      accepted: user.posts.filter((item) => item.accepted).length,
      all: user.posts.length,
    },
    badges,
    spears: user._count.actionedByUsers,
    comments: user.comments.length,
  };
}
