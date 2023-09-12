import CommentType from "../types/CommentType";
import Comment from "./Comment/Comment";

type CommentsListProps = {
  comments: CommentType[];
  isLoggedIn: boolean;
};

const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  isLoggedIn,
}) => {
  return (
    <div className="max-w-[600px] bg-[#1f1f1f] m-[5px_0_30px_0] p-[10px]">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} isLoggedIn={isLoggedIn} />
      ))}
    </div>
  );
};

export default CommentsList;
