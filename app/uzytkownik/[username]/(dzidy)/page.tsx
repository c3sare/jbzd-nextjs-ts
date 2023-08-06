import Breadcrumb from "@/app/components/Breadcrumb";
import Link from "next/link";

type PostsTabProps = {
  params: {
    username: string;
  };
};

const UserProfilePage: React.FC<PostsTabProps> = ({ params: { username } }) => {
  return (
    <div>
      <Breadcrumb currentNode="Dzidy">
        <Link href="/">Strona główna</Link>
        <Link href={`/uzytkownik/${username}`}>{username}</Link>
      </Breadcrumb>
      <div></div>
    </div>
  );
};

export default UserProfilePage;
