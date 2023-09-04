import getUsers from "@/app/actions/search/getUsers";
import SearchResultBox from "./SearchResultBox";
import UserBox from "./UserBox";

type UserSearchProps = {
  pharse: string;
};

const UserSearch: React.FC<UserSearchProps> = async ({ pharse }) => {
  const users = await getUsers(pharse);

  return (
    <SearchResultBox title="UŻYTKOWNICY">
      {users && users.length > 0
        ? users.map((user) => <UserBox key={user.id} user={user} />)
        : "Nie znaleziono ..."}
    </SearchResultBox>
  );
};

export default UserSearch;
