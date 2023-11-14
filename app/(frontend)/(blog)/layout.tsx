import Footer from "@/components/footer/Footer";
import FooterLink from "@/components/footer/components/FooterLink";
import MikroblogHeader from "./_components/MikroblogHeader";
import { BlogContextProvider } from "./_context/BlogContext";
import { getTagActions } from "./_actions/getTagActions";

export default async function PageMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tagActions = await getTagActions();

  return (
    <BlogContextProvider value={tagActions!}>
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
    </BlogContextProvider>
  );
}
