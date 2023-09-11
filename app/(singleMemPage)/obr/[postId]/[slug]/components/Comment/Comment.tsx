import { Comment, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import CommentButton from "./components/CommentButton";

type CommentProps = {
  comment: Comment & {
    author: User;
  };
};

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div>
      <Link href={`/uzytkownik/${comment.author.username}`}>
        <Image
          width={33}
          height={33}
          src={comment.author.image || "/images/avatars/default.jpg"}
          alt="Avatar"
        />
      </Link>
      <div>
        <header>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </header>
        <p dangerouslySetInnerHTML={{ __html: comment }} />
        <div>
          <CommentButton>Odpowiedz</CommentButton>
          <CommentButton>Zacytuj</CommentButton>
          <CommentButton>Nagroda</CommentButton>
          <CommentButton>Ulubione</CommentButton>
        </div>
      </div>
    </div>
  );
};

export default Comment;
