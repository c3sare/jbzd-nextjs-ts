import Footer from "@/components/footer/Footer";
import FooterLink from "@/components/footer/components/FooterLink";
import Header from "@/components/header/Header";

export default async function PageMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer>
        <FooterLink href="/regulamin">Regulamin</FooterLink>
        <FooterLink href="/kontakt">Kontakt</FooterLink>
        <FooterLink href="/polityka-prywatnosci">
          Polityka prywatności
        </FooterLink>
        <FooterLink href="/changelog">Dziennik zmian</FooterLink>
        <FooterLink href="/faq">FAQ</FooterLink>
      </Footer>
    </>
  );
}
