import Footer from "@/components/footer/Footer";
import FooterLink from "@/components/footer/components/FooterLink";
import MikroblogHeader from "./_components/MikroblogHeader";

export default async function PageMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MikroblogHeader />
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
