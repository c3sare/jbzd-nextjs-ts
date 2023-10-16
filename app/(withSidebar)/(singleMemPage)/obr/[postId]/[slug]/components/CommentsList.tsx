import { useCallback, useState } from "react";
import CommentType from "../types/CommentType";
import Comment from "./Comment/Comment";
import deleteAuthorDuplicates from "@/utils/deleteAuthorDuplicates";

type CommentsListProps = {
  comments: CommentType[];
  isLoggedIn: boolean;
  userPage?: boolean;
};

type Author = CommentType["author"] & {
  method: "" | "FOLLOW" | "BLOCK";
};

const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  isLoggedIn,
  userPage,
}) => {
  const [authors, setAuthors] = useState<Author[]>(
    deleteAuthorDuplicates([
      ...comments.map((item) => item.author),
      ...comments
        .flatMap((item) => (item.subcomments ? item.subcomments : []))
        .map((item) => item.author),
    ]).map((item) => ({
      ...item,
      method: item?.actionedBy?.[0]?.method || "",
    }))
  );

  const setSpears = useCallback((id: string, count: number) => {
    setAuthors((prevState) => {
      const newState = [...prevState];

      return newState.map((item) => {
        if (item!.id === id) {
          item!.spears = count;
        }
        return item;
      });
    });
  }, []);

  const setAuthorMethod = useCallback(
    (id: string, method: "FOLLOW" | "BLOCK") => {
      setAuthors((prevState) => {
        const newState = [...prevState];

        return newState.map((item) => {
          if (item!.id === id) {
            item!.method = method;
          }
          return item;
        });
      });
    },
    []
  );

  return (
    <div className="max-w-[600px] bg-[#1f1f1f] m-[5px_0_30px_0] p-[10px]">
      {comments.map((comment) => {
        const author = authors.find((item) => item.id === comment.authorId)!;

        return (
          <Comment
            author={author}
            userPage={userPage}
            key={comment.id}
            comment={comment}
            isLoggedIn={isLoggedIn}
            setSpears={setSpears}
            setAuthorMethod={setAuthorMethod}
          >
            {comment?.subcomments &&
              comment.subcomments.map((subcomment) => {
                const author = authors.find(
                  (item) => item.id === subcomment.authorId
                );

                return (
                  <Comment
                    className="border-l border-l-white"
                    key={subcomment.id}
                    isLoggedIn={isLoggedIn}
                    comment={subcomment}
                    setSpears={setSpears}
                    setAuthorMethod={setAuthorMethod}
                    author={author!}
                  />
                );
              })}
          </Comment>
        );
      })}
    </div>
  );
};

export default CommentsList;
