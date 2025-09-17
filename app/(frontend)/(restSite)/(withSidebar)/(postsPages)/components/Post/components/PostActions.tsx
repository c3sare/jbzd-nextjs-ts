import BadgeActionButton from "./postActions/BadgeActionButton";
import { FaComment } from "@react-icons/all-files/fa/FaComment";
import PlusCounterButton from "./postActions/PlusCounterButton";
import PostActionLinkButton from "./postActions/PostActionLinkButton";
import { useSession } from "next-auth/react";
import { PostType } from "../../types/PostType";
import FavouriteButton from "./postActions/FavouriteButton";
import DeletePostButton from "./postActions/DeletePostButton";
import ReportPostButton from "./postActions/ReportPostButton";
import { memo } from "react";

type PostActionsProps = {
  postLink: string;
  pluses: number;
  post: PostType;
  setBadgeCount: (type: "ROCK" | "SILVER" | "GOLD", count: number) => void;
  isPostPage?: boolean;
};

const PostActions: React.FC<PostActionsProps> = ({
  postLink,
  pluses,
  post,
  setBadgeCount,
  isPostPage,
}) => {
  const { data, status } = useSession();

  const isLoggedIn = status === "authenticated";

  const isOwnPost = data?.user?.username === post?.author?.username;

  return (
    <div className="flex md:flex-col gap-1 mt-1 md:mt-0 flex-1 mx-auto w-full max-w-[600px] md:w-[82px] relative md:absolute md:left-[calc(100%+2px)] md:bottom-0 text-center flex-nowrap">
      <BadgeActionButton
        postId={post.id}
        isOwnPost={isOwnPost}
        isLoggedIn={isLoggedIn}
        setBadgeCount={setBadgeCount}
      />
      <ReportPostButton
        isLoggedIn={isLoggedIn}
        isOwnPost={isOwnPost}
        accepted={Boolean(post?.accepted)}
        postId={post.id}
      />
      <DeletePostButton
        isLoggedIn={isLoggedIn}
        isOwnPost={isOwnPost}
        postId={post.id}
      />
      {!isPostPage && (
        <PostActionLinkButton href={postLink + "#komentarze"}>
          <FaComment />
        </PostActionLinkButton>
      )}
      <FavouriteButton
        isFavourite={post.isFavourite || false}
        isLoggedIn={isLoggedIn}
        postId={post.id}
      />
      <PlusCounterButton
        postId={post.id}
        isPlused={post.isPlused || false}
        pluses={pluses}
      />
    </div>
  );
};

export default memo(PostActions);
