import Link from "next/link";

type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
};

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <Link href={href}>{children}</Link>
);

export default FooterLink;
