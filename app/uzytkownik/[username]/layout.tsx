import { getUser } from "@/app/actions/getUser";
import Avatar from "./components/Avatar";
import { AiFillFlag } from "@react-icons/all-files/ai/AiFillFlag";
import { AiFillPicture } from "@react-icons/all-files/ai/AiFillPicture";
import { FaComment } from "@react-icons/all-files/fa/FaComment";
import { format } from "date-fns";
import Badge from "./components/Badge";
import { notFound } from "next/navigation";
import UserRank from "./components/UserRank";
import UserActions from "./components/UserActions";
import { getSession } from "@/app/actions/getSession";
import prisma from "@/app/libs/prismadb";
import ButtonSwitchTab from "./components/ButtonSwitchTab";

type UserProfileLayoutProps = {
  children: React.ReactNode;
  params: {
    username: string;
  };
};

const UserProfileLayout: React.FC<UserProfileLayoutProps> = async ({
  children,
  params: { username },
}) => {
  const user = await getUser(username);

  if (!user) {
    return notFound();
  }

  const session = await getSession();
  const isLoggedIn = Boolean(session);
  const isOwnProfile = session?.user?.username === user.username;
  const isPremiumUser = user?.premiumExpires
    ? user.premiumExpires > new Date()
    : false;

  if (isPremiumUser && user.premium.hideProfile && !isOwnProfile)
    return (
      <h1 className="text-2xl font-bold text-white">Profil jest ukryty!</h1>
    );

  const isBlocked = Boolean(
    await prisma.userAction.count({
      where: {
        method: "BLOCK",
        authorId: session?.user?.id,
        userId: user.id,
      },
    })
  );

  const accountCreateDate = format(user.createdAt, "dd.MM.yyyy");

  return (
    <>
      <div className="flex pt-[30px] flex-wrap flex-col justify-center sm:flex-row mb-5 p-[15px_15px_0]">
        <Avatar src={user.image} />
        <div className="sm:pl-[15px] flex-[1]">
          <header className="font-semibold text-[28px] mb-[10px] text-center sm:text-left">
            {user.username}
          </header>
          <section className="flex gap-4 mb-[10px] justify-center sm:justify-normal">
            <div className="flex items-center">
              <AiFillPicture size={20} color="#888888" />
              <span className="ml-2">
                {user.posts} / {user.acceptedPosts}
              </span>
            </div>
            <div className="flex items-center">
              <FaComment size={20} color="#888888" />
              <span className="ml-2">{user.comments}</span>
            </div>
            <div className="flex items-center">
              <AiFillFlag size={20} color="#888888" />
              <span className="ml-2">{accountCreateDate}</span>
            </div>
          </section>
          <div className="mb-[10px]">
            <div className="flex items-center justify-center gap-2 sm:justify-normal">
              <Badge
                image="/images/likes/rock.png"
                name="Kamienna dzida"
                count={user.rock}
              />
              <Badge
                image="/images/likes/silver.png"
                name="Srebrna dzida"
                count={user.silver}
              />
              <Badge
                image="/images/likes/gold.png"
                name="Złota dzida"
                count={user.gold}
              />
            </div>
          </div>
          {isLoggedIn && !isOwnProfile && (
            <UserActions isBlocked={isBlocked} id={user.id} />
          )}
        </div>
        <UserRank
          isLoggedIn={isLoggedIn}
          isOwnProfile={isOwnProfile}
          id={user.id}
          rank={user.rank}
          spears={user.spears}
        />
      </div>
      <div className="w-full flex justify-center items-center gap-1 mb-[25px]">
        <ButtonSwitchTab href={`/uzytkownik/${username}`}>
          Dzidy użytkownika
        </ButtonSwitchTab>
        <ButtonSwitchTab href={`/uzytkownik/${username}/komentarze`}>
          Komentarze użytkownika
        </ButtonSwitchTab>
      </div>
      <div>{children}</div>
    </>
  );
};

export default UserProfileLayout;
