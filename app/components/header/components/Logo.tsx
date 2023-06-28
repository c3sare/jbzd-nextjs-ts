import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="mx-[4px] mr-[20px] block">
      <Image
        alt="Logo"
        width={45}
        height={30}
        src="/images/logo.png"
        quality={100}
      />
    </Link>
  );
};

export default Logo;
