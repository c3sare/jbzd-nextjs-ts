import CommentSection from "@/app/(frontend)/(restSite)/(withSidebar)/(singleMemPage)/obr/[postId]/[slug]/components/CommentsSection";
import { getFavouriteComments } from "@/actions/comments/getFavouriteComments";
import Breadcrumb from "@/components/Breadcrumb";
import { getSession } from "@/actions/getSession";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPremium } from "@/actions/getPremium";
import HeaderPremium from "../components/HeaderPremium";

type FavouriteCommentsPageProps = {
  searchParams: {
    sort: string;
  };
};

const FavouriteCommentsPage: React.FC<FavouriteCommentsPageProps> = async ({
  searchParams: { sort },
}) => {
  const session = await getSession();

  if (!session?.user?.id) return notFound();

  const { isPremium } = await getPremium();

  if (!isPremium) return <h2>Nie posiadasz premium!</h2>;

  const sorting = !sort ? "new" : ["new", "best"].includes(sort) ? sort : "new";

  const comments = await getFavouriteComments(sorting as "new" | "best");
  return (
    <>
      <Breadcrumb currentNode="Komentarze">
        <Link href={`/`}>Strona główna</Link>
        <Link href="/ulubione">Ulubione</Link>
      </Breadcrumb>
      <HeaderPremium isPremium={isPremium} />
      <CommentSection
        avatar="/images/avatars/default.jpg"
        isLoggedIn={true}
        userPage
        comments={comments}
        commentsCount={comments.length}
      />
    </>
  );
};

export default FavouriteCommentsPage;
