//use this to create views in mongodb database (prisma is not support views in mongodb)

//command: node createviews.js
import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";

const connect = MongoClient.connect(process.env.DATABASE_URL);

const load = () =>
  connect.then(async (client) => {
    const db = client.db();
    const collections = (await db.listCollections().toArray()).map(
      (collection) => collection.name
    );

    if (!collections.find((collection) => collection === "UserProfile"))
      await db.dropCollection("UserProfile");

    await db.createCollection("UserProfile", {
      viewOn: "User",
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
            from: "CommentStats",
            localField: "_id",
            foreignField: "authorId",
            as: "comments",
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
                  $ifNull: ["$$post.accepted", false],
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
            "notifications",
            "token",
            "tokenExpires",
            "coins",
          ],
        },
      ],
    });

    if (!collections.find((collection) => collection === "UserProfileInfo"))
      await db.dropCollection("UserProfileInfo");

    await db.createCollection("UserProfileInfo", {
      viewOn: "User",
      pipeline: [
        {
          $lookup: {
            from: "Post",
            localField: "_id",
            foreignField: "authorId",
            as: "posts",
          },
        },
        {
          $lookup: {
            from: "Comment",
            localField: "_id",
            foreignField: "authorId",
            as: "comments",
          },
        },
        {
          $set: {
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
                  $ifNull: ["$$post.accepted", false],
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
            "notifications",
            "premium",
            "token",
            "tokenExpires",
            "premiumExpires",
            "coins",
          ],
        },
      ],
    });

    if (!collections.find((collection) => collection === "UserRanking"))
      await db.dropCollection("UserRanking");

    await db.createCollection("UserRanking", {
      viewOn: "User",
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
            "emailVerified",
            "createdAt",
            "updatedAt",
            "hashedPassword",
            "gender",
            "country",
            "city",
            "birthdate",
            "email",
            "notifications",
            "premium",
            "token",
            "tokenExpires",
            "premiumExpires",
            "coins",
          ],
        },
      ],
    });

    if (!collections.find((collection) => collection === "PostStats"))
      await db.dropCollection("PostStats");

    await db.createCollection("PostStats", {
      viewOn: "Post",
      pipeline: [
        /////////////////////////////////
        {
          $lookup: {
            from: "UserRanking",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $set: {
            author: {
              $first: "$author",
            },
          },
        },
        /////////////////////////////////
        {
          $lookup: {
            from: "Comment",
            localField: "_id",
            foreignField: "postId",
            as: "comments",
          },
        },
        {
          $set: {
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
          },
        },
        ///////////////////////////////
        {
          $lookup: {
            from: "Tag",
            localField: "tagIds",
            foreignField: "_id",
            as: "tags",
          },
        },
        ///////////////////////////////
        {
          $lookup: {
            from: "Category",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
            pipeline: [
              {
                $lookup: {
                  from: "Category",
                  localField: "parentId",
                  foreignField: "_id",
                  as: "parent",
                },
              },
              {
                $set: {
                  parent: {
                    $first: "$parent",
                  },
                },
              },
            ],
          },
        },
        {
          $set: {
            category: {
              $first: "$category",
            },
          },
        },
        ///////////////////////////////
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
          $unset: ["postBadges"],
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
        /////////////////////////////
        {
          $lookup: {
            from: "PostVote",
            localField: "_id",
            foreignField: "postId",
            as: "pluses",
          },
        },
        {
          $set: {
            pluses: {
              $cond: {
                if: {
                  $isArray: "$pluses",
                },
                then: {
                  $size: "$pluses",
                },
                else: 0,
              },
            },
          },
        },
        ////////////////////////////
      ],
    });

    if (!collections.find((collection) => collection === "CommentStats"))
      await db.dropCollection("CommentStats");

    await db.createCollection("CommentStats", {
      viewOn: "Comment",
      pipeline: [
        ///////////////////////////////
        {
          $lookup: {
            from: "CommentVotePlus",
            localField: "_id",
            foreignField: "commentId",
            as: "pluses",
          },
        },
        {
          $set: {
            pluses: {
              $cond: {
                if: {
                  $isArray: "$pluses",
                },
                then: {
                  $size: "$pluses",
                },
                else: 0,
              },
            },
          },
        },
        {
          $lookup: {
            from: "CommentVoteMinus",
            localField: "_id",
            foreignField: "commentId",
            as: "minuses",
          },
        },
        {
          $set: {
            minuses: {
              $cond: {
                if: {
                  $isArray: "$minuses",
                },
                then: {
                  $size: "$minuses",
                },
                else: 0,
              },
            },
          },
        },
        ////////////////////////////
        {
          $set: {
            score: {
              $subtract: ["$pluses", "$minuses"],
            },
          },
        },
        {
          $unset: ["pluses", "minuses"],
        },
        ////////////////////////////
        {
          $lookup: {
            from: "CommentRockBadge",
            localField: "_id",
            foreignField: "commentId",
            as: "rock",
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
          },
        },
        ////////////////////////////
        {
          $lookup: {
            from: "CommentSilverBadge",
            localField: "_id",
            foreignField: "commentId",
            as: "silver",
          },
        },
        {
          $set: {
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
          },
        },
        ////////////////////////////
        {
          $lookup: {
            from: "CommentGoldBadge",
            localField: "_id",
            foreignField: "commentId",
            as: "gold",
          },
        },
        {
          $set: {
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
    });

    await client.close();
  });

load();
