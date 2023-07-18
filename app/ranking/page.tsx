import Link from "next/link";
import getRankingUsers from "../actions/getRankingUsers";
import Breadcrumb from "../components/Breadcrumb";
import RankingListItem from "./components/RankingListItem";

const RankingPage = async () => {
  const users = await getRankingUsers();

  return (
    <>
      <Breadcrumb currentNode="Ranking">
        <Link href="/">Strona główna</Link>
      </Breadcrumb>
      <div className="flex flex-col w-full bg-[#313131]">
        {users.map((user) => (
          <RankingListItem
            key={user.id}
            rank={user.rank || 0}
            username={user.username}
            image={user.image || "/images/avatars/default.jpg"}
            spears={user.spears || 0}
          />
        ))}
      </div>
    </>
  );
};

export default RankingPage;
