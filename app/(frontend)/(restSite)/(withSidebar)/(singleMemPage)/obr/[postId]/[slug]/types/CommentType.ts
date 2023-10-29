import {
  Comment,
  CommentVoteMinus,
  CommentVotePlus,
  FavouriteComment,
  PostStats,
  UserAction,
} from "@prisma/client";

export default interface CommentType extends Comment {
  author: {
    id: string;
    username: string | null;
    image: string | null;
    spears: number;
    rank: number;
    actionedBy?: UserAction[];
  };
  post?: PostStats;
  score: number;
  rock: number;
  silver: number;
  gold: number;
  pluses?: CommentVotePlus[];
  minuses?: CommentVoteMinus[];
  favouriteBy?: FavouriteComment[];
  subcomments?: CommentType[];
}
