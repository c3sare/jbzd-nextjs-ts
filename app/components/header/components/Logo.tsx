import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="mx-[4px] mr-[20px] block">
      <Image alt="Logo" width={52} height={35} src="/images/logo.png" />
    </Link>
  );
};

export default Logo;
