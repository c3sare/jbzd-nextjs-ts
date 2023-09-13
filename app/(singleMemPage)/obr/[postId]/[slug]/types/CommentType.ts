import {
  Comment,
  CommentVoteMinus,
  CommentVotePlus,
  FavouriteComment,
  Post,
} from "@prisma/client";

export default interface CommentType extends Comment {
  author: {
    id: string;
    username: string | null;
    image: string | null;
  };
  post?: Post;
  _count: {
    pluses: number;
    minuses: number;
    rock: number;
    silver: number;
    gold: number;
  };
  pluses?: CommentVotePlus[];
  minuses?: CommentVoteMinus[];
  favouriteList?: FavouriteComment[];
  subcomments?: CommentType[];
}
