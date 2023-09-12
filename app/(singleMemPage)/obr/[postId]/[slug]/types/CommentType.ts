import { Comment, CommentVoteMinus, CommentVotePlus } from "@prisma/client";

export default interface CommentType extends Comment {
  author: {
    id: string;
    username: string | null;
    image: string | null;
  };
  _count: {
    pluses: number;
    minuses: number;
    rock: number;
    silver: number;
    gold: number;
  };
  pluses?: CommentVotePlus[];
  minuses?: CommentVoteMinus[];
  subcomments?: CommentType[];
}
