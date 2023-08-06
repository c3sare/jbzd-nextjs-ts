import Breadcrumb from "@/app/components/Breadcrumb";
import Link from "next/link";

type CommentsTabProps = {
  params: {
    username: string;
  };
};

const CommentsTab: React.FC<CommentsTabProps> = ({ params: { username } }) => {
  return (
    <div>
      <Breadcrumb currentNode="Komentarze">
        <Link href="/">Strona główna</Link>
        <Link href={`/uzytkownik/${username}`}>{username}</Link>
      </Breadcrumb>
      <div></div>
    </div>
  );
};

export default CommentsTab;
