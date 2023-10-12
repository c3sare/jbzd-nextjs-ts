import Footer from "./components/footer/Footer";
import FooterLink from "./components/footer/components/FooterLink";
import Header from "./components/header/Header";
import "./styles/globals.css";
import { Open_Sans } from "next/font/google";
import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";
import { MonitContext } from "./context/MonitContext";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Jbzd.com.pl - najgorsze obrazki w internecie!",
  description: "Najgorsze obrazki z sieci!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={openSans.className}>
        <AuthContext>
          <MonitContext>
            <ToasterContext />
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
          </MonitContext>
        </AuthContext>
      </body>
    </html>
  );
}
