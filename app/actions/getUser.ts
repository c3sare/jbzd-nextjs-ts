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
  const user = await prisma.user.aggregateRaw({
    pipeline: [
      {
        $sort: {
          createDate: -1,
        },
      },
      {
        $lookup: {
          from: "UserVote",
          localField: "_id",
          foreignField: "userId",
          as: "spears",
        },
      },
      {
        $set: {
          spears: {
            $cond: {
              if: {
                $isArray: "$spears",
              },
              then: {
                $size: "$spears",
              },
              else: 0,
            },
          },
        },
      },
      {
        $lookup: {
          from: "Post",
          localField: "_id",
          foreignField: "authorId",
          as: "posts",
          pipeline: [
            {
              $lookup: {
                from: "BadgePost",
                localField: "_id",
                foreignField: "postId",
                as: "postBadges",
              },
            },
            {
              $set: {
                rock: {
                  $filter: {
                    input: "$postBadges",
                    as: "badge",
                    cond: {
                      $eq: ["$$badge.type", "ROCK"],
                    },
                  },
                },
                silver: {
                  $filter: {
                    input: "$postBadges",
                    as: "badge",
                    cond: {
                      $eq: ["$$badge.type", "SILVER"],
                    },
                  },
                },
                gold: {
                  $filter: {
                    input: "$postBadges",
                    as: "badge",
                    cond: {
                      $eq: ["$$badge.type", "GOLD"],
                    },
                  },
                },
              },
            },
            {
              $set: {
                rock: {
                  $cond: {
                    if: {
                      $isArray: "$rock",
                    },
                    then: {
                      $size: "$rock",
                    },
                    else: 0,
                  },
                },
                silver: {
                  $cond: {
                    if: {
                      $isArray: "$silver",
                    },
                    then: {
                      $size: "$silver",
                    },
                    else: 0,
                  },
                },
                gold: {
                  $cond: {
                    if: {
                      $isArray: "$gold",
                    },
                    then: {
                      $size: "$gold",
                    },
                    else: 0,
                  },
                },
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "Comment",
          localField: "_id",
          foreignField: "authorId",
          as: "comments",
          pipeline: [
            {
              $lookup: {
                from: "BadgeComment",
                localField: "_id",
                foreignField: "commentId",
                as: "commentBadges",
              },
            },
            {
              $set: {
                rock: {
                  $filter: {
                    input: "$commentBadges",
                    as: "badge",
                    cond: {
                      $eq: ["$$badge.type", "ROCK"],
                    },
                  },
                },
                silver: {
                  $filter: {
                    input: "$commentBadges",
                    as: "badge",
                    cond: {
                      $eq: ["$$badge.type", "SILVER"],
                    },
                  },
                },
                gold: {
                  $filter: {
                    input: "$commentBadges",
                    as: "badge",
                    cond: {
                      $eq: ["$$badge.type", "GOLD"],
                    },
                  },
                },
              },
            },
            {
              $set: {
                rock: {
                  $cond: {
                    if: {
                      $isArray: "$rock",
                    },
                    then: {
                      $size: "$rock",
                    },
                    else: 0,
                  },
                },
                silver: {
                  $cond: {
                    if: {
                      $isArray: "$silver",
                    },
                    then: {
                      $size: "$silver",
                    },
                    else: 0,
                  },
                },
                gold: {
                  $cond: {
                    if: {
                      $isArray: "$gold",
                    },
                    then: {
                      $size: "$gold",
                    },
                    else: 0,
                  },
                },
              },
            },
          ],
        },
      },
      {
        $set: {
          rock: {
            $add: [{ $sum: "$comments.rock" }, { $sum: "$posts.rock" }],
          },
          silver: {
            $add: [{ $sum: "$comments.silver" }, { $sum: "$posts.silver" }],
          },
          gold: {
            $add: [{ $sum: "$comments.gold" }, { $sum: "$posts.gold" }],
          },
          comments: {
            $cond: {
              if: {
                $isArray: "$comments",
              },
              then: {
                $size: "$comments",
              },
              else: 0,
            },
          },
          posts: {
            $cond: {
              if: {
                $isArray: "$posts",
              },
              then: {
                $size: "$posts",
              },
              else: 0,
            },
          },
          acceptedPosts: {
            $filter: {
              input: "$posts",
              as: "post",
              cond: {
                $eq: ["$$post.accepted", true],
              },
            },
          },
        },
      },
      {
        $set: {
          acceptedPosts: {
            $cond: {
              if: {
                $isArray: "$acceptedPosts",
              },
              then: {
                $size: "$acceptedPosts",
              },
              else: 0,
            },
          },
        },
      },
      {
        $setWindowFields: {
          partitionBy: "$state",
          sortBy: {
            spears: -1,
          },
          output: {
            rank: {
              $documentNumber: {},
            },
          },
        },
      },
      {
        $unset: [
          "name",
          "email",
          "emailVerified",
          "updatedAt",
          "hashedPassword",
          "gender",
          "country",
          "city",
          "birthdate",
        ],
      },
      {
        $match: {
          username,
        },
      },
    ],
  });

  type User = {
    _id: string;
    image: string;
    createdAt: { $date: string };
    username: string;
    spears: number;
    posts: number;
    comments: number;
    rock: number;
    silver: number;
    gold: number;
    acceptedPosts: number;
    rank: number;
  };

  const newUser: User = JSON.parse(JSON.stringify(user[0]));

  return newUser;
}
