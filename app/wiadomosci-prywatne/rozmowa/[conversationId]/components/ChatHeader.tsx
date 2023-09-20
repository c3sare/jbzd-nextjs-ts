import Image from "next/image";
import Link from "next/link";
import ActionButton from "./ActionButton";

const ChatHeader = () => {
  return <div className="flex mb-[50px] items-center">
    <Link href="" className="mr-[30px]">
        <Image width={75} height={75} className="block h-auto max-w-full rounded-full" src={"/images/avatars/default.jpg"} alt="Avatar"/>
    </Link>
    <Link href="" className="flex-grow">
        <div className="text-white font-bold mb-[7px]">{"username"}</div>
        <div className="text-[#777] italic text-[12px]">Ostatnia wiadomość: {"kilka sekund temu"}</div>
    </Link>
    <div>
        <ActionButton>Zablokuj</ActionButton>
        <ActionButton>Usuń konwersację</ActionButton>
    </div>
  </div>;
};

export default ChatHeader;
