import CommentSection from "@/app/(withSidebar)/(singleMemPage)/obr/[postId]/[slug]/components/CommentsSection";
import { getUserProfileComments } from "@/app/actions/comments/getUserProfileComments";
import { getSession } from "@/app/actions/getSession";
import Breadcrumb from "@/app/components/Breadcrumb";
import Link from "next/link";
import { notFound } from "next/navigation";

type CommentsTabProps = {
  params: {
    username: string;
  };
  searchParams: {
    sort?: string;
  };
};

const CommentsTab: React.FC<CommentsTabProps> = async ({
  params: { username },
  searchParams: { sort },
}) => {
  const comments = await getUserProfileComments(username, sort);

  if (!comments) {
    return notFound();
  }

  const session = await getSession();

  const isLoggedIn = Boolean(session?.user?.id);

  return (
    <div>
      <Breadcrumb currentNode="Komentarze">
        <Link href="/">Strona główna</Link>
        <Link href={`/uzytkownik/${username}`}>{username}</Link>
      </Breadcrumb>
      <CommentSection
        avatar="/images/avatars/default.jpg"
        isLoggedIn={isLoggedIn}
        comments={comments}
        commentsCount={comments.length}
        userPage
      />
    </div>
  );
};

export default CommentsTab;
