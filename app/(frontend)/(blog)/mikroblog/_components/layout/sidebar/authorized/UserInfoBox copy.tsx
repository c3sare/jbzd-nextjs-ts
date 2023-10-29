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
    <div className="absolute top-[-84px] w-full">
      <div className="pt-[25px]">
        <span className="float-left w-[100px] h-[100px] border-[5px] border-[#252525] mr-[5px] mt-[-25px] rounded-full overflow-hidden relative">
          <Image
            className="h-auto max-w-full"
            width={90}
            height={90}
            alt="Avatar"
            src={avatar || "/images/avatars/default.jpg"}
          />
        </span>
        <span className="w-[28px] h-[28px] float-left inline-block rounded-full bg-[url(/images/ranks.png)] bg-no-repeat overflow-hidden" />
        <h2 className="text-[15px] font-semibold text-white float-left ml-2 max-w-[165px] overflow-hidden">
          {username}
        </h2>
        <div className="w-[calc(100%_-_105px)] mt-[4px] float-left flex-wrap flex">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserInfoBox;
