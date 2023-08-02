import CoinsBox from "./components/CoinsBox";
import MessagesButton from "./components/MessagesButton";
import NotificationsButton from "./components/NotificationsButton";
import { getSession } from "@/app/actions/getSession";

const RightSide: React.FC<React.PropsWithChildren> = async () => {
  const session = await getSession();

  const isLoggedIn = session?.user?.email;

  return (
    <div className="flex items-center text-right justify-end h-full">
      <CoinsBox />
      {isLoggedIn && (
        <>
          <MessagesButton />
          <NotificationsButton />
        </>
      )}
    </div>
  );
};

export default RightSide;
