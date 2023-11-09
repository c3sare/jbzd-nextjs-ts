import Footer from "@/components/footer/Footer";
import FooterLink from "@/components/footer/components/FooterLink";
import MikroblogHeader from "./_components/MikroblogHeader";
import { BlogContextProvider } from "./_context/BlogContext";
import { getCurrentUserBlogData } from "./_actions/getCurrentUserBlogData";

export default async function PageMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const blogContextData = await getCurrentUserBlogData();

  if (!blogContextData) return new Error("Internal error");

  const parsedValue = JSON.parse(JSON.stringify(blogContextData));

  return (
    <BlogContextProvider value={parsedValue}>
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
