import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo.png";

const Logo = () => {
  return (
    <Link href="/" className="mx-[4px] mr-[10px] block">
      <Image alt="Logo" width={45} height={30} src={logo} quality={100} />
    </Link>
  );
};

export default Logo;
