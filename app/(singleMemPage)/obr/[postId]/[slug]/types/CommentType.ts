import {
  Comment,
  CommentVoteMinus,
  CommentVotePlus,
  FavouriteComment,
  Post,
  UserAction,
} from "@prisma/client";

export default interface CommentType extends Comment {
  author: {
    id: string;
    username: string | null;
    image: string | null;
    spears: number;
    rank: number;
    userActions?: UserAction[];
  };
  post?: Post;
  score: number;
  rock: number;
  silver: number;
  gold: number;
  plusVotes?: CommentVotePlus[];
  minusVotes?: CommentVoteMinus[];
  favouriteList?: FavouriteComment[];
  subcomments?: CommentType[];
}
