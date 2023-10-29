import Image from "next/image";

type UserInfoBoxProps = {
  avatar?: string | null;
  username?: string;
  children?: React.ReactNode;
};

const UserInfoBox: React.FC<UserInfoBoxProps> = ({
  avatar,
  username,
  children,
}) => {
  return (
    <div className="absolute top-[-80px] w-full flex gap-1 px-1">
      <Image
        src={avatar || "/image/avatars/default.jpg"}
        className="rounded-full w-[100px] h-auto border-8 border-[#252525] "
        alt="Avatar"
        width={100}
        height={100}
      />
      <div className="flex flex-col justify-center">
        <div className="flex items-center">
          <span className="w-[28px] h-[28px] inline-block rounded-full bg-[url(/images/ranks.png)] bg-no-repeat overflow-hidden" />
          <h2 className="text-[15px] font-semibold text-white ml-2 max-w-[165px] overflow-hidden">
            {username}
          </h2>
        </div>
        <div className="mt-[4px] flex-wrap flex">{children}</div>
      </div>
    </div>
  );
};

export default UserInfoBox;
